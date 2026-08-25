import React from 'react'

const EditProfessionalInfoSection = ({ formData, onChange, showRequiredMark }) => {
  const required = (field) => showRequiredMark ? showRequiredMark(field) : false;
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6">
      {/* Section Header */}
      <div className="flex items-start gap-3.5 mb-6">
        <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-sm shrink-0">
          2
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Professional Information
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Update department, qualification, licensing, and experience details.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-x-5 gap-y-4">
        {/* Doctor ID */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Doctor ID
          </label>
          <input
            type="text"
            disabled
            value={formData.doctorId}
            className="w-full px-3.5 py-2 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg text-sm text-slate-600 font-medium"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            This ID will be generated automatically.
          </p>
        </div>

        {/* Medical Licence Number */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Medical Licence Number {required("licenceNumber") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="licenceNumber"
            value={formData.licenceNumber}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Department {required("department") && <span className="text-rose-500">*</span>}
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Dermatology">Dermatology</option>
          </select>
        </div>

        {/* Specialization */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Specialization {required("specialization") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="specialization"
            value={formData.specialization}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Highest Qualification */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Highest Qualification
          </label>
          <input
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Years of Experience {required("experience") && <span className="text-rose-500">*</span>}
          </label>
          <input
            type="text"
            name="experience"
            value={formData.experience}
            onChange={onChange}
            className="w-full px-3.5 py-2 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        {/* Professional Biography */}
        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Professional Biography
          </label>
          <textarea
            rows={3}
            name="bio"
            value={formData.bio}
            onChange={onChange}
            maxLength={500}
            className="w-full px-3.5 py-2.5 border border-[#CBD5E1] rounded-lg text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none leading-relaxed"
          />
          <p className="text-[11px] text-slate-400 mt-1">
            {formData.bio.length}/500 characters
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditProfessionalInfoSection


