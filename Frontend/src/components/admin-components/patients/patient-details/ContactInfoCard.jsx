import React from "react";
import { Phone } from "lucide-react";

const ContactInfoCard = ({ contact }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Contact Information
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Patient and emergency contact details
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
          <Phone size={16} />
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
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            EMERGENCY CONTACT
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {contact.emergencyContact}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            RELATIONSHIP
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {contact.relationship}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            EMERGENCY PHONE
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {contact.emergencyPhone}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
            EMERGENCY EMAIL
          </p>
          <p className="font-semibold text-slate-800 mt-1">
            {contact.emergencyEmail}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfoCard;
