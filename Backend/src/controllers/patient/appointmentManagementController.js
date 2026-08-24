import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';
import { validateAppointmentBooking } from './doctorBookingController.js';

/**
 * Get Patient Appointments List API
 * GET /api/patient/appointments
 */
export const getPatientAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status, filter, search, page = 1, limit = 10 } = req.query;
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
      return res.status(404).json({ error: "Patient record not found." });
    }

    const query = { patientId: patientDoc._id };

    if (status && status !== 'All') {
      query.status = status;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    if (filter === 'upcoming') {
      query.date = { $gte: today };
    } else if (filter === 'past') {
      query.date = { $lt: today };
    } else if (filter === 'today') {
      query.date = { $gte: today, $lte: endOfToday };
    }

    const [rawAppointments, total] = await Promise.all([
      db.collection("Appointment")
        .find(query)
        .sort({ date: -1, createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      db.collection("Appointment").countDocuments(query),
    ]);

    const formattedAppointments = await Promise.all(
      rawAppointments.map(async (app) => {
        let doctor = null;
        if (app.doctorId) {
          try {
            doctor = await db.collection("Doctor").findOne({ _id: app.doctorId });
          } catch (e) {}
        }

        const dateObj = new Date(app.date);
        const formattedDate = dateObj.toISOString().split("T")[0];

        return {
          id: app._id.toString(),
          _id: app._id.toString(),
          patientId: app.patientId.toString(),
          doctorId: app.doctorId ? app.doctorId.toString() : null,
          date: formattedDate,
          rawDate: app.date,
          time: app.time,
          status: app.status,
          reason: app.reason || "Consultation",
          cancelReason: app.cancelReason || null,
          rescheduleCount: app.rescheduleCount || 0,
          createdAt: app.createdAt,
          updatedAt: app.updatedAt,
          doctor: doctor ? {
            id: doctor._id.toString(),
            fullName: doctor.fullName,
            specialization: doctor.specialization,
            department: doctor.department,
            phone: doctor.phone,
            availability: doctor.availability,
          } : null,
        };
      })
    );

    // If search keyword provided, filter in-memory if matching doctor name
    let filteredList = formattedAppointments;
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      filteredList = formattedAppointments.filter(
        (a) =>
          regex.test(a.reason) ||
          regex.test(a.status) ||
          (a.doctor && (regex.test(a.doctor.fullName) || regex.test(a.doctor.specialization)))
      );
    }

    return res.json({
      success: true,
      total: search ? filteredList.length : total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil((search ? filteredList.length : total) / limitNum),
      data: filteredList,
    });
  } catch (error) {
    console.error("Get Appointments Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Appointment Details API
 * GET /api/patient/appointments/:id
 */
export const getAppointmentDetails = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;

    const db = await getDb();

    let appIdObj;
    try {
      appIdObj = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Appointment ID format." });
    }

    const appointment = await db.collection("Appointment").findOne({ _id: appIdObj });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {}

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    // Enforce patient ownership unless request is from Admin
    if (req.user.role === 'Patient' && patientDoc && appointment.patientId.toString() !== patientDoc._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only view your own appointment details." });
    }

    // Fetch Doctor info
    const doctor = await db.collection("Doctor").findOne({ _id: appointment.doctorId });

    // Fetch associated Medical Records & Prescriptions
    const medicalRecords = await db.collection("MedicalRecord").find({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
    }).toArray();

    const prescriptions = await db.collection("Prescription").find({
      patientId: appointment.patientId,
      doctorId: appointment.doctorId,
    }).toArray();

    const dateObj = new Date(appointment.date);

    return res.json({
      success: true,
      data: {
        id: appointment._id.toString(),
        _id: appointment._id.toString(),
        patientId: appointment.patientId.toString(),
        doctorId: appointment.doctorId ? appointment.doctorId.toString() : null,
        date: dateObj.toISOString().split("T")[0],
        time: appointment.time,
        status: appointment.status,
        reason: appointment.reason || "General Consultation",
        notes: appointment.notes || null,
        cancelReason: appointment.cancelReason || null,
        createdAt: appointment.createdAt,
        updatedAt: appointment.updatedAt,
        doctor: doctor ? {
          id: doctor._id.toString(),
          fullName: doctor.fullName,
          specialization: doctor.specialization,
          department: doctor.department,
          phone: doctor.phone,
          address: doctor.address,
          experience: doctor.experience,
        } : null,
        patient: patientDoc ? {
          id: patientDoc._id.toString(),
          fullName: patientDoc.fullName,
          phone: patientDoc.phone,
          bloodGroup: patientDoc.bloodGroup,
        } : null,
        medicalRecords: medicalRecords.map((mr) => ({
          id: mr._id.toString(),
          diagnosis: mr.diagnosis,
          treatment: mr.treatment,
          labReport: mr.labReport,
          createdAt: mr.createdAt,
        })),
        prescriptions: prescriptions.map((pr) => ({
          id: pr._id.toString(),
          medicines: pr.medicines,
          instructions: pr.instructions,
          createdAt: pr.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("Get Appointment Details Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Cancel Appointment API
 * PATCH /api/patient/appointments/:id/cancel
 */
export const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { cancelReason } = req.body;

    const db = await getDb();
    let appIdObj;
    try {
      appIdObj = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Appointment ID format." });
    }

    const appointment = await db.collection("Appointment").findOne({ _id: appIdObj });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {}

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (req.user.role === 'Patient' && patientDoc && appointment.patientId.toString() !== patientDoc._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only cancel your own appointments." });
    }

    if (appointment.status === 'Cancelled') {
      return res.status(400).json({ error: "Appointment is already cancelled." });
    }

    if (appointment.status === 'Completed') {
      return res.status(400).json({ error: "Completed appointments cannot be cancelled." });
    }

    const now = new Date();
    await db.collection("Appointment").updateOne(
      { _id: appIdObj },
      {
        $set: {
          status: 'Cancelled',
          cancelReason: cancelReason || "Cancelled by patient",
          cancelledAt: now,
          updatedAt: now,
        },
      }
    );

    return res.json({
      success: true,
      message: "Appointment cancelled successfully.",
      appointmentId: id,
      status: 'Cancelled',
    });
  } catch (error) {
    console.error("Cancel Appointment Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Reschedule Appointment API
 * PUT /api/patient/appointments/:id/reschedule
 */
export const rescheduleAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const { newDate, newTime, reason } = req.body;

    if (!newDate || !newTime) {
      return res.status(400).json({ error: "New date and new time slot are required for rescheduling." });
    }

    const db = await getDb();
    let appIdObj;
    try {
      appIdObj = new ObjectId(id);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Appointment ID format." });
    }

    const appointment = await db.collection("Appointment").findOne({ _id: appIdObj });
    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found." });
    }

    let userObjId;
    try {
      userObjId = new ObjectId(userId);
    } catch (e) {}

    const patientDoc = await db.collection("Patient").findOne({
      $or: [{ userId: userObjId }, { _id: userObjId }],
    });

    if (req.user.role === 'Patient' && patientDoc && appointment.patientId.toString() !== patientDoc._id.toString()) {
      return res.status(403).json({ error: "Access denied. You can only reschedule your own appointments." });
    }

    if (appointment.status === 'Cancelled' || appointment.status === 'Completed') {
      return res.status(400).json({ error: `Cannot reschedule a ${appointment.status.toLowerCase()} appointment.` });
    }

    // Run appointment booking validation for newDate and newTime
    const { doctor, bookingDate, cleanTime } = await validateAppointmentBooking(
      userId,
      appointment.doctorId.toString(),
      newDate,
      newTime
    );

    const now = new Date();
    const updateResult = await db.collection("Appointment").findOneAndUpdate(
      { _id: appIdObj },
      {
        $set: {
          date: bookingDate,
          time: cleanTime,
          status: 'Pending',
          ...(reason && { reason }),
          rescheduledAt: now,
          updatedAt: now,
        },
        $inc: { rescheduleCount: 1 },
      },
      { returnDocument: 'after' }
    );

    return res.json({
      success: true,
      message: "Appointment rescheduled successfully.",
      data: {
        id: id,
        date: newDate,
        time: cleanTime,
        status: 'Pending',
        doctorName: doctor.fullName,
        specialization: doctor.specialization,
        updatedAt: now,
      },
    });
  } catch (error) {
    console.error("Reschedule Appointment Error:", error);
    res.status(400).json({ error: error.message });
  }
};
