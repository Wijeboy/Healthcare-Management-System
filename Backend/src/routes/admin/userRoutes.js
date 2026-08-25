import express from 'express';
import { getUsers, createUser, createAdmin, updateUser, deleteUser, assignRole } from '../../controllers/admin/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.post('/admin', createAdmin);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/role', assignRole);

export default router;
