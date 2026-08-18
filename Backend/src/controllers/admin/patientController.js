import prisma from '../../config/prisma.js';
import bcrypt from 'bcrypt';
import { getDb, ObjectId, checkUniqueNic } from '../../config/mongo.js';

// GET all patients — pagination, search, filter
export const getPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, status } = req.query;
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    try {
      const where = {
        ...(search && {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { phone:    { contains: search, mode: 'insensitive' } },
            { user: { email: { contains: search, mode: 'insensitive' } } }
          ]
        }),
        ...(status && status !== 'All' && { status })
      };

      const [patients, total, totalAll, activeCount, inactiveCount, allergiesCount] = await Promise.all([
        prisma.patient.findMany({
          where,
          skip,
          take: limitNum,
          orderBy: { createdAt: 'desc' },
          include: { user: { select: { email: true, status: true } } }
        }),
        prisma.patient.count({ where }),
        prisma.patient.count(),
        prisma.patient.count({ where: { status: 'Active' } }),
        prisma.patient.count({ where: { status: 'Inactive' } }),
        prisma.patient.count({ where: { allergies: { not: null } } }),
      ]);

      return res.json({
        data: patients,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        summary: {
          total: totalAll,
          active: activeCount,
          inactive: inactiveCount,
          allergies: allergiesCount,
        }
      });
    } catch (prismaErr) {
      const db = await getDb();
      const matchFilter = {
        ...(status && status !== 'All' && { status })
      };

      if (search) {
        const searchRegex = new RegExp(search, 'i');
        matchFilter.$or = [
          { fullName: searchRegex },
          { phone: searchRegex },
          { email: searchRegex },
          { nationalId: searchRegex }
        ];
      }

      const [patients, total] = await Promise.all([
        db.collection("Patient")
          .find(matchFilter)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .toArray(),
        db.collection("Patient").countDocuments(matchFilter)
      ]);

      const formattedData = await Promise.all(
        patients.map(async (p) => {
          let userDoc = null;
          if (p.userId) {
            try {
              const userObjId = typeof p.userId === 'string' ? new ObjectId(p.userId) : p.userId;
              userDoc = await db.collection("User").findOne({ _id: userObjId });
            } catch (e) {
              userDoc = null;
            }
          }

          return {
            id: p._id.toString(),
            _id: p._id.toString(),
            userId: p.userId ? p.userId.toString() : null,
            fullName: p.fullName || "Unnamed Patient",
            phone: p.phone || "",
            dob: p.dob || null,
            bloodGroup: p.bloodGroup || null,
            age: p.age || null,
            gender: p.gender || null,
            nationalId: p.nationalId || null,
            address: p.address || null,
            allergies: p.allergies || null,
            existingConditions: p.existingConditions || null,
            currentMedications: p.currentMedications || null,
            medicalNotes: p.medicalNotes || null,
            emergencyName: p.emergencyName || null,
            emergencyRelationship: p.emergencyRelationship || null,
            emergencyPhone: p.emergencyPhone || null,
            emergencyEmail: p.emergencyEmail || null,
            status: p.status || 'Active',
            createdAt: p.createdAt,
            updatedAt: p.updatedAt,
            user: {
              email: p.email || userDoc?.email || `patient_${p._id.toString().slice(-6)}@medimate.com`,
              status: p.status || userDoc?.status || 'Active',
            }
          };
        })
      );

      const totalAll = await db.collection("Patient").countDocuments();
      const activeCount = await db.collection("Patient").countDocuments({ status: "Active" });
      const inactiveCount = await db.collection("Patient").countDocuments({ status: "Inactive" });

      return res.json({
        data: formattedData,
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
        summary: {
          total: totalAll,
          active: activeCount,
          inactive: inactiveCount,
          allergies: 0,
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single patient by ID
export const getPatientById = async (req, res) => {
  try {
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: req.params.id },
        include: {
          user: { select: { email: true, status: true, createdAt: true } },
          appointments: true,
          medicalRecords: true,
          prescriptions: true,
        }
      });

      if (patient) return res.json(patient);
    } catch (prismaErr) {}

    const db = await getDb();
    let patientId;
    try {
      patientId = new ObjectId(req.params.id);
    } catch (e) {
      return res.status(404).json({ error: 'Invalid Patient ID' });
    }

    const patient = await db.collection("Patient").findOne({ _id: patientId });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    let userDoc = null;
    if (patient.userId) {
      try {
        const userObjId = typeof patient.userId === 'string' ? new ObjectId(patient.userId) : patient.userId;
        userDoc = await db.collection("User").findOne({ _id: userObjId });
      } catch (e) {
        userDoc = null;
      }
    }

    const appointments = await db.collection("Appointment").find({ patientId: patient._id }).toArray();
    const medicalRecords = await db.collection("MedicalRecord").find({ patientId: patient._id }).toArray();
    const prescriptions = await db.collection("Prescription").find({ patientId: patient._id }).toArray();

    res.json({
      id: patient._id.toString(),
      _id: patient._id.toString(),
      userId: patient.userId ? patient.userId.toString() : null,
      ...patient,
      user: {
        email: patient.email || userDoc?.email || 'N/A',
        status: patient.status || userDoc?.status || 'Active',
        createdAt: userDoc?.createdAt || patient.createdAt,
      },
      appointments,
      medicalRecords,
      prescriptions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper calc age
const calcAgeFromDob = (dobStr) => {
  if (!dobStr) return null;
  const dobDate = new Date(dobStr);
  const today = new Date();
  let calculated = today.getFullYear() - dobDate.getFullYear();
  const m = today.getMonth() - dobDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) calculated--;
  return calculated > 0 ? calculated : null;
};

// POST — create new patient
export const createPatient = async (req, res) => {
  try {
    const {
      email, password,
      fullName, phone, dob, bloodGroup, age, gender, nationalId, nic, address, allergies,
      existingConditions, currentMedications, medicalNotes,
      emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail,
      status
    } = req.body;

    const db = await getDb();
    const effectiveNic = nationalId || nic || null;

    if (email) {
      const existingUser = await db.collection("User").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'A patient with this email already exists' });
      }
    }

    if (effectiveNic) {
      const existsInRole = await checkUniqueNic(db, effectiveNic);
      if (existsInRole) {
        return res.status(409).json({ error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.` });
      }
    }

    const userId = new ObjectId();
    const patientId = new ObjectId();
    const now = new Date();
    const computedAge = age ? parseInt(age) : calcAgeFromDob(dob);
    const rawPassword = password || "Patient@123456";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const userDoc = {
      _id: userId,
      email: email || `patient_${patientId.toString().slice(-6)}@medimate.com`,
      password: hashedPassword,
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
      age: computedAge,
      gender: gender || null,
      nationalId: effectiveNic,
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
      fullName, phone, dob, bloodGroup, age, gender, nationalId, nic, address, allergies,
      existingConditions, currentMedications, medicalNotes,
      emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail,
      status
    } = req.body;

    const db = await getDb();
    const patientId = new ObjectId(req.params.id);
    const effectiveNic = nationalId || nic || undefined;

    if (effectiveNic) {
      const existsInRole = await checkUniqueNic(db, effectiveNic, req.params.id);
      if (existsInRole) {
        return res.status(409).json({ error: `National ID / NIC '${effectiveNic}' is already registered for a ${existsInRole} in the system.` });
      }
    }

    const computedAge = age !== undefined ? (age ? parseInt(age) : null) : (dob ? calcAgeFromDob(dob) : undefined);

    const updateFields = {
      ...(fullName !== undefined && { fullName }),
      ...(phone !== undefined && { phone }),
      ...(dob !== undefined && { dob }),
      ...(bloodGroup !== undefined && { bloodGroup }),
      ...(computedAge !== undefined && { age: computedAge }),
      ...(gender !== undefined && { gender }),
      ...(effectiveNic !== undefined && { nationalId: effectiveNic }),
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
