import express from 'express';
import { getUsers, createUser, updateUser, deleteUser, assignRole } from '../../controllers/admin/userController.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/:id/role', assignRole);

export default router;
