import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb, ObjectId } from "../../config/mongo.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const backendRoot = path.join(
  __dirname,
  "..",
  "..",
  "..",
);

// ========================================
// HELPER: REMOVE MULTER UPLOADED FILE
// ========================================
const removeUploadedFile = (file) => {
  if (!file?.path) {
    return;
  }

  try {
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  } catch (error) {
    console.error("Failed to remove uploaded file:", error);
  }
};

// ========================================
// UPLOAD MEDICAL RECORD
// POST /api/admin/records/patients/:patientId
// ========================================
export const uploadMedicalRecord = async (req, res) => {
  try {
    const { patientId } = req.params;

    const {
      title,
      recordType = "Medical Record",
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Medical record file is required",
      });
    }

    if (!ObjectId.isValid(patientId)) {
      removeUploadedFile(req.file);

      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    const db = await getDb();

    const patient = await db.collection("Patient").findOne({
      _id: new ObjectId(patientId),
    });

    if (!patient) {
      removeUploadedFile(req.file);

      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const now = new Date();

    const medicalRecordFile = {
      _id: new ObjectId(),

      patientId,

      title:
        typeof title === "string" && title.trim()
          ? title.trim()
          : req.file.originalname,

      recordType:
        typeof recordType === "string" && recordType.trim()
          ? recordType.trim()
          : "Medical Record",

      description:
        typeof description === "string" && description.trim()
          ? description.trim()
          : null,

      originalName: req.file.originalname,
      storedName: req.file.filename,

      relativePath:
        `private-uploads/medical-records/${req.file.filename}`,

      mimeType: req.file.mimetype,
      size: req.file.size,

      createdAt: now,
      updatedAt: now,
    };

    await db
      .collection("MedicalRecordFile")
      .insertOne(medicalRecordFile);

    return res.status(201).json({
      success: true,
      message: "Medical record uploaded successfully",

      data: {
        id: medicalRecordFile._id.toString(),
        patientId: medicalRecordFile.patientId,
        patientName:
          patient.fullName || "Unknown Patient",

        title: medicalRecordFile.title,
        recordType: medicalRecordFile.recordType,
        description: medicalRecordFile.description,

        originalName: medicalRecordFile.originalName,
        storedName: medicalRecordFile.storedName,
        mimeType: medicalRecordFile.mimeType,
        size: medicalRecordFile.size,

        createdAt: medicalRecordFile.createdAt,
      },
    });
  } catch (error) {
    removeUploadedFile(req.file);

    console.error("Upload medical record error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload medical record",
    });
  }
};

// ========================================
// GET PATIENT MEDICAL RECORDS
// GET /api/admin/records/patients/:patientId
// ========================================
export const getPatientMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    const db = await getDb();

    const patient = await db.collection("Patient").findOne({
      _id: new ObjectId(patientId),
    });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const records = await db
      .collection("MedicalRecordFile")
      .find({
        patientId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    const formattedRecords = records.map((record) => ({
      id: record._id.toString(),
      patientId: record.patientId,
      title: record.title,
      recordType: record.recordType,
      description: record.description,
      originalName: record.originalName,
      storedName: record.storedName,
      mimeType: record.mimeType,
      size: record.size,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    }));

    return res.status(200).json({
      success: true,

      patient: {
        id: patient._id.toString(),
        fullName: patient.fullName || "Unknown Patient",
      },

      count: formattedRecords.length,
      records: formattedRecords,
    });
  } catch (error) {
    console.error("Get patient medical records error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve medical records",
    });
  }
};

// ========================================
// DELETE MEDICAL RECORD
// DELETE /api/admin/records/patients/:patientId/:recordId
// ========================================
export const deleteMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      recordId,
    } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    if (!ObjectId.isValid(recordId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid medical record ID",
      });
    }

    const db = await getDb();

    const record = await db
      .collection("MedicalRecordFile")
      .findOne({
        _id: new ObjectId(recordId),
        patientId,
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    if (record.relativePath) {
      const absoluteFilePath = path.resolve(
        backendRoot,
        record.relativePath,
      );

      if (fs.existsSync(absoluteFilePath)) {
        try {
          fs.unlinkSync(absoluteFilePath);
        } catch (error) {
          console.error(
            "Failed to delete medical record file:",
            error,
          );

          return res.status(500).json({
            success: false,
            message: "Failed to delete medical record file",
          });
        }
      }
    }

    await db
      .collection("MedicalRecordFile")
      .deleteOne({
        _id: new ObjectId(recordId),
        patientId,
      });

    return res.status(200).json({
      success: true,
      message: "Medical record deleted successfully",

      data: {
        id: record._id.toString(),
        patientId: record.patientId,
        originalName: record.originalName,
      },
    });
  } catch (error) {
    console.error("Delete medical record error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete medical record",
    });
  }
};

// ========================================
// DOWNLOAD MEDICAL RECORD
// GET /api/admin/records/patients/:patientId/:recordId/download
// ========================================
export const downloadMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      recordId,
    } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    if (!ObjectId.isValid(recordId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid medical record ID",
      });
    }

    const db = await getDb();

    const record = await db
      .collection("MedicalRecordFile")
      .findOne({
        _id: new ObjectId(recordId),
        patientId,
      });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    if (!record.relativePath) {
      return res.status(404).json({
        success: false,
        message: "Medical record file path not found",
      });
    }

    const absoluteFilePath = path.resolve(
      backendRoot,
      record.relativePath,
    );

    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(404).json({
        success: false,
        message: "Medical record file not found on server",
      });
    }

    res.setHeader(
      "Content-Type",
      record.mimeType || "application/octet-stream",
    );

    return res.download(
      absoluteFilePath,
      record.originalName || record.storedName,
      (error) => {
        if (error) {
          console.error(
            "Download medical record file error:",
            error,
          );

          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: "Failed to download medical record",
            });
          }
        }
      },
    );
  } catch (error) {
    console.error("Download medical record error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to download medical record",
    });
  }
};