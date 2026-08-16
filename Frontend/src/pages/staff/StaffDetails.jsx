import React, { useMemo } from "react";
import { ArrowLeft, Edit, MoreHorizontal } from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { mockStaff } from "../../data/mockData";
import StaffHeaderCard from "../../components/staff/staff-details/StaffHeaderCard";
import StaffPersonalInfoCard from "../../components/staff/staff-details/StaffPersonalInfoCard";
import StaffWorkInfoCard from "../../components/staff/staff-details/StaffWorkInfoCard";
import StaffContactInfoCard from "../../components/staff/staff-details/StaffContactInfoCard";
import StaffAccountCard from "../../components/staff/staff-details/StaffAccountCard";

const StaffDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const staffId = searchParams.get("id");

  const staff = useMemo(() => {
    return location.state?.staff || mockStaff.find((item) => item.id === staffId);
  }, [location.state?.staff, staffId]);

  if (!staffId || !staff) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] p-8">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Staff profile not found
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            We could not load a staff profile for this link.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/staff-management")}
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
    systemRole: "Staff",
    accountStatus: staff.status,
    userId: staff.id,
    username: staff.email?.split("@")[0] || "staff.user",
    lastLogin: staff.lastLogin,
    profileCreated: "Not available",
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
                  onClick={() => navigate("/dashboard/staff-management")}
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
                    `/dashboard/staff-management/edit-staff?id=${encodeURIComponent(staff.id)}`,
                    { state: { staff } }
                  )
                }
                className="px-4 py-2 bg-[#1E3A8A] hover:bg-blue-950 text-white text-xs font-bold rounded-lg flex items-center gap-1.5"
              >
                <Edit size={14} />
                Edit Staff
              </button>
              <button className="p-2 border border-[#CBD5E1] bg-white text-slate-600 rounded-lg">
                <MoreHorizontal size={16} />
              </button>
            </div>
          </div>

          <StaffHeaderCard
            staff={{
              ...staff,
              accessLevel: "Standard",
            }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StaffPersonalInfoCard
              personal={{
                fullName: staff.name,
                dob: "Not available",
                age: String(staff.age ?? ""),
                gender: staff.gender,
                staffId: staff.id,
                nationalId: "Not available",
                address: "Not available",
              }}
            />
            <StaffWorkInfoCard
              work={{
                department: staff.department,
                role: staff.role,
                staffType: "User",
                shift: "Day Shift",
                accessLevel: "Standard",
                joiningDate: "Not available",
              }}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <StaffContactInfoCard
              contact={{
                email: staff.email,
                phone: staff.phone,
                address: "Not available",
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
