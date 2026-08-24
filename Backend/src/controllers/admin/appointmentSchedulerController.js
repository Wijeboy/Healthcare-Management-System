import prisma from "../../config/prisma.js";

// ========================================
// DATE HELPERS
// ========================================
const parseDateOnly = (dateString) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return null;
  }

  const date = new Date(`${dateString}T00:00:00.000Z`);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (date.toISOString().slice(0, 10) !== dateString) {
    return null;
  }

  return date;
};

const getDayRange = (dateString) => {
  const start = parseDateOnly(dateString);

  if (!start) {
    return null;
  }

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 1);

  return {
    start,
    end,
  };
};

const getWeekRange = (dateString) => {
  const selectedDate = parseDateOnly(dateString);

  if (!selectedDate) {
    return null;
  }

  const dayOfWeek = selectedDate.getUTCDay();
  const daysFromMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const start = new Date(selectedDate);
  start.setUTCDate(start.getUTCDate() - daysFromMonday);

  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);

  return {
    start,
    end,
  };
};

const getMonthRange = (dateString) => {
  const selectedDate = parseDateOnly(dateString);

  if (!selectedDate) {
    return null;
  }

  const year = selectedDate.getUTCFullYear();
  const month = selectedDate.getUTCMonth();

  const start = new Date(Date.UTC(year, month, 1));
  const end = new Date(Date.UTC(year, month + 1, 1));

  return {
    start,
    end,
  };
};

// ========================================
// TIME / STATUS HELPERS
// ========================================
const normalizeTime = (time) => {
  return String(time || "")
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
};

const normalizeStatus = (status) => {
  return String(status || "")
    .trim()
    .toLowerCase();
};

const isActiveAppointment = (appointment) => {
  const status = normalizeStatus(appointment.status);

  return !["canceled", "cancelled"].includes(status);
};

// ========================================
// SHARED APPOINTMENT INCLUDE
// ========================================
const appointmentInclude = {
  patient: {
    select: {
      id: true,
      fullName: true,
      phone: true,
    },
  },

  doctor: {
    select: {
      id: true,
      fullName: true,
      department: true,
      specialization: true,
    },
  },
};

// ========================================
// GET DAY SCHEDULE
// GET /api/admin/appointments/schedule/day?date=2026-08-20
// ========================================
export const getDaySchedule = async (req, res) => {
  try {
    const requestedDate =
      req.query.date || new Date().toISOString().slice(0, 10);

    const range = getDayRange(requestedDate);

    if (!range) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid date in YYYY-MM-DD format",
      });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: range.start,
          lt: range.end,
        },
      },

      include: appointmentInclude,

      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
    });

    return res.status(200).json({
      success: true,
      date: requestedDate,
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get day schedule error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve day schedule",
    });
  }
};

// ========================================
// GET WEEK SCHEDULE
// GET /api/admin/appointments/schedule/week?date=2026-08-20
// ========================================
export const getWeekSchedule = async (req, res) => {
  try {
    const requestedDate =
      req.query.date || new Date().toISOString().slice(0, 10);

    const range = getWeekRange(requestedDate);

    if (!range) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid date in YYYY-MM-DD format",
      });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: range.start,
          lt: range.end,
        },
      },

      include: appointmentInclude,

      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
    });

    const weekEndDisplay = new Date(range.end);
    weekEndDisplay.setUTCDate(weekEndDisplay.getUTCDate() - 1);

    return res.status(200).json({
      success: true,
      requestedDate,
      weekStart: range.start.toISOString().slice(0, 10),
      weekEnd: weekEndDisplay.toISOString().slice(0, 10),
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get week schedule error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve week schedule",
    });
  }
};

// ========================================
// GET MONTH SCHEDULE
// GET /api/admin/appointments/schedule/month?date=2026-08-20
// ========================================
export const getMonthSchedule = async (req, res) => {
  try {
    const requestedDate =
      req.query.date || new Date().toISOString().slice(0, 10);

    const range = getMonthRange(requestedDate);

    if (!range) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid date in YYYY-MM-DD format",
      });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: range.start,
          lt: range.end,
        },
      },

      include: appointmentInclude,

      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
    });

    const monthEndDisplay = new Date(range.end);
    monthEndDisplay.setUTCDate(monthEndDisplay.getUTCDate() - 1);

    return res.status(200).json({
      success: true,
      requestedDate,
      monthStart: range.start.toISOString().slice(0, 10),
      monthEnd: monthEndDisplay.toISOString().slice(0, 10),
      count: appointments.length,
      appointments,
    });
  } catch (error) {
    console.error("Get month schedule error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve month schedule",
    });
  }
};

// ========================================
// CHECK APPOINTMENT CONFLICT
// POST /api/admin/appointments/conflicts/check
// ========================================
export const checkAppointmentConflict = async (req, res) => {
  try {
    const {
      doctorId,
      patientId,
      date,
      time,
      excludeAppointmentId,
    } = req.body;

    if (!doctorId || typeof doctorId !== "string") {
      return res.status(400).json({
        success: false,
        message: "Doctor ID is required",
      });
    }

    if (!date) {
      return res.status(400).json({
        success: false,
        message: "Appointment date is required",
      });
    }

    if (!time || typeof time !== "string" || !time.trim()) {
      return res.status(400).json({
        success: false,
        message: "Appointment time is required",
      });
    }

    const range = getDayRange(date);

    if (!range) {
      return res.status(400).json({
        success: false,
        message: "Date must be a valid date in YYYY-MM-DD format",
      });
    }

    const doctor = await prisma.doctor.findUnique({
      where: {
        id: doctorId,
      },

      select: {
        id: true,
        fullName: true,
      },
    });

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    if (patientId) {
      const patient = await prisma.patient.findUnique({
        where: {
          id: patientId,
        },

        select: {
          id: true,
          fullName: true,
        },
      });

      if (!patient) {
        return res.status(404).json({
          success: false,
          message: "Patient not found",
        });
      }
    }

    const dayAppointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: range.start,
          lt: range.end,
        },
      },

      include: appointmentInclude,

      orderBy: [
        {
          date: "asc",
        },
        {
          time: "asc",
        },
      ],
    });

    const requestedTime = normalizeTime(time);

    const activeSameTimeAppointments = dayAppointments.filter(
      (appointment) => {
        if (
          excludeAppointmentId &&
          appointment.id === excludeAppointmentId
        ) {
          return false;
        }

        if (!isActiveAppointment(appointment)) {
          return false;
        }

        return normalizeTime(appointment.time) === requestedTime;
      },
    );

    const doctorConflicts = activeSameTimeAppointments.filter(
      (appointment) => appointment.doctorId === doctorId,
    );

    const patientConflicts = patientId
      ? activeSameTimeAppointments.filter(
          (appointment) => appointment.patientId === patientId,
        )
      : [];

    const hasDoctorConflict = doctorConflicts.length > 0;
    const hasPatientConflict = patientConflicts.length > 0;

    const hasConflict =
      hasDoctorConflict || hasPatientConflict;

    const uniqueConflicts = Array.from(
      new Map(
        [...doctorConflicts, ...patientConflicts].map(
          (appointment) => [
            appointment.id,
            appointment,
          ],
        ),
      ).values(),
    );

    return res.status(200).json({
      success: true,
      hasConflict,

      requestedSlot: {
        date,
        time: time.trim(),
        doctorId,
        patientId: patientId || null,
      },

      conflicts: {
        doctor: hasDoctorConflict,
        patient: hasPatientConflict,
      },

      count: uniqueConflicts.length,
      appointments: uniqueConflicts,
    });
  } catch (error) {
    console.error("Check appointment conflict error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to check appointment conflict",
    });
  }
};

// ========================================
// GET APPOINTMENT STATISTICS
// GET /api/admin/appointments/statistics
// ========================================
export const getAppointmentStatistics = async (req, res) => {
  try {
    const appointments = await prisma.appointment.findMany({
      include: {
        doctor: {
          select: {
            id: true,
            fullName: true,
            department: true,
          },
        },
      },

      orderBy: {
        date: "asc",
      },
    });

    const now = new Date();

    const todayStart = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
      ),
    );

    const todayEnd = new Date(todayStart);
    todayEnd.setUTCDate(todayEnd.getUTCDate() + 1);

    const todayString = todayStart.toISOString().slice(0, 10);

    const weekRange = getWeekRange(todayString);
    const monthRange = getMonthRange(todayString);

    const statusCounts = {};

    let confirmed = 0;
    let pending = 0;
    let scheduled = 0;
    let completed = 0;
    let canceled = 0;
    let other = 0;

    let todayCount = 0;
    let weekCount = 0;
    let monthCount = 0;
    let upcomingCount = 0;

    const departmentCounts = {};

    for (const appointment of appointments) {
      const status = normalizeStatus(appointment.status);
      const appointmentDate = new Date(appointment.date);

      // Dynamic status breakdown
      const displayStatus =
        appointment.status || "Unknown";

      statusCounts[displayStatus] =
        (statusCounts[displayStatus] || 0) + 1;

      // Known status counts
      if (status === "confirmed") {
        confirmed += 1;
      } else if (status === "pending") {
        pending += 1;
      } else if (status === "scheduled") {
        scheduled += 1;
      } else if (status === "completed") {
        completed += 1;
      } else if (
        status === "canceled" ||
        status === "cancelled"
      ) {
        canceled += 1;
      } else {
        other += 1;
      }

      // Today
      if (
        appointmentDate >= todayStart &&
        appointmentDate < todayEnd
      ) {
        todayCount += 1;
      }

      // This week
      if (
        weekRange &&
        appointmentDate >= weekRange.start &&
        appointmentDate < weekRange.end
      ) {
        weekCount += 1;
      }

      // This month
      if (
        monthRange &&
        appointmentDate >= monthRange.start &&
        appointmentDate < monthRange.end
      ) {
        monthCount += 1;
      }

      // Upcoming appointments
      if (
        appointmentDate >= todayStart &&
        ["confirmed", "pending", "scheduled"].includes(status)
      ) {
        upcomingCount += 1;
      }

      // Department breakdown
      const department =
        appointment.doctor?.department || "Unknown";

      departmentCounts[department] =
        (departmentCounts[department] || 0) + 1;
    }

    const byDepartment = Object.entries(
      departmentCounts,
    )
      .map(([department, count]) => ({
        department,
        count,
      }))
      .sort((a, b) => b.count - a.count);

    return res.status(200).json({
      success: true,

      data: {
        summary: {
          totalAppointments: appointments.length,
          confirmed,
          pending,
          scheduled,
          completed,
          canceled,
          other,
        },

        periods: {
          today: todayCount,
          thisWeek: weekCount,
          thisMonth: monthCount,
          upcoming: upcomingCount,
        },

        byStatus: statusCounts,

        byDepartment,
      },
    });
  } catch (error) {
    console.error("Get appointment statistics error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to retrieve appointment statistics",
    });
  }
};