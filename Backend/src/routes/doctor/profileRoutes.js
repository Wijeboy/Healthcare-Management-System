import express from 'express';
import { getProfile, updateProfile, uploadPhoto } from '../../controllers/doctor/profileController.js';
import upload from '../../middleware/upload.js';

const router = express.Router({ mergeParams: true });

router.get('/',       getProfile);                          // GET  /api/doctor/:doctorId/profile
router.put('/',       updateProfile);                        // PUT  /api/doctor/:doctorId/profile
router.post('/photo', upload.single('photo'), uploadPhoto);  // POST /api/doctor/:doctorId/profile/photo

export default router;
