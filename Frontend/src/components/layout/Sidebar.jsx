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

export default function Sidebar({ onEmergencyCall }) {
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

  const navItems = isDoctor ? DOCTOR_NAV_ITEMS : isPatient ? PATIENT_NAV_ITEMS : ADMIN_NAV_ITEMS;
  const rootPath = isDoctor ? "/doctor" : isPatient ? "/patient" : "/admin";

  const bottomItems = isDoctor
    ? [
        { icon: "person",  label: "My Profile", path: "/doctor/profile" },
        { icon: "logout",  label: "Logout",     path: "/login" },
      ]
    : isPatient
    ? [
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
      <div className="mb-6 px-2">
        <h1 className="text-xl font-bold text-[#003f87] tracking-tight">
          {isPatient ? "Medimate Healthcare" : "City Hospital"}
        </h1>
      </div>

      {/* Patient Welcome Card */}
      {isPatient && (
        <div className="mb-6 px-3 py-2.5 bg-gray-200/60 rounded-xl flex items-center gap-3 border border-gray-300/50 shadow-xs">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-white shadow-xs shrink-0">
            <img
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120"
              alt="Imasha"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="text-xs font-bold text-gray-800 leading-tight">Welcome, Imasha</div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            item.path === rootPath
              ? location.pathname === rootPath || location.pathname === `${rootPath}/dashboard`
              : location.pathname.startsWith(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium text-sm transition-all ${
                isActive
                  ? "bg-[#1d70f5] text-white shadow-xs"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="mt-auto space-y-2 border-t border-outline-variant pt-4">
        {bottomItems.map((item) => {
          const isLogout = item.label === "Logout";
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                if (isLogout) {
                  setShowLogoutConfirm(true);
                  return;
                }
                navigate(item.path);
              }}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-all text-left ${
                isLogout
                  ? "text-red-600 hover:bg-red-50"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-200/50"
              }`}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* Call Doctor Button in Patient Sidebar */}
        {isPatient && (
          <button
            type="button"
            onClick={onEmergencyCall}
            className="w-full mt-2 bg-[#be123c] hover:bg-[#9f1239] text-white font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs text-sm"
          >
            <span>Call Doctor</span>
          </button>
        )}
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
