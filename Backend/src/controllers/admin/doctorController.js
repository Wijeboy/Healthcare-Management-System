import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

// GET all doctors — pagination, search, filter by department/status
export const getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department, status, availability } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = {
      ...(search && {
        OR: [
          { fullName: { contains: search, mode: 'insensitive' } },
          { specialization: { contains: search, mode: 'insensitive' } },
          { department: { contains: search, mode: 'insensitive' } },
        ]
      }),
      ...(department && { department }),
      ...(status && { status }),
      ...(availability && { availability }),
    };

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { email: true, status: true } } }
      }),
      prisma.doctor.count({ where })
    ]);

    res.json({
      data: doctors,
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET single doctor by ID
export const getDoctorById = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id },
      include: { user: { select: { email: true, status: true, createdAt: true } } }
    });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST — create new doctor
export const createDoctor = async (req, res) => {
  try {
    const {
      email, password,
      fullName, phone, dob, gender, address,
      licenceNumber, department, specialization, qualification,
      experience, bio,
      startTime, endTime, workingDays, consultationDuration, availability,
      status
    } = req.body;

    const db = await getDb();

    if (email) {
      const existingUser = await db.collection("User").findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: 'A doctor with this email already exists' });
      }
    }

    const userId = new ObjectId();
    const doctorId = new ObjectId();
    const now = new Date();

    const userDoc = {
      _id: userId,
      email: email || `doctor_${doctorId.toString().slice(-6)}@medimate.com`,
      password: password || "Doctor@123456",
      role: 'Doctor',
      status: status || 'Active',
      createdAt: now,
      updatedAt: now,
    };

    const doctorDoc = {
      _id: doctorId,
      userId: userId,
      fullName: fullName || "Dr. New Doctor",
      phone: phone || "",
      dob: dob || null,
      gender: gender || null,
      address: address || null,
      licenceNumber: licenceNumber || null,
      department: department || "General",
      specialization: specialization || "General Medicine",
      qualification: qualification || null,
      experience: experience || "1 Year",
      bio: bio || null,
      startTime: startTime || "09:00 AM",
      endTime: endTime || "05:00 PM",
      workingDays: workingDays || [],
      consultationDuration: consultationDuration || "15 mins",
      availability: availability || 'Available',
      status: status || 'Active',
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("User").insertOne(userDoc);
    await db.collection("Doctor").insertOne(doctorDoc);

    const created = { id: doctorId.toString(), userId: userId.toString(), ...doctorDoc };
    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT — update doctor details
export const updateDoctor = async (req, res) => {
  try {
    const {
      fullName, phone, dob, gender, address,
      licenceNumber, department, specialization, qualification,
      experience, bio,
      startTime, endTime, workingDays, consultationDuration, availability,
      status
    } = req.body;

    const db = await getDb();
    const doctorId = new ObjectId(req.params.id);

    const updateFields = {
      ...(fullName !== undefined && { fullName }),
      ...(phone !== undefined && { phone }),
      ...(dob !== undefined && { dob }),
      ...(gender !== undefined && { gender }),
      ...(address !== undefined && { address }),
      ...(licenceNumber !== undefined && { licenceNumber }),
      ...(department !== undefined && { department }),
      ...(specialization !== undefined && { specialization }),
      ...(qualification !== undefined && { qualification }),
      ...(experience !== undefined && { experience }),
      ...(bio !== undefined && { bio }),
      ...(startTime !== undefined && { startTime }),
      ...(endTime !== undefined && { endTime }),
      ...(workingDays !== undefined && { workingDays }),
      ...(consultationDuration !== undefined && { consultationDuration }),
      ...(availability !== undefined && { availability }),
      ...(status !== undefined && { status }),
      updatedAt: new Date(),
    };

    const result = await db.collection("Doctor").findOneAndUpdate(
      { _id: doctorId },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    const updated = { id: result._id.toString(), userId: result.userId?.toString(), ...result };
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH — deactivate/activate doctor (soft delete)
export const updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body; // 'Active' | 'Inactive'
    if (!['Active', 'Inactive'].includes(status)) {
      return res.status(400).json({ error: 'Status must be Active or Inactive' });
    }

    const db = await getDb();
    const doctorId = new ObjectId(req.params.id);

    const doctor = await db.collection("Doctor").findOneAndUpdate(
      { _id: doctorId },
      { $set: { status, updatedAt: new Date() } },
      { returnDocument: 'after' }
    );

    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }

    if (doctor.userId) {
      await db.collection("User").updateOne(
        { _id: doctor.userId },
        { $set: { status, updatedAt: new Date() } }
      );
    }

    res.json({ message: `Doctor ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, doctor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const db = await getDb();
    const doctorId = new ObjectId(req.params.id);

    const doctor = await db.collection("Doctor").findOne({ _id: doctorId });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    await db.collection("Doctor").deleteOne({ _id: doctorId });
    if (doctor.userId) {
      await db.collection("User").deleteOne({ _id: doctor.userId });
    }

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
