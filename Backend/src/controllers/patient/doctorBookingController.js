import prisma from '../../config/prisma.js';
import { getDb, ObjectId } from '../../config/mongo.js';

// Helper to convert time string e.g. "09:00" or "09:00 AM" to minutes from midnight
const parseTimeToMinutes = (timeStr) => {
  if (!timeStr) return 9 * 60; // default 09:00 AM
  const clean = timeStr.trim().toUpperCase();
  let hours = 0;
  let minutes = 0;

  if (clean.includes("AM") || clean.includes("PM")) {
    const isPM = clean.includes("PM");
    const isAM = clean.includes("AM");
    const parts = clean.replace(/AM|PM/g, "").trim().split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;
    if (isPM && hours < 12) hours += 12;
    if (isAM && hours === 12) hours = 0;
  } else {
    const parts = clean.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parts[1] ? parseInt(parts[1], 10) : 0;
  }

  return hours * 60 + minutes;
};

// Helper to format minutes from midnight to "HH:MM AM/PM"
const formatMinutesToTime = (totalMinutes) => {
  const hours24 = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  let hours12 = hours24 % 12;
  if (hours12 === 0) hours12 = 12;
  const formattedHours = hours12 < 10 ? `0${hours12}` : `${hours12}`;
  const formattedMins = mins < 10 ? `0${mins}` : `${mins}`;
  return `${formattedHours}:${formattedMins} ${period}`;
};

/**
 * Search Available Doctors API
 * GET /api/patient/doctors/search
 */
export const searchAvailableDoctors = async (req, res) => {
  try {
    const { search, department, specialization, gender, availability = 'Available', page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const skip = (pageNum - 1) * limitNum;

    const db = await getDb();
    const query = {
      status: 'Active',
    };

    if (availability && availability !== 'All') {
      query.availability = availability;
    }

    if (department && department !== 'All') {
      query.department = { $regex: new RegExp(department, 'i') };
    }

    if (specialization && specialization !== 'All') {
      query.specialization = { $regex: new RegExp(specialization, 'i') };
    }

    if (gender && gender !== 'All') {
      query.gender = { $regex: new RegExp(`^${gender}$`, 'i') };
    }

    if (search && search.trim()) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { fullName: searchRegex },
        { department: searchRegex },
        { specialization: searchRegex },
        { qualification: searchRegex },
        { bio: searchRegex },
      ];
    }

    const [doctors, total] = await Promise.all([
      db.collection("Doctor")
        .find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNum)
        .toArray(),
      db.collection("Doctor").countDocuments(query),
    ]);

    const formattedDoctors = doctors.map((doc) => ({
      id: doc._id.toString(),
      _id: doc._id.toString(),
      userId: doc.userId ? doc.userId.toString() : null,
      fullName: doc.fullName || "Doctor",
      phone: doc.phone || "",
      department: doc.department || "General",
      specialization: doc.specialization || "General Physician",
      qualification: doc.qualification || "",
      experience: doc.experience || "N/A",
      gender: doc.gender || "",
      bio: doc.bio || "",
      startTime: doc.startTime || "09:00 AM",
      endTime: doc.endTime || "05:00 PM",
      workingDays: doc.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      consultationDuration: doc.consultationDuration || "30 mins",
      availability: doc.availability || "Available",
      status: doc.status || "Active",
    }));

    return res.json({
      success: true,
      data: formattedDoctors,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  } catch (error) {
    console.error("Search Doctors Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Filter Doctors by Specialization API & Get Specialization List
 * GET /api/patient/doctors/filter
 * GET /api/patient/doctors/specializations
 */
export const filterDoctorsBySpecialization = async (req, res) => {
  try {
    const { specialization, department } = req.query;
    const db = await getDb();

    const query = { status: 'Active' };
    if (specialization && specialization !== 'All') {
      query.specialization = { $regex: new RegExp(specialization, 'i') };
    }
    if (department && department !== 'All') {
      query.department = { $regex: new RegExp(department, 'i') };
    }

    const doctors = await db.collection("Doctor").find(query).toArray();

    const formatted = doctors.map((doc) => ({
      id: doc._id.toString(),
      fullName: doc.fullName,
      specialization: doc.specialization,
      department: doc.department,
      experience: doc.experience,
      availability: doc.availability,
      startTime: doc.startTime,
      endTime: doc.endTime,
      workingDays: doc.workingDays,
    }));

    return res.json({
      success: true,
      count: formatted.length,
      data: formatted,
    });
  } catch (error) {
    console.error("Filter Doctors Error:", error);
    res.status(500).json({ error: error.message });
  }
};

export const getSpecializations = async (req, res) => {
  try {
    const db = await getDb();
    const specializations = await db.collection("Doctor").distinct("specialization", { status: "Active" });
    const departments = await db.collection("Doctor").distinct("department", { status: "Active" });

    return res.json({
      success: true,
      specializations: specializations.filter(Boolean),
      departments: departments.filter(Boolean),
    });
  } catch (error) {
    console.error("Get Specializations Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Get Available Time Slots API for a Doctor on a specific Date
 * GET /api/patient/doctors/:doctorId/time-slots?date=YYYY-MM-DD
 */
export const getAvailableTimeSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ error: "Query parameter 'date' (YYYY-MM-DD) is required." });
    }

    const requestedDate = new Date(date);
    if (isNaN(requestedDate.getTime())) {
      return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD." });
    }

    const db = await getDb();

    let docObjId;
    try {
      docObjId = new ObjectId(doctorId);
    } catch (e) {
      return res.status(400).json({ error: "Invalid Doctor ID format." });
    }

    const doctor = await db.collection("Doctor").findOne({ _id: docObjId });
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found." });
    }

    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayOfWeek = dayNames[requestedDate.getDay()];
    const workingDays = doctor.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

    const isWorkingDay = workingDays.some(
      (d) => d.toLowerCase() === dayOfWeek.toLowerCase()
    );

    if (!isWorkingDay) {
      return res.json({
        success: true,
        doctorId,
        doctorName: doctor.fullName,
        date,
        dayOfWeek,
        isWorkingDay: false,
        message: `Doctor does not consult on ${dayOfWeek}s. Working days are: ${workingDays.join(", ")}.`,
        slots: [],
      });
    }

    // Parse start and end time
    const startMin = parseTimeToMinutes(doctor.startTime || "09:00 AM");
    const endMin = parseTimeToMinutes(doctor.endTime || "05:00 PM");

    let durationMin = 30;
    if (doctor.consultationDuration) {
      const match = doctor.consultationDuration.toString().match(/\d+/);
      if (match) durationMin = parseInt(match[0], 10);
    }

    // Fetch existing appointments for doctor on requested date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const existingAppointments = await db.collection("Appointment").find({
      doctorId: docObjId,
      status: { $ne: "Cancelled" },
      date: { $gte: startOfDay, $lte: endOfDay },
    }).toArray();

    const bookedTimes = new Set(
      existingAppointments.map((app) => app.time.trim().toUpperCase())
    );

    const slots = [];
    for (let current = startMin; current + durationMin <= endMin; current += durationMin) {
      const slotTimeStr = formatMinutesToTime(current);
      const isBooked = bookedTimes.has(slotTimeStr.toUpperCase());

      slots.push({
        time: slotTimeStr,
        isAvailable: !isBooked,
        status: isBooked ? "Booked" : "Available",
      });
    }

    return res.json({
      success: true,
      doctorId,
      doctorName: doctor.fullName,
      specialization: doctor.specialization,
      date,
      dayOfWeek,
      isWorkingDay: true,
      consultationDuration: `${durationMin} mins`,
      totalSlots: slots.length,
      availableSlotsCount: slots.filter((s) => s.isAvailable).length,
      slots,
    });
  } catch (error) {
    console.error("Get Time Slots Error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * Helper function: Appointment Booking Validation
 */
export const validateAppointmentBooking = async (patientUserId, doctorId, dateStr, timeStr) => {
  const db = await getDb();

  let patientUserObjId;
  try {
    patientUserObjId = new ObjectId(patientUserId);
  } catch (e) {
    throw new Error("Invalid patient ID format.");
  }

  // Find patient
  let patient = await db.collection("Patient").findOne({
    $or: [{ userId: patientUserObjId }, { _id: patientUserObjId }],
  });

  if (!patient) {
    throw new Error("Patient record not found.");
  }

  if (patient.status === "Inactive") {
    throw new Error("Cannot book appointment: Patient account is inactive.");
  }

  // Find doctor
  let docObjId;
  try {
    docObjId = new ObjectId(doctorId);
  } catch (e) {
    throw new Error("Invalid doctor ID format.");
  }

  const doctor = await db.collection("Doctor").findOne({ _id: docObjId });
  if (!doctor) {
    throw new Error("Doctor not found.");
  }

  if (doctor.status !== "Active" || doctor.availability === "Unavailable") {
    throw new Error("Doctor is currently unavailable for bookings.");
  }

  // Date validation
  const bookingDate = new Date(dateStr);
  if (isNaN(bookingDate.getTime())) {
    throw new Error("Invalid appointment date format. Use YYYY-MM-DD.");
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (bookingDate < today) {
    throw new Error("Appointment date cannot be in the past.");
  }

  // Day of week check
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfWeek = dayNames[bookingDate.getDay()];
  const workingDays = doctor.workingDays || ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  const isWorking = workingDays.some((d) => d.toLowerCase() === dayOfWeek.toLowerCase());
  if (!isWorking) {
    throw new Error(`Doctor does not consult on ${dayOfWeek}s.`);
  }

  // Doctor time slot check
  const startOfDay = new Date(dateStr);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(dateStr);
  endOfDay.setHours(23, 59, 59, 999);

  const cleanTime = timeStr.trim();

  // Check doctor double-booking
  const doctorConflict = await db.collection("Appointment").findOne({
    doctorId: docObjId,
    status: { $ne: "Cancelled" },
    date: { $gte: startOfDay, $lte: endOfDay },
    time: cleanTime,
  });

  if (doctorConflict) {
    throw new Error("This doctor is already booked for the selected date and time slot.");
  }

  // Check patient double-booking
  const patientConflict = await db.collection("Appointment").findOne({
    patientId: patient._id,
    status: { $ne: "Cancelled" },
    date: { $gte: startOfDay, $lte: endOfDay },
    time: cleanTime,
  });

  if (patientConflict) {
    throw new Error("You already have another appointment scheduled at this exact date and time.");
  }

  return { patient, doctor, bookingDate, cleanTime };
};

/**
 * Book Appointment API
 * POST /api/patient/appointments/book
 */
export const bookAppointment = async (req, res) => {
  try {
    const patientUserId = req.user.id;
    const { doctorId, date, time, reason, notes } = req.body;

    if (!doctorId || !date || !time) {
      return res.status(400).json({ error: "Doctor ID, date, and time slot are required." });
    }

    const { patient, doctor, bookingDate, cleanTime } = await validateAppointmentBooking(
      patientUserId,
      doctorId,
      date,
      time
    );

    const db = await getDb();
    const appointmentId = new ObjectId();
    const now = new Date();

    const appointmentDoc = {
      _id: appointmentId,
      patientId: patient._id,
      doctorId: doctor._id,
      date: bookingDate,
      time: cleanTime,
      status: "Pending",
      reason: reason || "General Consultation",
      notes: notes || null,
      createdAt: now,
      updatedAt: now,
    };

    await db.collection("Appointment").insertOne(appointmentDoc);

    return res.status(201).json({
      success: true,
      message: "Appointment booked successfully.",
      data: {
        id: appointmentId.toString(),
        appointmentId: appointmentId.toString(),
        patientName: patient.fullName,
        doctorName: doctor.fullName,
        specialization: doctor.specialization,
        department: doctor.department,
        date: date,
        time: cleanTime,
        status: "Pending",
        reason: appointmentDoc.reason,
        createdAt: now,
      },
    });
  } catch (error) {
    console.error("Book Appointment Error:", error);
    res.status(400).json({ error: error.message });
  }
};
