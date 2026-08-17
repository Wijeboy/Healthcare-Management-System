import React from 'react'
import { ShieldCheck } from "lucide-react";

const AccountAccessCard = ({ account }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Account & Access
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            System role and account information
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
          <ShieldCheck size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            SYSTEM ROLE
          </p>
          <p className="font-semibold text-slate-800">{account.systemRole}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            ACCOUNT STATUS
          </p>
          <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
            {account.accountStatus}
          </span>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            USERNAME
          </p>
          <p className="font-semibold text-slate-800">{account.username}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            LAST LOGIN
          </p>
          <p className="font-semibold text-slate-800">{account.lastLogin}</p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            PROFILE CREATED
          </p>
          <p className="font-semibold text-slate-800">
            {account.profileCreated}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-0.5">
            INVITATION STATUS
          </p>
          <p className="font-semibold text-slate-800">
            {account.invitationStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountAccessCard