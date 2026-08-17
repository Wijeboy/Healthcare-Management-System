import React from "react";
import { Upload } from "lucide-react";

const PersonalInfoSection = ({ formData, handleChange, showRequiredMark }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          1
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Personal Information
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Enter the patient's identity and demographic information.
          </p>
        </div>
      </div>

      {/* Avatar Upload */}
      <div className="border border-dashed border-[#CBD5E1] bg-[#F8FAFC] rounded-xl p-4 flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-[#DBEAFE] text-[#1D4ED8] flex items-center justify-center font-bold text-base shrink-0">
          PT
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800">
            Patient Profile Photo
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

      {/* Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Full Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Full Name {showRequiredMark?.("fullName") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. Nethmi Perera"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Date of Birth {showRequiredMark?.("dob") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Age */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">Age</label>
          <input
            type="text"
            readOnly
            placeholder="Calculated automatically"
            value={formData.age}
            className="w-full px-3 py-2 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-slate-500 cursor-not-allowed"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            Age is calculated from the date of birth.
          </span>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Gender {showRequiredMark?.("gender") && <span className="text-rose-500">*</span>}
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Blood Group {showRequiredMark?.("bloodGroup") && <span className="text-rose-500">*</span>}
          </label>
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select blood group</option>
            <option value="O+">O+</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="O-">O-</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        {/* Patient ID */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Patient ID
          </label>
          <input
            type="text"
            readOnly
            value={formData.patientId}
            className="w-full px-3 py-2 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-slate-600 font-semibold cursor-not-allowed"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            This ID will be generated automatically.
          </span>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;



