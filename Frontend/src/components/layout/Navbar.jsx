import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import NotificationPanel from "../admin-components/dashboard/NotificationPanel";

export default function Navbar() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [role, setRole] = useState("Admin");
  const notifRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const savedRole = localStorage.getItem("hmsRole");
    if (location.pathname.startsWith("/doctor")) {
      setRole("Doctor");
    } else if (location.pathname.startsWith("/patient")) {
      setRole("Patient");
    } else if (location.pathname.startsWith("/admin") || savedRole === "Admin") {
      setRole("Admin");
    } else if (savedRole) {
      setRole(savedRole);
    } else {
      setRole("Admin");
    }
  }, [location.pathname]);

  const settingsConfigByRole = {
    Admin: {
      route: "/admin/settings",
      label: "System Settings",
    },
    Doctor: {
      route: "/doctor",
      label: "Doctor Settings & Profile",
    },
    Patient: {
      route: "/patient",
      label: "Patient Settings & Profile",
    },
  };

  const currentSetting = settingsConfigByRole[role] || settingsConfigByRole.Admin;

  // Close notification panel on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex justify-between items-center w-full px-6 h-16 bg-surface-bright border-b border-outline-variant shadow-sm">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div
          className={`relative w-full transition-shadow ${searchFocused ? "shadow-md" : ""}`}
        >
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input
            className="w-full pl-12 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-shadow"
            placeholder="Search patients, records, or doctors..."
            type="text"
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4 ml-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <span className="material-symbols-outlined">notifications</span>
            {/* Badge */}
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface-bright"></span>
          </button>

          {showNotifications && (
            <NotificationPanel onClose={() => setShowNotifications(false)} role={role} />
          )}
        </div>

        {/* Settings */}
        <Link
          to={currentSetting.route}
          title={currentSetting.label}
          className="p-2 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors active:scale-95"
          aria-label={currentSetting.label}
        >
          <span className="material-symbols-outlined">settings</span>
        </Link>

        {/* User Avatar */}
        <div className="h-8 w-8 rounded-full bg-primary overflow-hidden border border-outline-variant cursor-pointer hover:ring-2 hover:ring-primary/30 transition-all">
          <img
            className="h-full w-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnLJCOUvN9NTMproKybuatmgcMylLaHHCZsoZXJpYLSlOr19EfXpssX76nzX3EsZUwkqaC7Wx48fqgywH739BZIXMqCB8lz8nJ6CxLB68AxGszo_gnZ1yqTVaN37xtzO9SHhOEzF3SkpfjoqLfL2UBAQVC5FfUfYfVTfjca-7V5p1utTNWmgnloQsYcFxNHgS0x1dqkNaVZCGc5Y6cYx_JL3TtZ8PO3LhgeR-pNcVyxTpN0IxdzPnSN4fzsP2Ayx1BM9I6cDs83EY"
            alt="Admin Avatar"
          />
        </div>
      </div>
    </header>
  );
}
