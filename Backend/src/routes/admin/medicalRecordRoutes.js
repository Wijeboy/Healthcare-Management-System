import express from "express";
import {
  uploadMedicalRecord,
  getPatientMedicalRecords,
  deleteMedicalRecord,
  downloadMedicalRecord,
} from "../../controllers/admin/medicalRecordController.js";
import { uploadMedicalRecordFile } from "../../middleware/medicalRecordUpload.js";

const router = express.Router();

// ========================================
// UPLOAD MEDICAL RECORD
// POST /api/admin/records/patients/:patientId
// ========================================
router.post(
  "/patients/:patientId",
  uploadMedicalRecordFile,
  uploadMedicalRecord,
);

// ========================================
// GET PATIENT MEDICAL RECORDS
// GET /api/admin/records/patients/:patientId
// ========================================
router.get(
  "/patients/:patientId",
  getPatientMedicalRecords,
);

// ========================================
// DOWNLOAD MEDICAL RECORD
// GET /api/admin/records/patients/:patientId/:recordId/download
// ========================================
router.get(
  "/patients/:patientId/:recordId/download",
  downloadMedicalRecord,
);

// ========================================
// DELETE MEDICAL RECORD
// DELETE /api/admin/records/patients/:patientId/:recordId
// ========================================
router.delete(
  "/patients/:patientId/:recordId",
  deleteMedicalRecord,
);

export default router;