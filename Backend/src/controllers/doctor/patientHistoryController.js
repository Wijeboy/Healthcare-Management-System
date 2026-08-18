import prisma from '../../config/prisma.js';

// GET /api/doctor/:doctorId/patients/:patientId/history
// Combined view: patient profile + appointment history + medical records +
// prescriptions + clinical notes, all scoped to this patient.
export const getPatientHistory = async (req, res) => {
  try {
    const { patientId } = req.params;

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const [appointments, medicalRecords, prescriptions, clinicalNotes] = await Promise.all([
      prisma.appointment.findMany({
        where: { patientId },
        orderBy: { date: 'desc' },
      }),
      prisma.medicalRecord.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.prescription.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
      }),
      prisma.clinicalNote.findMany({
        where: { patientId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    res.json({ patient, appointments, medicalRecords, prescriptions, clinicalNotes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/doctor/:doctorId/patients/:patientId/notes   Body: { note }
export const addClinicalNote = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const { note } = req.body;

    if (!note || !note.trim()) {
      return res.status(400).json({ error: 'Note text is required' });
    }

    const patient = await prisma.patient.findUnique({ where: { id: patientId } });
    if (!patient) return res.status(404).json({ error: 'Patient not found' });

    const created = await prisma.clinicalNote.create({
      data: { patientId, doctorId, note: note.trim() },
    });

    res.status(201).json(created);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PUT /api/doctor/:doctorId/notes/:noteId   Body: { note }
export const updateClinicalNote = async (req, res) => {
  try {
    const { note } = req.body;

    const existing = await prisma.clinicalNote.findUnique({ where: { id: req.params.noteId } });
    if (!existing || existing.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Clinical note not found' });
    }

    const updated = await prisma.clinicalNote.update({
      where: { id: req.params.noteId },
      data: { note },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
