import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from "react-dom";
import { mockPatients } from '../../data/mockData';
import {
  MoreVertical,
  Eye,
  PencilLine,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PatientTable = ({ onView, onEdit, onDelete }) => {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const menuRef = useRef(null);
  const buttonRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action, patient) => {
    setOpenMenuId(null);
    setMenuPosition(null);
    if (action === "view") onView?.(patient);
    if (action === "edit") onEdit?.(patient);
    if (action === "delete") onDelete?.(patient);
  };

  const handleToggleMenu = (patientId) => {
    const isClosing = openMenuId === patientId;
    if (isClosing) {
      setOpenMenuId(null);
      setMenuPosition(null);
      return;
    }

    const button = buttonRefs.current[patientId];
    if (button) {
      const rect = button.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }

    setOpenMenuId(patientId);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl overflow-visible shadow-sm">
      <div className="overflow-x-auto overflow-y-visible">
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
                  <div className="relative inline-flex" ref={menuRef}>
                    <button
                      type="button"
                      ref={(el) => {
                        buttonRefs.current[patient.id] = el;
                      }}
                      onClick={() => handleToggleMenu(patient.id)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded transition-colors"
                      aria-haspopup="menu"
                      aria-expanded={openMenuId === patient.id}
                      aria-label={`Open actions for ${patient.name}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {openMenuId &&
        menuPosition &&
        createPortal(
          <div
            ref={menuRef}
            className="fixed z-[70] w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-fade-in"
            style={{ top: menuPosition.top, right: menuPosition.right }}
          >
            {(() => {
              const patient = mockPatients.find((item) => item.id === openMenuId);
              if (!patient) return null;

              return (
                <>
                  <button
                    type="button"
                    onClick={() => handleAction("view", patient)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <Eye className="w-4 h-4 text-slate-500" />
                    View
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction("edit", patient)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <PencilLine className="w-4 h-4 text-slate-500" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction("delete", patient)}
                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                  >
                    <Trash2 className="w-4 h-4 text-rose-500" />
                    Delete
                  </button>
                </>
              );
            })()}
          </div>,
          document.body
        )}

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
