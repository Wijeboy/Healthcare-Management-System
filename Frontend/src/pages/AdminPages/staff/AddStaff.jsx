import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormSectionHeader from "../../components/staff/add-staff/FormSectionHeader";
import PersonalInfoSection from "../../components/staff/add-staff/PersonalInfoSection";
import ContactInfoSection from "../../components/staff/add-staff/ContactInfoSection";
import WorkInfoSection from "../../components/staff/add-staff/WorkInfoSection";
import ReviewSection from "../../components/staff/add-staff/ReviewSection";

const AddStaff = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    staffId: "STF-NEW-2026",
    dob: "",
    age: "",
    gender: "",
    nationalId: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    role: "",
    employeeStatus: "Active",
    accessLevel: "Standard",
    shift: "Day Shift",
    joiningDate: "",
    username: "",
    tempPassword: "Medimate@2026",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Creating Staff Member:", formData);
    navigate("/dashboard/staff-management");
  };

  const handleSaveDraft = () => {
    console.log("Saving staff draft:", formData);
  };

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
              <span className="text-slate-400">Add Staff</span>
            </nav>

            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Add New Staff
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Create a staff profile, assign department and role details, and
              configure account access.
            </p>
          </div>

          <FormSectionHeader formData={formData} />

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
                type="button"
                onClick={handleSaveDraft}
                className="rounded-lg border border-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors inline-flex items-center gap-2"
              >
                <Plus size={15} />
                Create Staff
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddStaff;
