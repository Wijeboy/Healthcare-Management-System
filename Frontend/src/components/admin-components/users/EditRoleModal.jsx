import React, { useState } from "react";
import { Check, X } from "lucide-react";
import { userApi } from "../../../services/api";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const ROLES = ["Patient", "Doctor", "Admin", "Staff"];

const EditRoleModal = ({ user, onClose, onSave }) => {
  const [role, setRole] = useState(user.role);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await userApi.assignRole(user.id, role);
      toast.success("User role updated successfully");
      onSave();
      onClose();
    } catch (err) {
      console.error("Failed to update user role:", err);
      toast.error(getFriendlyErrorMessage(err, "We could not update the role. Please try again."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-800">Change Role</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 cursor-pointer">
            <X size={20} />
          </button>
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Changing role for: <span className="font-semibold text-slate-700">{user.email}</span>
        </p>
        <div className="grid grid-cols-2 gap-2 mb-6">
          {ROLES.map((r) => (
            <button
              key={r}
              onClick={() => setRole(r)}
              className={`py-2.5 px-3 rounded-xl border-2 text-sm font-semibold transition ${
                role === r
                  ? "border-[#1E3A8A] bg-[#EFF6FF] text-[#1E3A8A]"
                  : "border-slate-200 text-slate-600 hover:border-slate-300"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white rounded-xl text-sm font-semibold disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
          >
            {saving ? (
              <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving...</>
            ) : (
              <><Check size={16} />Save Role</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRoleModal;
