import prisma from '../../config/prisma.js';

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

    const newDoctor = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Doctor', status: status || 'Active' }
      });
      return tx.doctor.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          dob,
          gender,
          address,
          licenceNumber,
          department,
          specialization,
          qualification,
          experience,
          bio,
          startTime,
          endTime,
          workingDays: workingDays || [],
          consultationDuration,
          availability: availability || 'Available',
          status: status || 'Active',
        }
      });
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(409).json({ error: 'A doctor with this email already exists' });
    }
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
      startTime, endTime, workingDays, consultationDuration, availability
    } = req.body;

    const updated = await prisma.doctor.update({
      where: { id: req.params.id },
      data: {
        fullName, phone, dob, gender, address,
        licenceNumber, department, specialization, qualification,
        experience, bio,
        startTime, endTime,
        workingDays: workingDays || [],
        consultationDuration, availability
      }
    });
    res.json(updated);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
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

    const [doctor, user] = await prisma.$transaction([
      prisma.doctor.update({
        where: { id: req.params.id },
        data: { status }
      }),
      prisma.user.updateMany({
        where: { doctor: { id: req.params.id } },
        data: { status }
      })
    ]);

    res.json({ message: `Doctor ${status === 'Active' ? 'activated' : 'deactivated'} successfully`, doctor });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(500).json({ error: error.message });
  }
};

// DELETE — hard delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id } });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });

    await prisma.$transaction([
      prisma.doctor.delete({ where: { id: req.params.id } }),
      prisma.user.delete({ where: { id: doctor.userId } })
    ]);

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
