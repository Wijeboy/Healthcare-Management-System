import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import EditStaffHeaderBanner from "../../../components/admin-components/staff/edit-staff/EditStaffHeaderBanner";
import PersonalInfoSection from "../../../components/admin-components/staff/add-staff/PersonalInfoSection";
import ContactInfoSection from "../../../components/admin-components/staff/add-staff/ContactInfoSection";
import WorkInfoSection from "../../../components/admin-components/staff/add-staff/WorkInfoSection";
import ReviewSection from "../../../components/admin-components/staff/add-staff/ReviewSection";
import { staffApi } from "../../../services/api";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const buildFormData = (staff) => ({
  fullName: staff?.fullName || staff?.name || "",
  staffId: staff?.staffId || staff?.id || "",
  dob: staff?.dob || "",
  age: staff?.age != null ? String(staff.age) : "",
  gender: staff?.gender || "",
  nationalId: staff?.nationalId || "",
  email: staff?.email || "",
  phone: staff?.phone || "",
  address: staff?.address || "",
  department: staff?.department || "",
  role: staff?.role || "",
  employeeStatus: staff?.employeeStatus || (staff?.status === "PENDING" ? "Pending" : "Active"),
  accessLevel: staff?.accessLevel || "Standard",
  shift: staff?.shift || "Day Shift",
  joiningDate: staff?.joiningDate || "",
  username: staff?.email ? staff.email.split("@")[0] : "",
  tempPassword: "",
  notes: staff?.notes || "",
});

const EditStaff = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const staffId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [formData, setFormData] = useState(() => buildFormData(location.state?.staff));

  useEffect(() => {
    const fetchStaff = async () => {
      if (!staffId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const res = await staffApi.getById(staffId);
        const staffData = res.data || res;
        setFormData(buildFormData(staffData));
      } catch (err) {
        console.error("Failed to load staff details:", err);
        setError("Failed to load staff record from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, [staffId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);

    try {
      const payload = {
        fullName: formData.fullName,
        phone: formData.phone,
        dob: formData.dob,
        age: formData.age ? parseInt(formData.age, 10) : null,
        gender: formData.gender,
        nationalId: formData.nationalId,
        address: formData.address,
        department: formData.department,
        role: formData.role,
        employeeStatus: formData.employeeStatus,
        accessLevel: formData.accessLevel,
        shift: formData.shift,
        joiningDate: formData.joiningDate,
        notes: formData.notes,
      };

      await staffApi.update(staffId, payload);
      toast.success("Staff member updated successfully");
      navigate("/admin/staff");
    } catch (err) {
      console.error("Failed to update staff:", err);
      const message = getFriendlyErrorMessage(err, "We could not update the staff record. Please try again.");
      setSubmitError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!staffId || (error && !formData.fullName)) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F8FAFC] p-8">
        <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Staff not found</h1>
          <p className="mt-2 text-sm text-slate-500">
            {error || "We could not load a staff profile for editing."}
          </p>
          <button
            type="button"
            onClick={() => navigate("/admin/staff")}
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
                onClick={() => navigate("/admin/staff")}
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
                disabled={submitting}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-lg bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-950 transition-colors disabled:opacity-50 inline-flex items-center gap-2"
              >
                {submitting ? <Loader2 size={15} className="animate-spin" /> : null}
                {submitting ? "Saving..." : "Save Changes"}
              </button>
          </div>
        </form>
        </main>
      </div>
    </div>
  );
};

export default EditStaff;
