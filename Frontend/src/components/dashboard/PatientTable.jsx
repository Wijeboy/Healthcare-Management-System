import { useState } from 'react'

const patients = [
  { id: '#PAT-8821', name: 'Elena Rodriguez', initials: 'ER', contact: '+1 (555) 012-3344', date: 'Oct 24, 2023' },
  { id: '#PAT-8822', name: 'James McAvoy', initials: 'JM', contact: '+1 (555) 987-6543', date: 'Oct 24, 2023' },
  { id: '#PAT-8823', name: 'Sarah Lin', initials: 'SL', contact: '+1 (555) 234-5678', date: 'Oct 23, 2023' },
  { id: '#PAT-8824', name: 'Marcus Thorne', initials: 'MT', contact: '+1 (555) 345-6789', date: 'Oct 23, 2023' },
  { id: '#PAT-8825', name: 'Priya Sharma', initials: 'PS', contact: '+1 (555) 456-7890', date: 'Oct 22, 2023' },
  { id: '#PAT-8826', name: 'David Chen', initials: 'DC', contact: '+1 (555) 567-8901', date: 'Oct 22, 2023' },
]

export default function PatientTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const patientsPerPage = 4
  const totalPatients = 1240

  const startIdx = (currentPage - 1) * patientsPerPage
  const displayedPatients = patients.slice(startIdx, startIdx + patientsPerPage)

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-[0_4px_4px_rgba(0,0,0,0.05)]">
      {/* Header */}
      <div className="p-6 flex justify-between items-center border-b border-outline-variant">
        <div>
          <h3 className="text-xl font-semibold text-on-surface leading-7">Recent Patient Registrations</h3>
          <p className="text-sm text-on-surface-variant">Latest arrivals in the registration system.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-on-primary rounded-lg text-xs font-semibold tracking-widest uppercase hover:brightness-110 active:scale-95 transition-all">
          Export Report
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low">
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Patient ID</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Name</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Contact</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant">Date</th>
              <th className="px-6 py-4 text-xs font-semibold tracking-widest uppercase text-on-surface-variant text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {displayedPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-4 text-sm font-medium text-primary">{patient.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-surface-container-high flex items-center justify-center font-bold text-on-surface-variant text-xs">
                      {patient.initials}
                    </div>
                    <span className="text-base text-on-surface">{patient.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{patient.contact}</td>
                <td className="px-6 py-4 text-sm text-on-surface-variant">{patient.date}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="px-2 py-1 border border-primary text-primary rounded-md text-xs font-semibold tracking-widest uppercase hover:bg-primary/5 transition-colors">
                      View
                    </button>
                    <button className="px-2 py-1 bg-surface-container-highest text-on-surface rounded-md text-xs font-semibold tracking-widest uppercase hover:bg-outline-variant transition-colors">
                      Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="p-4 bg-surface-container-low flex justify-between items-center px-6">
        <span className="text-sm text-on-surface-variant">
          Showing {startIdx + 1}-{Math.min(startIdx + patientsPerPage, patients.length)} of {totalPatients.toLocaleString()} patients
        </span>
        <div className="flex gap-1">
          <button
            className="p-1 hover:bg-surface-container-high rounded transition-colors disabled:opacity-40"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            <span className="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            className="p-1 hover:bg-surface-container-high rounded transition-colors disabled:opacity-40"
            onClick={() => setCurrentPage(p => p + 1)}
            disabled={startIdx + patientsPerPage >= patients.length}
          >
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  )
}
