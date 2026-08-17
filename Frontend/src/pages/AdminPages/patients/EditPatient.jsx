import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EditPatientHeaderBanner from "../../../components/admin-components/patients/edit-patient/EditPatientHeaderBanner";
import EditContactInfoSection from "../../../components/admin-components/patients/edit-patient/EditContactInfoSection";
import EditMedicalInfoSection from "../../../components/admin-components/patients/edit-patient/EditMedicalInfoSection";
import EditEmergencyContactSection from "../../../components/admin-components/patients/edit-patient/EditEmergencyContactSection";
import EditAccountAccessSection from "../../../components/admin-components/patients/edit-patient/EditAccountAccessSection";
import EditPersonalInfoSection from "../../../components/admin-components/patients/edit-patient/EditPersonalInfoSection";
import { mockPatients } from "../../../data/mockData";

const buildFormDataFromPatient = (patientId, patientProfile) => {
  if (!patientProfile) {
    return {
      initials: "",
      name: "",
      id: patientId || "",
      fullName: "",
      dob: "",
      age: "",
      gender: "",
      bloodGroup: "",
      patientId: patientId || "",
      status: "Active",
      lastVisit: "",
      lastUpdated: "",
      updatedBy: "",
      email: "",
      phone: "",
      address: "",
      allergies: "",
      existingConditions: "",
      currentMedications: "",
      medicalNotes: "",
      emergencyName: "",
      emergencyRelationship: "",
      emergencyPhone: "",
      emergencyEmail: "",
      accountStatus: "Active",
      tempPassword: "",
      username: "",
      sendInvitation: true,
    };
  }

  return {
    initials: patientProfile.initials ?? "",
    name: patientProfile.name ?? "",
    id: patientProfile.id ?? patientId ?? "",
    fullName: patientProfile.name ?? "",
    dob: patientProfile.dob ?? "",
    age: patientProfile.age != null ? String(patientProfile.age) : "",
    gender: patientProfile.gender ?? "",
    bloodGroup: patientProfile.bloodGroup ?? "",
    patientId: patientProfile.id ?? patientId ?? "",
    status:
      patientProfile.status === "PENDING"
        ? "Pending"
        : patientProfile.status === "INACTIVE"
          ? "Inactive"
          : "Active",
    lastVisit: patientProfile.lastVisitDate ?? "",
    lastUpdated: patientProfile.lastUpdated ?? "",
    updatedBy: patientProfile.updatedBy ?? "",
    email: patientProfile.email ?? "",
    phone: patientProfile.phone ?? "",
    address: patientProfile.address ?? "",
    allergies:
      patientProfile.allergies ?? patientProfile.medicalSummaryTitle ?? "",
    existingConditions: patientProfile.existingConditions ?? "",
    currentMedications: patientProfile.currentMedications ?? "",
    medicalNotes:
      patientProfile.medicalNotes ??
      patientProfile.medicalSummarySubtitle ??
      "",
    emergencyName: patientProfile.emergencyName ?? "",
    emergencyRelationship: patientProfile.emergencyRelationship ?? "",
    emergencyPhone: patientProfile.emergencyPhone ?? "",
    emergencyEmail: patientProfile.emergencyEmail ?? "",
    accountStatus:
      patientProfile.status === "PENDING"
        ? "Pending"
        : patientProfile.status === "INACTIVE"
          ? "Inactive"
          : "Active",
    tempPassword: "",
    username: patientProfile.email ? patientProfile.email.split("@")[0] : "",
    sendInvitation: true,
  };
};

const EditPatient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("id");
  const selectedPatient =
    location.state?.patient ||
    mockPatients.find((patient) => patient.id === patientId);
  const patientNotFound = Boolean(patientId) && !selectedPatient;

  const [formData, setFormData] = useState(() =>
    buildFormDataFromPatient(patientId, selectedPatient),
  );

  useEffect(() => {
    setFormData(buildFormDataFromPatient(patientId, selectedPatient));
  }, [patientId, selectedPatient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleInvitation = () => {
    setFormData((prev) => ({ ...prev, sendInvitation: !prev.sendInvitation }));
  };

  const handleGeneratePassword = () => {
    const randomPass = "Medimate@" + Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({ ...prev, tempPassword: randomPass }));
  };

  const handleReset = () => {
    setFormData(buildFormDataFromPatient(patientId, selectedPatient));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated Patient Data:", formData);
    navigate("/dashboard/patients-management");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans p-8">
      <div className="max-w-5xl mx-auto">
        {patientNotFound ? (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
            <h1 className="text-xl font-bold text-amber-900">
              Patient not found
            </h1>
            <p className="mt-2 text-sm text-amber-800">
              We could not find a patient record for id{" "}
              <span className="font-semibold">{patientId}</span>.
            </p>
            <button
              type="button"
              onClick={() => navigate("/dashboard/patients-management")}
              className="mt-4 rounded-lg bg-[#0256CA] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
            >
              Back to Patients Management
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5">
              <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/patients-management")}
                  className="text-[#2563EB] hover:underline font-semibold"
                >
                  Patients Management
                </button>
                <span>&gt;</span>
                <span className="text-slate-400">Edit Patient</span>
              </nav>

              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Edit Patient
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                Review and update the patient's personal details, medical
                information, emergency contact, and account access.
              </p>
            </div>

            <EditPatientHeaderBanner patient={formData} />

            <form onSubmit={handleSubmit}>
              <EditPersonalInfoSection
                formData={formData}
                handleChange={handleChange}
              />
              <EditContactInfoSection
                formData={formData}
                handleChange={handleChange}
              />
              <EditMedicalInfoSection
                formData={formData}
                handleChange={handleChange}
              />
              <EditEmergencyContactSection
                formData={formData}
                handleChange={handleChange}
              />
              <EditAccountAccessSection
                formData={formData}
                handleChange={handleChange}
                handleToggle={handleToggleInvitation}
                onGeneratePassword={handleGeneratePassword}
              />

              <div className="flex items-center justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/patients-management")}
                  className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition"
                >
                  Reset Changes
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPatient;
