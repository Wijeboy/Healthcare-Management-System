import React from 'react'
import { Mail, Phone, Clock, Eye, Edit2, Trash2, Loader2 } from "lucide-react";

const DoctorCard = ({ doctor, onView, onEdit, onDelete, deleting = false }) => {
    const displayName = doctor.fullName || doctor.name || "Unnamed Doctor";
    const displaySpecialty = doctor.specialization || doctor.specialty || doctor.department || "Doctor";
    const displayEmail = doctor.email || doctor.user?.email || "Email not available";
    const displaySchedule =
      doctor.schedule ||
      (doctor.startTime && doctor.endTime ? `${doctor.startTime} - ${doctor.endTime}` : "") ||
      (doctor.workingDays?.length ? doctor.workingDays.join(", ") : "") ||
      "Schedule not set";

    const getStatusBadge = (status) => {
      switch (status) {
        case "ACTIVE":
          return {
            container: "bg-emerald-100/70 text-emerald-800",
            dot: "bg-emerald-600",
          };
        case "ON LEAVE":
          return {
            container: "bg-rose-100/70 text-rose-800",
            dot: "bg-rose-600",
          };
        default:
          return {
            container: "bg-slate-100 text-slate-600",
            dot: "bg-slate-400",
          };
      }
    };

    const statusStyle = getStatusBadge(doctor.status);
  return (
    <div className="border border-[#E2E8F0] rounded-xl p-5 flex flex-col justify-between hover:shadow-md transition bg-white">
      <div>
        <div className="flex items-start gap-3.5 mb-4">
          <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-base shrink-0">
            {doctor.initials}
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base leading-snug">
              {displayName}
            </h4>
            <p className="text-xs text-slate-400 font-medium">
              {displaySpecialty}
            </p>
            <span className="inline-block mt-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold tracking-wider uppercase">
              {displaySpecialty}
            </span>
          </div>
        </div>

        <div className="space-y-2 py-3 border-t border-b border-slate-100 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Mail size={14} className="text-slate-400" />
            <span>{displayEmail}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={14} className="text-slate-400" />
            <span>{doctor.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-slate-400" />
            <span>{displaySchedule}</span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-2 flex items-center justify-between">
        <span
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${statusStyle.container}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
          {doctor.status}
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => onView?.(doctor.id)}
            disabled={deleting}
            className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 transition"
          >
            <Eye size={14} />
          </button>
          <button
            onClick={() => onEdit?.(doctor.id)}
            disabled={deleting}
            className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 transition"
          >
            <Edit2 size={14} />
          </button>
          <button
            onClick={() => onDelete?.(doctor.id)}
            disabled={deleting}
            className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 text-slate-500 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center"
          >
            {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard



