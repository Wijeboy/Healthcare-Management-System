import { getDb, ObjectId } from "../../config/mongo.js";
import { processGatewayPayment } from "../../services/paymentGatewayService.js";
import { generateInvoicePdf as streamInvoicePdf } from "../../services/invoicePdfService.js";

// GENERATE INVOICE
export const generateInvoice = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      items,
      taxAmount = 0,
      discountAmount = 0,
      dueDate,
      notes,
    } = req.body;

    // Validate patient ID
    if (!patientId || !ObjectId.isValid(patientId)) {
      return res.status(400).json({
        success: false,
        message: "A valid patient ID is required",
      });
    }

    // Validate invoice items
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invoice must contain at least one item",
      });
    }

    for (const item of items) {
      if (
        !item.description ||
        typeof item.description !== "string" ||
        Number(item.quantity) <= 0 ||
        Number(item.unitPrice) < 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Each invoice item must have a description, quantity, and unit price",
        });
      }
    }

    const tax = Number(taxAmount);
    const discount = Number(discountAmount);

    if (
      !Number.isFinite(tax) ||
      tax < 0 ||
      !Number.isFinite(discount) ||
      discount < 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Tax and discount amounts must be valid non-negative numbers",
      });
    }

    const db = await getDb();

    // Confirm patient exists
    const patient = await db
      .collection("Patient")
      .findOne({ _id: new ObjectId(patientId) });

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    // Validate appointment if supplied
    if (appointmentId) {
      if (!ObjectId.isValid(appointmentId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid appointment ID",
        });
      }

      const appointment = await db
        .collection("Appointment")
        .findOne({ _id: new ObjectId(appointmentId) });

      if (!appointment) {
        return res.status(404).json({
          success: false,
          message: "Appointment not found",
        });
      }
    }

    const normalizedItems = items.map((item) => ({
      description: item.description.trim(),
      quantity: Number(item.quantity),
      unitPrice: Number(item.unitPrice),
      total: Number(item.quantity) * Number(item.unitPrice),
    }));

    const subtotal = normalizedItems.reduce(
      (sum, item) => sum + item.total,
      0,
    );

    const totalAmount = subtotal + tax - discount;

    if (totalAmount < 0) {
      return res.status(400).json({
        success: false,
        message: "Discount amount cannot exceed the invoice total",
      });
    }

    const invoiceId = new ObjectId();
    const now = new Date();

    const invoiceNumber = `INV-${now.getFullYear()}-${invoiceId
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    const invoice = {
      _id: invoiceId,
      invoiceNumber,
      patientId,
      appointmentId: appointmentId || null,
      items: normalizedItems,
      subtotal,
      taxAmount: tax,
      discountAmount: discount,
      totalAmount,
      amountPaid: 0,
      balanceDue: totalAmount,
      status: "PENDING",
      issueDate: now,
      dueDate: dueDate ? new Date(dueDate) : null,
      notes: notes?.trim() || null,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("Invoice").insertOne(invoice);

    return res.status(201).json({
      success: true,
      message: "Invoice generated successfully",
      data: {
        ...invoice,
        patientName: patient.fullName,
      },
    });
  } catch (error) {
    console.error("Generate invoice error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate invoice",
    });
  }
};

// GET INVOICE DETAILS
export const getInvoiceDetails = async (req, res) => {
  try {
    const { identifier } = req.params;
    const db = await getDb();

    const query = ObjectId.isValid(identifier)
      ? {
          $or: [
            { _id: new ObjectId(identifier) },
            { invoiceNumber: identifier },
          ],
        }
      : { invoiceNumber: identifier };

    const invoice = await db.collection("Invoice").findOne(query);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    let patientName = null;

    if (invoice.patientId && ObjectId.isValid(invoice.patientId)) {
      const patient = await db
        .collection("Patient")
        .findOne(
          { _id: new ObjectId(invoice.patientId) },
          { projection: { fullName: 1 } },
        );

      patientName = patient?.fullName || null;
    }

    return res.status(200).json({
      success: true,
      data: {
        ...invoice,
        patientName,
      },
    });
  } catch (error) {
    console.error("Get invoice details error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve invoice details",
    });
  }
};

// GET PATIENT INVOICES
export const getPatientInvoices = async (req, res) => {
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
      .findOne(
        { _id: new ObjectId(patientId) },
        { projection: { fullName: 1 } },
      );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    const invoices = await db
      .collection("Invoice")
      .find({ patientId })
      .sort({ createdAt: -1 })
      .toArray();

    return res.status(200).json({
      success: true,
      patient: {
        patientId,
        fullName: patient.fullName,
      },
      count: invoices.length,
      data: invoices,
    });
  } catch (error) {
    console.error("Get patient invoices error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve patient invoices",
    });
  }
};

// PROCESS PAYMENT
export const processPayment = async (req, res) => {
  try {
    const { identifier } = req.params;
    const { amount, paymentMethod } = req.body;

    const paymentAmount = Number(amount);

    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be greater than zero",
      });
    }

    if (!paymentMethod || typeof paymentMethod !== "string") {
      return res.status(400).json({
        success: false,
        message: "Payment method is required",
      });
    }

    const normalizedMethod = paymentMethod
      .trim()
      .toUpperCase()
      .replace(/\s+/g, "_");

    const allowedMethods = [
      "CASH",
      "CARD",
      "BANK_TRANSFER",
      "INSURANCE",
      "ONLINE",
    ];

    if (!allowedMethods.includes(normalizedMethod)) {
      return res.status(400).json({
        success: false,
        message:
          "Payment method must be CASH, CARD, BANK_TRANSFER, INSURANCE, or ONLINE",
      });
    }

    const db = await getDb();

    // Find invoice by MongoDB ID or invoice number
    const invoiceQuery = ObjectId.isValid(identifier)
      ? {
          $or: [
            { _id: new ObjectId(identifier) },
            { invoiceNumber: identifier },
          ],
        }
      : { invoiceNumber: identifier };

    const invoice = await db.collection("Invoice").findOne(invoiceQuery);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (["CANCELLED", "REFUNDED"].includes(invoice.status)) {
      return res.status(400).json({
        success: false,
        message: `Payments cannot be processed for a ${invoice.status.toLowerCase()} invoice`,
      });
    }

    const currentAmountPaid = Number(invoice.amountPaid) || 0;
    const currentBalance =
      Number(invoice.balanceDue) || Number(invoice.totalAmount) || 0;

    if (currentBalance <= 0 || invoice.status === "PAID") {
      return res.status(400).json({
        success: false,
        message: "Invoice has already been fully paid",
      });
    }

    if (paymentAmount > currentBalance) {
      return res.status(400).json({
        success: false,
        message: "Payment amount cannot exceed the remaining balance",
      });
    }

    const newAmountPaid =
      Math.round((currentAmountPaid + paymentAmount) * 100) / 100;

    const newBalance =
      Math.round((currentBalance - paymentAmount) * 100) / 100;

    const newInvoiceStatus =
      newBalance === 0 ? "PAID" : "PARTIALLY_PAID";

    const now = new Date();
    const paymentId = new ObjectId();

    const paymentReference = `PAY-${now.getFullYear()}-${paymentId
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    const methodLabels = {
      CASH: "Cash",
      CARD: "Card",
      BANK_TRANSFER: "Bank Transfer",
      INSURANCE: "Insurance",
      ONLINE: "Online",
    };

    const storedMethod = methodLabels[normalizedMethod];

    const payment = {
      _id: paymentId,
      paymentReference,
      invoiceId: invoice._id.toString(),
      invoiceNumber: invoice.invoiceNumber,
      patientId: invoice.patientId,
      amount: paymentAmount,

      // Keep both field names for compatibility with existing project code
      paymentMethod: storedMethod,
      method: storedMethod,
      paymentStatus: "Paid",
      status: "Paid",

      paidAt: now,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("Payment").insertOne(payment);

    await db.collection("Invoice").updateOne(
      { _id: invoice._id },
      {
        $set: {
          amountPaid: newAmountPaid,
          balanceDue: newBalance,
          status: newInvoiceStatus,
          updatedAt: now,
        },
      },
    );

    return res.status(201).json({
      success: true,
      message: "Payment processed successfully",
      data: {
        payment,
        invoice: {
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber,
          totalAmount: invoice.totalAmount,
          amountPaid: newAmountPaid,
          balanceDue: newBalance,
          status: newInvoiceStatus,
        },
      },
    });
  } catch (error) {
    console.error("Process payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to process payment",
    });
  }
};

// GET PAYMENT HISTORY
export const getPaymentHistory = async (req, res) => {
  try {
    const { patientId, invoiceNumber } = req.query;
    const db = await getDb();

    const filter = {};

    if (patientId) {
      if (!ObjectId.isValid(patientId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid patient ID",
        });
      }

      filter.patientId = patientId;
    }

    if (invoiceNumber) {
      filter.invoiceNumber = invoiceNumber;
    }

    const payments = await db
      .collection("Payment")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    const patientIds = [
      ...new Set(
        payments
          .map((payment) => payment.patientId)
          .filter((id) => id && ObjectId.isValid(id)),
      ),
    ];

    const patients =
      patientIds.length > 0
        ? await db
            .collection("Patient")
            .find({
              _id: {
                $in: patientIds.map((id) => new ObjectId(id)),
              },
            })
            .project({ fullName: 1 })
            .toArray()
        : [];

    const patientMap = new Map(
      patients.map((patient) => [
        patient._id.toString(),
        patient.fullName,
      ]),
    );

    const history = payments.map((payment) => ({
      paymentId: payment._id,
      paymentReference: payment.paymentReference || null,
      invoiceNumber: payment.invoiceNumber || null,
      patientId: payment.patientId,
      patientName: patientMap.get(payment.patientId) || null,
      amount: Number(payment.amount) || 0,
      paymentMethod:
        payment.paymentMethod || payment.method || "Unknown",
      paymentStatus:
        payment.paymentStatus || payment.status || "Unknown",
      paidAt: payment.paidAt || null,
      createdAt: payment.createdAt,
    }));

    return res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    console.error("Get payment history error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve payment history",
    });
  }
};

// GENERATE BILLING REPORTS
export const generateBillingReports = async (req, res) => {
  try {
    const db = await getDb();

    const now = new Date();

    const monthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
    );

    const nextMonthStart = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1),
    );

    const [invoices, payments] = await Promise.all([
      db.collection("Invoice").find({}).toArray(),
      db.collection("Payment").find({}).toArray(),
    ]);

    // -----------------------------
    // MONTHLY REVENUE
    // -----------------------------
    const monthlyPayments = payments.filter((payment) => {
      const paymentDate = payment.paidAt || payment.createdAt;

      if (!paymentDate) {
        return false;
      }

      const date = new Date(paymentDate);

      const status = (
        payment.paymentStatus ||
        payment.status ||
        ""
      ).toLowerCase();

      return (
        date >= monthStart &&
        date < nextMonthStart &&
        ["paid", "completed"].includes(status)
      );
    });

    const monthlyRevenue = monthlyPayments.reduce(
      (sum, payment) => sum + (Number(payment.amount) || 0),
      0,
    );

    // -----------------------------
    // OUTSTANDING INVOICES
    // -----------------------------
    const outstandingInvoices = invoices.filter((invoice) => {
      const balance = Number(invoice.balanceDue) || 0;

      return (
        balance > 0 &&
        !["PAID", "CANCELLED", "REFUNDED"].includes(invoice.status)
      );
    });

    const outstandingAmount = outstandingInvoices.reduce(
      (sum, invoice) => sum + (Number(invoice.balanceDue) || 0),
      0,
    );

    // -----------------------------
    // REFUNDS
    // -----------------------------
    const refundedPayments = payments.filter((payment) => {
      const status = (
        payment.paymentStatus ||
        payment.status ||
        ""
      ).toLowerCase();

      return status === "refunded";
    });

    const refundsAmount = refundedPayments.reduce(
      (sum, payment) => sum + (Number(payment.amount) || 0),
      0,
    );

    // -----------------------------
    // REVENUE BY DEPARTMENT
    // Only calculated when invoice.department exists
    // -----------------------------
    const departmentTotals = {};

    for (const invoice of invoices) {
      if (!invoice.department) {
        continue;
      }

      const department = invoice.department;
      const paidAmount = Number(invoice.amountPaid) || 0;

      departmentTotals[department] =
        (departmentTotals[department] || 0) + paidAmount;
    }

    const departmentRevenue = Object.entries(departmentTotals).map(
      ([department, revenue]) => ({
        department,
        revenue,
      }),
    );

    // -----------------------------
    // DAILY TRANSACTIONS - LAST 7 DAYS
    // -----------------------------
    const dailyTransactions = [];

    for (let daysAgo = 6; daysAgo >= 0; daysAgo--) {
      const dayStart = new Date();

      dayStart.setUTCHours(0, 0, 0, 0);
      dayStart.setUTCDate(dayStart.getUTCDate() - daysAgo);

      const dayEnd = new Date(dayStart);
      dayEnd.setUTCDate(dayEnd.getUTCDate() + 1);

      const dayPayments = payments.filter((payment) => {
        const paymentDate = payment.paidAt || payment.createdAt;

        if (!paymentDate) {
          return false;
        }

        const date = new Date(paymentDate);

        return date >= dayStart && date < dayEnd;
      });

      dailyTransactions.push({
        date: dayStart.toISOString().slice(0, 10),
        day: dayStart.toLocaleDateString("en-US", {
          weekday: "short",
          timeZone: "UTC",
        }),
        count: dayPayments.length,
        amount: dayPayments.reduce(
          (sum, payment) => sum + (Number(payment.amount) || 0),
          0,
        ),
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        summary: {
          monthlyRevenue,
          outstandingAmount,
          outstandingInvoiceCount: outstandingInvoices.length,
          refundsAmount,
          refundedPaymentCount: refundedPayments.length,
          totalInvoices: invoices.length,
          totalPayments: payments.length,
        },
        charts: {
          departmentRevenue,
          dailyTransactions,
        },
      },
    });
  } catch (error) {
    console.error("Generate billing reports error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to generate billing reports",
    });
  }
};

// ========================================
// PROCESS GATEWAY PAYMENT
// ========================================
export const processInvoiceGatewayPayment = async (req, res) => {
  try {
    const { identifier } = req.params;

    const {
      amount,
      gateway = "SANDBOX",
      currency = "USD",
      paymentToken,
    } = req.body;

    const paymentAmount = Number(amount);

    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Payment amount must be greater than zero",
      });
    }

    if (!paymentToken || typeof paymentToken !== "string") {
      return res.status(400).json({
        success: false,
        message: "Payment token is required",
      });
    }

    const db = await getDb();

    // Find invoice using MongoDB ID or invoice number
    const invoiceQuery = ObjectId.isValid(identifier)
      ? {
          $or: [
            { _id: new ObjectId(identifier) },
            { invoiceNumber: identifier },
          ],
        }
      : { invoiceNumber: identifier };

    const invoice = await db.collection("Invoice").findOne(invoiceQuery);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    if (["CANCELLED", "REFUNDED"].includes(invoice.status)) {
      return res.status(400).json({
        success: false,
        message: `Payments cannot be processed for a ${invoice.status.toLowerCase()} invoice`,
      });
    }

    const currentAmountPaid = Number(invoice.amountPaid) || 0;
    const currentBalance =
      Number(invoice.balanceDue) || Number(invoice.totalAmount) || 0;

    if (currentBalance <= 0 || invoice.status === "PAID") {
      return res.status(400).json({
        success: false,
        message: "Invoice has already been fully paid",
      });
    }

    if (paymentAmount > currentBalance) {
      return res.status(400).json({
        success: false,
        message: "Payment amount cannot exceed the remaining balance",
      });
    }

    // Send payment to sandbox gateway service
    const gatewayResult = await processGatewayPayment({
      gateway,
      amount: paymentAmount,
      currency,
      paymentToken,
    });

    if (!gatewayResult.success) {
      return res.status(400).json({
        success: false,
        message: "Gateway payment failed",
      });
    }

    const newAmountPaid =
      Math.round((currentAmountPaid + paymentAmount) * 100) / 100;

    const newBalance =
      Math.round((currentBalance - paymentAmount) * 100) / 100;

    const newInvoiceStatus =
      newBalance === 0 ? "PAID" : "PARTIALLY_PAID";

    const now = new Date();
    const paymentId = new ObjectId();

    const paymentReference = `PAY-${now.getFullYear()}-${paymentId
      .toString()
      .slice(-6)
      .toUpperCase()}`;

    const payment = {
      _id: paymentId,
      paymentReference,

      invoiceId: invoice._id.toString(),
      invoiceNumber: invoice.invoiceNumber,
      patientId: invoice.patientId,

      amount: paymentAmount,

      paymentMethod: "Online",
      method: "Online",

      paymentStatus: "Paid",
      status: "Paid",

      gateway: gatewayResult.gateway,
      gatewayTransactionId: gatewayResult.transactionId,

      gatewayResponse: {
        currency: gatewayResult.currency,
        status: gatewayResult.status,
        processedAt: gatewayResult.processedAt,
      },

      paidAt: now,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("Payment").insertOne(payment);

    await db.collection("Invoice").updateOne(
      { _id: invoice._id },
      {
        $set: {
          amountPaid: newAmountPaid,
          balanceDue: newBalance,
          status: newInvoiceStatus,
          updatedAt: now,
        },
      },
    );

    return res.status(201).json({
      success: true,
      message: "Gateway payment processed successfully",
      data: {
        payment: {
          ...payment,
          gatewayTransactionId: gatewayResult.transactionId,
        },
        invoice: {
          invoiceId: invoice._id,
          invoiceNumber: invoice.invoiceNumber,
          totalAmount: invoice.totalAmount,
          amountPaid: newAmountPaid,
          balanceDue: newBalance,
          status: newInvoiceStatus,
        },
      },
    });
  } catch (error) {
    console.error("Gateway payment error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to process gateway payment",
    });
  }
};

// ========================================
// GENERATE INVOICE PDF
// ========================================
export const downloadInvoicePdf = async (req, res) => {
  try {
    const { identifier } = req.params;
    const db = await getDb();

    const invoiceQuery = ObjectId.isValid(identifier)
      ? {
          $or: [
            { _id: new ObjectId(identifier) },
            { invoiceNumber: identifier },
          ],
        }
      : { invoiceNumber: identifier };

    const invoice = await db.collection("Invoice").findOne(invoiceQuery);

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    let patientName = null;

    if (invoice.patientId && ObjectId.isValid(invoice.patientId)) {
      const patient = await db
        .collection("Patient")
        .findOne(
          { _id: new ObjectId(invoice.patientId) },
          { projection: { fullName: 1 } },
        );

      patientName = patient?.fullName || null;
    }

    streamInvoicePdf({
      invoice,
      patientName,
      res,
    });
  } catch (error) {
    console.error("Generate invoice PDF error:", error);

    if (!res.headersSent) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate invoice PDF",
      });
    }

    return res.end();
  }
};