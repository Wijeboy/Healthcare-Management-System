import express from "express";
import {
  getDaySchedule,
  getWeekSchedule,
  getMonthSchedule,
  checkAppointmentConflict,
  getAppointmentStatistics,
} from "../../controllers/admin/appointmentSchedulerController.js";

const router = express.Router();

// Get global appointment schedule for a specific day
// GET /api/admin/appointments/schedule/day?date=2026-08-20
router.get("/schedule/day", getDaySchedule);

// Get global appointment schedule for the week containing the selected date
// GET /api/admin/appointments/schedule/week?date=2026-08-20
router.get("/schedule/week", getWeekSchedule);

// Get global appointment schedule for the month containing the selected date
// GET /api/admin/appointments/schedule/month?date=2026-08-20
router.get("/schedule/month", getMonthSchedule);

// Check whether an appointment slot conflicts
// POST /api/admin/appointments/conflicts/check
router.post("/conflicts/check", checkAppointmentConflict);

// Get appointment statistics
// GET /api/admin/appointments/statistics
router.get("/statistics", getAppointmentStatistics);

export default router;