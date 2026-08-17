import React, { useState } from "react";
import { Info, Save } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

const initialPermissions = [
  {
    id: "edit_records",
    name: "Edit Records",
    description: "Ability to modify patient medical history and notes.",
    roles: { admin: true, doctor: true, nurse: false },
  },
  {
    id: "process_refunds",
    name: "Process Refunds",
    description: "Access to billing modules for financial adjustments.",
    roles: { admin: true, doctor: false, nurse: false },
  },
  {
    id: "issue_prescriptions",
    name: "Issue Prescriptions",
    description: "Authorize and transmit digital prescriptions.",
    roles: { admin: false, doctor: true, nurse: false },
  },
  {
    id: "manage_inventory",
    name: "Manage Inventory",
    description: "Update stock levels for medical supplies.",
    roles: { admin: true, doctor: true, nurse: true },
  },
];

const RolesPermissionsMatrix = () => {
  const [permissions, setPermissions] = useState(initialPermissions);

  const handleToggle = (permId, roleKey) => {
    setPermissions((prev) =>
      prev.map((item) => {
        if (item.id === permId) {
          return {
            ...item,
            roles: {
              ...item.roles,
              [roleKey]: !item.roles[roleKey],
            },
          };
        }
        return item;
      }),
    );
  };

  const handleDiscard = () => {
    setPermissions(initialPermissions);
  };

  const handleSave = () => {
    console.log("Saved Permissions:", permissions);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-2xl shadow-sm overflow-hidden flex-1">
      {/* Matrix Header */}
      <div className="p-6 border-b border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 leading-tight">
            Roles & Permissions Matrix
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Define granular access levels for clinical and administrative staff
            members.
          </p>
        </div>

        <button className="px-4 py-2 border border-[#0052CC] text-[#0052CC] hover:bg-blue-50 font-bold text-xs rounded-lg transition shrink-0">
          Add New Role
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#E2E8F0] bg-slate-50/50 text-slate-600 font-bold">
              <th className="py-3.5 px-6 font-bold text-slate-700">
                Permission Name
              </th>
              <th className="py-3.5 px-6 text-center font-bold text-slate-700 w-28">
                Admin
              </th>
              <th className="py-3.5 px-6 text-center font-bold text-slate-700 w-28">
                Doctor
              </th>
              <th className="py-3.5 px-6 text-center font-bold text-slate-700 w-28">
                Nurse
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {permissions.map((perm) => (
              <tr key={perm.id} className="hover:bg-slate-50/50 transition">
                <td className="py-4 px-6">
                  <p className="font-bold text-slate-900">{perm.name}</p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {perm.description}
                  </p>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <ToggleSwitch
                      checked={perm.roles.admin}
                      onChange={() => handleToggle(perm.id, "admin")}
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <ToggleSwitch
                      checked={perm.roles.doctor}
                      onChange={() => handleToggle(perm.id, "doctor")}
                    />
                  </div>
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="flex justify-center">
                    <ToggleSwitch
                      checked={perm.roles.nurse}
                      onChange={() => handleToggle(perm.id, "nurse")}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bottom Footer Actions Bar */}
      <div className="p-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Info size={16} className="shrink-0 text-slate-400" />
          <span>
            Changes will be logged in the Audit Logs and applied instantly.
          </span>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto">
          <button
            type="button"
            onClick={handleDiscard}
            className="px-5 py-2.5 bg-[#CBD5E1] hover:bg-slate-400 text-slate-800 font-bold text-xs rounded-lg transition"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#0052CC] hover:bg-blue-700 text-white font-bold text-xs rounded-lg flex items-center gap-2 shadow-sm transition"
          >
            <Save size={14} />
            Save System Configurations
          </button>
        </div>
      </div>
    </div>
  );
};

export default RolesPermissionsMatrix;
