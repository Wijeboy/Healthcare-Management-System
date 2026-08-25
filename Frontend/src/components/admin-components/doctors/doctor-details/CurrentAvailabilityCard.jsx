import React from 'react'
import { Calendar } from "lucide-react";

const CurrentAvailabilityCard = ({ schedule }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Current Availability
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Weekly schedule and consultation hours
          </p>
        </div>
        <div className="w-8 h-8 rounded-lg bg-[#EFF6FF] text-[#2563EB] flex items-center justify-center">
          <Calendar size={16} />
        </div>
      </div>

      <div className="space-y-2">
        {schedule.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between py-2 px-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs"
          >
            <div className="flex items-center gap-4 min-w-0 flex-1">
              <span className="font-bold text-slate-800 w-28 shrink-0">
                {item.day}
              </span>
              <span className="text-slate-600 font-medium">
                {item.hours}
              </span>
            </div>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shrink-0 ${
                item.isAvailable
                  ? "bg-emerald-50 text-emerald-600 border border-emerald-200"
                  : "bg-slate-100 text-slate-400 border border-slate-200"
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentAvailabilityCard

