import React from "react";
import { Shield } from "lucide-react";

const AccountAccessCard = ({ account }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Account & Access
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            System role and account information
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Shield size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            SYSTEM ROLE
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {account.systemRole}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ACCOUNT STATUS
          </p>
          <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 font-bold text-[10px] rounded uppercase">
            {account.accountStatus}
          </span>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            USER ID
          </p>
          <p className="font-semibold text-slate-800 mt-1">{account.userId}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            USERNAME
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {account.username}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            LAST LOGIN
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {account.lastLogin}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            PROFILE CREATED
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {account.profileCreated}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountAccessCard;


