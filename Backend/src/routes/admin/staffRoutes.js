import express from 'express';
import { getStaff, addStaff, updateStaff, deleteStaff, updatePermissions } from '../../controllers/admin/staffController.js';

const router = express.Router();

router.get('/', getStaff);
router.post('/', addStaff);
router.put('/:id', updateStaff);
router.delete('/:id', deleteStaff);
router.patch('/:id/permissions', updatePermissions);

export default router;
