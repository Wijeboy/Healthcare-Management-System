import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import EditPatientHeaderBanner from "../../../components/admin-components/patients/edit-patient/EditPatientHeaderBanner";
import EditContactInfoSection from "../../../components/admin-components/patients/edit-patient/EditContactInfoSection";
import EditMedicalInfoSection from "../../../components/admin-components/patients/edit-patient/EditMedicalInfoSection";
import EditEmergencyContactSection from "../../../components/admin-components/patients/edit-patient/EditEmergencyContactSection";
import EditAccountAccessSection from "../../../components/admin-components/patients/edit-patient/EditAccountAccessSection";
import EditPersonalInfoSection from "../../../components/admin-components/patients/edit-patient/EditPersonalInfoSection";
import { patientApi } from "../../../services/api";
import { AlertCircle } from "lucide-react";

const buildFormDataFromPatient = (patientId, p) => {
  if (!p) {
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

  const initials = p.fullName ? p.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : "";

  return {
    initials: initials || "",
    name: p.fullName || "",
    id: p.id || patientId || "",
    fullName: p.fullName || "",
    dob: p.dob || "",
    age: p.age != null ? String(p.age) : "",
    gender: p.gender || "",
    bloodGroup: p.bloodGroup || "",
    patientId: p.id || patientId || "",
    status: p.status || "Active",
    lastVisit: "Not available",
    lastUpdated: p.updatedAt ? new Date(p.updatedAt).toLocaleDateString() : "",
    updatedBy: "System",
    email: p.user?.email || "",
    phone: p.phone || "",
    address: p.address || "",
    allergies: p.allergies || "",
    existingConditions: p.existingConditions || "",
    currentMedications: p.currentMedications || "",
    medicalNotes: p.medicalNotes || "",
    emergencyName: p.emergencyName || "",
    emergencyRelationship: p.emergencyRelationship || "",
    emergencyPhone: p.emergencyPhone || "",
    emergencyEmail: p.emergencyEmail || "",
    accountStatus: p.status || "Active",
    tempPassword: "",
    username: p.user?.email ? p.user.email.split("@")[0] : "",
    sendInvitation: true,
  };
};

const EditPatient = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const patientId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState(buildFormDataFromPatient(patientId, null));

  const loadPatient = async () => {
    setLoading(true);
    setError(null);
    try {
      const p = await patientApi.getById(patientId);
      setFormData(buildFormDataFromPatient(patientId, p));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (patientId) {
      loadPatient();
    }
  }, [patientId]);

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
    loadPatient();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSaving(true);
    try {
      const payload = {
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
      };

      await patientApi.update(patientId, payload);
      navigate(`/admin/patients/details?id=${encodeURIComponent(patientId)}`);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#0256CA] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Loading patient details...</p>
        </div>
      </div>
    );
  }

  if (error || !formData.id) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Edit Patient
          </p>
          <h1 className="mt-2 text-xl font-bold text-slate-900">
            {error || "Patient not found"}
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We could not load this patient profile. Please return to the patients list and try again.
          </p>
          <div className="flex justify-center gap-3 mt-5">
            <button
              type="button"
              onClick={() => navigate("/admin/patients")}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
            >
              Back to Patients List
            </button>
            {error && (
              <button
                type="button"
                onClick={loadPatient}
                className="inline-flex items-center gap-2 rounded-lg bg-[#0256CA] px-4 py-2 text-xs font-bold text-white hover:bg-blue-700 transition"
              >
                Try Again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-5">
          <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
            <button
              type="button"
              disabled={saving}
              onClick={() => navigate("/admin/patients")}
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

        <form onSubmit={handleSubmit} className="space-y-6">
          {submitError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
              <AlertCircle size={16} />
              {submitError}
            </div>
          )}
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
              disabled={saving}
              onClick={() => navigate("/admin/patients")}
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={handleReset}
              className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition disabled:opacity-50"
            >
              Reset Changes
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-lg shadow-sm transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPatient;
