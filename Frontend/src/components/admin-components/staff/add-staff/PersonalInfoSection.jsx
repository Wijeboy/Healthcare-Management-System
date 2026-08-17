import React from "react";
import { Upload } from "lucide-react";

const PersonalInfoSection = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          1
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Personal Information
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Capture the staff member's identity and basic personal details.
          </p>
        </div>
      </div>

      <div className="border border-dashed border-[#CBD5E1] bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold text-base shrink-0">
          ST
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">
            Staff Profile Photo
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Upload a clear JPG or PNG image. Maximum size: 5 MB.
          </p>
          <div className="flex items-center gap-3 mt-2.5">
            <button
              type="button"
              className="px-3 py-1.5 border border-[#CBD5E1] bg-white text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload size={13} />
              Upload Photo
            </button>
            <button
              type="button"
              className="text-xs font-semibold text-rose-600 hover:underline cursor-pointer"
            >
              Remove
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            placeholder="e.g. Sarah Chen"
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">Age</label>
          <input
            type="text"
            name="age"
            value={formData.age}
            onChange={onChange}
            placeholder="Calculated or entered"
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">
            National ID
          </label>
          <input
            type="text"
            name="nationalId"
            value={formData.nationalId}
            onChange={onChange}
            placeholder="Enter NIC / passport / employee ID"
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;



