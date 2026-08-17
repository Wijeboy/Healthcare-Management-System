import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Edit, MoreHorizontal, ArrowLeft, AlertCircle } from "lucide-react";
import { doctorApi } from "../../../services/api";
import DoctorProfileHeaderCard from "../../../components/admin-components/doctors/doctor-details/DoctorProfileHeaderCard";
import PersonalInfoCard from "../../../components/admin-components/doctors/doctor-details/PersonalInfoCard";
import ProfessionalInfoCard from "../../../components/admin-components/doctors/doctor-details/ProfessionalInfoCard";
import CurrentAvailabilityCard from "../../../components/admin-components/doctors/doctor-details/CurrentAvailabilityCard";
import AccountAccessCard from "../../../components/admin-components/doctors/doctor-details/AccountAccessCard";
import UpcomingAppointmentsTable from "../../../components/admin-components/doctors/doctor-details/UpcomingAppointmentsTable";

const mapApiDoctorToUiDoctor = (doc) => {
  if (!doc) return null;

  const initials = doc.fullName
    ? doc.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "";

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const shortToLongDay = {
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
    Sun: "Sunday",
  };
  const scheduleDetails = daysOfWeek.map((day) => {
    const isAvailable =
      doc.workingDays?.some((d) => shortToLongDay[d] === day || d === day) ||
      false;
    return {
      day,
      hours: isAvailable
        ? `${doc.startTime || "08:00 AM"} - ${doc.endTime || "04:00 PM"}`
        : "Not Available",
      isAvailable,
    };
  });

  return {
    id: doc.id,
    name: doc.fullName || "",
    initials: initials || "",
    bio: doc.bio || "",
    personal: {
      fullName: doc.fullName || "",
      email: doc.user?.email || "",
      phone: doc.phone || "",
      dob: doc.dob || "",
      gender: doc.gender || "",
      address: doc.address || "",
    },
    professional: {
      licenceNumber: doc.licenceNumber || "",
      department: doc.department || "",
      specialization: doc.specialization || "",
      qualification: doc.qualification || "",
      experience: doc.experience || "",
      consultationDuration: doc.consultationDuration || "30 minutes",
    },
    availabilityText: doc.availability || "Available",
    scheduleDetails,
    account: {
      systemRole: "Doctor",
      accountStatus: doc.status || "Active",
      username: doc.user?.email ? doc.user.email.split("@")[0] : "",
      profileCreated: doc.createdAt
        ? new Date(doc.createdAt).toLocaleDateString()
        : "Not available",
      lastUpdated: doc.updatedAt
        ? new Date(doc.updatedAt).toLocaleDateString()
        : "Not available",
      updatedBy: "System",
    },
  };
};

const DoctorDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const doctorId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [doctor, setDoctor] = useState(null);

  const loadDoctor = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await doctorApi.getById(doctorId);
      setDoctor(mapApiDoctorToUiDoctor(data));
    } catch (err) {
      console.error("Failed to load doctor details:", err);
      setError("We could not load the doctor profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) {
      loadDoctor();
    }
  }, [doctorId]);

  if (loading) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-slate-500">Loading doctor profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !doctor) {
    return (
      <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-md w-full bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-center">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Doctor Details
            </p>
            <h1 className="mt-2 text-xl font-bold text-slate-900">
              {error || "Doctor profile not found"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              We could not load a doctor for this link. Please return to the
              doctors list and open a profile from there.
            </p>
            <div className="flex justify-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => navigate("/admin/doctors")}
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Doctors List
              </button>
              {error && (
                <button
                  type="button"
                  onClick={loadDoctor}
                  className="inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between">
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
                <span className="text-slate-400">Doctor Details</span>
              </nav>

              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Doctor Details
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                View the doctor's professional profile, contact information,
                availability, and account status.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/doctors/edit?id=${doctor.id}`,
                  )
                }
                className="px-4 py-2 border border-[#CBD5E1] bg-white text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 flex items-center gap-2 shadow-sm transition"
              >
                <Edit size={14} />
                Edit Doctor
              </button>
              <button className="p-2 border border-[#CBD5E1] bg-white text-slate-600 rounded-lg hover:bg-slate-50 transition">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <DoctorProfileHeaderCard doctor={doctor} />

          <div className="border-b border-[#E2E8F0] flex gap-8">
            {["Overview", "Schedule", "Appointments", "Activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-xs font-bold transition-all relative ${
                  activeTab === tab
                    ? "text-[#2563EB]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2563EB] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeTab === "Overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PersonalInfoCard personal={doctor.personal} />
                <ProfessionalInfoCard professional={doctor.professional} />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <CurrentAvailabilityCard
                  schedule={doctor.scheduleDetails || []}
                />
                <AccountAccessCard account={doctor.account} />
              </div>

              <UpcomingAppointmentsTable
                appointments={doctor.upcomingAppointments}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default DoctorDetails;
