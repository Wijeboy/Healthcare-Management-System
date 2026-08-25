import React, { useEffect, useState } from "react";
import { Loader2, LockKeyhole, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { settingsApi } from "../../../services/api";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const GeneralSettingsPanel = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      const email = localStorage.getItem("hmsEmail");
      if (!email) {
        setError("No admin session email was found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const data = await settingsApi.getAdminProfile(email);
        setProfile(data);
        setFormData({
          fullName: data.profile?.fullName || "",
          phone: data.profile?.phone || "",
          email: data.email || "",
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error("Failed to load admin profile:", err);
        setError(getFriendlyErrorMessage(err, "We could not load your profile. Please try again."));
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setError("Full name, phone, and email are required.");
      return;
    }

    if (formData.newPassword || formData.confirmPassword || formData.currentPassword) {
      if (!formData.currentPassword || !formData.newPassword) {
        setError("Current password and new password are required to change the password.");
        return;
      }
      if (formData.newPassword !== formData.confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }
    }

    setSaving(true);
    try {
      const currentEmail = profile?.email || localStorage.getItem("hmsEmail");
      const updated = await settingsApi.updateAdminProfile(currentEmail, {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      const updatedEmail = updated.email || updated.user?.email || formData.email.trim();
      localStorage.setItem("hmsEmail", updatedEmail);
      setProfile(updated);
      setFormData((prev) => ({
        ...prev,
        fullName: updated.profile?.fullName || formData.fullName.trim(),
        phone: updated.profile?.phone || formData.phone.trim(),
        email: updatedEmail,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update admin profile:", err);
      const message = getFriendlyErrorMessage(err, "We could not update your profile. Please try again.");
      setError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
        <div className="flex items-center justify-center gap-3 text-slate-500">
          <Loader2 className="animate-spin" size={18} />
          <span className="text-sm">Loading your admin profile...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#2563EB]">General Settings</p>
          <h2 className="text-xl font-bold text-slate-900">Admin Profile & Password</h2>
          <p className="text-sm text-slate-500 mt-1">
            Update your own profile details and rotate your password securely.
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Signed in as</p>
          <p className="mt-1 text-sm font-semibold text-slate-900">{profile?.email || formData.email}</p>
        </div>
      </div>

      {error && (
        <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Full Name</span>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                placeholder="Your full name"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</span>
            <div className="relative">
              <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
                placeholder="Phone number"
              />
            </div>
          </label>

          <label className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</span>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                name="email"
                type="email"
                value={formData.email}
                readOnly
                disabled
                className="w-full rounded-xl border border-slate-200 bg-slate-100 py-3 pl-10 pr-4 text-sm text-slate-500 cursor-not-allowed outline-none"
                placeholder="Email address"
              />
            </div>
            <p className="text-[11px] text-slate-400">Email address is fixed and cannot be changed.</p>
          </label>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Account role</p>
            <div className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <ShieldCheck size={16} className="text-[#2563EB]" />
              Admin
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Role is fixed and managed by the system.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
          <div className="flex items-center gap-2">
            <LockKeyhole size={16} className="text-[#2563EB]" />
            <h3 className="text-sm font-bold text-slate-900">Change Password</h3>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Current password"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
            />
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/15"
            />
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Leave the password fields blank if you only want to update your profile details.
          </p>
        </div>

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setFormData((prev) => ({
              ...prev,
              fullName: profile?.profile?.fullName || "",
              phone: profile?.profile?.phone || "",
              email: profile?.email || "",
              currentPassword: "",
              newPassword: "",
              confirmPassword: "",
            }))}
            className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#1E3A8A] px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-900 disabled:opacity-60"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : null}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettingsPanel;
