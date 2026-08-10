import React from "react";

const WorkInfoSection = ({ formData, onChange }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-7 h-7 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs">
          3
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-none">
            Work Assignment
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Define the staff member's department, role, and work setup.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Nursing">Nursing</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Administration">Administration</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Laboratory">Laboratory</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Role / Title
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">Select role</option>
            <option value="Nurse Supervisor">Nurse Supervisor</option>
            <option value="Senior Cardiologist (Admin)">
              Senior Cardiologist (Admin)
            </option>
            <option value="Lead Orthopedic Surgeon (Admin)">
              Lead Orthopedic Surgeon (Admin)
            </option>
            <option value="Junior Nurse (User)">Junior Nurse (User)</option>
            <option value="Administrative Officer">Administrative Officer</option>
            <option value="Lab Technician">Lab Technician</option>
            <option value="Receptionist">Receptionist</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Shift
          </label>
          <select
            name="shift"
            value={formData.shift}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="Day Shift">Day Shift</option>
            <option value="Night Shift">Night Shift</option>
            <option value="Rotating">Rotating</option>
            <option value="On Call">On Call</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Joining Date
          </label>
          <input
            type="date"
            name="joiningDate"
            value={formData.joiningDate}
            onChange={onChange}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-slate-700 mb-1">
            Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={onChange}
            rows="4"
            placeholder="Add work notes, scheduling remarks, or internal onboarding details."
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>
    </div>
  );
};

export default WorkInfoSection;
