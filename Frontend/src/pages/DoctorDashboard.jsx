import React, { useMemo } from "react";
import { useAppointments } from "../hooks/useAppointments";
import { useRecords } from "../hooks/useRecords";
import { CURRENT_DOCTOR_NAME, PATIENTS } from "../services/doctorApi";
import DoctorDashboardPage from "./DoctorPages/Dashboard";

const TODAY = { year: 2026, month: 9, day: 25 };

export default function DoctorDashboard() {
  const { allAppointments } = useAppointments();
  const { records } = useRecords();

  const myAppointments = useMemo(() => allAppointments.filter((a) => a.doctor === CURRENT_DOCTOR_NAME), [allAppointments]);
  const todaysAppointments = useMemo(
    () => myAppointments.filter((a) => a.year === TODAY.year && a.month === TODAY.month && a.day === TODAY.day).sort((a, b) => a.hour - b.hour),
    [myAppointments]
  );
  const pendingReports = useMemo(() => records.filter((r) => r.result === "Abnormal").length, [records]);
  const recentReports = useMemo(() => records.slice(0, 3), [records]);

  return (
    <DoctorDashboardPage
      doctorName={CURRENT_DOCTOR_NAME}
      totalPatients={PATIENTS.length}
      pendingReports={pendingReports}
      todaysAppointments={todaysAppointments}
      recentReports={recentReports}
      today={TODAY}
    />
  );
}
