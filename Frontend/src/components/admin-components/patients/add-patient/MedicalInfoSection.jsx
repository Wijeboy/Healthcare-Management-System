import React from "react";
import { AlertTriangle } from "lucide-react";

const MedicalInfoSection = ({ formData, handleChange, showRequiredMark }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm mb-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          3
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Medical Information
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Record allergies and important medical information for safe patient
            care.
          </p>
        </div>
      </div>

      {/* Warning Box */}
      <div className="bg-amber-50/80 border border-amber-200 rounded-lg p-3.5 flex items-start gap-3 mb-5 text-xs text-amber-900">
        <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold text-amber-950">
            Clinical Information notice
          </p>
          <p className="text-[11px] text-amber-800 mt-0.5">
            Only enter verified patient information. These fields can later be
            linked to the patient's medical records.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs">
        {/* Allergies */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Allergies {showRequiredMark?.("allergies") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="allergies"
            placeholder="List known allergies, or enter 'No known allergies'"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Grid for Medical Conditions & Medications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Existing Medical Conditions
            </label>
            <textarea
              rows={3}
              name="existingConditions"
              placeholder="e.g. Diabetes, asthma, hypertension"
              value={formData.existingConditions}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Current Medications
            </label>
            <textarea
              rows={3}
              name="currentMedications"
              placeholder="List current medicines and dosage if known"
              value={formData.currentMedications}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
            />
          </div>
        </div>

        {/* Additional Medical Notes */}
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Additional Medical Notes
          </label>
          <textarea
            rows={3}
            name="medicalNotes"
            maxLength={500}
            placeholder="Add any other relevant medical notes"
            value={formData.medicalNotes}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none"
          />
          <span className="text-[10px] text-slate-400 mt-1 block">
            {formData.medicalNotes ? formData.medicalNotes.length : 0}/500
            characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default MedicalInfoSection;
