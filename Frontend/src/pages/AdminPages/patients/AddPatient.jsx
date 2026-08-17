import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PersonalInfoSection from "../../../components/admin-components/patients/add-patient/PersonalInfoSection";
import ContactInfoSection from "../../../components/admin-components/patients/add-patient/ContactInfoSection";
import MedicalInfoSection from "../../../components/admin-components/patients/add-patient/MedicalInfoSection";
import EmergencyContactSection from "../../../components/admin-components/patients/add-patient/EmergencyContactSection";
import AccountAccessSection from "../../../components/admin-components/patients/add-patient/AccountAccessSection";

const AddPatient = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "create";

  const [formData, setFormData] = useState({
    fullName: "",
    dob: "",
    age: "",
    gender: "",
    bloodGroup: "",
    patientId: "PAT-NEW-2026",
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
    tempPassword: "Medimate@2026",
    username: "",
    sendInvitation: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleInvitation = () => {
    setFormData((prev) => ({
      ...prev,
      sendInvitation: !prev.sendInvitation,
    }));
  };

  const handleGeneratePassword = () => {
    const randomPass = "Medimate@" + Math.floor(1000 + Math.random() * 9000);
    setFormData((prev) => ({ ...prev, tempPassword: randomPass }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registering Patient:", formData);
    navigate("/dashboard/patients-management");
  };
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans p-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="mb-6">
          <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
            <button
              className="text-[#2563EB] hover:underline font-semibold"
              onClick={() => navigate("/dashboard/patients-management")}
            >
              Patients Management
            </button>
            <span>›</span>
            <span className="text-slate-400">Add Patient</span>
          </nav>

          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            {mode === "edit" ? "Edit Patient" : "Register New Patient"}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            {mode === "edit"
              ? "Update the patient profile, medical information, and account access."
              : "Create a patient profile, record essential medical information, and configure account access."}
          </p>
        </div>

        {/* Form Wrap */}
        <form onSubmit={handleSubmit}>
          <PersonalInfoSection
            formData={formData}
            handleChange={handleChange}
          />
          <ContactInfoSection formData={formData} handleChange={handleChange} />

          <MedicalInfoSection formData={formData} handleChange={handleChange} />
          <EmergencyContactSection
            formData={formData}
            handleChange={handleChange}
          />
          <AccountAccessSection
            formData={formData}
            handleChange={handleChange}
            handleToggle={handleToggleInvitation}
            onGeneratePassword={handleGeneratePassword}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition"
              onClick={() => navigate("/dashboard/patients-management")}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition"
            >
              <Plus size={15} />
              Register Patient
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
