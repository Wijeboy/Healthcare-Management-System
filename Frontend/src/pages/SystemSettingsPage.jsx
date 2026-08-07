import React, { useState } from "react";
import RolesPermissionsMatrix from "../components/settings/RolesPermissionsMatrix";
import SecurityMetricsCards from "../components/settings/SecurityMetricsCards";
import SettingsSidebarNav from "../components/settings/SettingsSidebarNav";


const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans p-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
            System Settings & Access Control
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage enterprise-level configurations, user roles, and security
            audit protocols.
          </p>
        </div>

        {/* Settings Content Grid */}
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <SettingsSidebarNav
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />

          <div className="w-full flex-1">
            {activeTab === "roles" && (
              <>
                <RolesPermissionsMatrix />
                <SecurityMetricsCards />
              </>
            )}

            {activeTab !== "roles" && (
              <div className="bg-white border border-[#E2E8F0] rounded-2xl p-12 text-center text-slate-400 font-medium">
                Content for{" "}
                <span className="capitalize">
                  {activeTab.replace("-", " ")}
                </span>{" "}
                settings goes here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
