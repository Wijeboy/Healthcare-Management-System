export const PRESCRIPTION_STATUSES = ["Active", "Pending Approval", "Refill Requested", "Voided"];

export const PRESCRIPTION_STATUS_TINT = {
  Active: "bg-emerald-50 text-emerald-600 ring-emerald-200",
  "Pending Approval": "bg-amber-50 text-amber-600 ring-amber-200",
  "Refill Requested": "bg-blue-50 text-blue-600 ring-blue-200",
  Voided: "bg-rose-50 text-rose-600 ring-rose-200",
};

export const FREQUENCIES = [
  "Once Daily (QD)", "Twice Daily (BID)", "Three Times Daily (TID)",
  "Four Times Daily (QID)", "As Needed (PRN)",
];

export const mockPrescriptions = [
  { id: "rx1", code: "RX-88291", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", dateIssued: "Oct 24, 2026", status: "Active", medications: [{ name: "Amoxicillin", dosage: "500mg", frequency: "Once Daily (QD)" }], notes: "Take with food. Complete full course even if symptoms improve." },
  { id: "rx2", code: "RX-88292", patientId: "p2", patient: "Kavindu Perera", doctor: "Dr. Sunimal Silva", dateIssued: "Oct 23, 2026", status: "Pending Approval", medications: [{ name: "Hydrocortisone Cream", dosage: "1%", frequency: "Twice Daily (BID)" }], notes: "Apply thin layer to affected area. Avoid contact with eyes." },
  { id: "rx3", code: "RX-88293", patientId: "p3", patient: "Sanduni Rathnayake", doctor: "Dr. Kasun Fernando", dateIssued: "Oct 22, 2026", status: "Active", medications: [{ name: "Ibuprofen", dosage: "400mg", frequency: "Three Times Daily (TID)" }, { name: "Calcium + Vitamin D", dosage: "600mg", frequency: "Once Daily (QD)" }], notes: "For post-surgical pain management. Discontinue if GI discomfort occurs." },
  { id: "rx4", code: "RX-88294", patientId: "p4", patient: "Dinuka Wickramasinghe", doctor: "Dr. Anoma Jayasuriya", dateIssued: "Oct 22, 2026", status: "Refill Requested", medications: [{ name: "Levetiracetam", dosage: "500mg", frequency: "Twice Daily (BID)" }], notes: "Refill request pending physician review." },
  { id: "rx5", code: "RX-88295", patientId: "p1", patient: "Imasha Lankeshi", doctor: "Dr. Nimal Perera", dateIssued: "Oct 18, 2026", status: "Voided", medications: [{ name: "Atorvastatin", dosage: "20mg", frequency: "Once Daily (QD)" }], notes: "Voided \u2014 replaced by updated dosage on Oct 24 prescription." },
];
