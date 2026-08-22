import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../common/ConfirmationModal";

const ADMIN_NAV_ITEMS = [
  { icon: "dashboard",       label: "Dashboard",          path: "/admin" },
  { icon: "calendar_today",  label: "Appointments",        path: "/admin/appointments" },
  { icon: "folder_shared",   label: "Records",             path: "/admin/records" },
  { icon: "payments",        label: "Payments",            path: "/admin/payments" },
  { icon: "query_stats",     label: "Reports & Analytics", path: "/admin/reports" },
  { icon: "people",          label: "Doctor Management",   path: "/admin/doctors" },
  { icon: "people_alt",      label: "Staff Management",    path: "/admin/staff" },
  { icon: "person",          label: "Patient Management",  path: "/admin/patients" },
  { icon: "manage_accounts", label: "User Management",     path: "/admin/users" },
];

const DOCTOR_NAV_ITEMS = [
  { icon: "dashboard",            label: "Dashboard",              path: "/doctor" },
  { icon: "calendar_today",       label: "Today's Appointments",    path: "/doctor/appointments/today" },
  { icon: "event_available",      label: "Schedule & Availability", path: "/doctor/schedule" },
  { icon: "folder_shared",        label: "Records",                 path: "/doctor/records" },
  { icon: "medication",           label: "Prescriptions",           path: "/doctor/prescriptions" },
  { icon: "notifications_active", label: "Clinical Notifications",  path: "/doctor/notifications" },
];

const PATIENT_NAV_ITEMS = [
  {
    icon: "dashboard",
    label: "Dashboard",
    path: "/patient"
  },
  {
    icon: "calendar_today",
    label: "Appointments",
    path: "/patient/appointments",
  },
  {
    icon: "folder_shared",
    label: "Records",
    path: "/patient/medical-records"
  },
  {
    icon: "medication",
    label: "Prescriptions",
    path: "/patient/prescriptions",
  },
  {
    icon: "payments",
    label: "Payments",
    path: "/patient/payments",
  },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("hmsRole");
    localStorage.removeItem("hmsEmail");
    setShowLogoutConfirm(false);
    navigate("/login", { replace: true });
  };
  const isDoctor = location.pathname.startsWith("/doctor");
  const isPatient = location.pathname.startsWith("/patient");
  const currentPortalLabel = isDoctor ? "doctor" : isPatient ? "patient" : "admin";
  const currentPortalTitle = isDoctor ? "Doctor Portal" : isPatient ? "Patient Portal" : "Admin Portal";

  const navItems = isDoctor ? DOCTOR_NAV_ITEMS : isPatient ? PATIENT_NAV_ITEMS : ADMIN_NAV_ITEMS;
  const rootPath = isDoctor ? "/doctor" : isPatient ? "/patient" : "/admin";
  const brandLabel = currentPortalTitle;

  const bottomItems = isDoctor
    ? [
        { icon: "person",  label: "My Profile", path: "/doctor/profile" },
        { icon: "logout",  label: "Logout",     path: "/login" },
      ]
    : isPatient
    ? [
        { icon: "person",  label: "My Profile", path: "/patient/profile" },
        { icon: "help",    label: "Support",    path: "/patient/support" },
        { icon: "logout",  label: "Logout",     path: "/login" },
      ]
    : [
        { icon: "help",    label: "Support", path: "#" },
        { icon: "logout",  label: "Logout",  path: "/login" },
      ];

  return (
    <aside className="fixed left-0 top-0 h-screen flex flex-col py-6 px-4 w-64 z-40 bg-surface-container-low border-r border-outline-variant">
      {/* Brand */}
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-semibold text-primary">City Hospital</h1>
        <p className="text-xs font-semibold tracking-widest uppercase text-on-surface-variant">
          {brandLabel}
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.path === rootPath
              ? location.pathname === rootPath || location.pathname === `${rootPath}/dashboard`
              : location.pathname.startsWith(item.path);

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
          <button
            key={item.label}
            type="button"
            onClick={() => {
              if (item.label === "Logout") {
                setShowLogoutConfirm(true);
                return;
              }
              navigate(item.path);
            }}
            className="w-full flex items-center gap-4 px-4 py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container-highest transition-all rounded-lg text-xs font-semibold tracking-widest uppercase text-left"
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </div>

      <ConfirmationModal
        open={showLogoutConfirm}
        title="Log Out"
        message={`Are you sure you want to log out of the ${currentPortalLabel} dashboard?`}
        confirmText="Log Out"
        cancelText="Cancel"
        onConfirm={handleLogout}
        onCancel={() => setShowLogoutConfirm(false)}
        loading={false}
        destructive={true}
      />
    </aside>
  );
}
