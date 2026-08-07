import React from 'react'
import FormSectionHeader from './FormSectionHeader';

const AccountAccessSection = ({
  formData,
  onChange,
  onGeneratePassword,
  sendInvitation,
  setSendInvitation,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <FormSectionHeader
        number={4}
        title="Account & Access"
        description="Create the doctor's user account and assign secure system access."
      />

      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {/* System Role */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            System Role
          </label>
          <input
            type="text"
            disabled
            value={formData.systemRole}
            className="w-full px-3.5 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-sm text-slate-600 font-medium"
          />
        </div>

        {/* Account Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Account Status <span className="text-rose-500">*</span>
          </label>
          <select
            name="accountStatus"
            value={formData.accountStatus}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Temporary Password */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Temporary Password <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tempPassword"
              value={formData.tempPassword}
              onChange={onChange}
              className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={onGeneratePassword}
              className="px-3.5 py-2 border border-[#2563EB] text-[#2563EB] font-bold text-xs rounded-lg hover:bg-blue-50 transition shrink-0"
            >
              Generate
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            The doctor can change this after the first login.
          </p>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            placeholder="Generated from email"
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Leave blank to use the email address.
          </p>
        </div>

        {/* Send invitation banner */}
        <div className="col-span-2 mt-2 bg-[#F8FAFC] border border-[#CBD5E1]/80 rounded-xl p-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setSendInvitation(!sendInvitation)}
            className={`w-10 h-5 flex items-center rounded-full p-0.5 transition-colors ${
              sendInvitation ? "bg-[#2563EB]" : "bg-slate-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                sendInvitation ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <div>
            <p className="text-xs font-bold text-slate-800 leading-tight">
              Send account invitation
            </p>
            <p className="text-[11px] text-slate-500">
              Email the doctor with login details and password-reset
              instructions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAccessSection