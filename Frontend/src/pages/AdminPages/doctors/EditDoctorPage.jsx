import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import EditDoctorHeaderBanner from "../../../components/admin-components/doctors/edit-doctor/EditDoctorHeaderBanner";
import EditPersonalInfoSection from "../../../components/admin-components/doctors/edit-doctor/EditPersonalInfoSection";
import EditProfessionalInfoSection from "../../../components/admin-components/doctors/edit-doctor/EditProfessionalInfoSection";
import EditAvailabilitySection from "../../../components/admin-components/doctors/edit-doctor/EditAvailabilitySection";
import EditAccountAccessSection from "../../../components/admin-components/doctors/edit-doctor/EditAccountAccessSection";
import { mockDoctors } from "../../../data/mockData";

const buildFormDataFromDoctor = (doctorId, doctorProfile) => {
  if (!doctorProfile) {
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

  const scheduleHours =
    doctorProfile.scheduleDetails?.[0]?.hours || "08:00 AM - 04:00 PM";
  const [startTime, endTime] = scheduleHours.split(" - ");
  const experienceValue =
    doctorProfile.professional?.experience || doctorProfile.experience || "";

  return {
    initials: doctorProfile.initials ?? "",
    fullName: doctorProfile.personal?.fullName ?? doctorProfile.name ?? "",
    email: doctorProfile.personal?.email ?? "",
    phone: doctorProfile.personal?.phone ?? "",
    dob: doctorProfile.personal?.dob ?? "",
    gender: doctorProfile.personal?.gender ?? "",
    address: doctorProfile.personal?.address ?? "",
    doctorId: doctorProfile.id ?? doctorId ?? "",
    licenceNumber: doctorProfile.professional?.licenceNumber ?? "",
    department: doctorProfile.professional?.department ?? "",
    specialization: doctorProfile.professional?.specialization ?? "",
    qualification: doctorProfile.professional?.qualification ?? "",
    experience: experienceValue.replace(/\s+Years?$/, ""),
    bio: doctorProfile.bio ?? "",
    startTime: startTime ?? "08:00 AM",
    endTime: endTime ?? "04:00 PM",
    duration: doctorProfile.professional?.consultationDuration ?? "30 minutes",
    availabilityStatus:
      doctorProfile.availabilityText === "Available"
        ? "Available"
        : (doctorProfile.availabilityText ?? "Available"),
    systemRole: doctorProfile.account?.systemRole ?? "Doctor",
    accountStatus: doctorProfile.account?.accountStatus ?? "Active",
    tempPassword: "",
    username: doctorProfile.account?.username ?? "",
    lastUpdated:
      doctorProfile.account?.lastUpdated ??
      doctorProfile.account?.profileCreated ??
      "",
    updatedBy: doctorProfile.account?.updatedBy ?? "",
  };
};

const EditDoctorPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const doctorId = searchParams.get("id");
  const selectedDoctor = mockDoctors.find((doctor) => doctor.id === doctorId);
  const initialFormData = buildFormDataFromDoctor(doctorId, selectedDoctor);

  const [formData, setFormData] = useState(initialFormData);
  const [workingDays, setWorkingDays] = useState([
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
  ]);
  const [sendInvitation, setSendInvitation] = useState(true);

  useEffect(() => {
    setFormData(buildFormDataFromDoctor(doctorId, selectedDoctor));
    setWorkingDays(
      selectedDoctor?.scheduleDetails?.reduce((days, slot) => {
        if (slot.isAvailable) {
          const shortDay = slot.day.slice(0, 3);
          return days.includes(shortDay) ? days : [...days, shortDay];
        }
        return days;
      }, []) || ["Mon", "Tue", "Wed", "Thu", "Fri"],
    );
  }, [doctorId, selectedDoctor]);

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
    setFormData(buildFormDataFromDoctor(doctorId, selectedDoctor));
    setWorkingDays(
      selectedDoctor?.scheduleDetails?.reduce((days, slot) => {
        if (slot.isAvailable) {
          const shortDay = slot.day.slice(0, 3);
          return days.includes(shortDay) ? days : [...days, shortDay];
        }
        return days;
      }, []) || ["Mon", "Tue", "Wed", "Thu", "Fri"],
    );
  };

  const handleSave = (e) => {
    e?.preventDefault();
    navigate(`/dashboard/doctors-management/details?id=${doctorId}`, {
      state: { doctor: selectedDoctor },
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
              View the doctor's profile in edit mode. Changes are local to the
              form and are not persisted.
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
              department:
                selectedDoctor?.professional?.department ||
                selectedDoctor?.department ||
                selectedDoctor?.specialty ||
                formData.department,
              accountStatus:
                selectedDoctor?.account?.accountStatus ||
                formData.accountStatus,
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
