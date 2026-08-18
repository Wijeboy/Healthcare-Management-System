import prisma from '../../config/prisma.js';

const VALID_STATUSES = ['Pending', 'Scheduled', 'Completed', 'Canceled'];

function startOfDay(d) { const x = new Date(d); x.setHours(0, 0, 0, 0); return x; }
function endOfDay(d) { const x = new Date(d); x.setHours(23, 59, 59, 999); return x; }

// GET /api/doctor/:doctorId/appointments/today
export const getTodaysAppointments = async (req, res) => {
  try {
    const now = new Date();
    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: req.params.doctorId,
        date: { gte: startOfDay(now), lte: endOfDay(now) },
      },
      include: { patient: true },
      orderBy: { time: 'asc' },
    });

    res.json({ count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctor/:doctorId/appointments
// Optional filters: ?status=Scheduled&from=2026-10-01&to=2026-10-31
export const getAllAppointments = async (req, res) => {
  try {
    const { status, from, to } = req.query;

    const where = {
      doctorId: req.params.doctorId,
      ...(status && { status }),
      ...((from || to) && {
        date: {
          ...(from && { gte: new Date(from) }),
          ...(to && { lte: new Date(to) }),
        },
      }),
    };

    const appointments = await prisma.appointment.findMany({
      where,
      include: { patient: true },
      orderBy: { date: 'desc' },
    });

    res.json({ count: appointments.length, appointments });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET /api/doctor/:doctorId/appointments/:id
export const getAppointmentDetails = async (req, res) => {
  try {
    const appointment = await prisma.appointment.findUnique({
      where: { id: req.params.id },
      include: { patient: true, doctor: true },
    });

    if (!appointment || appointment.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/doctor/:doctorId/appointments/:id/status   Body: { status }
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const appointment = await prisma.appointment.findUnique({ where: { id: req.params.id } });
    if (!appointment || appointment.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const updated = await prisma.appointment.update({
      where: { id: req.params.id },
      data: { status },
      include: { patient: true },
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
