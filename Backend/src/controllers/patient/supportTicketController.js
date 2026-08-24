import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

// Generate unique ticket number e.g. TICKET-839201
const generateTicketNo = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `TICK-${randomNum}`;
};

/**
 * Create Support Ticket API
 * POST /api/patient/support/tickets
 */
export const createSupportTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { subject, category = "General", priority = "Medium", message } = req.body;

    if (!subject || !message) {
      return res.status(400).json({ error: "Subject and message are required to create a support ticket." });
    }

    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (!patientDoc) {
      return res.status(404).json({ error: "Patient profile not found." });
    }

    const userDoc = await db.collection("User").findOne({ _id: patientDoc.userId || userObjId });

    const ticketId = new ObjectId();
    const ticketNo = generateTicketNo();
    const now = new Date();

    const ticketDoc = {
      _id: ticketId,
      ticketNo,
      patientId: patientDoc._id,
      patientName: patientDoc.fullName,
      patientEmail: userDoc?.email || req.user.email,
      subject: subject.trim(),
      category: category.trim(),
      priority: priority.trim(),
      message: message.trim(),
      status: "Open",
      responses: [
        {
          id: new ObjectId().toString(),
          sender: "Patient",
          senderName: patientDoc.fullName,
          message: message.trim(),
          createdAt: now,
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    // Save in Prisma if model exists or MongoDB
    try {
      await prisma.supportTicket.create({
        data: {
          id: ticketId.toString(),
          ticketNo,
          patientId: patientDoc._id.toString(),
          subject: subject.trim(),
          category,
          priority,
          message: message.trim(),
          status: "Open",
          responses: ticketDoc.responses,
        },
      });
    } catch (prismaErr) {
      await db.collection("SupportTicket").insertOne(ticketDoc);
    }

    return res.status(201).json({
      success: true,
      message: "Support ticket created successfully.",
      data: {
        id: ticketId.toString(),
        ticketNo,
        subject: ticketDoc.subject,
        category: ticketDoc.category,
        priority: ticketDoc.priority,
        status: ticketDoc.status,
        createdAt: now,
      },
    });
  } catch (error) {
    console.error("Create Support Ticket Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Patient Support Tickets API
 * GET /api/patient/support/tickets
 */
export const getPatientSupportTickets = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, category, page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const skip = (pageNum - 1) * limitNum;

    const db = await getDb();
    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid User ID format." });
    }

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (!patientDoc) {
      return res.status(404).json({ error: "Patient profile not found." });
    }

    const query = { patientId: patientDoc._id };
    if (status && status !== 'All') {
      query.status = status;
    }
    if (category && category !== 'All') {
      query.category = category;
    }

    const [tickets, total] = await Promise.all([
      db.collection("SupportTicket")
        .find(query)
        .sort({ updatedAt: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      db.collection("SupportTicket").countDocuments(query),
    ]);

    const formatted = tickets.map((t) => ({
      id: t._id.toString(),
      ticketNo: t.ticketNo || t._id.toString(),
      subject: t.subject,
      category: t.category,
      priority: t.priority,
      status: t.status,
      message: t.message,
      responseCount: t.responses ? t.responses.length : 0,
      createdAt: t.createdAt,
      updatedAt: t.updatedAt,
    }));

    return res.json({
      success: true,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: formatted,
    });
  } catch (error) {
    console.error("Get Support Tickets Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Support Ticket Details API
 * GET /api/patient/support/tickets/:id
 */
export const getSupportTicketDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const db = await getDb();
    let ticketObjId;
    try {
      ticketObjId = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Ticket ID format." });
    }

    const ticket = await db.collection("SupportTicket").findOne({
      $or: [{ _id: ticketObjId }, { ticketNo: id }],
    });

    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found." });
    }

    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {}

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (req.user.role === 'Patient' && patientDoc && ticket.patientId.toString() !== patientDoc._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only view your own support tickets." });
    }

    return res.json({
      success: true,
      data: {
        id: ticket._id.toString(),
        ticketNo: ticket.ticketNo || ticket._id.toString(),
        patientId: ticket.patientId.toString(),
        subject: ticket.subject,
        category: ticket.category,
        priority: ticket.priority,
        message: ticket.message,
        status: ticket.status,
        responses: ticket.responses || [],
        createdAt: ticket.createdAt,
        updatedAt: ticket.updatedAt,
      },
    });
  } catch (error) {
    console.error("Get Ticket Details Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Update Support Ticket API (Add Response or Change Status e.g. Close)
 * PUT /api/patient/support/tickets/:id
 */
export const updateSupportTicket = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { message, responseMessage, status } = req.body;

    const contentToAdd = responseMessage || message;

    const db = await getDb();
    let ticketObjId;
    try {
      ticketObjId = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Ticket ID format." });
    }

    const ticket = await db.collection("SupportTicket").findOne({
      $or: [{ _id: ticketObjId }, { ticketNo: id }],
    });

    if (!ticket) {
      return res.status(404).json({ error: "Support ticket not found." });
    }

    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {}

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (req.user.role === 'Patient' && patientDoc && ticket.patientId.toString() !== patientDoc._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only update your own support tickets." });
    }

    const now = new Date();
    const updateOps = {
      $set: { updatedAt: now },
    };

    if (status) {
      const validStatuses = ["Open", "In Progress", "Resolved", "Closed"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Must be one of: ${validStatuses.join(", ")}` });
      }
      updateOps.$set.status = status;
    }

    if (contentToAdd && contentToAdd.trim()) {
      const newResponse = {
        id: new ObjectId().toString(),
        sender: req.user.role || "Patient",
        senderName: patientDoc?.fullName || "Patient",
        message: contentToAdd.trim(),
        createdAt: now,
      };
      updateOps.$push = { responses: newResponse };

      // Re-open ticket if it was closed and patient replies
      if (!status && ticket.status === 'Closed') {
        updateOps.$set.status = 'Open';
      }
    }

    const updatedTicket = await db.collection("SupportTicket").findOneAndUpdate(
      { _id: ticket._id },
      updateOps,
      { returnDocument: 'after' }
    );

    return res.json({
      success: true,
      message: "Support ticket updated successfully.",
      data: {
        id: updatedTicket._id.toString(),
        ticketNo: updatedTicket.ticketNo,
        status: updatedTicket.status,
        responses: updatedTicket.responses || [],
        updatedAt: now,
      },
    });
  } catch (error) {
    console.error("Update Support Ticket Error:", error);
    res.status(500).json({ error: error.message });
  }
};
