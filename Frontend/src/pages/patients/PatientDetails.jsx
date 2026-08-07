import React, { useMemo, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Edit, MoreHorizontal, ArrowLeft } from "lucide-react";
import { mockPatients } from "../../data/mockData";
import PatientHeaderCard from "../../components/patients/patient-details/PatientHeaderCard";
import PatientNavigationTabs from "../../components/patients/patient-details/PatientNavigationTabs";
import PersonalInfoCard from "../../components/patients/patient-details/PersonalInfoCard";
import ContactInfoCard from "../../components/patients/patient-details/ContactInfoCard";
import MedicalSummaryCard from "../../components/patients/patient-details/MedicalSummaryCard";
import AccountAccessCard from "../../components/patients/patient-details/AccountAccessCard";
import UpcomingAppointmentsCard from "../../components/patients/patient-details/UpcomingAppointmentsCard";

const buildPatientDetails = (patient) => {
  if (!patient) return null;

  const userId = `USR-${patient.id.replace(/\D/g, "").slice(-5).padStart(5, "0")}`;

  return {
    header: {
      initials: patient.initials ?? "",
      name: patient.name ?? "",
      status: patient.status ?? "ACTIVE",
      id: patient.id?.replace("#", "") ?? "",
      userId,
      bloodGroup: patient.bloodGroup ?? "",
      age: String(patient.age ?? ""),
      gender: (patient.gender ?? "").toUpperCase(),
      summaryNote:
        patient.medicalNotes ||
        patient.medicalSummarySubtitle ||
        patient.medicalSummaryTitle ||
        "",
      lastVisit: patient.lastVisitDate ?? "",
      upcomingAppointment: "No upcoming appointment",
      medicalRecordsCount: "0",
      riskAlerts: patient.allergies || "No Critical Alert",
    },
    personal: {
      fullName: patient.name ?? "",
      dob: patient.dob ?? "",
      age: String(patient.age ?? ""),
      gender: patient.gender ?? "",
      bloodGroup: patient.bloodGroup ?? "",
      patientId: patient.id?.replace("#", "") ?? "",
      address: patient.address ?? "",
    },
    contact: {
      email: patient.email ?? "",
      phone: patient.phone ?? "",
      emergencyContact: patient.emergencyName ?? "",
      relationship: patient.emergencyRelationship ?? "",
      emergencyPhone: patient.emergencyPhone ?? "",
      emergencyEmail: patient.emergencyEmail ?? "",
    },
    medical: {
      allergies: patient.allergies ?? patient.medicalSummaryTitle ?? "",
      allergiesNote: patient.medicalSummarySubtitle ?? "",
      existingCondition: patient.existingConditions ?? "",
      existingConditionNote: patient.medicalNotes ?? "",
      currentMedication: patient.currentMedications ?? "",
      currentMedicationNote: patient.medicalNotes ?? "",
      latestVisitType: patient.lastVisitType ?? "",
      latestVisitNote: patient.lastVisitDate
        ? `Completed on ${patient.lastVisitDate}.`
        : "",
    },
    account: {
      systemRole: "Patient",
      accountStatus: patient.status ?? "ACTIVE",
      userId,
      username: patient.username ?? (patient.email ? patient.email.split("@")[0] : ""),
      lastLogin: "Not available",
      profileCreated: "Not available",
    },
    appointments: [],
  };
};

const PatientDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");

  const patientId = searchParams.get("id");
  const normalizedPatientId = patientId ? decodeURIComponent(patientId) : "";
  const selectedPatient =
    location.state?.patient ||
    mockPatients.find((patient) => patient.id === normalizedPatientId);

  const patientData = useMemo(
    () => buildPatientDetails(selectedPatient),
    [selectedPatient],
  );

  if (!normalizedPatientId || !patientData) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Patient Details
            </p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">
              Patient profile not found
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              We could not load a patient for this link. Please return to the
              patients list and open a profile from there.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/patients-management")}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Patients Management
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    navigate(`/dashboard/patients-management/edit-patient?id=${encodeURIComponent(selectedPatient.id)}`, {
      state: { patient: selectedPatient },
    });
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/patients-management")}
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
                className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm transition"
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

              <UpcomingAppointmentsCard appointments={patientData.appointments} />
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
