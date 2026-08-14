// Medimate Healthcare Management System
// Main Backend Server

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { PrismaClient } = require("@prisma/client");

// ========================================
// INITIALIZE APP AND PRISMA
// ========================================

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 5000;

// ========================================
// MIDDLEWARE
// ========================================

// Security headers
app.use(helmet());

// Allow requests from the React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Parse JSON request bodies
app.use(express.json());

// Parse form data
app.use(express.urlencoded({ extended: true }));

// Log API requests in the terminal
app.use(morgan("dev"));

// ========================================
// BASIC ROUTES
// ========================================

// Root route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Medimate Healthcare Backend API is running",
  });
});

// Health check route
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$runCommandRaw({
      ping: 1,
    });

    res.status(200).json({
      success: true,
      message: "Medimate API is healthy",
      database: "MongoDB connected",
    });
  } catch (error) {
    console.error("Database health check failed:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// ========================================
// 404 HANDLER
// ========================================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ========================================
// GLOBAL ERROR HANDLER
// ========================================

app.use((err, req, res, next) => {
  console.error("Server Error:", err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// ========================================
// START SERVER
// ========================================

async function startServer() {
  try {
    await prisma.$connect();

    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`✅ Medimate backend running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start Medimate backend:", error);
    process.exit(1);
  }
}

startServer();

// ========================================
// GRACEFUL SHUTDOWN
// ========================================

async function shutdown() {
  console.log("\nClosing database connection...");

  await prisma.$disconnect();

  console.log("Database disconnected.");
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);