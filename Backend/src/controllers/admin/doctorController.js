import prisma from '../../config/prisma.js';

export const getDoctors = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, department } = req.query;
    const skip = (page - 1) * limit;

    const where = {
      ...(search && { fullName: { contains: search, mode: 'insensitive' } }),
      ...(department && { department })
    };

    const [doctors, total] = await Promise.all([
      prisma.doctor.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: { user: true }
      }),
      prisma.doctor.count({ where })
    ]);

    res.json({ data: doctors, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.id },
      include: { user: true }
    });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDoctor = async (req, res) => {
  try {
    const { email, password, fullName, phone, department, specialization, experience, availability } = req.body;
    
    // Create User and Doctor in a transaction
    const newDoctor = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Doctor' }
      });
      return tx.doctor.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          department,
          specialization,
          experience,
          availability
        }
      });
    });

    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDoctor = async (req, res) => {
  try {
    const { fullName, phone, department, specialization, experience, availability } = req.body;
    const updated = await prisma.doctor.update({
      where: { id: req.params.id },
      data: { fullName, phone, department, specialization, experience, availability }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    // Delete doctor and user
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
