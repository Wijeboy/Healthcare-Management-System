import React, { useState } from "react";
import RolesPermissionsMatrix from "../../components/admin-components/settings/RolesPermissionsMatrix";
import SecurityMetricsCards from "../../components/admin-components/settings/SecurityMetricsCards";
import SettingsSidebarNav from "../../components/admin-components/settings/SettingsSidebarNav";
import GeneralSettingsPanel from "../../components/admin-components/settings/GeneralSettingsPanel";
import AuditLogsPanel from "../../components/admin-components/settings/AuditLogsPanel";

const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState("roles");

  return (
    <div className="flex h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff_0%,_#f8fafc_45%,_#ffffff_100%)] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-8 max-w-7xl">
          <section className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-400">
              System Settings
            </p>
            <h1 className="text-2xl md:text-[30px] font-bold tracking-tight text-slate-900">
              Access control and operational settings
            </h1>
            <p className="max-w-3xl text-sm text-slate-500 leading-6">
              Configure role permissions, general hospital system defaults, and
              review audit activity from a single place.
            </p>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-6 items-start">
            <aside className="xl:sticky xl:top-6">
              <SettingsSidebarNav
                activeTab={activeTab}
                setActiveTab={setActiveTab}
              />
            </aside>

            <section className="space-y-6">
              {activeTab === "general" && <GeneralSettingsPanel />}

              {activeTab === "roles" && (
                <>
                  <RolesPermissionsMatrix />
                  <SecurityMetricsCards />
                </>
              )}

              {activeTab === "audit" && <AuditLogsPanel />}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
