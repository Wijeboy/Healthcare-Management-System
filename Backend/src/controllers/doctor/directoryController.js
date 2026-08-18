import prisma from '../../config/prisma.js';

function toPublicProfile(doctor) {
  return {
    id: doctor.id,
    fullName: doctor.fullName,
    department: doctor.department,
    specialization: doctor.specialization,
    qualification: doctor.qualification,
    experience: doctor.experience,
    bio: doctor.bio,
    availability: doctor.availability,
    workingDays: doctor.workingDays,
    startTime: doctor.startTime,
    endTime: doctor.endTime,
  };
}

// GET /api/doctors/public
// Only lists Active doctors — matches the admin model's `status` field.
// Optional: ?department=Cardiology&search=perera
export const listDoctors = async (req, res) => {
  try {
    const { department, search } = req.query;

    const doctors = await prisma.doctor.findMany({
      where: {
        status: 'Active',
        ...(department && { department }),
        ...(search && {
          OR: [
            { fullName: { contains: search, mode: 'insensitive' } },
            { specialization: { contains: search, mode: 'insensitive' } },
            { department: { contains: search, mode: 'insensitive' } },
          ],
        }),
      },
      orderBy: { fullName: 'asc' },
    });

    res.json({ count: doctors.length, doctors: doctors.map(toPublicProfile) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctors/public/search?q=perera
export const searchDoctors = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Query param 'q' is required" });

    const doctors = await prisma.doctor.findMany({
      where: {
        status: 'Active',
        OR: [
          { fullName: { contains: q, mode: 'insensitive' } },
          { specialization: { contains: q, mode: 'insensitive' } },
          { department: { contains: q, mode: 'insensitive' } },
        ],
      },
      orderBy: { fullName: 'asc' },
    });

    res.json({ count: doctors.length, doctors: doctors.map(toPublicProfile) });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctors/public/specializations
export const getSpecializations = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      where: { status: 'Active' },
      select: { specialization: true },
    });
    const specializations = [...new Set(doctors.map((d) => d.specialization).filter(Boolean))].sort();
    res.json({ specializations });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctors/public/:id
export const getPublicProfile = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id } });
    if (!doctor || doctor.status !== 'Active') {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.json(toPublicProfile(doctor));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
