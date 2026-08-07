// Temporary local dataset standing in for the future
// GET /api/appointments (Express + MongoDB via Prisma) response shape.
// Each appointment intentionally carries both a `day` (day-of-month, for
// Month view) and a `weekday`/`hour` pair (for Week view) so all three
// views (Week / Month / Day) stay in sync from one source of truth.

export const DOCTORS = [
  { name: "Dr. Nimal Perera", department: "Cardiology" },
  { name: "Dr. Sunimal Silva", department: "Dermatology" },
  { name: "Dr. Kasun Fernando", department: "Orthopedics" },
  { name: "Dr. Anoma Jayasuriya", department: "Neurology" },
];

export const PATIENTS = [
  { id: "p1", name: "Imasha Lankeshi", age: 34, bloodGroup: "O+", allergies: "Penicillin", emergencyContact: "Thirasha Lankeshi · +94 71 234 5678" },
  { id: "p2", name: "Kavindu Perera", age: 28, bloodGroup: "A+", allergies: "None", emergencyContact: "Nadeesha Perera · +94 77 456 1290" },
  { id: "p3", name: "Sanduni Rathnayake", age: 45, bloodGroup: "B-", allergies: "Sulfa Drugs", emergencyContact: "Ruwan Rathnayake · +94 76 890 3345" },
  { id: "p4", name: "Dinuka Wickramasinghe", age: 52, bloodGroup: "AB+", allergies: "None", emergencyContact: "Malsha Wickrama · +94 70 112 9987" },
];

// weekday: 0=Mon ... 5=Sat (matches the Week view's MON–SAT columns)
// year/month (0-indexed, like JS Date) let Month view correctly show
// appointments only when you're actually viewing October 2026, rather than
// matching day-of-month against whatever month happens to be on screen.
export const mockAppointments = [
  { id: "ap1", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", department: "Cardiology", year: 2026, month: 9, day: 23, weekday: 0, hour: 8, time: "08:00 AM", status: "Scheduled", notes: "Routine follow-up for hypertension." },
  { id: "ap2", patientId: "p3", patient: "Sanduni Rathnayake", doctor: "Dr. Kasun Fernando", department: "Orthopedics", year: 2026, month: 9, day: 23, weekday: 0, hour: 9, time: "09:00 AM", status: "Completed", notes: "Knee pain assessment." },
  { id: "ap3", patientId: "p2", patient: "Kavindu Perera", doctor: "Dr. Sunimal Silva", department: "Dermatology", year: 2026, month: 9, day: 25, weekday: 2, hour: 8, time: "08:00 AM", status: "Pending", notes: "Skin rash, first visit." },
  { id: "ap4", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", department: "Cardiology", year: 2026, month: 9, day: 25, weekday: 2, hour: 10, time: "10:00 AM", status: "Scheduled", notes: "ECG review and medication adjustment." },
  { id: "ap5", patientId: "p3", patient: "Sanduni Rathnayake", doctor: "Dr. Kasun Fernando", department: "Orthopedics", year: 2026, month: 9, day: 25, weekday: 2, hour: 13, time: "01:00 PM", status: "Scheduled", notes: "Post-surgery mobility check." },
  { id: "ap6", patientId: "p4", patient: "Dinuka Wickramasinghe", doctor: "Dr. Anoma Jayasuriya", department: "Neurology", year: 2026, month: 9, day: 26, weekday: 3, hour: 9, time: "09:00 AM", status: "Canceled", notes: "Patient requested cancellation." },
  { id: "ap7", patientId: "p2", patient: "Kavindu Perera", doctor: "Dr. Sunimal Silva", department: "Dermatology", year: 2026, month: 9, day: 27, weekday: 4, hour: 11, time: "11:00 AM", status: "Pending", notes: "Follow-up on treatment plan." },
];

export const MONTH_LABEL = "October 2026";
export const MONTH_START_WEEKDAY = 4; // Oct 1, 2026 = Thursday (0 = Sunday)
export const DAYS_IN_MONTH = 31;

export const WEEK_LABEL = "Oct 23 - Oct 28, 2026";
export const WEEK_DAYS = [
  { key: 0, short: "MON 23", day: 23 },
  { key: 1, short: "TUE 24", day: 24 },
  { key: 2, short: "WED 25", day: 25 },
  { key: 3, short: "THU 26", day: 26 },
  { key: 4, short: "FRI 27", day: 27 },
  { key: 5, short: "SAT 28", day: 28 },
];

export const TIME_ROWS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export function formatHour(hour) {
  if (hour === 12) return "12:00 PM";
  return hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`;
}
