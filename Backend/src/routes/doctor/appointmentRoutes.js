import express from 'express';
import {
  getTodaysAppointments, getAllAppointments, getAppointmentDetails, updateAppointmentStatus
} from '../../controllers/doctor/appointmentController.js';

const router = express.Router({ mergeParams: true });

router.get('/today',        getTodaysAppointments); // GET   /api/doctor/:doctorId/appointments/today
router.get('/',              getAllAppointments);   // GET   /api/doctor/:doctorId/appointments
router.get('/:id',           getAppointmentDetails);// GET   /api/doctor/:doctorId/appointments/:id
router.patch('/:id/status',  updateAppointmentStatus); // PATCH /api/doctor/:doctorId/appointments/:id/status

export default router;
