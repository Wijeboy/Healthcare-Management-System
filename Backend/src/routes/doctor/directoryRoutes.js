import express from 'express';
import {
  listDoctors, searchDoctors, getSpecializations, getPublicProfile
} from '../../controllers/doctor/directoryController.js';

const router = express.Router();

router.get('/search',          searchDoctors);       // GET /api/doctors/public/search?q=
router.get('/specializations', getSpecializations);  // GET /api/doctors/public/specializations
router.get('/:id',             getPublicProfile);    // GET /api/doctors/public/:id
router.get('/',                listDoctors);         // GET /api/doctors/public

export default router;
