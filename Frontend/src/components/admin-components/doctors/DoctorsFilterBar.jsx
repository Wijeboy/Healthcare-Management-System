import React from 'react'
import { Search } from "lucide-react";

const DoctorsFilterBar = ({
  searchTerm,
  setSearchTerm,
  department,
  setDepartment,
  specialization,
  setSpecialization,
  status,
  setStatus,
  onClear,
}) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
      <div className="grid grid-cols-12 gap-4 items-end">
        <div className="col-span-3">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Search doctor
          </label>
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Name, doctor ID, email or spe"
              className="w-full pl-9 pr-3 py-2 border border-[#CBD5E1] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="col-span-3">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
          </select>
        </div>

        <div className="col-span-3">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Specialization
          </label>
          <select
            value={specialization}
            onChange={(e) => setSpecialization(e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Specializations</option>
          </select>
        </div>

        <div className="col-span-2">
          <label className="block text-xs font-semibold text-slate-600 mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        <div className="col-span-1">
          <button
            onClick={onClear}
            className="w-full px-3 py-2 border border-[#CBD5E1] hover:bg-slate-50 text-slate-700 font-medium text-sm rounded-lg transition text-center"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorsFilterBar