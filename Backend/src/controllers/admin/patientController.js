import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

// GET all patients — pagination, search, filter by gender/bloodGroup/status
export const getPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, gender, bloodGroup, status, ageRange } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build age range filter
    let ageFilter = {};
    if (ageRange && ageRange !== 'All') {
      const ranges = {
        '0-18':  { gte: 0,  lte: 18 },
        '19-35': { gte: 19, lte: 35 },
        '36-60': { gte: 36, lte: 60 },
        '60+':   { gte: 61 },
      };
      if (ranges[ageRange]) ageFilter = { age: ranges[ageRange] };
    }

    const where = {
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { phone:    { contains: search, mode: 'insensitive' } },
        ]
      }),
      ...(gender    && gender    !== 'All' && { gender }),
      ...(bloodGroup && bloodGroup !== 'All' && { bloodGroup }),
      ...(status    && status    !== 'All' && { status }),
      ...ageFilter,
    };

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { email: true, status: true } } }
      }),
      prisma.patient.count({ where })
    ]);

    res.json({
      data: patients,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single patient by ID
export const getPatientById = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: {
        user: { select: { email: true, status: true, createdAt: true } },
        appointments: true,
        medicalRecords: true,
        prescriptions: true,
        payments: true,
      }
    });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST — create new patient
export const createPatient = async (req, res) => {
  try {
    const {
      email, password,
      fullName, phone, dob, bloodGroup, age, gender, address, allergies,
      existingConditions, currentMedications, medicalNotes,
      emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail,
      status
    } = req.body;

    const db = await getDb();

    if (email) {
      const existingUser = await db.collection("User").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'A patient with this email already exists' });
      }
    }

    const userId = new ObjectId();
    const patientId = new ObjectId();
    const now = new Date();

    const userDoc = {
      _id: userId,
      email: email || `patient_${patientId.toString().slice(-6)}@medimate.com`,
      password: password || "Patient@123456",
      role: 'Patient',
      status: status || 'Active',
      createdAt: now,
      updatedAt: now,
    };

    const patientDoc = {
      _id: patientId,
      userId: userId,
      fullName: fullName || "New Patient",
      phone: phone || "",
      dob: dob || null,
      bloodGroup: bloodGroup || null,
      age: age ? parseInt(age) : null,
      gender: gender || null,
      address: address || null,
      allergies: allergies || null,
      existingConditions: existingConditions || null,
      currentMedications: currentMedications || null,
      medicalNotes: medicalNotes || null,
      emergencyName: emergencyName || null,
      emergencyRelationship: emergencyRelationship || null,
      emergencyPhone: emergencyPhone || null,
      emergencyEmail: emergencyEmail || null,
      status: status || 'Active',
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("User").insertOne(userDoc);
    await db.collection("Patient").insertOne(patientDoc);

    const created = { id: patientId.toString(), userId: userId.toString(), ...patientDoc };
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT — update patient details
export const updatePatient = async (req, res) => {
  try {
    const {
      fullName, phone, dob, bloodGroup, age, gender, address, allergies,
      existingConditions, currentMedications, medicalNotes,
      emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail,
      status
    } = req.body;

    const db = await getDb();
    const patientId = new ObjectId(req.params.id);

    const updateFields = {
      ...(fullName !== undefined && { fullName }),
      ...(phone !== undefined && { phone }),
      ...(dob !== undefined && { dob }),
      ...(bloodGroup !== undefined && { bloodGroup }),
      ...(age !== undefined && { age: age ? parseInt(age) : null }),
      ...(gender !== undefined && { gender }),
      ...(address !== undefined && { address }),
      ...(allergies !== undefined && { allergies }),
      ...(existingConditions !== undefined && { existingConditions }),
      ...(currentMedications !== undefined && { currentMedications }),
      ...(medicalNotes !== undefined && { medicalNotes }),
      ...(emergencyName !== undefined && { emergencyName }),
      ...(emergencyRelationship !== undefined && { emergencyRelationship }),
      ...(emergencyPhone !== undefined && { emergencyPhone }),
      ...(emergencyEmail !== undefined && { emergencyEmail }),
      ...(status !== undefined && { status }),
      updatedAt: new Date(),
    };

    const result = await db.collection("Patient").findOneAndUpdate(
      { _id: patientId },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const updated = { id: result._id.toString(), userId: result.userId?.toString(), ...result };
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH — deactivate/activate patient (soft delete)
export const updatePatientStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Active' | 'Inactive'
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ error: 'Status must be Active or Inactive' });
    }

    const db = await getDb();
    const patientId = new ObjectId(req.params.id);

    const patient = await db.collection("Patient").findOneAndUpdate(
      { _id: patientId },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    if (patient.userId) {
      await db.collection("User").updateOne(
        { _id: patient.userId },
        { $set: { status, updatedAt: new Date() } }
      );
    }

    res.json({ message: `Patient ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, patient });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete patient
export const deletePatient = async (req, res) => {
  try {
    const db = await getDb();
    const patientId = new ObjectId(req.params.id);

    const patient = await db.collection("Patient").findOne({ _id: patientId });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    await db.collection("Patient").deleteOne({ _id: patientId });
    if (patient.userId) {
      await db.collection("User").deleteOne({ _id: patient.userId });
    }

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
