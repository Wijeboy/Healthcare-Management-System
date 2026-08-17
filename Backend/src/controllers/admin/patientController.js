import prisma from '../../config/prisma.js';

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
      include: { user: { select: { email: true, status: true, createdAt: true } } }
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

    const newPatient = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Patient', status: status || 'Active' }
      });
      return tx.patient.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          dob,
          bloodGroup,
          age: age ? parseInt(age) : null,
          gender,
          address,
          allergies,
          existingConditions,
          currentMedications,
          medicalNotes,
          emergencyName,
          emergencyRelationship,
          emergencyPhone,
          emergencyEmail,
          status: status || 'Active',
        }
      });
    });

    res.status(201).json(newPatient);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A patient with this email already exists' });
    }
    res.status(500).json({ error: error.message });
  }
};

// PUT — update patient details
export const updatePatient = async (req, res) => {
  try {
    const {
      fullName, phone, dob, bloodGroup, age, gender, address, allergies,
      existingConditions, currentMedications, medicalNotes,
      emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail
    } = req.body;

    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: {
        fullName, phone, dob, bloodGroup,
        age: age ? parseInt(age) : undefined,
        gender, address, allergies,
        existingConditions, currentMedications, medicalNotes,
        emergencyName, emergencyRelationship, emergencyPhone, emergencyEmail
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Patient not found' });
    }
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

    const [patient] = await prisma.$transaction([
      prisma.patient.update({
        where: { id: req.params.id },
        data: { status }
      }),
      prisma.user.updateMany({
        where: { patient: { id: req.params.id } },
        data: { status }
      })
    ]);

    res.json({ message: `Patient ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, patient });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Patient not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({ where: { id: req.params.id } });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    await prisma.$transaction([
      prisma.patient.delete({ where: { id: req.params.id } }),
      prisma.user.delete({ where: { id: patient.userId } })
    ]);

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
