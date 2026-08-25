import React, { useEffect, useRef, useState } from "react";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  PencilLine,
  Trash2,
  Eye,
  MoreVertical,
} from "lucide-react";

const PatientsTable = ({
  patients = [],
  totalCount = 0,
  currentPage = 1,
  onPageChange,
  onViewPatient,
  onEditPatient,
  onDeletePatient,
}) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  const menuButtonRefs = useRef({});
  const menuPanelRefs = useRef({});
  const [menuPlacement, setMenuPlacement] = useState("bottom");

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

  useEffect(() => {
    if (!openMenuId) return;

    const button = menuButtonRefs.current[openMenuId];
    const panel = menuPanelRefs.current[openMenuId];
    if (!button || !panel) return;

    const updatePlacement = () => {
      const buttonRect = button.getBoundingClientRect();
      const panelRect = panel.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const spaceAbove = buttonRect.top;

      if (spaceBelow < panelRect.height + 12 && spaceAbove > panelRect.height + 12) {
        setMenuPlacement("top");
      } else {
        setMenuPlacement("bottom");
      }
    };

    updatePlacement();
    window.addEventListener("resize", updatePlacement);
    window.addEventListener("scroll", updatePlacement, true);

    return () => {
      window.removeEventListener("resize", updatePlacement);
      window.removeEventListener("scroll", updatePlacement, true);
    };
  }, [openMenuId]);

  const handleDelete = (patient) => {
    onDeletePatient?.(patient);
    setOpenMenuId(null);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-6 overflow-visible">
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
          <button className="px-3.5 py-1.5 border border-[#CBD5E1] bg-white text-slate-700 font-semibold text-xs rounded-lg hover:bg-slate-50 flex items-center gap-1.5 shadow-sm transition cursor-pointer">
            <Upload size={14} />
            Export
          </button>
          <span className="text-xs text-slate-400 font-medium">
            Last updated: Today
          </span>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4">NAME</th>
              <th className="py-3 px-4">CONTACT INFORMATION</th>
              <th className="py-3 px-4 text-center">BLOOD GROUP</th>
              <th className="py-3 px-4">MEDICAL SUMMARY</th>
              <th className="py-3 px-4">LAST VISIT</th>
              <th className="py-3 px-4 text-center">ACCOUNT STATUS</th>
              <th className="py-3 px-2 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {patients.map((patient) => {
              const name = patient.fullName || patient.name || "Patient Record";
              const initials =
                patient.initials ||
                name
                  .split(" ")
                  .filter(Boolean)
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();
              const contact = patient.phone || patient.contact || "N/A";
              const email = patient.email || patient.user?.email || "No email";
              const statusStr = (patient.status || "Active").toLowerCase();

              return (
                <tr key={patient.id} className="hover:bg-slate-50/70 transition">
                  {/* Patient Profile */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center shrink-0">
                        {initials}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 leading-tight">
                          {name}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {patient.age ? `${patient.age} yrs` : ""}{" "}
                          {patient.gender ? `· ${patient.gender}` : ""}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Contact Information */}
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800 leading-tight">
                      {contact}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {email}
                    </p>
                  </td>

                  {/* Blood Group Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
                      {patient.bloodGroup || "—"}
                    </span>
                  </td>

                  {/* Medical Summary */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800 leading-tight">
                      {patient.medicalSummaryTitle || "General Consultation"}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {patient.medicalSummarySubtitle || "Routine checkup"}
                    </p>
                  </td>

                  {/* Last Visit */}
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-slate-800 leading-tight">
                      {patient.lastVisitDate || "Not available"}
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
                      {patient.lastVisitType || "Consultation"}
                    </p>
                  </td>

                  {/* Account Status Badge */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                        statusStr === "active"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : statusStr === "pending"
                            ? "bg-amber-50 text-amber-600 border-amber-200"
                            : "bg-rose-50 text-rose-500 border-rose-200"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          statusStr === "active"
                            ? "bg-emerald-500"
                            : statusStr === "pending"
                              ? "bg-amber-500"
                              : "bg-rose-400"
                        }`}
                      />
                      {patient.status || "Active"}
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
                        ref={(node) => {
                          if (node) {
                            menuButtonRefs.current[patient.id] = node;
                          }
                        }}
                        onClick={() =>
                          setOpenMenuId((current) =>
                            current === patient.id ? null : patient.id,
                          )
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition cursor-pointer"
                      >
                        <MoreVertical size={16} />
                      </button>

                      {openMenuId === patient.id && (
                        <div
                          ref={(node) => {
                            if (node) {
                              menuPanelRefs.current[patient.id] = node;
                            }
                          }}
                          className={`absolute right-0 z-30 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-lg ${
                            menuPlacement === "top"
                              ? "bottom-full mb-2"
                              : "top-full mt-2"
                          }`}
                        >
                          <button
                            onClick={() => {
                              onViewPatient?.(patient);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                          >
                            <Eye size={14} />
                            View
                          </button>
                          <button
                            onClick={() => {
                              onEditPatient?.(patient);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                          >
                            <PencilLine size={14} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(patient)}
                            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-xs font-semibold text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>
          Showing {patients.length} of {totalCount} patients
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onPageChange?.(currentPage - 1)}
            disabled={currentPage <= 1}
            className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-semibold text-slate-700">
            Page {currentPage}
          </span>
          <button
            onClick={() => onPageChange?.(currentPage + 1)}
            disabled={patients.length === 0}
            className="p-1 border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-40 transition cursor-pointer"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientsTable;




