import express from 'express';
import {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  updatePatientStatus,
  deletePatient
} from '../../controllers/admin/patientController.js';

const router = express.Router();

router.get('/',            getPatients);         // GET  /api/admin/patients
router.get('/:id',         getPatientById);      // GET  /api/admin/patients/:id
router.post('/',           createPatient);       // POST /api/admin/patients
router.put('/:id',         updatePatient);       // PUT  /api/admin/patients/:id
router.patch('/:id/status', updatePatientStatus); // PATCH /api/admin/patients/:id/status
router.delete('/:id',      deletePatient);       // DELETE /api/admin/patients/:id

export default router;
