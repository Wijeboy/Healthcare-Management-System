import express from 'express';
import {
  updatePassword,
  updateEmail,
  updatePhone,
  deactivateAccount,
} from '../../controllers/patient/accountController.js';
import { verifyToken, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected Patient Account Settings Routes
router.use(verifyToken, requireRole('Patient'));

router.put('/password', updatePassword);
router.put('/email', updateEmail);
router.put('/phone', updatePhone);
router.patch('/deactivate', deactivateAccount);

export default router;
