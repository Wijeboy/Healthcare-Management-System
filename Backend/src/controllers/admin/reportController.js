import prisma from '../../config/prisma.js';
import PDFDocument from 'pdfkit';
import ExcelJS from 'exceljs';

export const generateAppointmentReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    let where = {};
    if (startDate && endDate) {
      where.date = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      include: { patient: true, doctor: true }
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generatePatientReports = async (req, res) => {
  try {
    const patients = await prisma.patient.findMany({
      include: { user: true }
    });
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateDoctorReports = async (req, res) => {
  try {
    const doctors = await prisma.doctor.findMany({
      include: { user: true }
    });
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const generateRevenueReports = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    let where = {};
    if (startDate && endDate) {
      where.createdAt = {
        gte: new Date(startDate),
        lte: new Date(endDate)
      };
    }

    const payments = await prisma.payment.findMany({ where });
    const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

    res.json({ payments, totalRevenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const exportReports = async (req, res) => {
  try {
    const { type, format } = req.query; // type: appointments/patients/doctors/revenue, format: pdf/excel
    
    // Simplistic example of data gathering based on type
    let data = [];
    if (type === 'patients') {
      data = await prisma.patient.findMany({ include: { user: true } });
    } else if (type === 'doctors') {
      data = await prisma.doctor.findMany({ include: { user: true } });
    } // etc...

    if (format === 'pdf') {
      const doc = new PDFDocument();
      let filename = `${type}-report.pdf`;
      res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
      res.setHeader('Content-type', 'application/pdf');
      
      doc.pipe(res);
      doc.fontSize(20).text(`${type.toUpperCase()} REPORT`, { align: 'center' });
      doc.moveDown();
      
      data.forEach((item, index) => {
        doc.fontSize(12).text(`${index + 1}. ${item.fullName || item.id}`);
      });
      
      doc.end();
    } else if (format === 'excel') {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet(`${type} Report`);
      
      worksheet.columns = [
        { header: 'ID', key: 'id', width: 30 },
        { header: 'Name', key: 'fullName', width: 30 },
      ];

      data.forEach(item => {
        worksheet.addRow({ id: item.id, fullName: item.fullName || 'N/A' });
      });

      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.setHeader('Content-Disposition', `attachment; filename=${type}-report.xlsx`);
      
      await workbook.xlsx.write(res);
      res.end();
    } else {
      res.status(400).json({ error: 'Invalid format' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
