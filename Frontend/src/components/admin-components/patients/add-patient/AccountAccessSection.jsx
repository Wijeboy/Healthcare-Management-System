import React from "react";

const AccountAccessSection = ({
  formData,
  handleChange,
  handleToggle,
  onGeneratePassword,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          5
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Account & Access
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Create the patient's account and configure system access.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs mb-5">
        {/* System Role */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            System Role
          </label>
          <input
            type="text"
            readOnly
            value="Patient"
            className="w-full px-3 py-2 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-slate-600 font-semibold cursor-not-allowed"
          />
        </div>

        {/* Account Status */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Account Status <span className="text-rose-500">*</span>
          </label>
          <select
            name="accountStatus"
            value={formData.accountStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Temporary Password */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Temporary Password <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              name="tempPassword"
              value={formData.tempPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={onGeneratePassword}
              className="px-3 py-2 border border-[#CBD5E1] bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg transition shrink-0"
            >
              Generate
            </button>
          </div>
          <span className="text-[10px] text-slate-400 mt-1 block">
            The patient can change this password after the first login.
          </span>
        </div>

        {/* Username */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            placeholder="Generated from email"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            Leave blank to use the email address.
          </span>
        </div>
      </div>

      {/* Invitation Checkbox Switch */}
      <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-slate-800">
            Send account invitation
          </p>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Email the patient with login details and password-reset
            instructions.
          </p>
        </div>

        <button
          type="button"
          onClick={handleToggle}
          className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out ${
            formData.sendInvitation ? "bg-[#0256CA]" : "bg-slate-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              formData.sendInvitation ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default AccountAccessSection;
