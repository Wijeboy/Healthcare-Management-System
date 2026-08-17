import React from "react";

const EmergencyContactSection = ({ formData, handleChange, showRequiredMark }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          4
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Emergency Contact
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Add a contact person who can be reached in an emergency.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {/* Contact Name */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Contact Name {showRequiredMark?.("emergencyName") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="emergencyName"
            placeholder="e.g. Kasun Perera"
            value={formData.emergencyName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Relationship */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Relationship {showRequiredMark?.("emergencyRelationship") && <span className="text-rose-500">*</span>}
          </label>
          <select
            name="emergencyRelationship"
            value={formData.emergencyRelationship}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select relationship</option>
            <option value="Spouse">Spouse</option>
            <option value="Parent">Parent</option>
            <option value="Child">Child</option>
            <option value="Sibling">Sibling</option>
            <option value="Guardian">Guardian</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Contact Phone */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Contact Phone {showRequiredMark?.("emergencyPhone") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="emergencyPhone"
            placeholder="+94 71 987 6543"
            value={formData.emergencyPhone}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Contact Email
          </label>
          <input
            type="email"
            name="emergencyEmail"
            placeholder="contact@email.com"
            value={formData.emergencyEmail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactSection;


