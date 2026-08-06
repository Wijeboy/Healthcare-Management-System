import React from 'react'
import { mockPatients } from '../../data/mockData';
import {
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PatientTable = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold tracking-wider text-slate-500 uppercase">
              <th className="py-3 px-4">Patient ID</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Contact Info</th>
              <th className="py-3 px-4">Blood Group</th>
              <th className="py-3 px-4">Last Visit</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {mockPatients.map((patient) => (
              <tr
                key={patient.id}
                className="hover:bg-slate-50/80 transition-colors"
              >
                <td className="py-3.5 px-4 font-mono font-medium text-slate-700">
                  {patient.id}
                </td>
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs ${patient.avatarBg}`}
                    >
                      {patient.initials}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 leading-tight">
                        {patient.name}
                      </p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {patient.details}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <p className="text-slate-800 font-medium text-xs">
                    {patient.phone}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {patient.email}
                  </p>
                </td>
                <td className="py-3.5 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-[11px] font-bold ${patient.bloodBg}`}
                  >
                    {patient.bloodGroup}
                  </span>
                </td>
                <td className="py-3.5 px-4">
                  <p className="text-slate-800 font-medium text-xs">
                    {patient.lastVisit}
                  </p>
                  <p
                    className={`text-xs font-semibold mt-0.5 ${patient.visitColor}`}
                  >
                    {patient.visitType}
                  </p>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <button className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table Pagination */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Showing 1 - 5 of 12,842 patients</span>
        <div className="flex items-center gap-1">
          <button className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-50">
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <button className="p-1 rounded text-slate-400 hover:text-slate-600 disabled:opacity-50">
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button className="px-2.5 py-1 rounded bg-blue-900 text-white font-semibold">
            1
          </button>
          <button className="px-2.5 py-1 rounded hover:bg-slate-200 text-slate-700 font-medium">
            2
          </button>
          <button className="px-2.5 py-1 rounded hover:bg-slate-200 text-slate-700 font-medium">
            3
          </button>
          <span className="px-1">...</span>
          <button className="px-2.5 py-1 rounded hover:bg-slate-200 text-slate-700 font-medium">
            2568
          </button>

          <button className="p-1 rounded text-slate-600 hover:text-slate-900">
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="p-1 rounded text-slate-600 hover:text-slate-900">
            <ChevronsRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientTable