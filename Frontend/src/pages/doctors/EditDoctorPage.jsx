import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditDoctorHeaderBanner from "../../components/doctors/edit-doctor/EditDoctorHeaderBanner";
import EditPersonalInfoSection from "../../components/doctors/edit-doctor/EditPersonalInfoSection";
import EditProfessionalInfoSection from "../../components/doctors/edit-doctor/EditProfessionalInfoSection";
import EditAvailabilitySection from "../../components/doctors/edit-doctor/EditAvailabilitySection";
import EditAccountAccessSection from "../../components/doctors/edit-doctor/EditAccountAccessSection";
import {
  initialDoctorFormData,
  doctorProfilesById,
} from "../../data/doctorProfiles";

const EditDoctorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const selectedDoctor = doctorProfilesById[doctorId];

  const [formData, setFormData] = useState(
    initialDoctorFormData,
  );
  const [workingDays, setWorkingDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const [sendInvitation, setSendInvitation] = useState(true);

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
    setFormData(initialDoctorFormData);
    setWorkingDays(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    console.log("Updated doctor profile data:", {
      doctorId,
      formData,
      workingDays,
      sendInvitation,
    });
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div>
            <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => navigate("/dashboard/doctors-management")}
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
              Update the doctor's personal information, professional details,
              availability, and account access.
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
              onClick={() => navigate("/dashboard/doctors-management")}
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Back to Doctors Management
            </button>
          </div>

          <EditDoctorHeaderBanner
            doctor={{
              initials: doctorProfilesById[doctorId]?.initials || selectedDoctor?.initials || formData.initials,
              name: doctorProfilesById[doctorId]?.name || selectedDoctor?.name || formData.fullName,
              id: doctorProfilesById[doctorId]?.id || selectedDoctor?.id || formData.doctorId,
              department: doctorProfilesById[doctorId]?.department || selectedDoctor?.specialty || formData.department,
              accountStatus: doctorProfilesById[doctorId]?.account?.accountStatus || formData.accountStatus,
              lastUpdated: formData.lastUpdated,
              updatedBy: formData.updatedBy,
            }}
          />

          <form onSubmit={handleSave} className="space-y-6">
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
                onClick={() => navigate("/dashboard/doctors-management")}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="rounded-lg border border-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors"
              >
                Reset Changes
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditDoctorPage;
