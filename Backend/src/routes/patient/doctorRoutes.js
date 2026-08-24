import express from 'express';
import {
  searchAvailableDoctors,
  filterDoctorsBySpecialization,
  getSpecializations,
  getAvailableTimeSlots,
} from '../../controllers/patient/doctorBookingController.js';
import { verifyToken, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected Routes for Doctor Searching & Time Slot checking for Patients
router.use(verifyToken, requireRole('Patient'));

router.get('/search', searchAvailableDoctors);
router.get('/filter', filterDoctorsBySpecialization);
router.get('/specializations', getSpecializations);
router.get('/:doctorId/time-slots', getAvailableTimeSlots);

export default router;
