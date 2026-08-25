import express from "express";
import {
  uploadLabReport,
  getPatientLabReports,
  deleteLabReport,
  downloadLabReport,
} from "../../controllers/admin/labReportController.js";
import {
  uploadLabReportFile,
} from "../../middleware/labReportUpload.js";

const router = express.Router();

// ========================================
// UPLOAD LAB REPORT
// POST /api/admin/lab-reports/patients/:patientId
// ========================================
router.post(
  "/patients/:patientId",
  uploadLabReportFile,
  uploadLabReport,
);

// ========================================
// GET PATIENT LAB REPORTS
// GET /api/admin/lab-reports/patients/:patientId
// ========================================
router.get(
  "/patients/:patientId",
  getPatientLabReports,
);

// ========================================
// DOWNLOAD LAB REPORT
// GET /api/admin/lab-reports/patients/:patientId/:reportId/download
// ========================================
router.get(
  "/patients/:patientId/:reportId/download",
  downloadLabReport,
);

// ========================================
// DELETE LAB REPORT
// DELETE /api/admin/lab-reports/patients/:patientId/:reportId
// ========================================
router.delete(
  "/patients/:patientId/:reportId",
  deleteLabReport,
);

export default router;