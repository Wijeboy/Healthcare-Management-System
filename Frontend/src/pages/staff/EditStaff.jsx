import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { mockStaff } from "../../data/mockData";
import EditStaffHeaderBanner from "../../components/staff/edit-staff/EditStaffHeaderBanner";
import PersonalInfoSection from "../../components/staff/add-staff/PersonalInfoSection";
import ContactInfoSection from "../../components/staff/add-staff/ContactInfoSection";
import WorkInfoSection from "../../components/staff/add-staff/WorkInfoSection";
import ReviewSection from "../../components/staff/add-staff/ReviewSection";

const buildFormData = (staff) => ({
  fullName: staff?.name ?? "",
  staffId: staff?.id ?? "",
  dob: "",
  age: staff?.age != null ? String(staff.age) : "",
  gender: staff?.gender ?? "",
  nationalId: "",
  email: staff?.email ?? "",
  phone: staff?.phone ?? "",
  address: "",
  department: staff?.department ?? "",
  role: staff?.role ?? "",
  employeeStatus: staff?.status === "PENDING" ? "Pending" : "Active",
  accessLevel: "Standard",
  shift: "Day Shift",
  joiningDate: "",
  username: staff?.email ? staff.email.split("@")[0] : "",
  tempPassword: "",
  notes: "",
});

const EditStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const staffId = searchParams.get("id");
  const selectedStaff =
    location.state?.staff || mockStaff.find((item) => item.id === staffId);

  const [formData, setFormData] = useState(() => buildFormData(selectedStaff));

  useEffect(() => {
    setFormData(buildFormData(selectedStaff));
  }, [selectedStaff]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating staff member:", formData);
    navigate("/dashboard/staff-management");
  };

  if (!staffId || !selectedStaff) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] p-8">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Staff not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            We could not load a staff profile for editing.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard/staff-management")}
            className="mt-5 rounded-lg bg-[#1E3A8A] px-4 py-2.5 text-sm font-semibold text-white"
          >
            Back to Staff Management
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
                onClick={() => navigate("/dashboard/staff-management")}
                className="text-[#2563EB] hover:underline font-semibold"
              >
                Staff Management
              </button>
              <span>&rsaquo;</span>
              <span className="text-slate-400">Edit Staff</span>
            </nav>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Edit Staff
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Update the staff profile, work assignment, and contact details.
            </p>
          </div>

          <EditStaffHeaderBanner staff={formData} />

          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoSection formData={formData} onChange={handleChange} />
            <ContactInfoSection formData={formData} onChange={handleChange} />
            <WorkInfoSection formData={formData} onChange={handleChange} />
            <ReviewSection formData={formData} />

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4 rounded-xl">
              <button
                type="button"
                onClick={() => navigate("/dashboard/staff-management")}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
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

export default EditStaff;
