import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDb, ObjectId } from "../../config/mongo.js";

const __dirname = path.dirname(
  fileURLToPath(import.meta.url),
);

const backendRoot = path.join(
  __dirname,
  "..",
  "..",
  "..",
);

// ========================================
// HELPER: REMOVE UPLOADED FILE
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
    console.error(
      "Failed to remove uploaded lab report:",
      error,
    );
  }
};

// ========================================
// UPLOAD LAB REPORT
// POST /api/admin/lab-reports/patients/:patientId
// ========================================
export const uploadLabReport = async (req, res) => {
  try {
    const { patientId } = req.params;

    const {
      title,
      reportType = "Lab Report",
      description,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Lab report file is required",
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

    const patient = await db
      .collection("Patient")
      .findOne({
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

    const labReport = {
      _id: new ObjectId(),

      patientId,

      title:
        typeof title === "string" && title.trim()
          ? title.trim()
          : req.file.originalname,

      reportType:
        typeof reportType === "string" &&
        reportType.trim()
          ? reportType.trim()
          : "Lab Report",

      description:
        typeof description === "string" &&
        description.trim()
          ? description.trim()
          : null,

      originalName: req.file.originalname,
      storedName: req.file.filename,

      relativePath:
        `private-uploads/lab-reports/${req.file.filename}`,

      mimeType: req.file.mimetype,
      size: req.file.size,

      createdAt: now,
      updatedAt: now,
    };

    await db
      .collection("LabReportFile")
      .insertOne(labReport);

    return res.status(201).json({
      success: true,
      message: "Lab report uploaded successfully",

      data: {
        id: labReport._id.toString(),
        patientId: labReport.patientId,
        patientName:
          patient.fullName || "Unknown Patient",

        title: labReport.title,
        reportType: labReport.reportType,
        description: labReport.description,

        originalName: labReport.originalName,
        storedName: labReport.storedName,
        mimeType: labReport.mimeType,
        size: labReport.size,

        createdAt: labReport.createdAt,
      },
    });
  } catch (error) {
    removeUploadedFile(req.file);

    console.error(
      "Upload lab report error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to upload lab report",
    });
  }
};

// ========================================
// GET PATIENT LAB REPORTS
// GET /api/admin/lab-reports/patients/:patientId
// ========================================
export const getPatientLabReports = async (
  req,
  res,
) => {
  try {
    const { patientId } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    const db = await getDb();

    const patient = await db
      .collection("Patient")
      .findOne({
        _id: new ObjectId(patientId),
      });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const reports = await db
      .collection("LabReportFile")
      .find({
        patientId,
      })
      .sort({
        createdAt: -1,
      })
      .toArray();

    const formattedReports = reports.map(
      (report) => ({
        id: report._id.toString(),
        patientId: report.patientId,
        title: report.title,
        reportType: report.reportType,
        description: report.description,
        originalName: report.originalName,
        storedName: report.storedName,
        mimeType: report.mimeType,
        size: report.size,
        createdAt: report.createdAt,
        updatedAt: report.updatedAt,
      }),
    );

    return res.status(200).json({
      success: true,

      patient: {
        id: patient._id.toString(),
        fullName:
          patient.fullName || "Unknown Patient",
      },

      count: formattedReports.length,
      reports: formattedReports,
    });
  } catch (error) {
    console.error(
      "Get patient lab reports error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve lab reports",
    });
  }
};

// ========================================
// DELETE LAB REPORT
// DELETE /api/admin/lab-reports/patients/:patientId/:reportId
// ========================================
export const deleteLabReport = async (
  req,
  res,
) => {
  try {
    const {
      patientId,
      reportId,
    } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    if (!ObjectId.isValid(reportId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lab report ID",
      });
    }

    const db = await getDb();

    const report = await db
      .collection("LabReportFile")
      .findOne({
        _id: new ObjectId(reportId),
        patientId,
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found",
      });
    }

    if (report.relativePath) {
      const absoluteFilePath = path.resolve(
        backendRoot,
        report.relativePath,
      );

      if (fs.existsSync(absoluteFilePath)) {
        try {
          fs.unlinkSync(absoluteFilePath);
        } catch (error) {
          console.error(
            "Failed to delete lab report file:",
            error,
          );

          return res.status(500).json({
            success: false,
            message:
              "Failed to delete lab report file",
          });
        }
      }
    }

    await db
      .collection("LabReportFile")
      .deleteOne({
        _id: new ObjectId(reportId),
        patientId,
      });

    return res.status(200).json({
      success: true,
      message: "Lab report deleted successfully",

      data: {
        id: report._id.toString(),
        patientId: report.patientId,
        originalName: report.originalName,
      },
    });
  } catch (error) {
    console.error(
      "Delete lab report error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to delete lab report",
    });
  }
};

// ========================================
// DOWNLOAD LAB REPORT
// GET /api/admin/lab-reports/patients/:patientId/:reportId/download
// ========================================
export const downloadLabReport = async (
  req,
  res,
) => {
  try {
    const {
      patientId,
      reportId,
    } = req.params;

    if (!ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid patient ID",
      });
    }

    if (!ObjectId.isValid(reportId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid lab report ID",
      });
    }

    const db = await getDb();

    const report = await db
      .collection("LabReportFile")
      .findOne({
        _id: new ObjectId(reportId),
        patientId,
      });

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Lab report not found",
      });
    }

    if (!report.relativePath) {
      return res.status(404).json({
        success: false,
        message: "Lab report file path not found",
      });
    }

    const absoluteFilePath = path.resolve(
      backendRoot,
      report.relativePath,
    );

    if (!fs.existsSync(absoluteFilePath)) {
      return res.status(404).json({
        success: false,
        message: "Lab report file not found on server",
      });
    }

    res.setHeader(
      "Content-Type",
      report.mimeType || "application/octet-stream",
    );

    return res.download(
      absoluteFilePath,
      report.originalName || report.storedName,
      (error) => {
        if (error) {
          console.error(
            "Download lab report file error:",
            error,
          );

          if (!res.headersSent) {
            res.status(500).json({
              success: false,
              message: "Failed to download lab report",
            });
          }
        }
      },
    );
  } catch (error) {
    console.error(
      "Download lab report error:",
      error,
    );

    return res.status(500).json({
      success: false,
      message: "Failed to download lab report",
    });
  }
};