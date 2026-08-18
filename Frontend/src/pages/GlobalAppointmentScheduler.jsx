import { useState } from 'react'

export default function GlobalAppointmentScheduler() {
  const [view, setView] = useState('week')

  return (
    <section className="min-h-full bg-surface">

      {/* =========================
          Scheduler Toolbar
      ========================== */}
      <div className="bg-white border-b border-outline-variant px-6 py-4">
        <div className="flex items-center justify-between gap-4">

          {/* Date Navigation */}
          <div className="flex items-center gap-4">
            <button
              className="flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Previous week"
            >
              <span className="material-symbols-outlined">
                chevron_left
              </span>
            </button>

            <div className="text-center min-w-[180px]">
              <h2 className="text-xl font-semibold text-on-surface">
                Oct 23 - Oct 29,
              </h2>

              <p className="text-xl font-semibold text-on-surface">
                2023
              </p>
            </div>

            <button
              className="flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors"
              aria-label="Next week"
            >
              <span className="material-symbols-outlined">
                chevron_right
              </span>
            </button>
          </div>

          {/* Department + Filters */}
          <div className="flex items-center gap-2">
            <select className="rounded-md border border-outline-variant bg-white px-4 py-2 text-sm text-on-surface focus:outline-none">
              <option>All Departments</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Pediatrics</option>
              <option>Radiology</option>
              <option>Orthopedics</option>
            </select>

            <button className="flex items-center gap-2 rounded-md border border-outline-variant bg-surface-container-low px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[18px]">
                filter_list
              </span>

              Filters
            </button>
          </div>

          {/* Week / Month / Day */}
          <div className="flex rounded-md bg-surface-container p-1">
            {['week', 'month', 'day'].map((item) => (
              <button
                key={item}
                onClick={() => setView(item)}
                className={`rounded-md px-5 py-2 text-sm font-medium capitalize transition ${
                  view === item
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          {/* New Appointment */}
          <button className="flex items-center gap-3 rounded-md bg-primary px-5 py-3 text-white hover:bg-primary-container transition-colors">
            <span className="material-symbols-outlined">
              add
            </span>

            <span className="text-sm font-medium">
              New Appointment
            </span>
          </button>
        </div>
      </div>

      {/* =========================
          Appointment Status Legend
      ========================== */}
      <div className="flex items-center gap-8 border-b border-outline-variant bg-white px-6 py-3 text-xs font-semibold">

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-700"></span>
          <span>Completed</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-blue-800"></span>
          <span>Scheduled</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-amber-500"></span>
          <span>Pending</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-700"></span>
          <span>Canceled</span>
        </div>

      </div>

      {/* =========================
          Week Calendar
      ========================== */}
      <div className="overflow-x-auto bg-white">
        <div className="min-w-[1000px]">

          {/* Day Headers */}
          <div className="grid grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant bg-surface-container-low">

            {/* Empty corner cell */}
            <div className="border-r border-outline-variant"></div>

            {[
              'MON 23',
              'TUE 24',
              'WED 25',
              'THU 26',
              'FRI 27',
              'SAT 28',
            ].map((day) => (
              <div
                key={day}
                className="border-r border-outline-variant py-4 text-center text-sm font-medium text-on-surface-variant last:border-r-0"
              >
                {day}
              </div>
            ))}
          </div>

          {/* =========================
              08:00 AM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              08:00 AM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-blue-800 p-3 text-white">
                <p className="text-sm">08:00 AM</p>

                <p className="mt-1 font-semibold">
                  John Doe
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Aris • Cardiology
                </p>
              </div>
            </div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-amber-500 p-3 text-white">
                <p className="text-sm">08:00 AM</p>

                <p className="mt-1 font-semibold">
                  Sarah Miller
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Chen • Pediatrics
                </p>
              </div>
            </div>

            {/* Thursday */}
            <div className="border-r border-outline-variant"></div>

            {/* Friday */}
            <div className="border-r border-outline-variant"></div>

            {/* Saturday */}
            <div></div>
          </div>

          {/* =========================
              09:00 AM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              09:00 AM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-emerald-700 p-3 text-white">
                <p className="text-sm">09:00 AM</p>

                <p className="mt-1 font-semibold">
                  Mike Tyson
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Balboa • Neurology
                </p>
              </div>
            </div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Thursday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-red-600 p-3 text-white">
                <p className="text-sm">09:00 AM</p>

                <p className="mt-1 font-semibold">
                  Emily Rose
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Strange • Radiology
                </p>
              </div>
            </div>

            {/* Friday */}
            <div className="border-r border-outline-variant"></div>

            {/* Saturday */}
            <div></div>
          </div>

          {/* =========================
              10:00 AM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              10:00 AM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant"></div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-blue-800 p-3 text-white">
                <p className="text-sm">10:00 AM</p>

                <p className="mt-1 font-semibold">
                  Alice Cooper
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Jekyll • General
                </p>
              </div>
            </div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Thursday */}
            <div className="border-r border-outline-variant"></div>

            {/* Friday */}
            <div className="border-r border-outline-variant"></div>

            {/* Saturday */}
            <div></div>
          </div>

          {/* =========================
              11:00 AM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              11:00 AM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant"></div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Thursday */}
            <div className="border-r border-outline-variant"></div>

            {/* Friday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-amber-500 p-3 text-white">
                <p className="text-sm">11:00 AM</p>

                <p className="mt-1 font-semibold">
                  Bob Marley
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. No • Ortho
                </p>
              </div>
            </div>

            {/* Saturday */}
            <div></div>
          </div>

          {/* =========================
              12:00 PM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              12:00 PM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant"></div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Thursday */}
            <div className="border-r border-outline-variant"></div>

            {/* Friday */}
            <div className="border-r border-outline-variant"></div>

            {/* Saturday */}
            <div></div>
          </div>

          {/* =========================
              01:00 PM Row
          ========================== */}
          <div className="grid min-h-[100px] grid-cols-[80px_repeat(6,1fr)] border-b border-outline-variant">

            {/* Time */}
            <div className="border-r border-outline-variant px-2 py-3 text-xs font-medium text-on-surface-variant">
              01:00 PM
            </div>

            {/* Monday */}
            <div className="border-r border-outline-variant"></div>

            {/* Tuesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Wednesday */}
            <div className="border-r border-outline-variant"></div>

            {/* Thursday */}
            <div className="border-r border-outline-variant p-1">
              <div className="h-full rounded-md bg-blue-800 p-3 text-white">
                <p className="text-sm">01:00 PM</p>

                <p className="mt-1 font-semibold">
                  Peter Parker
                </p>

                <p className="mt-1 text-[10px]">
                  Dr. Octopus • Lab
                </p>
              </div>
            </div>

            {/* Friday */}
            <div className="border-r border-outline-variant"></div>

            {/* Saturday */}
            <div></div>
          </div>

        </div>
      </div>

    </section>
  )
}