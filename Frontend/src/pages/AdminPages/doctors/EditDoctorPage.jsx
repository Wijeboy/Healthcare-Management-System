import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditDoctorHeaderBanner from "../../../components/admin-components/doctors/edit-doctor/EditDoctorHeaderBanner";
import EditPersonalInfoSection from "../../../components/admin-components/doctors/edit-doctor/EditPersonalInfoSection";
import EditProfessionalInfoSection from "../../../components/admin-components/doctors/edit-doctor/EditProfessionalInfoSection";
import EditAvailabilitySection from "../../../components/admin-components/doctors/edit-doctor/EditAvailabilitySection";
import EditAccountAccessSection from "../../../components/admin-components/doctors/edit-doctor/EditAccountAccessSection";
import { doctorApi } from "../../../services/api";
import { AlertCircle } from "lucide-react";

const buildFormDataFromDoctor = (doctorId, doc) => {
  if (!doc) {
    return {
      initials: "",
      fullName: "",
      email: "",
      phone: "",
      dob: "",
      gender: "",
      address: "",
      doctorId: doctorId || "",
      licenceNumber: "",
      department: "",
      specialization: "",
      qualification: "",
      experience: "",
      bio: "",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
      duration: "30 minutes",
      availabilityStatus: "Available",
      systemRole: "Doctor",
      accountStatus: "Active",
      tempPassword: "",
      username: "",
      lastUpdated: "",
      updatedBy: "",
    };
  }

  // Initials
  const initials = doc.fullName ? doc.fullName.split(" ").map(n => n[0]).join("").toUpperCase() : "";

  return {
    initials: initials || "",
    fullName: doc.fullName || "",
    email: doc.user?.email || "",
    phone: doc.phone || "",
    dob: doc.dob || "",
    gender: doc.gender || "",
    address: doc.address || "",
    doctorId: doc.id || doctorId || "",
    licenceNumber: doc.licenceNumber || "",
    department: doc.department || "",
    specialization: doc.specialization || "",
    qualification: doc.qualification || "",
    experience: doc.experience || "",
    bio: doc.bio || "",
    startTime: doc.startTime || "08:00 AM",
    endTime: doc.endTime || "04:00 PM",
    duration: doc.consultationDuration || "30 minutes",
    availabilityStatus: doc.availability || "Available",
    systemRole: "Doctor",
    accountStatus: doc.status || "Active",
    tempPassword: "",
    username: doc.user?.email ? doc.user.email.split("@")[0] : "",
    lastUpdated: doc.updatedAt ? new Date(doc.updatedAt).toLocaleDateString() : "",
    updatedBy: "System",
  };
};

const EditDoctorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState(buildFormDataFromDoctor(doctorId, null));
  const [workingDays, setWorkingDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [sendInvitation, setSendInvitation] = useState(true);

  const loadDoctor = async () => {
    setLoading(true);
    setError(null);
    try {
      const doc = await doctorApi.getById(doctorId);
      setFormData(buildFormDataFromDoctor(doctorId, doc));
      setWorkingDays(doc.workingDays || ["Mon", "Tue", "Wed", "Thu", "Fri"]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      loadDoctor();
    }
  }, [doctorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleDay = (day) => {
    setWorkingDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day],
    );
  };

  const handleGeneratePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setFormData((prev) => ({ ...prev, tempPassword: pwd }));
  };

  const handleReset = () => {
    loadDoctor();
  };

  const handleSave = async (e) => {
    e?.preventDefault();
    setSubmitError("");
    setSaving(true);
    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        dob: formData.dob,
        gender: formData.gender,
        address: formData.address,
        licenceNumber: formData.licenceNumber,
        department: formData.department,
        specialization: formData.specialization,
        qualification: formData.qualification,
        experience: formData.experience,
        bio: formData.bio,
        startTime: formData.startTime,
        endTime: formData.endTime,
        workingDays: workingDays,
        consultationDuration: formData.duration,
        availability: formData.availabilityStatus,
      };

      await doctorApi.update(doctorId, payload);
      navigate(`/admin/doctors/details?id=${doctorId}`);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-500">Loading doctor details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-3 text-red-500">
          <AlertCircle size={32} className="mx-auto" />
          <p className="text-sm font-medium">{error}</p>
          <button
            onClick={loadDoctor}
            className="text-xs underline text-slate-500 block mx-auto mt-2"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div>
            <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => navigate("/admin/doctors")}
                className="text-[#2563EB] hover:underline font-semibold"
              >
                Doctors Management
              </button>
              <span>&rsaquo;</span>
              <span className="text-slate-400">Edit Doctor</span>
            </nav>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Edit Doctor
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              View and edit doctor's profile. Changes will be persisted to the database.
            </p>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs text-slate-500">
            <span>
              {doctorId
                ? `Editing doctor ID: ${doctorId}`
                : "Editing doctor profile"}
            </span>
            <button
              type="button"
              onClick={() => navigate("/admin/doctors")}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Back to Doctors Management
            </button>
          </div>

          <EditDoctorHeaderBanner
            doctor={{
              initials: formData.initials,
              name: formData.fullName,
              id: formData.doctorId,
              department: formData.department,
              accountStatus: formData.accountStatus,
              lastUpdated: formData.lastUpdated,
              updatedBy: formData.updatedBy,
            }}
          />

          <form onSubmit={handleSave} className="space-y-6">
            {submitError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                <AlertCircle size={16} />
                {submitError}
              </div>
            )}

            <EditPersonalInfoSection
              formData={formData}
              onChange={handleChange}
            />

            <EditProfessionalInfoSection
              formData={formData}
              onChange={handleChange}
            />

            <EditAvailabilitySection
              workingDays={workingDays}
              toggleDay={toggleDay}
              formData={formData}
              onChange={handleChange}
            />

            <EditAccountAccessSection
              formData={formData}
              onChange={handleChange}
              onGeneratePassword={handleGeneratePassword}
              sendInvitation={sendInvitation}
              setSendInvitation={setSendInvitation}
            />

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4 rounded-xl">
              <button
                type="button"
                disabled={saving}
                onClick={() => navigate("/admin/doctors")}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={saving}
                onClick={handleReset}
                className="rounded-lg border border-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                Reset Changes
              </button>
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctorPage;
