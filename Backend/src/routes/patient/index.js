import express from 'express';
import patientAuthRoutes from './authRoutes.js';
import patientProfileRoutes from './profileRoutes.js';
import patientAccountRoutes from './accountRoutes.js';
import patientDoctorRoutes from './doctorRoutes.js';
import patientAppointmentRoutes from './appointmentRoutes.js';
import patientSupportRoutes from './supportRoutes.js';
import patientTermsRoutes from './termsRoutes.js';

const router = express.Router();

// Register Patient Sub-Routes under /api/patient
router.use('/auth', patientAuthRoutes);
router.use('/profile', patientProfileRoutes);
router.use('/account', patientAccountRoutes);
router.use('/doctors', patientDoctorRoutes);
router.use('/appointments', patientAppointmentRoutes);
router.use('/support', patientSupportRoutes);
router.use('/', patientTermsRoutes);

export default router;
