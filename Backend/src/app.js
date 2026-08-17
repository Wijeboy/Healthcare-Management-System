import express from "express";
import cors from "cors";
import helmet from "helmet";

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

// Admin Routes imports
import doctorRoutes from "./routes/admin/doctorRoutes.js";
import patientRoutes from "./routes/admin/patientRoutes.js";
import userRoutes from "./routes/admin/userRoutes.js";
import staffRoutes from "./routes/admin/staffRoutes.js";
import reportRoutes from "./routes/admin/reportRoutes.js";
import settingsRoutes from "./routes/admin/settingsRoutes.js";
import contactRoutes from "./routes/admin/contactRoutes.js";

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Healthcare API is running",
  });
});

// Register Admin Routes
app.use("/api/admin/doctors", doctorRoutes);
app.use("/api/admin/patients", patientRoutes);
app.use("/api/admin/users", userRoutes);
app.use("/api/admin/staff", staffRoutes);
app.use("/api/admin/reports", reportRoutes);
app.use("/api/admin/settings", settingsRoutes);
app.use("/api/admin/contact", contactRoutes);

export default app;
