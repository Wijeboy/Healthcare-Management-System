import express from 'express';
import { getPatientProfile, updatePatientProfile } from '../../controllers/patient/profileController.js';
import { verifyToken, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected Patient Profile Routes (Requires JWT + Patient role)
router.get('/', verifyToken, requireRole('Patient'), getPatientProfile);
router.put('/', verifyToken, requireRole('Patient'), updatePatientProfile);

export default router;
