# Medimate Healthcare — Doctor Portal Frontend

React + Tailwind CSS frontend for a single-role Doctor portal, built to plug
into a Node.js + Express + MongoDB (Prisma ORM) backend with JWT auth.

This delivers **frontend only** — backend wiring points already exist (see
`src/api/`) but run entirely on mock data until the Express server exists.

There is only one portal now (no separate Admin area) — everything, including
Records and Prescriptions, lives under the Doctor sidebar.

## File structure

```
medintel-frontend/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── .env.example
└── src/
    ├── main.jsx                     # React root — wraps App in ThemeProvider + BrowserRouter
    ├── App.jsx                      # Route table
    ├── index.css                    # Tailwind directives
    │
    ├── api/                         # Backend integration layer (USE_MOCK_DATA flag per file)
    │   ├── axiosClient.js           # Axios instance + JWT bearer interceptor + 401 redirect
    │   ├── appointmentsApi.js       # fetch/fetchById/updateStatus/create
    │   ├── recordsApi.js            # fetch/updateResult/upload (multipart)
    │   ├── prescriptionsApi.js      # fetch/fetchById/updateStatus/update/create
    │   └── doctorApi.js             # profile, availability, notifications
    │
    ├── context/
    │   ├── AuthContext.jsx          # JWT login/logout skeleton (POST /api/auth/login)
    │   └── ThemeContext.jsx         # Dark/light mode — persists to localStorage
    │
    ├── hooks/
    │   ├── useAppointments.js       # Appointment state/filtering
    │   ├── useRecords.js            # Records state, search, category/result filters
    │   ├── usePrescriptions.js      # Prescriptions state, search, status filter, stat counts
    │   ├── useDoctorProfile.js      # The logged-in doctor's own profile
    │   ├── useAvailability.js       # Weekly schedule grid state
    │   └── useNotifications.js      # Clinical notifications, grouped + filtered
    │
    ├── constants/
    │   └── statusStyles.js          # Appointment status colors, departments
    │
    ├── utils/
    │   └── date.js                  # Real calendar math (month/week grids, day labels)
    │
    ├── data/                        # Temporary mock datasets — mirror future API shapes
    │   ├── mockAppointments.js      # + DOCTORS, PATIENTS
    │   ├── mockRecords.js
    │   ├── mockPrescriptions.js
    │   ├── mockDoctorProfile.js     # CURRENT_DOCTOR_NAME = "Dr. Nimal Perera"
    │   ├── mockAvailability.js
    │   └── mockNotifications.js
    │
    ├── components/
    │   ├── layout/
    │   │   ├── DoctorSidebar.jsx    # The only sidebar — Dashboard/Today/Schedule/Records/Prescriptions/Notifications/Profile
    │   │   ├── Topbar.jsx           # Search bar, bell, settings, dark-mode toggle
    │   │   └── Footer.jsx
    │   ├── appointments/
    │   │   ├── Legend.jsx
    │   │   └── StatusSelect.jsx     # Editable status pill dropdown
    │   ├── records/
    │   │   └── UploadReportModal.jsx
    │   └── common/
    │       └── Avatar.jsx
    │
    └── pages/
        ├── ScheduleAppointment.jsx  # /appointments/new — 3-step booking wizard, real calendar nav
        ├── Records.jsx              # /records — table, search/filter, upload modal
        ├── Prescriptions.jsx        # /prescriptions — stat cards, table, pagination
        ├── PrescriptionForm.jsx     # /prescriptions/new and /prescriptions/:id/edit — create or edit
        ├── PrescriptionView.jsx     # /prescriptions/:id — read-only detail + status change
        └── doctor/
            ├── DoctorDashboard.jsx          # /doctor — stat cards, Today's Schedule table, reports, insights
            ├── DoctorProfile.jsx            # /doctor/profile — view/edit
            ├── DoctorSchedule.jsx           # /doctor/schedule — weekly availability grid
            ├── TodaysAppointments.jsx       # /doctor/appointments/today
            ├── DoctorAppointmentDetails.jsx # /doctor/appointments/:id
            ├── PatientHistory.jsx           # /doctor/patients/:patientId — appointments + records + prescriptions combined
            └── ClinicalNotifications.jsx    # /doctor/notifications — grouped action-feed
```

## Routes

| Path                             | Page                                             |
|-----------------------------------|---------------------------------------------------|
| `/` → `/doctor`                   | Redirects to the dashboard                        |
| `/doctor`                         | Doctor Dashboard                                   |
| `/doctor/profile`                 | Doctor Profile                                     |
| `/doctor/schedule`                | Schedule & Availability                            |
| `/doctor/appointments/today`      | Today's Appointments                               |
| `/doctor/appointments/:id`        | Appointment Details (doctor view)                  |
| `/doctor/patients/:patientId`     | Patient History (appointments + records + Rx)      |
| `/doctor/notifications`           | Clinical Notifications (grouped action feed)       |
| `/appointments/new`               | Schedule Appointment wizard                        |
| `/records`                        | Records Table + Upload Report                      |
| `/prescriptions`                  | Prescription List + stats                          |
| `/prescriptions/new`              | Issue New Prescription                             |
| `/prescriptions/:id`              | Prescription View                                  |
| `/prescriptions/:id/edit`         | Edit Prescription (same form, pre-filled)          |

## Running locally

```bash
npm install
cp .env.example .env
npm run dev
```

Opens at `http://localhost:5173`, redirecting to `/doctor`.

## Connecting the real backend

1. Build the Express API with routes like:
   - `POST   /api/auth/login`
   - `GET    /api/appointments`, `PATCH /api/appointments/:id/status`, `POST /api/appointments`
   - `GET    /api/records`, `PATCH /api/records/:id/result`, `POST /api/records`
   - `GET    /api/prescriptions`, `POST /api/prescriptions`, `PUT /api/prescriptions/:id`
   - `GET    /api/doctor/me`, `PUT /api/doctor/me`
   - `GET    /api/doctor/availability`, `PATCH /api/doctor/availability`
   - `GET    /api/doctor/notifications`, `PATCH /api/doctor/notifications/:id/read`
2. Model `Appointment`, `Patient`, `Doctor`, `Record`, `Prescription` in
   `schema.prisma`, backed by MongoDB.
3. In each `src/api/*.js` file, set `USE_MOCK_DATA = false` — the axios calls
   underneath are already written and pointed at `VITE_API_BASE_URL`.
4. Protect Express routes with a JWT `authenticate` middleware; the frontend
   already attaches `Authorization: Bearer <token>` via `axiosClient.js`.

No component code needs to change for this swap — only the flag in each API file.

## A note on mock data persistence

`mockAppointments`, `mockRecords`, and `mockPrescriptions` are plain arrays
imported by the API layer. Update functions mutate those arrays directly (not
just local component state), so changes are visible everywhere in the app for
the rest of the browser session. A full page refresh resets to the original
mock data, since there's no real database yet — this resolves automatically
once the backend is connected.

## Dark mode

The moon/sun icon in the topbar toggles a `dark` class on `<html>` via
`ThemeContext`, persists the choice to `localStorage`, and defaults to the
OS's `prefers-color-scheme` on first visit.

## Calendar navigation

`src/utils/date.js` provides real calendar math (days in month, starting
weekday, week ranges) — the booking wizard's date picker has working
prev/next month navigation, not a hardcoded date string.

## `CURRENT_DOCTOR_NAME`

`src/data/mockDoctorProfile.js` hardcodes `"Dr. Nimal Perera"` as the logged-in
doctor, standing in for `GET /api/auth/me`. Every doctor-scoped view (Today's
Appointments, the Dashboard, the sidebar's unread badge) filters by this
constant. In a real app this comes from the JWT after login instead.
