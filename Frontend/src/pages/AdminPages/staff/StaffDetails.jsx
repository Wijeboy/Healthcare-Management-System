import React, { useEffect, useState } from "react";
import { ArrowLeft, Edit, MoreHorizontal, Loader2 } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import StaffHeaderCard from "../../../components/admin-components/staff/staff-details/StaffHeaderCard";
import StaffPersonalInfoCard from "../../../components/admin-components/staff/staff-details/StaffPersonalInfoCard";
import StaffWorkInfoCard from "../../../components/admin-components/staff/staff-details/StaffWorkInfoCard";
import StaffContactInfoCard from "../../../components/admin-components/staff/staff-details/StaffContactInfoCard";
import StaffAccountCard from "../../../components/admin-components/staff/staff-details/StaffAccountCard";
import { staffApi } from "../../../services/api";

const calcAge = (dobStr) => {
  if (!dobStr) return "";
  const dob = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
  return age > 0 ? String(age) : "";
};

const mapApiStaffToUiStaff = (data) => {
  if (!data) return null;
  const computedAge = data.age != null ? String(data.age) : calcAge(data.dob);

  return {
    id: data.id || data._id,
    staffId: data.staffId || data.id,
    name: data.fullName || "N/A",
    role: data.role || "Staff Member",
    department: data.department || "General",
    status: data.employeeStatus || data.status || "ACTIVE",
    email: data.email || "",
    phone: data.phone || "",
    age: computedAge || "N/A",
    gender: data.gender || "N/A",
    dob: data.dob || "N/A",
    nationalId: data.nationalId || "N/A",
    address: data.address || "N/A",
    shift: data.shift || "Day Shift",
    accessLevel: data.accessLevel || "Standard",
    joiningDate: data.joiningDate ? new Date(data.joiningDate).toLocaleDateString() : "N/A",
    lastLogin: data.updatedAt ? new Date(data.updatedAt).toLocaleDateString() : "Recently",
    createdAt: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "N/A",
    raw: data,
  };
};

const StaffDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const staffId = searchParams.get("id");

  const [staff, setStaff] = useState(() => mapApiStaffToUiStaff(location.state?.staff));
  const [loading, setLoading] = useState(!location.state?.staff);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStaffDetails = async () => {
      if (!staffId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await staffApi.getById(staffId);
        const data = res.data || res;
        setStaff(mapApiStaffToUiStaff(data));
      } catch (err) {
        console.error("Failed to load staff details:", err);
        setError("Failed to load staff profile from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaffDetails();
  }, [staffId]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC]">
        <div className="flex items-center gap-3 text-slate-500">
          <Loader2 className="w-6 h-6 animate-spin text-[#1E3A8A]" />
          <span>Loading staff profile...</span>
        </div>
      </div>
    );
  }

  if (!staffId || !staff || error) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] p-8">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Staff profile not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            {error || "We could not load a staff profile for this link."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/admin/staff")}
            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white"
          >
            <ArrowLeft size={16} />
            Back to Staff Management
          </button>
        </div>
      </div>
    );
  }

  const account = {
    systemRole: staff.role || "Staff",
    accountStatus: staff.status,
    userId: staff.staffId,
    username: staff.email?.split("@")[0] || "staff.user",
    lastLogin: staff.lastLogin,
    profileCreated: staff.createdAt,
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between">
            <div>
              <nav className="text-xs font-medium text-slate-500 mb-1 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => navigate("/admin/staff")}
                  className="text-[#2563EB] hover:underline font-semibold"
                >
                  Staff Management
                </button>
                <span>&rsaquo;</span>
                <span className="text-slate-400">Staff Details</span>
              </nav>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Staff Details
              </h1>
              <p className="text-xs text-slate-500 mt-0.5">
                View personal, work, contact, and account information.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/admin/staff/edit?id=${encodeURIComponent(staff.id)}`,
                    { state: { staff: staff.raw || staff } }
                  )
                }
                className="px-4 py-2 bg-[#1E3A8A] hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Edit size={14} />
                Edit Staff
              </button>
              <button className="p-2 border border-[#CBD5E1] bg-[#FFFFFF] text-slate-600 rounded-lg cursor-pointer">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <StaffHeaderCard
            staff={{
              ...staff,
              accessLevel: staff.accessLevel || "Standard",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StaffPersonalInfoCard
              personal={{
                fullName: staff.name,
                dob: staff.dob,
                age: staff.age,
                gender: staff.gender,
                staffId: staff.staffId,
                nationalId: staff.nationalId,
                address: staff.address,
              }}
            />
            <StaffWorkInfoCard
              work={{
                department: staff.department,
                role: staff.role,
                staffType: "User",
                shift: staff.shift,
                accessLevel: staff.accessLevel,
                joiningDate: staff.joiningDate,
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StaffContactInfoCard
              contact={{
                email: staff.email,
                phone: staff.phone,
                address: staff.address,
              }}
            />
            <StaffAccountCard account={account} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StaffDetails;




