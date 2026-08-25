export const DOCTORS = [
  { name: "Dr. Nimal Perera", department: "Cardiology" },
  { name: "Dr. Sunimal Silva", department: "Dermatology" },
  { name: "Dr. Kasun Fernando", department: "Orthopedics" },
  { name: "Dr. Anoma Jayasuriya", department: "Neurology" },
];

export const PATIENTS = [
  { id: "p1", name: "Imasha Lankeshi", age: 34, bloodGroup: "O+", allergies: "Penicillin", emergencyContact: "Thirasha Lankeshi \u00b7 +94 71 234 5678" },
  { id: "p2", name: "Kavindu Perera", age: 28, bloodGroup: "A+", allergies: "None", emergencyContact: "Nadeesha Perera \u00b7 +94 77 456 1290" },
  { id: "p3", name: "Sanduni Rathnayake", age: 45, bloodGroup: "B-", allergies: "Sulfa Drugs", emergencyContact: "Ruwan Rathnayake \u00b7 +94 76 890 3345" },
  { id: "p4", name: "Dinuka Wickramasinghe", age: 52, bloodGroup: "AB+", allergies: "None", emergencyContact: "Malsha Wickrama \u00b7 +94 70 112 9987" },
];

export const TIME_ROWS = [8, 9, 10, 11, 12, 13, 14, 15, 16];

export function formatHour(hour) {
  const period = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(display).padStart(2, "0")}:00 ${period}`;
}

// weekday: 0=Mon..5=Sat. year/month(0-indexed)/day give real dates for
// month/week navigation. CURRENT_DOCTOR_NAME filters which of these belong
// to the logged-in doctor.
export const mockAppointments = [
  { id: "ap1", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", department: "Cardiology", year: 2026, month: 9, day: 23, weekday: 0, hour: 8, time: "08:00 AM", status: "Scheduled", notes: "Routine follow-up for hypertension." },
  { id: "ap2", patientId: "p3", patient: "Sanduni Rathnayake", doctor: "Dr. Kasun Fernando", department: "Orthopedics", year: 2026, month: 9, day: 23, weekday: 0, hour: 9, time: "09:00 AM", status: "Completed", notes: "Knee pain assessment." },
  { id: "ap3", patientId: "p2", patient: "Kavindu Perera", doctor: "Dr. Sunimal Silva", department: "Dermatology", year: 2026, month: 9, day: 25, weekday: 2, hour: 8, time: "08:00 AM", status: "Pending", notes: "Skin rash, first visit." },
  { id: "ap4", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", department: "Cardiology", year: 2026, month: 9, day: 25, weekday: 2, hour: 10, time: "10:00 AM", status: "Scheduled", notes: "ECG review and medication adjustment." },
  { id: "ap5", patientId: "p3", patient: "Sanduni Rathnayake", doctor: "Dr. Kasun Fernando", department: "Orthopedics", year: 2026, month: 9, day: 25, weekday: 2, hour: 13, time: "01:00 PM", status: "Scheduled", notes: "Post-surgery mobility check." },
  { id: "ap6", patientId: "p4", patient: "Dinuka Wickramasinghe", doctor: "Dr. Anoma Jayasuriya", department: "Neurology", year: 2026, month: 9, day: 26, weekday: 3, hour: 9, time: "09:00 AM", status: "Canceled", notes: "Patient requested cancellation." },
  { id: "ap7", patientId: "p2", patient: "Kavindu Perera", doctor: "Dr. Sunimal Silva", department: "Dermatology", year: 2026, month: 9, day: 27, weekday: 4, hour: 11, time: "11:00 AM", status: "Pending", notes: "Follow-up on treatment plan." },
];
