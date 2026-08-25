import React from "react";
import { PhoneCall } from "lucide-react";

const StaffContactInfoCard = ({ contact }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Contact Information
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Email, phone, and address details
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <PhoneCall size={16} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-y-4 text-xs">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            EMAIL ADDRESS
          </p>
          <p className="font-semibold text-slate-800 mt-1">{contact.email}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            PHONE NUMBER
          </p>
          <p className="font-semibold text-slate-800 mt-1">{contact.phone}</p>
        </div>
        <div className="col-span-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            ADDRESS
          </p>
          <p className="font-semibold text-slate-800 mt-1">{contact.address}</p>
        </div>
      </div>
    </div>
  );
};

export default StaffContactInfoCard;


