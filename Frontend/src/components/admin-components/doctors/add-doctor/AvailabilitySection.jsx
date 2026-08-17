import React from 'react'
import FormSectionHeader from './FormSectionHeader';

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AvailabilitySection = ({
  workingDays,
  toggleDay,
  formData,
  onChange,
  showRequiredMark,
}) => {
  const required = (field) => showRequiredMark ? showRequiredMark(field) : false;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      <FormSectionHeader
        number={3}
        title="Availability & Schedule"
        description="Set the doctor's working days, consultation hours, and appointment duration."
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
        {/* Working Days */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            Working Days {required("workingDays") && <span className="text-rose-500">*</span>}
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

        {/* Times & Status Grid */}
        <div className="grid grid-cols-2 gap-4 col-span-1">
          {/* Start Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Start Time {required("startTime") && <span className="text-rose-500">*</span>}
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={onChange}
              className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* End Time */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              End Time {required("endTime") && <span className="text-rose-500">*</span>}
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={onChange}
              className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Consultation Duration */}
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
            Availability Status {required("availabilityStatus") && <span className="text-rose-500">*</span>}
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

export default AvailabilitySection



