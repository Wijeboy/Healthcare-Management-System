import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(helmet());

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  process.env.CLIENT_URL,
].filter(Boolean);

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin
      // e.g. Postman, Insomnia, server-to-server requests
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS policy violation"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Auth & Authorization Middleware imports
import { verifyToken, requireRole } from "./middleware/authMiddleware.js";

// Auth Routes import
import authRoutes from "./routes/authRoutes.js";

// Admin Routes imports
import doctorRoutes from "./routes/admin/doctorRoutes.js";
import patientRoutes from "./routes/admin/patientRoutes.js";
import userRoutes from "./routes/admin/userRoutes.js";
import staffRoutes from "./routes/admin/staffRoutes.js";
import reportRoutes from "./routes/admin/reportRoutes.js";
import settingsRoutes from "./routes/admin/settingsRoutes.js";
import systemSettingsRoutes from "./routes/admin/systemSettingsRoutes.js";
import contactRoutes from "./routes/admin/contactRoutes.js";
import billingRoutes from "./routes/admin/billingRoutes.js";
import appointmentSchedulerRoutes from "./routes/admin/appointmentSchedulerRoutes.js";
import medicalRecordRoutes from "./routes/admin/medicalRecordRoutes.js";
import labReportRoutes from "./routes/admin/labReportRoutes.js";

// Doctor Module Routes imports
import doctorSelfRoutes from "./routes/doctor/index.js";
import doctorsDirectoryRoutes from "./routes/doctor/directoryRoutes.js";

// Patient Module Routes import
import patientSelfRoutes from "./routes/patient/index.js";

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Healthcare API is running",
  });
});

// Register Authentication Routes
app.use("/api/auth", authRoutes);

// Register Patient Module Routes
app.use("/api/patient", patientSelfRoutes);


// Register Protected Admin Routes (Requires valid JWT + Admin role)
app.use("/api/admin/doctors", verifyToken, requireRole("Admin"), doctorRoutes);
app.use("/api/admin/patients", verifyToken, requireRole("Admin"), patientRoutes);
app.use("/api/admin/users", verifyToken, requireRole("Admin"), userRoutes);
app.use("/api/admin/staff", verifyToken, requireRole("Admin"), staffRoutes);
app.use("/api/admin/reports", verifyToken, requireRole("Admin"), reportRoutes);
app.use("/api/admin/settings", verifyToken, requireRole("Admin"), settingsRoutes);

app.use(
  "/api/admin/system-settings",
  verifyToken,
  requireRole("Admin"),
  systemSettingsRoutes,
);

app.use("/api/admin/contact", verifyToken, requireRole("Admin"), contactRoutes);

// Financial & Billing Routes
app.use(
  "/api/admin/billing",
  verifyToken,
  requireRole("Admin"),
  billingRoutes,
);

// Global Appointment Scheduler Routes
app.use(
  "/api/admin/appointments",
  verifyToken,
  requireRole("Admin"),
  appointmentSchedulerRoutes,
);

// Medical Records Upload Routes
app.use(
  "/api/admin/records",
  verifyToken,
  requireRole("Admin"),
  medicalRecordRoutes,
);

// Lab Report Upload Routes
app.use(
  "/api/admin/lab-reports",
  verifyToken,
  requireRole("Admin"),
  labReportRoutes,
);

// Register Protected Doctor Module Routes (Requires valid JWT + Doctor role)
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use("/api/doctor", verifyToken, requireRole("Doctor"), doctorSelfRoutes);

// Global Error Handling Middleware imports
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";

// Public Doctor Directory (Public access)
app.use("/api/doctors/public", doctorsDirectoryRoutes);

// Catch 404 routes
app.use(notFoundHandler);

// Global Centralized Error Handler (Must be registered after all routes)
app.use(errorHandler);

export default app;