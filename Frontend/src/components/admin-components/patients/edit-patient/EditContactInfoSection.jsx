import React from "react";

const EditContactInfoSection = ({ formData, handleChange }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          2
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Contact Information
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Update the patient's contact details and residential address.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">
            Address <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default EditContactInfoSection;


