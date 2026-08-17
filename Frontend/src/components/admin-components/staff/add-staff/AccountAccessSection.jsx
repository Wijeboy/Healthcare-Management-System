import React from "react";

const AccountAccessSection = ({
  formData,
  onChange,
  onGeneratePassword,
  sendInvitation,
  setSendInvitation,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          4
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Account Access
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Create login credentials and decide whether to send an invitation.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Username
          </label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={onChange}
            placeholder="staff.username"
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Temporary Password
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              name="tempPassword"
              value={formData.tempPassword}
              onChange={onChange}
              className="flex-1 px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={onGeneratePassword}
              className="px-3 py-2 rounded-lg border border-[#CBD5E1] text-slate-700 font-semibold hover:bg-slate-50 transition"
            >
              Generate
            </button>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Employee Status
          </label>
          <select
            name="employeeStatus"
            value={formData.employeeStatus}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Invitation Status
          </label>
          <div className="flex items-center justify-between rounded-lg border border-[#CBD5E1] px-3 py-2.5">
            <div>
              <p className="text-xs font-semibold text-slate-800">
                Send invitation email
              </p>
              <p className="text-[11px] text-slate-400">
                Invite the staff member to activate their account.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setSendInvitation(!sendInvitation)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                sendInvitation ? "bg-[#1E3A8A]" : "bg-slate-300"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
                  sendInvitation ? "translate-x-5" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountAccessSection;
