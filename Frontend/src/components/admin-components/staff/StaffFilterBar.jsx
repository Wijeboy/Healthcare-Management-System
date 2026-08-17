import React from "react";
import { Search, Calendar } from "lucide-react";

const StaffFilterBar = ({ filters, onFilterChange, onResetFilters }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm mb-6">
      <div className="grid grid-cols-12 gap-4 items-end">
        {/* Search */}
        <div className="col-span-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search staff"
              value={filters.search}
              onChange={(e) => onFilterChange("search", e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-[#CBD5E1] rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Role Select */}
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Role
          </label>
          <select
            value={filters.role}
            onChange={(e) => onFilterChange("role", e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">All Roles</option>
            <option value="Senior Cardiologist (Admin)">
              Senior Cardiologist (Admin)
            </option>
            <option value="Nurse Supervisor (User)">
              Nurse Supervisor (User)
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

        {/* Department Select */}
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Department
          </label>
          <select
            value={filters.department}
            onChange={(e) => onFilterChange("department", e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">All Departments</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Nursing">Nursing</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
          </select>
        </div>

        {/* Status Select */}
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="">All Statuses</option>
            <option value="ACTIVE">ACTIVE</option>
            <option value="PENDING">PENDING</option>
          </select>
        </div>

        {/* Last Visit Date */}
        <div className="col-span-2">
          <label className="block text-[11px] font-bold text-slate-700 mb-1 truncate">
            Last Login Date
          </label>
          <div className="relative">
            <input
              type="date"
              value={filters.lastLogin}
              onChange={(e) => onFilterChange("lastLogin", e.target.value)}
              className="w-full pl-3 pr-8 py-2 border border-[#CBD5E1] rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Calendar
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Clear Filters */}
        <div className="col-span-1">
          <button
            type="button"
            onClick={onResetFilters}
            className="w-full py-2 px-1 border border-[#CBD5E1] text-slate-700 font-bold text-xs rounded-lg hover:bg-slate-50 transition text-center truncate cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default StaffFilterBar;



