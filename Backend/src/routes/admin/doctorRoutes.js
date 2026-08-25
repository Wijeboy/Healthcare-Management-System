import express from 'express';
import {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  updateDoctorStatus,
  deleteDoctor
} from '../../controllers/admin/doctorController.js';

const router = express.Router();

router.get('/',            getDoctors);        // GET  /api/admin/doctors
router.get('/:id',         getDoctorById);     // GET  /api/admin/doctors/:id
router.post('/',           createDoctor);      // POST /api/admin/doctors
router.put('/:id',         updateDoctor);      // PUT  /api/admin/doctors/:id
router.patch('/:id/status', updateDoctorStatus); // PATCH /api/admin/doctors/:id/status
router.delete('/:id',      deleteDoctor);      // DELETE /api/admin/doctors/:id

export default router;
