import React, { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PersonalInfoSection from "../../../components/admin-components/patients/add-patient/PersonalInfoSection";
import ContactInfoSection from "../../../components/admin-components/patients/add-patient/ContactInfoSection";
import MedicalInfoSection from "../../../components/admin-components/patients/add-patient/MedicalInfoSection";
import EmergencyContactSection from "../../../components/admin-components/patients/add-patient/EmergencyContactSection";
import AccountAccessSection from "../../../components/admin-components/patients/add-patient/AccountAccessSection";
import { patientApi } from "../../../services/api";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

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

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const requiredFields = [
    "fullName",
    "dob",
    "gender",
    "bloodGroup",
    "email",
    "phone",
    "address",
    "allergies",
    "emergencyName",
    "emergencyRelationship",
    "emergencyPhone",
    "accountStatus",
    "tempPassword",
  ];

  const isMissing = (field) => !String(formData[field] ?? "").trim();
  const showRequiredMark = (field) => {
    if (!requiredFields.includes(field)) return false;
    return isMissing(field);
  };

  const validateForm = () =>
    requiredFields.filter((field) => isMissing(field));

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitAttempted(true);

    const missingFields = validateForm();
    if (missingFields.length > 0) {
      const message = "Please complete all required fields before registering the patient.";
      setSubmitError(message);
      toast.error(message);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.tempPassword || "Medimate@2026",
        fullName: formData.fullName,
        phone: formData.phone,
        dob: formData.dob,
        bloodGroup: formData.bloodGroup,
        age: formData.age,
        gender: formData.gender,
        address: formData.address,
        allergies: formData.allergies,
        existingConditions: formData.existingConditions,
        currentMedications: formData.currentMedications,
        medicalNotes: formData.medicalNotes,
        emergencyName: formData.emergencyName,
        emergencyRelationship: formData.emergencyRelationship,
        emergencyPhone: formData.emergencyPhone,
        emergencyEmail: formData.emergencyEmail,
        status: formData.accountStatus || "Active",
      };

      await patientApi.create(payload);
      toast.success("Patient created successfully");
      navigate("/admin/patients");
    } catch (err) {
      console.error("Failed to create patient:", err);
      const friendlyMessage = getFriendlyErrorMessage(
        err,
        "We could not register the patient. Please try again."
      );
      setSubmitError(friendlyMessage);
      toast.error(friendlyMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans p-8">
      <div className="max-w-5xl mx-auto">
        {/* Top Header */}
        <div className="mb-6">
          <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
            <button
              className="text-[#2563EB] hover:underline font-semibold"
              onClick={() => navigate("/admin/patients")}
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
        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 mb-6">
              <AlertCircle size={16} />
              {submitError}
            </div>
          )}
          <PersonalInfoSection
            formData={formData}
            handleChange={handleChange}
            showRequiredMark={showRequiredMark}
          />
          <ContactInfoSection
            formData={formData}
            handleChange={handleChange}
            showRequiredMark={showRequiredMark}
          />

          <MedicalInfoSection
            formData={formData}
            handleChange={handleChange}
            showRequiredMark={showRequiredMark}
          />
          <EmergencyContactSection
            formData={formData}
            handleChange={handleChange}
            showRequiredMark={showRequiredMark}
          />
          <AccountAccessSection
            formData={formData}
            handleChange={handleChange}
            handleToggle={handleToggleInvitation}
            onGeneratePassword={handleGeneratePassword}
            showRequiredMark={showRequiredMark}
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 mt-8">
            <button
              type="button"
              disabled={loading}
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
              onClick={() => navigate("/admin/patients")}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
            >
              {loading ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
              {loading ? "Registering..." : "Register Patient"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPatient;
