import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  MoreVertical,
  PencilLine,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { mockStaff } from "../../../data/mockData";

const StaffTable = ({ staffList = mockStaff, onView, onEdit, onDelete }) => {
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);

  const getStaffName = (staff) =>
    staff?.fullName || staff?.name || "Staff Member";

  const getStaffInitials = (staff) =>
    staff?.initials ||
    getStaffName(staff)
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const handleView = (staff) => {
    if (onView) return onView(staff);
    setOpenMenuId(null);
    navigate(
      `/admin/staff/details?id=${encodeURIComponent(staff.id)}`,
      { state: { staff } },
    );
  };

  const handleEdit = (staff) => {
    if (onEdit) return onEdit(staff);
    setOpenMenuId(null);
    navigate(
      `/admin/staff/edit?id=${encodeURIComponent(staff.id)}`,
      { state: { staff } },
    );
  };

  const handleDelete = (staff) => {
    setOpenMenuId(null);
    if (onDelete) {
      onDelete(staff);
      return;
    }
    setStaffToDelete(staff);
  };

  const confirmDelete = () => {
    if (!staffToDelete) return;
    if (onDelete) {
      onDelete(staffToDelete);
    }
    setStaffToDelete(null);
  };

  return (
    <>
      <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm mb-6 overflow-hidden">
        {/* Table Header controls */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-800">Staff List</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {staffList.length} staff members
            </p>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Last updated: Today, 11:00 AM
          </p>
        </div>

        {/* Table Content */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-slate-200 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-4">STAFF MEMBER</th>
                <th className="py-3 px-4">CONTACT INFO</th>
                <th className="py-3 px-4">ROLE</th>
                <th className="py-3 px-4">DEPARTMENT</th>
                <th className="py-3 px-4">LAST LOGIN</th>
                <th className="py-3 px-4 text-center">ACCOUNT STATUS</th>
                <th className="py-3 px-4 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {staffList.map((staff, index) => {
                const openUpward = index >= staffList.length - 2;

                return (
                  <tr
                    key={staff.id}
                    className="hover:bg-slate-50/50 transition"
                  >
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0284C7] font-bold text-xs flex items-center justify-center shrink-0">
                          {getStaffInitials(staff)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 leading-tight">
                            {getStaffName(staff)}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            {staff.age ? `${staff.age} years` : ""}{" "}
                            {staff.gender ? `, ${staff.gender}` : ""}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <p className="font-semibold text-slate-700 leading-tight">
                        {staff.phone || "N/A"}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {staff.email || staff.user?.email || "N/A"}
                      </p>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {staff.role || "Staff"}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {staff.department || "General"}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-700 whitespace-nowrap">
                      {staff.lastLogin || "Recently"}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                          (staff.employeeStatus || staff.status) === "Active" || (staff.employeeStatus || staff.status) === "ACTIVE"
                            ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                            : "bg-amber-50 text-amber-600 border-amber-200"
                        }`}
                      >
                        {staff.employeeStatus || staff.status || "Active"}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right relative">
                      <div className="relative inline-block text-left">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMenuId((current) =>
                              current === staff.id ? null : staff.id,
                            )
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition"
                          aria-label={`Open actions for ${getStaffName(staff)}`}
                        >
                          <MoreVertical size={18} />
                        </button>

                        {openMenuId === staff.id && (
                          <div
                            className={`absolute right-0 z-20 w-36 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg ${
                              openUpward ? "bottom-11" : "top-11"
                            }`}
                          >
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                              onClick={() => handleView(staff)}
                            >
                              <Eye size={14} />
                              View
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-slate-700 hover:bg-slate-50 transition cursor-pointer"
                              onClick={() => handleEdit(staff)}
                            >
                              <PencilLine size={14} />
                              Edit
                            </button>
                            <button
                              type="button"
                              className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-xs font-medium text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              onClick={() => handleDelete(staff)}
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
      </div>

      {staffToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-500">
              Delete Staff
            </p>
            <h3 className="mt-2 text-xl font-bold text-slate-900">
              Delete {getStaffName(staffToDelete)}?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              This will remove the staff profile from the system.
            </p>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setStaffToDelete(null)}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-rose-700 transition-colors cursor-pointer"
              >
                Delete Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StaffTable;




