import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { randomUUID } from "crypto";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ========================================
// PRIVATE LAB REPORT STORAGE
// ========================================
const uploadDir = path.join(
  __dirname,
  "..",
  "..",
  "private-uploads",
  "lab-reports",
);

fs.mkdirSync(uploadDir, {
  recursive: true,
});

// ========================================
// ALLOWED FILE TYPES
// ========================================
const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

const allowedExtensions = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
];

// ========================================
// STORAGE CONFIGURATION
// ========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const patientId =
      req.params.patientId ||
      req.body.patientId ||
      "patient";

    const uniqueId = randomUUID()
      .split("-")[0]
      .toUpperCase();

    const safePatientId = String(patientId).replace(
      /[^a-zA-Z0-9_-]/g,
      "",
    );

    const filename =
      `${safePatientId}-${Date.now()}-${uniqueId}${extension}`;

    cb(null, filename);
  },
});

// ========================================
// FILE VALIDATION
// ========================================
const fileFilter = (req, file, cb) => {
  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const validMimeType = allowedMimeTypes.includes(
    file.mimetype,
  );

  const validExtension = allowedExtensions.includes(
    extension,
  );

  if (!validMimeType || !validExtension) {
    const error = new Error(
      "Invalid file type. Only PDF, JPG, JPEG, and PNG lab reports are allowed.",
    );

    error.statusCode = 400;

    return cb(error, false);
  }

  cb(null, true);
};

// ========================================
// MULTER INSTANCE
// ========================================
const labReportUpload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

// ========================================
// SINGLE LAB REPORT UPLOAD WRAPPER
// ========================================
export const uploadLabReportFile = (
  req,
  res,
  next,
) => {
  const uploadSingle =
    labReportUpload.single("file");

  uploadSingle(req, res, (error) => {
    if (!error) {
      return next();
    }

    if (
      error instanceof multer.MulterError &&
      error.code === "LIMIT_FILE_SIZE"
    ) {
      return res.status(400).json({
        success: false,
        error: "File is too large. Maximum file size is 10 MB.",
      });
    }

    return res.status(
      error.statusCode || 400,
    ).json({
      success: false,
      error:
        error.message ||
        "Lab report upload validation failed.",
    });
  });
};

export default labReportUpload;