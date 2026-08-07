// The "currently logged in" doctor for this demo. In a real system this
// would come from the JWT payload / GET /api/auth/me after login.
export const CURRENT_DOCTOR_NAME = "Dr. Nimal Perera";

export const mockDoctorProfile = {
  name: "Dr. Nimal Perera",
  photoUrl: null,
  department: "Cardiology",
  licenseNo: "SLMC-24817",
  email: "nimal.perera@medimate.health",
  phone: "+94 71 555 0142",
  experienceYears: 14,
  education: [
    "MBBS — University of Colombo (2008)",
    "MD in Cardiology — Postgraduate Institute of Medicine (2013)",
    "Fellowship in Interventional Cardiology — National Heart Institute (2015)",
  ],
  bio: "Dr. Nimal Perera is a consultant cardiologist specializing in interventional cardiology, hypertension management, and preventive cardiac care, with over a decade of clinical practice.",
  clinicRoom: "Room 214, Cardiology Wing",
  languages: ["English", "Sinhala", "Tamil"],
};