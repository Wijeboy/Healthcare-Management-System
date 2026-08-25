import express from 'express';
import { registerPatient, loginPatient } from '../../controllers/patient/profileController.js';

const router = express.Router();

// Patient Auth Routes (Public)
router.post('/register', registerPatient);
router.post('/login', loginPatient);

export default router;
