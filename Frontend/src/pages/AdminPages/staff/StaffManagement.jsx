import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StaffStatCards from "../../../components/admin-components/staff/StaffStatCards";
import StaffFilterBar from "../../../components/admin-components/staff/StaffFilterBar";
import StaffTable from "../../../components/admin-components/staff/StaffTable";
import StaffComplianceWidgets from "../../../components/admin-components/staff/StaffComplianceWidgets";
import { mockStaff } from "../../../data/mockData";

const MONTHS = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const parseLastLoginDate = (lastLogin) => {
  if (!lastLogin) return null;

  const match = lastLogin.match(/^(\d{1,2})\s([A-Za-z]{3})\s(\d{4})/);
  if (!match) return null;

  const [, day, monthName, year] = match;
  const monthIndex = MONTHS[monthName.toLowerCase()];

  if (monthIndex == null) return null;

  return new Date(Number(year), monthIndex, Number(day));
};

const formatInputDate = (value) => {
  if (!value) return "";
  const [year, month, day] = value.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
};

const StaffManagement = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    role: "",
    department: "",
    status: "",
    lastLogin: "",
  });

  const filteredStaff = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    const loginDate = formatInputDate(filters.lastLogin);

    return mockStaff.filter((staff) => {
      const matchesSearch =
        !query ||
        [
          staff.id,
          staff.name,
          staff.email,
          staff.phone,
          staff.role,
          staff.department,
        ]
          .filter(Boolean)
          .some((value) => value.toLowerCase().includes(query));

      const matchesRole = !filters.role || staff.role === filters.role;
      const matchesDepartment =
        !filters.department || staff.department === filters.department;
      const matchesStatus = !filters.status || staff.status === filters.status;
      const staffLastLoginDate = parseLastLoginDate(staff.lastLogin);
      const matchesLastLogin =
        !loginDate ||
        (staffLastLoginDate &&
          staffLastLoginDate.toDateString() === loginDate.toDateString());

      return (
        matchesSearch &&
        matchesRole &&
        matchesDepartment &&
        matchesStatus &&
        matchesLastLogin
      );
    });
  }, [filters]);

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      role: "",
      department: "",
      status: "",
      lastLogin: "",
    });
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Top Title Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Staff Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access and manage staff profiles, roles, departments, and system
                access control.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                className="px-4 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition"
                onClick={() =>
                  navigate("/dashboard/staff-management/add-staff")
                }
              >
                <Plus size={16} />
                Add New Staff
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <StaffStatCards />

          {/* Filter Bar */}
          <StaffFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* Staff Table */}
          <StaffTable staffList={filteredStaff} />

          {/* Compliance Footer Widgets */}
          <StaffComplianceWidgets />
        </main>
      </div>
    </div>
  );
};

export default StaffManagement;
