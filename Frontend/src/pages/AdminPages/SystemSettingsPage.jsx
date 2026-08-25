import React from "react";
import GeneralSettingsPanel from "../../components/admin-components/settings/GeneralSettingsPanel";

const SystemSettingsPage = () => {
  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top_left,_#eff6ff_0%,_#f8fafc_45%,_#ffffff_100%)] text-[#1E293B] font-sans antialiased">
      <div className="flex-1 overflow-y-auto">
        <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
          <section className="space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.35em] text-slate-400">
              System Settings
            </p>
            <h1 className="text-2xl md:text-[30px] font-bold tracking-tight text-slate-900">
              Account and operational settings
            </h1>
            <p className="max-w-3xl text-sm text-slate-500 leading-6">
              Update your admin profile, password, and system defaults from a single place.
            </p>
          </section>

          <GeneralSettingsPanel />
        </main>
      </div>
    </div>
  );
};

export default SystemSettingsPage;
