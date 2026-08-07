import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditPatientHeaderBanner from "../../components/patients/edit-patient/EditPatientHeaderBanner";
import EditContactInfoSection from "../../components/patients/edit-patient/EditContactInfoSection";
import EditMedicalInfoSection from "../../components/patients/edit-patient/EditMedicalInfoSection";
import EditEmergencyContactSection from "../../components/patients/edit-patient/EditEmergencyContactSection";
import EditAccountAccessSection from "../../components/patients/edit-patient/EditAccountAccessSection";
import EditPersonalInfoSection from "../../components/patients/edit-patient/EditPersonalInfoSection";
import { mockPatients } from "../../data/mockData";

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
    allergies: patientProfile.allergies ?? patientProfile.medicalSummaryTitle ?? "",
    existingConditions: patientProfile.existingConditions ?? "",
    currentMedications: patientProfile.currentMedications ?? "",
    medicalNotes: patientProfile.medicalNotes ?? patientProfile.medicalSummarySubtitle ?? "",
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
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("id");
  const selectedPatient = mockPatients.find((patient) => patient.id === patientId);

  const [formData, setFormData] = useState(() =>
    buildFormDataFromPatient(patientId, selectedPatient)
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
        <div className="mb-5">
          <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
            <button type="button" onClick={() => navigate("/dashboard/patients-management")} className="text-[#2563EB] hover:underline font-semibold">
              Patients Management
            </button>
            <span>&gt;</span>
            <span className="text-slate-400">Edit Patient</span>
          </nav>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Patient
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review and update the patient's personal details, medical information,
            emergency contact, and account access.
          </p>
        </div>

        <EditPatientHeaderBanner patient={formData} />

        <form onSubmit={handleSubmit}>
          <EditPersonalInfoSection
            formData={formData}
            handleChange={handleChange}
            onReset={handleReset}
            onSave={handleSubmit}
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
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
