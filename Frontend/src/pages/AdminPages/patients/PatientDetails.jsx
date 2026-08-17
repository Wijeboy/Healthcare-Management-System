import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Edit, MoreHorizontal, ArrowLeft, AlertCircle } from "lucide-react";
import { patientApi } from "../../../services/api";
import PatientHeaderCard from "../../../components/admin-components/patients/patient-details/PatientHeaderCard";
import PatientNavigationTabs from "../../../components/admin-components/patients/patient-details/PatientNavigationTabs";
import PersonalInfoCard from "../../../components/admin-components/patients/patient-details/PersonalInfoCard";
import ContactInfoCard from "../../../components/admin-components/patients/patient-details/ContactInfoCard";
import MedicalSummaryCard from "../../../components/admin-components/patients/patient-details/MedicalSummaryCard";
import AccountAccessCard from "../../../components/admin-components/patients/patient-details/AccountAccessCard";
import UpcomingAppointmentsCard from "../../../components/admin-components/patients/patient-details/UpcomingAppointmentsCard";

const buildPatientDetails = (p) => {
  if (!p) return null;

  const initials = p.fullName
    ? p.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const userId = p.userId || `USR-${p.id?.replace(/\D/g, "").slice(-5).padStart(5, "0")}`;

  return {
    header: {
      initials,
      name: p.fullName ?? "",
      status: p.status ?? "Active",
      id: p.id ?? "",
      userId,
      bloodGroup: p.bloodGroup ?? "",
      age: String(p.age ?? ""),
      gender: (p.gender ?? "").toUpperCase(),
      summaryNote: p.medicalNotes ?? "",
      lastVisit: "Not available",
      upcomingAppointment: "No upcoming appointment",
      medicalRecordsCount: "0",
      riskAlerts: p.allergies || "No Critical Alert",
    },
    personal: {
      fullName: p.fullName ?? "",
      dob: p.dob ?? "",
      age: String(p.age ?? ""),
      gender: p.gender ?? "",
      bloodGroup: p.bloodGroup ?? "",
      patientId: p.id ?? "",
      address: p.address ?? "",
    },
    contact: {
      email: p.user?.email ?? "",
      phone: p.phone ?? "",
      emergencyContact: p.emergencyName ?? "",
      relationship: p.emergencyRelationship ?? "",
      emergencyPhone: p.emergencyPhone ?? "",
      emergencyEmail: p.emergencyEmail ?? "",
    },
    medical: {
      allergies: p.allergies ?? "",
      allergiesNote: "",
      existingCondition: p.existingConditions ?? "",
      existingConditionNote: "",
      currentMedication: p.currentMedications ?? "",
      currentMedicationNote: "",
      latestVisitType: "Consultation",
      latestVisitNote: "",
    },
    account: {
      systemRole: "Patient",
      accountStatus: p.status ?? "Active",
      userId,
      username: p.user?.email ? p.user.email.split("@")[0] : "",
      lastLogin: "Not available",
      profileCreated: p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Not available",
    },
    appointments: [],
  };
};

const PatientDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const patientId = searchParams.get("id");
  const normalizedPatientId = patientId ? decodeURIComponent(patientId) : "";

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patient, setPatient] = useState(null);

  const loadPatient = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await patientApi.getById(normalizedPatientId);
      setPatient(data);
    } catch (err) {
      console.error("Failed to load patient details:", err);
      setError("We could not load the patient profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (normalizedPatientId) {
      loadPatient();
    }
  }, [normalizedPatientId]);

  const patientData = buildPatientDetails(patient);

  const handleEdit = () => {
    if (!patient) return;
    navigate(
      `/admin/patients/edit?id=${encodeURIComponent(patient.id)}`,
      {
        state: { patient },
      },
    );
  };

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#0256CA] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500">Loading patient profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !patientData) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Patient Details
            </p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">
              {error || "Patient profile not found"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              We could not load a patient for this link. Please return to the
              patients list and open a profile from there.
            </p>
            <div className="flex justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => navigate("/admin/patients")}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Patients List
              </button>
              {error && (
                <button
                  type="button"
                  onClick={loadPatient}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0256CA] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate("/admin/patients")}
                  className="text-[#2563EB] hover:underline font-semibold"
                >
                  Patients Management
                </button>
                <span>&rsaquo;</span>
                <span className="text-slate-400">Patient Details</span>
              </nav>

              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Patient Details
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                View the patient's personal information, medical summary,
                emergency contact, appointments, and account access.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleEdit}
                className="px-4 py-2 bg-[#0256CA] hover:bg-blue-700 text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
              >
                <Edit size={14} />
                Edit Patient
              </button>
              <button className="p-2 border border-[#CBD5E1] bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <PatientHeaderCard patient={patientData.header} onEdit={handleEdit} />

          <PatientNavigationTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PersonalInfoCard personal={patientData.personal} />
                <ContactInfoCard contact={patientData.contact} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <MedicalSummaryCard medical={patientData.medical} />
                <AccountAccessCard account={patientData.account} />
              </div>

              <UpcomingAppointmentsCard
                appointments={patientData.appointments}
              />
            </div>
          )}

          {activeTab !== "Overview" && (
            <div className="bg-white border border-[#E2E8F0] rounded-xl p-12 text-center text-slate-400 font-medium">
              Tab content for{" "}
              <span className="capitalize">{activeTab.replace("-", " ")}</span>{" "}
              goes here.
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default PatientDetails;
