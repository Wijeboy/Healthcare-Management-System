export const RECORD_CATEGORIES = ["Lab Report", "Scan / Imaging", "Prescriptions"];
export const RECORD_RESULTS = ["Normal", "Abnormal"];

export const mockRecords = [
  { id: "r1", patientId: "p1", patient: "Imasha Lankeshi", reportName: "Complete Blood Count", category: "Lab Report", date: "June 10, 2026", doctor: "Dr. Nimal Perera", result: "Normal" },
  { id: "r2", patientId: "p1", patient: "Imasha Lankeshi", reportName: "Lipid Profile", category: "Lab Report", date: "May 28, 2026", doctor: "Dr. Nimal Perera", result: "Abnormal" },
  { id: "r3", patientId: "p2", patient: "Kavindu Perera", reportName: "Skin Biopsy", category: "Lab Report", date: "July 02, 2026", doctor: "Dr. Sunimal Silva", result: "Normal" },
  { id: "r4", patientId: "p3", patient: "Sanduni Rathnayake", reportName: "Knee MRI", category: "Scan / Imaging", date: "June 25, 2026", doctor: "Dr. Kasun Fernando", result: "Abnormal" },
  { id: "r5", patientId: "p4", patient: "Dinuka Wickramasinghe", reportName: "EEG Report", category: "Scan / Imaging", date: "July 10, 2026", doctor: "Dr. Anoma Jayasuriya", result: "Normal" },
];
