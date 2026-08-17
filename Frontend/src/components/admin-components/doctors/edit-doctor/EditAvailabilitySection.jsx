import React from 'react'
import { Clock } from "lucide-react";

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const EditAvailabilitySection = ({
  workingDays,
  toggleDay,
  formData,
  onChange,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      {/* Section Header */}
      <div className="flex items-start gap-3.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
          3
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Availability & Schedule
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Modify working days, consultation hours, and availability status.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Working Days */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Working Days <span className="text-rose-500">*</span>
          </label>
          <div className="flex items-center gap-2">
            {daysList.map((day) => {
              const isSelected = workingDays.includes(day);
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition border ${
                    isSelected
                      ? "bg-blue-50 border-[#2563EB] text-[#2563EB]"
                      : "bg-white border-[#CBD5E1] text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4 col-span-1">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Start Time <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={onChange}
                className="w-full pl-3.5 pr-9 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <Clock
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              End Time <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={onChange}
                className="w-full pl-3.5 pr-9 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <Clock
                size={15}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Consultation Duration
          </label>
          <select
            name="duration"
            value={formData.duration}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">60 minutes</option>
          </select>
        </div>

        {/* Availability Status */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Availability Status <span className="text-rose-500">*</span>
          </label>
          <select
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Available">Available</option>
            <option value="On Leave">On Leave</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default EditAvailabilitySection