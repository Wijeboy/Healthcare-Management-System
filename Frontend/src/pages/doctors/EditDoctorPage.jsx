import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { mockdoctors } from "../../data/mockData";
import EditDoctorHeaderBanner from "../../components/doctors/edit-doctor/EditDoctorHeaderBanner";
import EditPersonalInfoSection from "../../components/doctors/edit-doctor/EditPersonalInfoSection";
import EditProfessionalInfoSection from "../../components/doctors/edit-doctor/EditProfessionalInfoSection";
import EditAvailabilitySection from "../../components/doctors/edit-doctor/EditAvailabilitySection";
import EditAccountAccessSection from "../../components/doctors/edit-doctor/EditAccountAccessSection";

const initialDoctorData = {
  initials: "SC",
  fullName: "Dr. Sarah Chen",
  email: "sarah.chen@medimate.lk",
  phone: "+94 77 123 4567",
  dob: "03/14/1986",
  gender: "Female",
  address: "No. 24, Lake Road, Colombo 07, Sri Lanka",
  doctorId: "DR-1042",
  licenceNumber: "SLMC-45872",
  department: "Cardiology",
  specialization: "Interventional Cardiology",
  qualification: "MBBS, MD Cardiology",
  experience: "12",
  bio: "Consultant cardiologist with 12 years of clinical experience in interventional cardiology, cardiac diagnostics, and long-term patient care.",
  startTime: "08:00 AM",
  endTime: "04:00 PM",
  duration: "30 minutes",
  availabilityStatus: "Available",
  systemRole: "Doctor",
  accountStatus: "Active",
  tempPassword: "Medimate@2026",
  username: "sarah.chen",
  lastUpdated: "03 Aug 2026, 10:30 AM",
  updatedBy: "Imasha - Senior Admin",
};

const doctorDetailsById = {
  "DR-1042": initialDoctorData,
};

const EditDoctorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const selectedDoctor = mockdoctors.find((doctor) => doctor.id === doctorId);

  const [formData, setFormData] = useState(
    doctorDetailsById[doctorId] || initialDoctorData,
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
    setFormData(doctorDetailsById[doctorId] || initialDoctorData);
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
              initials: selectedDoctor?.initials || formData.initials,
              name: selectedDoctor?.name || formData.fullName,
              id: selectedDoctor?.id || formData.doctorId,
              department: selectedDoctor?.specialty || formData.department,
              accountStatus: formData.accountStatus,
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
