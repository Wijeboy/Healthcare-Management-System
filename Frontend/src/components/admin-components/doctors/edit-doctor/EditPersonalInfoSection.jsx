import React from 'react'
import { Upload } from "lucide-react";

const EditPersonalInfoSection = ({ formData, onChange, showRequiredMark }) => {
  const required = (field) => showRequiredMark ? showRequiredMark(field) : false;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      {/* Section Header */}
      <div className="flex items-start gap-3.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
          1
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Personal Information
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Review and update the doctor's identity and contact details.
          </p>
        </div>
      </div>

      {/* Profile Photo */}
      <div className="bg-[#F8FAFC] border border-dashed border-[#CBD5E1] rounded-xl p-5 mb-6 flex items-center gap-5">
        <div className="w-16 h-16 rounded-xl bg-[#BFDBFE]/60 text-[#1D4ED8] flex items-center justify-center font-bold text-xl shrink-0">
          {formData.initials || "SC"}
        </div>
        <div>
          <h4 className="text-xs font-bold text-slate-800 mb-0.5">
            Doctor Profile Photo
          </h4>
          <p className="text-xs text-slate-500 mb-2.5">
            Upload a clear JPG or PNG image. Maximum size: 5 MB.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="px-3 py-1.5 bg-white border border-[#CBD5E1] text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 flex items-center gap-1.5 transition cursor-pointer"
            >
              <Upload size={14} />
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

      {/* Fields */}
      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name {required("fullName") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Email Address */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address {required("email") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Phone Number {required("phone") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Gender */}
        <div className="col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address */}
        <div className="col-span-2 mt-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

    </div>
  );
};

export default EditPersonalInfoSection



