import React from "react";

const ContactInfoSection = ({ formData, handleChange }) => {
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
            Provide primary communication and address details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Email Address */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="patient@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="+94 77 123 4567"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Address */}
        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">
            Address <span className="text-rose-500">*</span>
          </label>
          <textarea
            rows={2}
            name="address"
            placeholder="Enter the patient's residential address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfoSection;
