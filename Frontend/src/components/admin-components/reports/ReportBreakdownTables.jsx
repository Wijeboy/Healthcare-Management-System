import React from "react";
import { reportData } from "../../../data/reportData";

const ReportBreakdownTables = ({ liveDoctorStats }) => {
  const doctorsList = liveDoctorStats && liveDoctorStats.length > 0
    ? liveDoctorStats.map(d => ({
        name: d.name,
        department: d.department,
        appointments: d.totalAppointments,
      }))
    : reportData.tables.doctors;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">
          Appointment Summary
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Total, approved, cancelled, and pending appointments.
        </p>
        <div className="mt-5 space-y-3">
          {reportData.tables.appointments.map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3"
            >
              <span className="text-sm font-medium text-slate-700">
                {item.label}
              </span>
              <span className="text-sm font-bold text-slate-900">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Doctor Statistics</h3>
        <p className="text-xs text-slate-500 mt-1">
          Appointments handled by each doctor.
        </p>
        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-4 py-3">Doctor</th>
                <th className="px-4 py-3">Dept.</th>
                <th className="px-4 py-3 text-right">Appointments</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctorsList.map((doctor) => (
                <tr key={doctor.name} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-medium text-slate-800">
                    {doctor.name}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {doctor.department}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {doctor.appointments}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900">Patient Statistics</h3>
        <p className="text-xs text-slate-500 mt-1">
          Patient registrations over time.
        </p>
        <div className="mt-5 space-y-3">
          {reportData.tables.patientRegistrations.map((item) => (
            <div key={item.period} className="flex items-center gap-3">
              <div className="w-10 text-xs font-bold text-slate-500">
                {item.period}
              </div>
              <div className="flex-1 rounded-full bg-slate-100 h-3 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#1E3A8A]"
                  style={{ width: `${item.registrations}%` }}
                />
              </div>
              <div className="w-12 text-right text-sm font-bold text-slate-900">
                {item.registrations}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="xl:col-span-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Core Report Sections
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Coverage of the key reporting areas requested for this dashboard.
            </p>
          </div>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-4 py-3">Section</th>
                <th className="px-4 py-3">Content</th>
                <th className="px-4 py-3 text-right">Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.tables.reportRows.map((row) => (
                <tr key={row.title} className="hover:bg-slate-50/70">
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {row.title}
                  </td>
                  <td className="px-4 py-3 text-slate-500">
                    {row.description}
                  </td>
                  <td className="px-4 py-3 text-right font-bold text-slate-900">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportBreakdownTables;
