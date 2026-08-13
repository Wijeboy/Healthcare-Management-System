import React from "react";

const UpcomingAppointmentsCard = ({ appointments }) => {
  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl shadow-sm overflow-hidden mb-6">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">
            Upcoming Appointments
          </h3>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Next scheduled consultations for this patient
          </p>
        </div>
        <button className="text-xs font-bold text-[#0256CA] hover:underline">
          View All Appointments
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-slate-200/80 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              <th className="px-5 py-3">DATE & TIME</th>
              <th className="px-5 py-3">DOCTOR</th>
              <th className="px-5 py-3">DEPARTMENT</th>
              <th className="px-5 py-3">REASON</th>
              <th className="px-5 py-3">STATUS</th>
              <th className="px-5 py-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {appointments.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50/80 transition">
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="font-bold text-slate-800">{item.date}</p>
                  <p className="text-[11px] text-slate-400">{item.time}</p>
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <p className="font-bold text-slate-800">{item.doctorName}</p>
                  <p className="text-[11px] text-slate-400">{item.doctorId}</p>
                </td>
                <td className="px-5 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                  {item.department}
                </td>
                <td className="px-5 py-3.5 font-medium text-slate-700 whitespace-nowrap">
                  {item.reason}
                </td>
                <td className="px-5 py-3.5 whitespace-nowrap">
                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase ${
                      item.status === "CONFIRMED"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right whitespace-nowrap">
                  <button className="px-3 py-1 border border-[#CBD5E1] bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-lg transition">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpcomingAppointmentsCard;
