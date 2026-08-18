import express from 'express';
import {
  getNotifications, markNotificationRead, markAllRead, createAppointmentReminder
} from '../../controllers/doctor/notificationController.js';

const router = express.Router({ mergeParams: true });

router.get('/',           getNotifications);          // GET   /api/doctor/:doctorId/notifications
router.patch('/read-all', markAllRead);                // PATCH /api/doctor/:doctorId/notifications/read-all
router.patch('/:id/read', markNotificationRead);        // PATCH /api/doctor/:doctorId/notifications/:id/read
router.post('/reminders', createAppointmentReminder);   // POST  /api/doctor/:doctorId/notifications/reminders

export default router;
