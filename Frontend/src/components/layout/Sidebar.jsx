import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  {
    icon: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: "calendar_today",
    label: "Appointments",
    path: "/dashboard/appointments",
  },
  {
    icon: "folder_shared",
    label: "Records",
    path: "/dashboard/records",
  },
  {
    icon: "medical_services",
    label: "Prescriptions",
    path: "/dashboard/prescriptions",
  },
  {
    icon: "payments",
    label: "Payments",
    path: "/dashboard/payments",
  },
  {
    icon: "people",
    label: "Staff Management",
    path: "/dashboard/staff-management",
  },
  {
    icon: "person",
    label: "Patient Management",
    path: "/dashboard/patient-management",
  },
];

const bottomItems = [
  { icon: "help", label: "Support", path: "#" },
  { icon: "logout", label: "Logout", path: "/login" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-6 px-4 w-64 z-40 bg-surface-container-low border-r border-outline-variant">
      {/* Brand */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-semibold text-primary">City Hospital</h1>
        <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          Admin Portal
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path === "/dashboard" && location.pathname === "/dashboard");

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-2 rounded-lg font-semibold text-xs tracking-widest uppercase transition-all active:translate-x-1 ${
                isActive
                  ? "bg-primary-container text-on-primary-container"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest"
              }`}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-1 border-t border-outline-variant pt-6">
        {bottomItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className="flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all rounded-lg text-xs font-semibold tracking-widest uppercase"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}
