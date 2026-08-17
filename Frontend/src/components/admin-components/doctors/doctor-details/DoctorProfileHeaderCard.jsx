import React from 'react'
import { Edit, MoreHorizontal } from "lucide-react";

const DoctorProfileHeaderCard = ({ doctor, onEdit }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        {/* Profile Info Left */}
        <div className="flex items-start gap-5">
          <div className="w-20 h-20 rounded-2xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold text-2xl shrink-0">
            {doctor.initials}
          </div>

          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-xl font-bold text-slate-900 leading-tight">
                {doctor.name}
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
                {doctor.status}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Doctor ID: {doctor.id} · {doctor.licenceNumber}
            </p>

            {/* Badges */}
            <div className="flex items-center gap-2 mt-2.5">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                {doctor.department}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#EFF6FF] text-[#1D4ED8]">
                {doctor.specialization}
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-3 max-w-xl leading-relaxed">
              {doctor.bio}
            </p>
          </div>
        </div>

        {/* Stats Grid Right */}
        <div className="grid grid-cols-2 gap-3 min-w-[320px]">
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              EXPERIENCE
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              {doctor.experience}
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              PATIENTS TREATED
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              {doctor.patientsTreated}
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              APPOINTMENTS
            </p>
            <p className="text-base font-bold text-slate-800 mt-0.5">
              {doctor.appointmentsThisMonth}
            </p>
          </div>

          <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3.5">
            <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
              AVAILABILITY
            </p>
            <p className="text-base font-bold text-emerald-600 mt-0.5">
              {doctor.availabilityText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfileHeaderCard

