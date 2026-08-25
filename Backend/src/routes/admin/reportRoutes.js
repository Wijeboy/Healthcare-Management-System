import express from 'express';
import { 
  getReportOverview,
  generateAppointmentReports, 
  generatePatientReports, 
  generateDoctorReports, 
  generateRevenueReports, 
  exportReports 
} from '../../controllers/admin/reportController.js';

const router = express.Router();

router.get('/', getReportOverview);
router.get('/overview', getReportOverview);
router.get('/appointments', generateAppointmentReports);
router.get('/patients', generatePatientReports);
router.get('/doctors', generateDoctorReports);
router.get('/revenue', generateRevenueReports);
router.get('/export', exportReports);

export default router;
