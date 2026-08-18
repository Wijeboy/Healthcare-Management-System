import express from 'express';
import {
  getAvailability, getAvailableSlots, createSchedule, updateSchedule, deleteSchedule
} from '../../controllers/doctor/scheduleController.js';

const router = express.Router({ mergeParams: true });

router.get('/slots',      getAvailableSlots); // GET    /api/doctor/:doctorId/availability/slots?day=Monday
router.get('/',            getAvailability);  // GET    /api/doctor/:doctorId/availability
router.post('/',           createSchedule);   // POST   /api/doctor/:doctorId/availability
router.put('/:slotId',     updateSchedule);   // PUT    /api/doctor/:doctorId/availability/:slotId
router.delete('/:slotId',  deleteSchedule);   // DELETE /api/doctor/:doctorId/availability/:slotId

export default router;
