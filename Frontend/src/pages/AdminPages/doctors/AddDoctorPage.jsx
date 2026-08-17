import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PersonalInfoSection from "../../../components/admin-components/doctors/add-doctor/PersonalInfoSection";
import ProfessionalInfoSection from "../../../components/admin-components/doctors/add-doctor/ProfessionalInfoSection";
import AvailabilitySection from "../../../components/admin-components/doctors/add-doctor/AvailabilitySection";
import AccountAccessSection from "../../../components/admin-components/doctors/add-doctor/AccountAccessSection";

const AddDoctorPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    doctorId: "DR-NEW-2026",
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
    tempPassword: "Medimate@2026",
    username: "",
  });

  const [workingDays, setWorkingDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
  ]);

  const [sendInvitation, setSendInvitation] = useState(true);

  const [errors, setErrors] = useState({
    fullName: "Full name is required.",
    email: "Enter a valid email address.",
    phone: "Phone number is required.",
    licenceNumber: "Medical licence number is required.",
    department: "Department is required.",
    specialization: "Specialization is required.",
    experience: "Enter years of experience.",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error dynamically on input change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting form:", {
      formData,
      workingDays,
      sendInvitation,
    });
  };

  const handleSaveDraft = () => {
    console.log("Saving doctor as draft:", {
      formData,
      workingDays,
      sendInvitation,
    });
  };
  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Breadcrumbs & Page Title */}
          <div>
            <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
              <a
                href="#"
                className="text-[#2563EB] hover:underline font-semibold"
              >
                Doctors Management
              </a>
              <span>&rsaquo;</span>
              <span className="text-slate-400">Add Doctor</span>
            </nav>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Add New Doctor
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Create a doctor profile, assign professional details, and
              configure account access and availability.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoSection
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />

            <ProfessionalInfoSection
              formData={formData}
              onChange={handleChange}
              errors={errors}
            />

            <AvailabilitySection
              workingDays={workingDays}
              toggleDay={toggleDay}
              formData={formData}
              onChange={handleChange}
            />

            <AccountAccessSection
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
                onClick={handleSaveDraft}
                className="rounded-lg border border-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors"
              >
                Add Doctor
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddDoctorPage;
