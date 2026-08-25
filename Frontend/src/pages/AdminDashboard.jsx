import React, { useState, useEffect } from "react";
import StatsCard from "../components/admin-components/dashboard/StatsCard";
import PatientTable from "../components/admin-components/dashboard/PatientTable";
import FacilityStatus from "../components/admin-components/dashboard/FacilityStatus";
import SystemAlerts from "../components/admin-components/dashboard/SystemAlerts";
import AnalyticsCharts from "../components/admin-components/dashboard/AnalyticsCharts";
import { patientApi, doctorApi, reportApi } from "../services/api";

export default function AdminDashboard() {
  const [totalPatients, setTotalPatients] = useState("...");
  const [totalDoctors, setTotalDoctors] = useState("...");
  const [todayAppointments, setTodayAppointments] = useState("...");
  const [totalRevenue, setTotalRevenue] = useState("...");

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Today's date range for appointment count
        const today = new Date().toISOString().split("T")[0];

        const [patRes, docRes, reportRes] = await Promise.all([
          patientApi.getAll({ limit: 1 }),
          doctorApi.getAll({ limit: 1 }),
          reportApi.getOverview({ startDate: today, endDate: today }).catch(() => null),
        ]);

        if (patRes?.total !== undefined) setTotalPatients(patRes.total.toLocaleString());
        if (docRes?.total !== undefined) setTotalDoctors(docRes.total.toLocaleString());

        if (reportRes?.summary) {
          setTodayAppointments(
            (reportRes.summary.totalAppointments ?? 0).toLocaleString()
          );
          setTotalRevenue(reportRes.summary.totalRevenue ?? "$0");
        } else {
          setTodayAppointments("0");
          setTotalRevenue("$0");
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
        setTodayAppointments("—");
        setTotalRevenue("—");
      }
    };
    fetchCounts();
  }, []);

  return (
    <section className="p-6 space-y-6">
      {/* Dashboard Header */}
      <div className="flex flex-col gap-1">
        <h2 className="text-[32px] font-bold text-on-surface leading-10 tracking-tight">
          Administrator Overview
        </h2>
        <p className="text-base text-on-surface-variant leading-6">
          Real-time clinical operations and patient metrics.
        </p>
      </div>

      {/* Metrics Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon="person"
          value={totalPatients}
          label="Total Patients"
          trend="+2.4%"
          trendType="positive"
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
        <StatsCard
          icon="medical_information"
          value={totalDoctors}
          label="Active Doctors"
          trend="Steady"
          trendType="neutral"
          iconBg="bg-secondary/10"
          iconColor="text-secondary"
        />
        <StatsCard
          icon="event_note"
          value={todayAppointments}
          label="Today's Appointments"
          pulse={true}
          iconBg="bg-tertiary/10"
          iconColor="text-tertiary"
        />
        <StatsCard
          icon="account_balance_wallet"
          value={totalRevenue}
          label="Total Revenue"
          trend="+12%"
          trendType="positive"
          iconBg="bg-on-secondary-container/10"
          iconColor="text-on-secondary-container"
        />
      </div>

      {/* Charts Section */}
      <AnalyticsCharts />

      {/* Bento Layout: Table + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Patient Table (Span 2) */}
        <div className="lg:col-span-2">
          <PatientTable />
        </div>

        {/* Sidebar Content */}
        <div className="space-y-6">
          {/* Quick Action Card */}
          <div className="bg-primary text-on-primary rounded-xl p-6 relative overflow-hidden shadow-lg group">
            <div className="relative z-10">
              <h3 className="text-xl font-semibold mb-1 leading-7">
                New Appointment
              </h3>
              <p className="text-sm text-on-primary/80 mb-6">
                Schedule a consultation with an available specialist instantly.
              </p>
              <button className="w-full bg-on-primary text-primary text-xs font-semibold tracking-widest uppercase py-4 rounded-lg active:scale-95 transition-transform hover:bg-primary-fixed">
                Book Now
              </button>
            </div>
            <span className="material-symbols-outlined absolute -bottom-4 -right-4 text-[120px] opacity-10 pointer-events-none">
              add_circle
            </span>
          </div>

          {/* Facility Status */}
          <FacilityStatus />

          {/* System Alerts */}
          <SystemAlerts />
        </div>
      </div>
    </section>
  );
}
