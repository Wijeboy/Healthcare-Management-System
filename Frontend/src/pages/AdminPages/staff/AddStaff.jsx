import React, { useState } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FormSectionHeader from "../../../components/admin-components/staff/add-staff/FormSectionHeader";
import PersonalInfoSection from "../../../components/admin-components/staff/add-staff/PersonalInfoSection";
import ContactInfoSection from "../../../components/admin-components/staff/add-staff/ContactInfoSection";
import WorkInfoSection from "../../../components/admin-components/staff/add-staff/WorkInfoSection";
import ReviewSection from "../../../components/admin-components/staff/add-staff/ReviewSection";
import { staffApi } from "../../../services/api";

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

  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setLoading(true);

    try {
      const payload = {
        email: formData.email,
        password: formData.tempPassword || "Medimate@2026",
        fullName: formData.fullName,
        phone: formData.phone,
        dob: formData.dob,
        age: formData.age,
        gender: formData.gender,
        nationalId: formData.nationalId,
        address: formData.address,
        department: formData.department,
        role: formData.role,
        employeeStatus: formData.employeeStatus || "Active",
        accessLevel: formData.accessLevel || "Standard",
        shift: formData.shift,
        joiningDate: formData.joiningDate,
        notes: formData.notes,
        permissions: [],
      };

      await staffApi.create(payload);
      navigate("/admin/staff");
    } catch (err) {
      console.error("Failed to add staff:", err);
      setSubmitError("We could not add the staff member. Please try again.");
    } finally {
      setLoading(false);
    }
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
                onClick={() => navigate("/admin/staff")}
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

          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <PersonalInfoSection formData={formData} onChange={handleChange} />
            <ContactInfoSection formData={formData} onChange={handleChange} />
            <WorkInfoSection formData={formData} onChange={handleChange} />
            <ReviewSection formData={formData} />

            <div className="flex items-center justify-end gap-3 border-t border-slate-200 bg-white px-6 py-4 rounded-xl">
              <button
                type="button"
                onClick={() => navigate("/admin/staff")}
                disabled={loading}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="rounded-lg border border-[#2563EB] px-4 py-2.5 text-sm font-semibold text-[#2563EB] hover:bg-blue-50 transition-colors disabled:opacity-50"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors inline-flex items-center gap-2 disabled:opacity-50"
              >
                <Plus size={15} />
                {loading ? "Creating..." : "Create Staff"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default AddStaff;
