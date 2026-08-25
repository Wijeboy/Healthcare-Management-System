import { getDb } from '../../config/mongo.js';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

// Build date range query helper
const buildDateQuery = (startDate, endDate, field = "createdAt") => {
  const dateFilter = {};
  if (startDate) {
    const s = new Date(startDate);
    s.setHours(0, 0, 0, 0);
    dateFilter.$gte = s;
  }
  if (endDate) {
    const e = new Date(endDate);
    e.setHours(23, 59, 59, 999);
    dateFilter.$lte = e;
  }
  return Object.keys(dateFilter).length > 0 ? { [field]: dateFilter } : {};
};

// 1. GET /api/admin/reports/overview — Complete analytics dashboard payload
export const getReportOverview = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const db = await getDb();

    const dateFilter = buildDateQuery(startDate, endDate, "createdAt");
    const apptDateFilter = buildDateQuery(startDate, endDate, "date");

    const [patients, doctors, appointments, payments] = await Promise.all([
      db.collection("Patient").find(dateFilter).toArray(),
      db.collection("Doctor").find({}).toArray(),
      db.collection("Appointment").find(apptDateFilter).toArray(),
      db.collection("Payment").find(dateFilter).toArray(),
    ]);

    const totalPatients = patients.length;
    const totalDoctors = doctors.length;
    const totalAppointments = appointments.length;
    const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    const completedAppts = appointments.filter(a => (a.status || "").toLowerCase() === "completed").length;
    const pendingAppts = appointments.filter(a => (a.status || "").toLowerCase() === "pending").length;
    const cancelledAppts = appointments.filter(a => (a.status || "").toLowerCase() === "cancelled").length;

    const paidPayments = payments.filter(p => (p.status || "").toLowerCase() === "paid");
    const pendingPayments = payments.filter(p => (p.status || "").toLowerCase() === "pending");
    const failedPayments = payments.filter(p => (p.status || "").toLowerCase() === "failed");

    const paidRevenue = paidPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const pendingRevenue = pendingPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const failedRevenue = failedPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    // Doctor breakdown table
    const doctorStats = doctors.map(doc => {
      const docAppts = appointments.filter(a => String(a.doctorId) === String(doc._id));
      const completed = docAppts.filter(a => (a.status || "").toLowerCase() === "completed").length;
      const estRevenue = completed * 50; // $50 avg consultation fee
      return {
        id: doc._id.toString(),
        name: doc.fullName || "Dr. Unknown",
        department: doc.department || "General",
        specialization: doc.specialization || "General Practice",
        totalAppointments: docAppts.length,
        completedAppointments: completed,
        revenue: `$${estRevenue.toLocaleString()}`,
      };
    });

    res.json({
      summary: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalRevenue: `$${totalRevenue.toLocaleString()}`,
        completedAppts,
        pendingAppts,
        cancelledAppts,
        paidRevenue: `$${paidRevenue.toLocaleString()}`,
        pendingRevenue: `$${pendingRevenue.toLocaleString()}`,
        failedRevenue: `$${failedRevenue.toLocaleString()}`,
      },
      doctorStats,
      appointmentsSummary: {
        total: totalAppointments,
        completed: completedAppts,
        pending: pendingAppts,
        cancelled: cancelledAppts,
      },
      revenueSummary: {
        total: totalRevenue,
        paid: paidRevenue,
        pending: pendingRevenue,
        failed: failedRevenue,
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. GET /api/admin/reports/appointments — Appointment report API
export const generateAppointmentReports = async (req, res) => {
  try {
    const { startDate, endDate, status } = req.query;
    const db = await getDb();

    let filter = buildDateQuery(startDate, endDate, "date");
    if (status && status !== "All") {
      filter.status = new RegExp(`^${status}$`, "i");
    }

    const appointments = await db.collection("Appointment").find(filter).toArray();

    // Map patient and doctor names
    const patientIds = appointments.map(a => a.patientId).filter(Boolean);
    const doctorIds = appointments.map(a => a.doctorId).filter(Boolean);

    const [patients, doctors] = await Promise.all([
      db.collection("Patient").find({ _id: { $in: patientIds } }).toArray(),
      db.collection("Doctor").find({ _id: { $in: doctorIds } }).toArray(),
    ]);

    const patientMap = new Map(patients.map(p => [p._id.toString(), p.fullName]));
    const doctorMap = new Map(doctors.map(d => [d._id.toString(), d.fullName]));

    const reportData = appointments.map(a => ({
      id: a._id.toString(),
      patientName: patientMap.get(String(a.patientId)) || "Patient Record",
      doctorName: doctorMap.get(String(a.doctorId)) || "Dr. Assigned",
      date: a.date ? new Date(a.date).toLocaleDateString() : "N/A",
      time: a.time || "N/A",
      status: a.status || "Pending",
      type: a.type || "Consultation",
    }));

    const summary = {
      total: reportData.length,
      completed: reportData.filter(a => a.status.toLowerCase() === "completed").length,
      pending: reportData.filter(a => a.status.toLowerCase() === "pending").length,
      cancelled: reportData.filter(a => a.status.toLowerCase() === "cancelled").length,
    };

    res.json({ data: reportData, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. GET /api/admin/reports/patients — Patient report API
export const generatePatientReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const db = await getDb();

    const filter = buildDateQuery(startDate, endDate, "createdAt");
    const patients = await db.collection("Patient").find(filter).toArray();

    const reportData = patients.map(p => ({
      id: p._id.toString(),
      fullName: p.fullName || "N/A",
      phone: p.phone || "N/A",
      dob: p.dob || "N/A",
      age: p.age ?? "N/A",
      gender: p.gender || "N/A",
      bloodGroup: p.bloodGroup || "N/A",
      status: p.status || "Active",
      createdAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A",
    }));

    const summary = {
      total: reportData.length,
      active: reportData.filter(p => p.status.toLowerCase() === "active").length,
      inactive: reportData.filter(p => p.status.toLowerCase() === "inactive").length,
      male: reportData.filter(p => p.gender.toLowerCase() === "male").length,
      female: reportData.filter(p => p.gender.toLowerCase() === "female").length,
    };

    res.json({ data: reportData, summary });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. GET /api/admin/reports/doctors — Doctor report API
export const generateDoctorReports = async (req, res) => {
  try {
    const { startDate, endDate, department } = req.query;
    const db = await getDb();

    let docFilter = {};
    if (department && department !== "All") {
      docFilter.department = new RegExp(`^${department}$`, "i");
    }

    const apptFilter = buildDateQuery(startDate, endDate, "date");

    const [doctors, appointments] = await Promise.all([
      db.collection("Doctor").find(docFilter).toArray(),
      db.collection("Appointment").find(apptFilter).toArray(),
    ]);

    const reportData = doctors.map(doc => {
      const docAppts = appointments.filter(a => String(a.doctorId) === String(doc._id));
      const completed = docAppts.filter(a => (a.status || "").toLowerCase() === "completed").length;
      return {
        id: doc._id.toString(),
        fullName: doc.fullName || "Dr. Unknown",
        department: doc.department || "General",
        specialization: doc.specialization || "General Practice",
        availability: doc.availability || "Available",
        totalAppointments: docAppts.length,
        completedAppointments: completed,
        status: doc.status || "Active",
      };
    });

    res.json({ data: reportData, totalDoctors: reportData.length });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. GET /api/admin/reports/revenue — Revenue report API
export const generateRevenueReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const db = await getDb();

    const filter = buildDateQuery(startDate, endDate, "createdAt");
    const payments = await db.collection("Payment").find(filter).toArray();

    const totalRevenue = payments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const paidPayments = payments.filter(p => (p.status || "").toLowerCase() === "paid");
    const pendingPayments = payments.filter(p => (p.status || "").toLowerCase() === "pending");
    const failedPayments = payments.filter(p => (p.status || "").toLowerCase() === "failed");

    const paidTotal = paidPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const pendingTotal = pendingPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
    const failedTotal = failedPayments.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);

    res.json({
      summary: {
        totalRevenue: `$${totalRevenue.toLocaleString()}`,
        paidRevenue: `$${paidTotal.toLocaleString()}`,
        pendingRevenue: `$${pendingTotal.toLocaleString()}`,
        failedRevenue: `$${failedTotal.toLocaleString()}`,
        paidCount: paidPayments.length,
        pendingCount: pendingPayments.length,
        failedCount: failedPayments.length,
      },
      transactions: payments.map(p => ({
        id: p._id.toString(),
        amount: `$${(Number(p.amount) || 0).toFixed(2)}`,
        status: p.status || "Paid",
        method: p.method || "Card",
        createdAt: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "N/A",
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. GET /api/admin/reports/export — PDF/Excel Export API with date range support
export const exportReports = async (req, res) => {
  try {
    const { type = 'appointments', format = 'pdf', startDate, endDate } = req.query;
    const db = await getDb();

    const reportTitle = `${type.charAt(0).toUpperCase() + type.slice(1)} Report`;
    let records = [];

    if (type === 'patients') {
      const filter = buildDateQuery(startDate, endDate, "createdAt");
      records = await db.collection("Patient").find(filter).toArray();
    } else if (type === 'doctors') {
      records = await db.collection("Doctor").find({}).toArray();
    } else if (type === 'revenue') {
      const filter = buildDateQuery(startDate, endDate, "createdAt");
      records = await db.collection("Payment").find(filter).toArray();
    } else {
      // default: appointments
      const filter = buildDateQuery(startDate, endDate, "date");
      records = await db.collection("Appointment").find(filter).toArray();
    }

    if (format === 'pdf') {
      const doc = new PDFDocument({ margin: 40 });
      const filename = `${type}_report_${Date.now()}.pdf`;

      res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-type', 'application/pdf');

      doc.pipe(res);

      // Header Banner
      doc.fontSize(22).fillColor('#1E3A8A').text('MEDIMATE HEALTHCARE SYSTEM', { align: 'center' });
      doc.fontSize(14).fillColor('#475569').text(reportTitle.toUpperCase(), { align: 'center' });
      doc.fontSize(10).fillColor('#64748B').text(`Generated on: ${new Date().toLocaleString()}`, { align: 'center' });
      if (startDate || endDate) {
        doc.fontSize(9).fillColor('#2563EB').text(`Range: ${startDate || 'Start'} to ${endDate || 'Today'}`, { align: 'center' });
      }
      doc.moveDown(1.5);

      doc.moveTo(40, doc.y).lineTo(570, doc.y).strokeColor('#E2E8F0').stroke();
      doc.moveDown(1);

      if (records.length === 0) {
        doc.fontSize(12).fillColor('#94A3B8').text('No records found for the selected criteria.', { align: 'center' });
      } else {
        records.forEach((rec, idx) => {
          doc.fontSize(10).fillColor('#0F172A').text(`${idx + 1}. ${rec.fullName || rec.name || rec.patientName || rec._id.toString()}`);
          doc.fontSize(9).fillColor('#64748B').text(`   Details: ${rec.phone || rec.email || rec.department || rec.status || 'N/A'}`);
          doc.moveDown(0.5);
        });
      }

      doc.end();
    } else if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(reportTitle);

      if (type === 'patients') {
        worksheet.columns = [
          { header: 'ID', key: 'id', width: 26 },
          { header: 'Full Name', key: 'fullName', width: 25 },
          { header: 'Phone', key: 'phone', width: 16 },
          { header: 'Gender', key: 'gender', width: 12 },
          { header: 'Age', key: 'age', width: 10 },
          { header: 'Status', key: 'status', width: 12 },
        ];
        records.forEach(r => worksheet.addRow({ id: r._id.toString(), fullName: r.fullName || 'N/A', phone: r.phone || 'N/A', gender: r.gender || 'N/A', age: r.age ?? 'N/A', status: r.status || 'Active' }));
      } else if (type === 'doctors') {
        worksheet.columns = [
          { header: 'ID', key: 'id', width: 26 },
          { header: 'Doctor Name', key: 'fullName', width: 25 },
          { header: 'Department', key: 'department', width: 20 },
          { header: 'Specialization', key: 'specialization', width: 22 },
          { header: 'Status', key: 'status', width: 12 },
        ];
        records.forEach(r => worksheet.addRow({ id: r._id.toString(), fullName: r.fullName || 'N/A', department: r.department || 'N/A', specialization: r.specialization || 'N/A', status: r.status || 'Active' }));
      } else if (type === 'revenue') {
        worksheet.columns = [
          { header: 'Payment ID', key: 'id', width: 26 },
          { header: 'Amount ($)', key: 'amount', width: 14 },
          { header: 'Status', key: 'status', width: 12 },
          { header: 'Method', key: 'method', width: 14 },
          { header: 'Date', key: 'date', width: 16 },
        ];
        records.forEach(r => worksheet.addRow({ id: r._id.toString(), amount: r.amount ?? 0, status: r.status || 'Paid', method: r.method || 'Card', date: r.createdAt ? new Date(r.createdAt).toLocaleDateString() : 'N/A' }));
      } else {
        worksheet.columns = [
          { header: 'Appointment ID', key: 'id', width: 26 },
          { header: 'Status', key: 'status', width: 14 },
          { header: 'Date', key: 'date', width: 16 },
          { header: 'Time', key: 'time', width: 14 },
        ];
        records.forEach(r => worksheet.addRow({ id: r._id.toString(), status: r.status || 'Pending', date: r.date ? new Date(r.date).toLocaleDateString() : 'N/A', time: r.time || 'N/A' }));
      }

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename="${type}_report_${Date.now()}.xlsx"`);

      await workbook.xlsx.write(res);
      res.end();
    } else {
      res.status(400).json({ error: 'Invalid format. Use "pdf" or "excel"' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
