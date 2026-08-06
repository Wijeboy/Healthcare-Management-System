import React from 'react'
import { Pencil, Trash2, Mail, Phone } from "lucide-react";

const StaffCard = ({ member }) => {
    const roleBadgeStyles = {
      green: "bg-emerald-100 text-emerald-700",
      teal: "bg-teal-100 text-teal-700",
      emerald: "bg-emerald-100 text-emerald-700",
      gray: "bg-slate-100 text-slate-700",
    };
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative flex flex-col justify-between">
      <div>
        {/* Top Header Section */}
        <div className="flex items-start gap-3">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0 pr-12">
            <h3 className="text-sm font-bold text-slate-900 truncate leading-snug">
              {member.name}
            </h3>
            <span
              className={`inline-block px-2 py-0.5 mt-1 rounded text-[10px] font-bold tracking-wider uppercase ${roleBadgeStyles[member.roleColor]}`}
            >
              {member.role}
            </span>
          </div>
          {/* Action Icons */}
          <div className="absolute top-4 right-4 flex items-center gap-1.5 text-slate-400">
            <button className="hover:text-slate-600 transition-colors p-1">
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button className="hover:text-red-600 transition-colors p-1">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span className="truncate">{member.email}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            <span>{member.phone}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wider ${
            member.status === "ACTIVE"
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-600"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full ${member.status === "ACTIVE" ? "bg-emerald-500" : "bg-rose-500"}`}
          ></span>
          {member.status}
        </span>
        <span className="text-xs font-mono text-slate-400">{member.code}</span>
      </div>
    </div>
  );
}

export default StaffCard