import prisma from '../../config/prisma.js';

export const getPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    const where = search ? { fullName: { contains: search, mode: 'insensitive' } } : {};

    const [patients, total] = await Promise.all([
      prisma.patient.findMany({
        where,
        skip: parseInt(skip),
        take: parseInt(limit),
        include: { user: true }
      }),
      prisma.patient.count({ where })
    ]);

    res.json({ data: patients, total, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: req.params.id },
      include: { user: true }
    });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createPatient = async (req, res) => {
  try {
    const { email, password, fullName, phone, bloodGroup, age, gender, address, allergies } = req.body;
    
    const newPatient = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: { email, password, role: 'Patient' }
      });
      return tx.patient.create({
        data: {
          userId: user.id,
          fullName,
          phone,
          bloodGroup,
          age,
          gender,
          address,
          allergies
        }
      });
    });

    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { fullName, phone, bloodGroup, age, gender, address, allergies } = req.body;
    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: { fullName, phone, bloodGroup, age, gender, address, allergies }
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
