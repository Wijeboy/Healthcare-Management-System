import express from 'express';
import { getPatientTermsAndConditions } from '../../controllers/patient/termsController.js';

const router = express.Router();

// Terms & Conditions (Can be accessed by logged in patient or public)
router.get('/terms-and-conditions', getPatientTermsAndConditions);

export default router;
