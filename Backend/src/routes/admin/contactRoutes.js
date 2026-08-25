import express from 'express';
import { submitContactForm, getAllMessages, getMessageById, updateMessageStatus, deleteMessage } from '../../controllers/admin/contactController.js';

const router = express.Router();

router.post('/submit', submitContactForm); // Public route potentially
router.get('/', getAllMessages);
router.get('/:id', getMessageById);
router.patch('/:id/status', updateMessageStatus);
router.delete('/:id', deleteMessage);

export default router;
