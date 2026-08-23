import express from "express";
import {
  generateInvoice,
  getInvoiceDetails,
  getPatientInvoices,
  processPayment,
  getPaymentHistory,
  generateBillingReports,
  processInvoiceGatewayPayment,
  downloadInvoicePdf,
} from "../../controllers/admin/billingController.js";

const router = express.Router();

// Generate a new invoice
router.post("/invoices", generateInvoice);

// Get invoice details by invoice ID or invoice number
router.get("/invoices/:identifier", getInvoiceDetails);

// Download invoice as PDF
router.get("/invoices/:identifier/pdf", downloadInvoicePdf);

// Get all invoices for a patient
router.get("/patients/:patientId/invoices", getPatientInvoices);

// Process normal payment for an invoice
router.post("/invoices/:identifier/payments", processPayment);

// Process sandbox gateway payment for an invoice
router.post(
  "/invoices/:identifier/payments/gateway",
  processInvoiceGatewayPayment,
);

// Get payment history
router.get("/payments", getPaymentHistory);

// Generate billing reports
router.get("/reports", generateBillingReports);

export default router;