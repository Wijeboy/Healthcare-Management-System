import express from 'express';
import {
  bookAppointment,
} from '../../controllers/patient/doctorBookingController.js';
import {
  getPatientAppointments,
  getAppointmentDetails,
  cancelAppointment,
  rescheduleAppointment,
} from '../../controllers/patient/appointmentManagementController.js';
import { verifyToken, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected Appointment Booking & Management Routes
router.use(verifyToken, requireRole('Patient'));

router.post('/book', bookAppointment);
router.get('/', getPatientAppointments);
router.get('/:id', getAppointmentDetails);
router.patch('/:id/cancel', cancelAppointment);
router.put('/:id/reschedule', rescheduleAppointment);

export default router;
