import React from 'react'

const UpcomingAppointmentsTable = ({ appointments = [] }) => {
  const list = appointments || [];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">
            Upcoming Appointments
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Next scheduled consultations for this doctor
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {list.length === 0 ? (
          <p className="py-6 text-center text-slate-400 text-xs font-medium">
            No upcoming appointments scheduled for this doctor.
          </p>
        ) : (
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="pb-3 pl-2">DATE & TIME</th>
                <th className="pb-3">PATIENT</th>
                <th className="pb-3">REASON</th>
                <th className="pb-3">STATUS</th>
                <th className="pb-3 text-right pr-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {list.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/60 transition">
                  <td className="py-3.5 pl-2">
                    <p className="font-bold text-slate-800">{item.date}</p>
                    <p className="text-[11px] text-slate-400">{item.time}</p>
                  </td>
                  <td className="py-3.5">
                    <p className="font-bold text-slate-800">{item.patientName}</p>
                    <p className="text-[11px] text-slate-400">{item.patientId}</p>
                  </td>
                  <td className="py-3.5 font-medium text-slate-600">
                    {item.reason}
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase border ${
                        item.status === "CONFIRMED"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-200"
                          : "bg-amber-50 text-amber-600 border-amber-200"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <button className="px-3 py-1 border border-slate-300 rounded-md font-bold text-[#1E3A8A] text-xs hover:bg-slate-50 transition cursor-pointer">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UpcomingAppointmentsTable;


