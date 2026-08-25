import express from 'express';
import {
  getPatientHistory, addClinicalNote, updateClinicalNote
} from '../../controllers/doctor/patientHistoryController.js';

const router = express.Router({ mergeParams: true });

router.get('/patients/:patientId/history', getPatientHistory);   // GET  /api/doctor/:doctorId/patients/:patientId/history
router.post('/patients/:patientId/notes',  addClinicalNote);     // POST /api/doctor/:doctorId/patients/:patientId/notes
router.put('/notes/:noteId',               updateClinicalNote);  // PUT  /api/doctor/:doctorId/notes/:noteId

export default router;
