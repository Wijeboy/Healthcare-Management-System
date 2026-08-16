import React from 'react'
import { Search, Calendar } from "lucide-react";

const PatientFilterBar = ({ filters, setFilters, onClear }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm mb-6">
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-3 items-end">
        {/* Search */}
        <div className="lg:col-span-4">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Search patient
          </label>
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Patient ID, name, email"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
              className="w-full pl-9 pr-3 py-2 border border-[#CBD5E1] rounded-lg text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Age Range */}
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Age Range
          </label>
          <select
            value={filters.ageRange}
            onChange={(e) =>
              setFilters({ ...filters, ageRange: e.target.value })
            }
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Ages</option>
            <option value="0-18">0 - 18</option>
            <option value="19-40">19 - 40</option>
            <option value="41-65">41 - 65</option>
            <option value="65+">65+</option>
          </select>
        </div>

        {/* Gender */}
        <div className="lg:col-span-2">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Gender
          </label>
          <select
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            className="w-full px-3 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All Genders</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Blood Group */}
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 truncate">
            Blood Group
          </label>
          <select
            value={filters.bloodGroup}
            onChange={(e) =>
              setFilters({ ...filters, bloodGroup: e.target.value })
            }
            className="w-full px-2 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All</option>
            <option value="O+">O+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="B-">B-</option>
          </select>
        </div>

        {/* Status */}
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1">
            Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="w-full px-2 py-2 border border-[#CBD5E1] rounded-lg text-xs bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Last Visit Date */}
        <div className="lg:col-span-1">
          <label className="block text-[11px] font-semibold text-slate-700 mb-1 truncate">
            Last Visit
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="mm/dd/yy"
              value={filters.lastVisitDate}
              onChange={(e) =>
                setFilters({ ...filters, lastVisitDate: e.target.value })
              }
              className="w-full pl-2 pr-6 py-2 border border-[#CBD5E1] rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <Calendar
              size={13}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
            />
          </div>
        </div>

        {/* Clear Button */}
        <div className="lg:col-span-1">
          <button
            type="button"
            onClick={onClear}
            className="w-full py-2 px-2 border border-[#CBD5E1] text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-50 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientFilterBar