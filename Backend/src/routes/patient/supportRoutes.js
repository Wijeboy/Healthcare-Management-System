import express from 'express';
import {
  createSupportTicket,
  getPatientSupportTickets,
  getSupportTicketDetails,
  updateSupportTicket,
} from '../../controllers/patient/supportTicketController.js';
import { verifyToken, requireRole } from '../../middleware/authMiddleware.js';

const router = express.Router();

// Protected Support Ticket Routes
router.use(verifyToken, requireRole('Patient'));

router.post('/tickets', createSupportTicket);
router.get('/tickets', getPatientSupportTickets);
router.get('/tickets/:id', getSupportTicketDetails);
router.put('/tickets/:id', updateSupportTicket);

export default router;
