import prisma from '../../config/prisma.js';

// GET /api/doctor/:doctorId/notifications
export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { doctorId: req.params.doctorId },
      orderBy: { createdAt: 'desc' },
    });
    res.json({ count: notifications.length, notifications });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/doctor/:doctorId/notifications/:id/read   Body: { read? } (defaults true)
export const markNotificationRead = async (req, res) => {
  try {
    const notification = await prisma.notification.findUnique({ where: { id: req.params.id } });
    if (!notification || notification.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Notification not found' });
    }

    const updated = await prisma.notification.update({
      where: { id: req.params.id },
      data: { read: req.body.read ?? true },
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// PATCH /api/doctor/:doctorId/notifications/read-all
export const markAllRead = async (req, res) => {
  try {
    await prisma.notification.updateMany({
      where: { doctorId: req.params.doctorId, read: false },
      data: { read: true },
    });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// POST /api/doctor/:doctorId/notifications/reminders   Body: { appointmentId }
// Creates a "New Appointment Request"-style reminder notification, typically
// triggered by a scheduled job or right after a new appointment is booked.
export const createAppointmentReminder = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    if (!appointmentId) return res.status(400).json({ error: 'appointmentId is required' });

    const appointment = await prisma.appointment.findUnique({
      where: { id: appointmentId },
      include: { patient: true },
    });
    if (!appointment || appointment.doctorId !== req.params.doctorId) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    const notification = await prisma.notification.create({
      data: {
        doctorId: req.params.doctorId,
        group: 'Patient Management',
        badge: 'Appointment Reminder',
        badgeTint: 'blue',
        icon: 'calendar-plus',
        title: `Upcoming: ${appointment.patient.fullName}`,
        detail: [
          { label: 'Date', value: new Date(appointment.date).toLocaleDateString() },
          { label: 'Time', value: appointment.time },
        ],
        patientId: appointment.patientId,
      },
    });

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
