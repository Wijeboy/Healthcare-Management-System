import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  PencilLine,
  Trash2,
  Eye,
} from "lucide-react";

const PatientsTable = ({
  patients,
  totalCount,
  currentPage,
  onPageChange,
  onEditPatient,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      const activeMenu = menuRefs.current[openMenuId];
      if (activeMenu && !activeMenu.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const handleDelete = (patient) => {
    const confirmed = window.confirm(
      `Delete ${patient.name}? This action cannot be undone.`
    );
    if (confirmed) {
      console.log("Delete patient:", patient);
      setOpenMenuId(null);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-6 overflow-hidden">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 leading-tight">
            Patients List
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Showing {patients.length} of {totalCount} patients
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="px-3.5 py-1.5 border border-[#CBD5E1] bg-white text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition">
            <Upload size={14} />
            Export
          </button>
          <span className="text-xs text-slate-400 font-medium">
            Last updated: Today, 10:30 AM
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">PATIENT ID</th>
              <th className="py-3 px-4">PATIENT</th>
              <th className="py-3 px-4">CONTACT INFORMATION</th>
              <th className="py-3 px-4 text-center">BLOOD GROUP</th>
              <th className="py-3 px-4">MEDICAL SUMMARY</th>
              <th className="py-3 px-4">LAST VISIT</th>
              <th className="py-3 px-4 text-center">ACCOUNT STATUS</th>
              <th className="py-3 px-2 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {patients.map((patient) => (
              <tr key={patient.id} className="hover:bg-slate-50/70 transition">
                {/* ID */}
                <td className="py-3.5 px-4 font-bold text-slate-900">
                  {patient.id}
                </td>

                {/* Patient Profile */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center shrink-0">
                      {patient.initials}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 leading-tight">
                        {patient.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {patient.age} years · {patient.gender}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Contact Information */}
                <td className="py-3.5 px-4">
                  <p className="font-semibold text-slate-800 leading-tight">
                    {patient.phone}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {patient.email}
                  </p>
                </td>

                {/* Blood Group Badge */}
                <td className="py-3.5 px-4 text-center">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                    {patient.bloodGroup}
                  </span>
                </td>

                {/* Medical Summary */}
                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-800 leading-tight">
                    {patient.medicalSummaryTitle}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {patient.medicalSummarySubtitle}
                  </p>
                </td>

                {/* Last Visit */}
                <td className="py-3.5 px-4">
                  <p className="font-bold text-slate-800 leading-tight">
                    {patient.lastVisitDate}
                  </p>
                  <p
                    className={`text-[11px] font-semibold mt-0.5 ${
                      patient.lastVisitType === "Emergency"
                        ? "text-rose-600"
                        : patient.lastVisitType === "Routine Checkup" ||
                            patient.lastVisitType === "Vaccination"
                          ? "text-emerald-600"
                          : "text-blue-600"
                    }`}
                  >
                    {patient.lastVisitType}
                  </p>
                </td>

                {/* Account Status Badge */}
                <td className="py-3.5 px-4 text-center">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                      patient.status === "ACTIVE"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                        : patient.status === "PENDING"
                          ? "bg-amber-50 text-amber-600 border-amber-200"
                          : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        patient.status === "ACTIVE"
                          ? "bg-emerald-500"
                          : patient.status === "PENDING"
                            ? "bg-amber-500"
                            : "bg-slate-400"
                      }`}
                    />
                    {patient.status}
                  </span>
                </td>

                {/* Action Menu */}
                <td className="py-3.5 px-2 text-right relative">
                  <div
                    className="relative inline-block text-left"
                    ref={(node) => {
                      if (node) {
                        menuRefs.current[patient.id] = node;
                      }
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((current) =>
                          current === patient.id ? null : patient.id
                        )
                      }
                      className="p-1 text-slate-400 hover:text-slate-600 transition rounded-md hover:bg-slate-100"
                    >
                      <MoreHorizontal size={16} />
                    </button>

                    {openMenuId === patient.id && (
                      <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-slate-200 bg-white shadow-lg z-20 overflow-hidden">
                        <button
                          type="button"
                          className="w-full px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <Eye size={14} />
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            onEditPatient?.(patient);
                            setOpenMenuId(null);
                          }}
                          className="w-full px-3 py-2.5 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                        >
                          <PencilLine size={14} />
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(patient)}
                          className="w-full px-3 py-2.5 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Showing page {currentPage} of 2,568</span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onPageChange(1)}
            className={`w-8 h-8 rounded-lg font-bold ${
              currentPage === 1
                ? "bg-[#1E3A8A] text-white"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            1
          </button>
          <button
            onClick={() => onPageChange(2)}
            className={`w-8 h-8 rounded-lg font-bold ${
              currentPage === 2
                ? "bg-[#1E3A8A] text-white"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            2
          </button>
          <button
            onClick={() => onPageChange(3)}
            className={`w-8 h-8 rounded-lg font-bold ${
              currentPage === 3
                ? "bg-[#1E3A8A] text-white"
                : "border border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            3
          </button>
          <span className="px-1 text-slate-400">...</span>
          <button
            onClick={() => onPageChange(2568)}
            className="w-8 h-8 border border-slate-200 rounded-lg font-bold text-slate-700 hover:bg-slate-50"
          >
            2568
          </button>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="p-1.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable
