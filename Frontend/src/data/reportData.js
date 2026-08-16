export const reportData = {
  hero: {
    title:
      "Operational reporting for patients, staff, appointments, revenue, and clinical activity",
    description:
      "Use this dashboard to review the health system's key performance indicators, financial summaries, treatment activity, and departmental trends.",
  },
  summary: {
    quickStats: [
      { label: "Total Patients", value: "1,240", accent: "text-blue-700" },
      { label: "Total Doctors", value: "48", accent: "text-emerald-700" },
      { label: "Appointments", value: "3,482", accent: "text-violet-700" },
      { label: "Revenue", value: "$128,450", accent: "text-amber-700" },
    ],
    overviewCards: [
      {
        label: "Total Patients",
        value: "1,240",
        detail: "Number of registered patients",
        tone: "bg-blue-50 text-blue-700 border-blue-200",
      },
      {
        label: "Total Doctors",
        value: "48",
        detail: "Number of active doctors",
        tone: "bg-emerald-50 text-emerald-700 border-emerald-200",
      },
      {
        label: "Appointments",
        value: "3,482",
        detail: "Total, approved, cancelled, and pending appointments",
        tone: "bg-violet-50 text-violet-700 border-violet-200",
      },
      {
        label: "Revenue",
        value: "$128,450",
        detail: "Total revenue and payment amounts",
        tone: "bg-amber-50 text-amber-700 border-amber-200",
      },
      {
        label: "Payments",
        value: "96%",
        detail: "Paid, pending, and failed payments",
        tone: "bg-cyan-50 text-cyan-700 border-cyan-200",
      },
      {
        label: "Medical Records",
        value: "6,812",
        detail: "Number of medical records/reports",
        tone: "bg-rose-50 text-rose-700 border-rose-200",
      },
      {
        label: "Prescriptions",
        value: "2,941",
        detail: "Total prescriptions created",
        tone: "bg-lime-50 text-lime-700 border-lime-200",
      },
    ],
    revenueBreakdown: [
      { label: "Paid", value: "$110,362", tone: "bg-emerald-50 text-emerald-700" },
      { label: "Pending", value: "$12,480", tone: "bg-amber-50 text-amber-700" },
      { label: "Failed", value: "$5,608", tone: "bg-rose-50 text-rose-700" },
    ],
  },
  charts: {
    appointmentRevenue: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
      appointmentSeries: [240, 280, 310, 295, 340, 365, 390, 420],
      revenueSeries: [45, 52, 61, 58, 72, 84, 90, 96],
    },
    weeklyAppointments: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      values: [58, 74, 66, 82, 96, 42, 31],
    },
    paymentStatus: {
      labels: ["Paid", "Pending", "Failed"],
      values: [86, 10, 4],
    },
  },
  tables: {
    appointments: [
      { label: "Total", value: "3,482" },
      { label: "Approved", value: "2,845" },
      { label: "Cancelled", value: "214" },
      { label: "Pending", value: "423" },
    ],
    doctors: [
      { name: "Dr. Sarah Chen", appointments: 182, department: "Cardiology" },
      { name: "Dr. James Wilson", appointments: 164, department: "Neurology" },
      { name: "Dr. Robert Kim", appointments: 151, department: "Pediatrics" },
      {
        name: "Dr. Nimal Jayawardhana",
        appointments: 146,
        department: "General Medicine",
      },
    ],
    patientRegistrations: [
      { period: "Jan", registrations: 84 },
      { period: "Feb", registrations: 93 },
      { period: "Mar", registrations: 101 },
      { period: "Apr", registrations: 112 },
      { period: "May", registrations: 126 },
      { period: "Jun", registrations: 139 },
    ],
    reportRows: [
      {
        title: "Medical Records",
        description: "Number of medical records/reports",
        value: "6,812",
      },
      {
        title: "Prescriptions",
        description: "Total prescriptions created",
        value: "2,941",
      },
      {
        title: "Revenue",
        description: "Total revenue and payment amounts",
        value: "$128,450",
      },
      {
        title: "Payments",
        description: "Paid, pending, and failed payments",
        value: "Paid 86% | Pending 10% | Failed 4%",
      },
    ],
  },
  scopeItems: [
    "Total patients and active doctors",
    "Appointment totals and trend analysis",
    "Revenue summary and payment status",
    "Medical records and prescription volume",
    "Doctor and patient statistics over time",
  ],
};
