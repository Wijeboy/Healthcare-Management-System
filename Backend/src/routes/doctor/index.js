import express from 'express';
import profileRoutes from './profileRoutes.js';
import scheduleRoutes from './scheduleRoutes.js';
import appointmentRoutes from './appointmentRoutes.js';
import patientHistoryRoutes from './patientHistoryRoutes.js';
import notificationRoutes from './notificationRoutes.js';

const router = express.Router();

// All doctor-self-service routes are scoped under /:doctorId, e.g.
//   GET /api/doctor/<id>/profile
//   GET /api/doctor/<id>/appointments/today
//   GET /api/doctor/<id>/patients/<patientId>/history
router.use('/:doctorId/profile',       profileRoutes);
router.use('/:doctorId/availability',  scheduleRoutes);
router.use('/:doctorId/appointments',  appointmentRoutes);
router.use('/:doctorId/notifications', notificationRoutes);
router.use('/:doctorId',               patientHistoryRoutes); // patients/:patientId/history, notes/:noteId

export default router;
