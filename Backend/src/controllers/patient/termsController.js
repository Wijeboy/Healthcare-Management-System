import prisma from '../../config/prisma.js';
import { getDb } from '../../config/mongo.js';

const DEFAULT_PATIENT_TC = {
  title: "MediMate Patient Terms & Conditions",
  version: "2.1",
  effectiveDate: "2026-01-01T00:00:00.000Z",
  lastUpdated: "2026-08-01T00:00:00.000Z",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: "By registering for and using the MediMate Healthcare Management System, you agree to comply with and be bound by these Terms and Conditions. If you do not agree, you must not use or access patient services.",
    },
    {
      id: "patient-responsibilities",
      title: "2. Patient Responsibilities & Account Security",
      content: "Patients are responsible for maintaining the confidentiality of their login credentials. You agree to provide accurate, current, and complete medical and personal information during registration and appointment bookings.",
    },
    {
      id: "appointment-policy",
      title: "3. Appointment Booking & Cancellation Policy",
      content: "Appointments may be booked or rescheduled based on doctor availability. Cancellations or rescheduling must be submitted at least 2 hours prior to the scheduled appointment time. Repeated no-shows may result in booking restrictions.",
    },
    {
      id: "privacy-data",
      title: "4. Data Privacy & Confidentiality",
      content: "Your health records, personal details, and medical history are protected under strict healthcare privacy standards. Information is accessed solely by authorized healthcare professionals for diagnostic, treatment, and administrative purposes.",
    },
    {
      id: "emergency-disclaimer",
      title: "5. Emergency Medical Disclaimer",
      content: "The MediMate portal is designed for non-emergency healthcare management and consultations. If you are experiencing a life-threatening medical emergency, please immediately call your local emergency services (e.g. 911 or 1990) or visit the nearest hospital emergency room.",
    },
    {
      id: "support-dispute",
      title: "6. Customer Support & Dispute Resolution",
      content: "If you have questions regarding billing, appointment scheduling, or service quality, please submit a Support Ticket via the Patient Support module. Support responses will be provided within 24 business hours.",
    },
  ],
};

/**
 * Get Patient Terms & Conditions API
 * GET /api/patient/terms-and-conditions or /api/terms-and-conditions/patient
 */
export const getPatientTermsAndConditions = async (req, res) => {
  try {
    const db = await getDb();

    // Try finding custom T&C document in DB
    const dbTc = await db.collection("TermsAndConditions").findOne({ role: "Patient" });

    if (dbTc) {
      return res.json({
        success: true,
        data: {
          title: dbTc.title || DEFAULT_PATIENT_TC.title,
          version: dbTc.version || DEFAULT_PATIENT_TC.version,
          effectiveDate: dbTc.effectiveDate || DEFAULT_PATIENT_TC.effectiveDate,
          sections: dbTc.sections || DEFAULT_PATIENT_TC.sections,
          updatedAt: dbTc.updatedAt || dbTc.createdAt,
        },
      });
    }

    return res.json({
      success: true,
      data: DEFAULT_PATIENT_TC,
    });
  } catch (error) {
    console.error("Get Patient T&C Error:", error);
    res.status(500).json({ error: error.message });
  }
};
