import prisma from '../../config/prisma.js';

// GET /api/doctor/:doctorId/profile
export const getProfile = async (req, res) => {
  try {
    const doctor = await prisma.doctor.findUnique({
      where: { id: req.params.doctorId },
      include: { user: { select: { email: true, status: true } } }
    });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/doctor/:doctorId/profile
export const updateProfile = async (req, res) => {
  try {
    const {
      fullName, phone, dob, gender, address,
      licenceNumber, department, specialization, qualification,
      experience, bio,
      startTime, endTime, workingDays, consultationDuration,
    } = req.body;

    const updated = await prisma.doctor.update({
      where: { id: req.params.doctorId },
      data: {
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

// POST /api/doctor/:doctorId/profile/photo  (multipart/form-data, field name: "photo")
export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const photoUrl = `/uploads/profile-pictures/${req.file.filename}`;

    // Doctor model has no photoUrl column today — this stores it inside
    // `bio`-adjacent metadata by writing straight to Mongo via Prisma's
    // untyped update is not possible without a schema field, so add this
    // one field to the Doctor model when you're ready:
    //   photoUrl String?
    // Until then this endpoint saves the file to disk and returns its URL;
    // wire up `photoUrl` on the Doctor model to persist it permanently.
    res.json({ photoUrl, note: 'File saved. Add `photoUrl String?` to the Doctor model to persist this on the doctor record.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
