import express from 'express';
import {
  getStaff,
  getStaffById,
  addStaff,
  updateStaff,
  updateStaffStatus,
  updatePermissions,
  deleteStaff
} from '../../controllers/admin/staffController.js';

const router = express.Router();

router.get('/',                 getStaff);          // GET  /api/admin/staff
router.get('/:id',              getStaffById);       // GET  /api/admin/staff/:id
router.post('/',                addStaff);           // POST /api/admin/staff
router.put('/:id',              updateStaff);        // PUT  /api/admin/staff/:id
router.patch('/:id/status',     updateStaffStatus);  // PATCH /api/admin/staff/:id/status
router.patch('/:id/permissions', updatePermissions); // PATCH /api/admin/staff/:id/permissions
router.delete('/:id',           deleteStaff);        // DELETE /api/admin/staff/:id

export default router;
