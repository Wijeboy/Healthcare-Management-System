import { useState } from 'react'

const originalPermissions = [
  {
    id: 1,
    name: 'Edit Records',
    description: 'Ability to modify patient medical history and notes.',
    admin: true,
    doctor: true,
    nurse: false,
  },
  {
    id: 2,
    name: 'Process Refunds',
    description: 'Access to billing modules for financial adjustments.',
    admin: true,
    doctor: false,
    nurse: false,
  },
  {
    id: 3,
    name: 'Issue Prescriptions',
    description: 'Authorize and transmit digital prescriptions.',
    admin: false,
    doctor: true,
    nurse: false,
  },
  {
    id: 4,
    name: 'Manage Inventory',
    description: 'Update stock levels for medical supplies.',
    admin: true,
    doctor: true,
    nurse: true,
  },
]

const auditLogs = [
  {
    id: 1,
    action: 'Permission Updated',
    user: 'Administrator',
    date: 'Aug 10, 2026 · 09:15 AM',
  },
  {
    id: 2,
    action: 'New Doctor Role Created',
    user: 'Administrator',
    date: 'Aug 09, 2026 · 03:42 PM',
  },
  {
    id: 3,
    action: 'System Configuration Updated',
    user: 'Administrator',
    date: 'Aug 08, 2026 · 11:20 AM',
  },
]

function PermissionSwitch({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        checked ? 'bg-emerald-700' : 'bg-slate-300'
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
          checked ? 'left-6' : 'left-1'
        }`}
      />
    </button>
  )
}

export default function SystemSettingsAccessControl() {
  const [activeTab, setActiveTab] = useState('roles')
  const [permissions, setPermissions] = useState(originalPermissions)
  const [savedMessage, setSavedMessage] = useState('')

  function togglePermission(id, role) {
    setPermissions((current) =>
      current.map((permission) =>
        permission.id === id
          ? {
              ...permission,
              [role]: !permission[role],
            }
          : permission
      )
    )

    setSavedMessage('')
  }

  function discardChanges() {
    setPermissions(originalPermissions.map((permission) => ({ ...permission })))
    setSavedMessage('Changes discarded.')
  }

  function saveChanges() {
    setSavedMessage('System configurations saved successfully.')
  }

  function addNewRole() {
    window.alert(
      'Add New Role will be connected to the backend when role management APIs are available.'
    )
  }

  return (
    <section className="min-h-full bg-slate-50 px-6 py-7">

      {/* ========================================
          PAGE HEADING
      ========================================= */}
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-slate-900">
          System Settings &amp; Access Control
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage enterprise-level configurations, user roles, and security
          audit protocols.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-7 lg:grid-cols-[220px_1fr]">

        {/* ========================================
            SETTINGS NAVIGATION
        ========================================= */}
        <div className="space-y-2">

          <button
            type="button"
            onClick={() => setActiveTab('general')}
            className={`flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left font-semibold transition ${
              activeTab === 'general'
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">
              settings_suggest
            </span>

            <span>General</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('roles')}
            className={`flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left font-semibold transition ${
              activeTab === 'roles'
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">
              admin_panel_settings
            </span>

            <span>
              Roles &amp;
              <br />
              Permissions
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`flex w-full items-center gap-4 rounded-lg px-4 py-4 text-left font-semibold transition ${
              activeTab === 'audit'
                ? 'bg-primary text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="material-symbols-outlined">
              history
            </span>

            <span>Audit Logs</span>
          </button>
        </div>

        {/* ========================================
            RIGHT CONTENT
        ========================================= */}
        <div>

          {/* ========================================
              ROLES & PERMISSIONS
          ========================================= */}
          {activeTab === 'roles' && (
            <>
              <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">

                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-300 px-6 py-6">
                  <div>
                    <h2 className="text-2xl font-semibold text-slate-900">
                      Roles &amp; Permissions Matrix
                    </h2>

                    <p className="mt-1 max-w-xl text-sm text-slate-500">
                      Define granular access levels for clinical and
                      administrative staff members.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={addNewRole}
                    className="rounded-md border border-primary bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:bg-blue-50"
                  >
                    Add New
                    <br />
                    Role
                  </button>
                </div>

                {/* Matrix Header */}
                <div className="grid grid-cols-[1.7fr_repeat(3,0.8fr)] bg-slate-100 px-5 py-4">
                  <div className="text-xs font-semibold tracking-wide text-slate-600">
                    Permission Name
                  </div>

                  <div className="text-center text-xs font-semibold text-slate-600">
                    Admin
                  </div>

                  <div className="text-center text-xs font-semibold text-slate-600">
                    Doctor
                  </div>

                  <div className="text-center text-xs font-semibold text-slate-600">
                    Nurse
                  </div>
                </div>

                {/* Permission Rows */}
                {permissions.map((permission) => (
                  <div
                    key={permission.id}
                    className="grid min-h-[90px] grid-cols-[1.7fr_repeat(3,0.8fr)] items-center border-b border-slate-200 px-5"
                  >
                    <div>
                      <h3 className="font-semibold text-slate-800">
                        {permission.name}
                      </h3>

                      <p className="mt-1 max-w-[250px] text-xs leading-4 text-slate-500">
                        {permission.description}
                      </p>
                    </div>

                    <div className="flex justify-center">
                      <PermissionSwitch
                        checked={permission.admin}
                        onChange={() =>
                          togglePermission(permission.id, 'admin')
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <PermissionSwitch
                        checked={permission.doctor}
                        onChange={() =>
                          togglePermission(permission.id, 'doctor')
                        }
                      />
                    </div>

                    <div className="flex justify-center">
                      <PermissionSwitch
                        checked={permission.nurse}
                        onChange={() =>
                          togglePermission(permission.id, 'nurse')
                        }
                      />
                    </div>
                  </div>
                ))}

                {/* Bottom Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-50 px-6 py-6">

                  <div className="flex items-start gap-2 text-xs text-slate-500">
                    <span className="material-symbols-outlined text-[17px]">
                      info
                    </span>

                    <span>
                      Changes will be logged in the Audit Logs and
                      <br />
                      applied instantly.
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={discardChanges}
                      className="rounded-md bg-slate-300 px-7 py-4 font-semibold text-slate-800 transition hover:bg-slate-400"
                    >
                      Discard
                      <br />
                      Changes
                    </button>

                    <button
                      type="button"
                      onClick={saveChanges}
                      className="rounded-md bg-primary px-7 py-4 font-semibold text-white shadow transition hover:bg-primary-container"
                    >
                      Save System
                      <br />
                      Configurations
                    </button>
                  </div>
                </div>
              </div>

              {/* Save Message */}
              {savedMessage && (
                <div className="mt-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  {savedMessage}
                </div>
              )}

              {/* Statistics */}
              <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-3">

                <div className="flex items-center gap-4 rounded-xl border border-slate-300 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-primary">
                    <span className="material-symbols-outlined">
                      group_add
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Active Roles
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      12 Total
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-300 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                    <span className="material-symbols-outlined">
                      lock
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Security Score
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      98.4%
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-slate-300 bg-white p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <span className="material-symbols-outlined">
                      verified_user
                    </span>
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Recent Audits
                    </p>

                    <p className="text-xl font-bold text-slate-900">
                      458 Logs
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}

          {/* ========================================
              GENERAL SETTINGS
          ========================================= */}
          {activeTab === 'general' && (
            <div className="rounded-xl border border-slate-300 bg-white p-7">
              <h2 className="text-2xl font-semibold text-slate-900">
                General Settings
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Configure general hospital and system preferences.
              </p>

              <div className="mt-7 grid gap-5">

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Hospital Name
                  </label>

                  <input
                    type="text"
                    defaultValue="City Hospital"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Administrator Email
                  </label>

                  <input
                    type="email"
                    defaultValue="admin@cityhospital.com"
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-primary"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Session Timeout
                  </label>

                  <select className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>2 Hours</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setSavedMessage(
                        'General settings saved successfully.'
                      )
                    }
                    className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-container"
                  >
                    Save General Settings
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* ========================================
              AUDIT LOGS
          ========================================= */}
          {activeTab === 'audit' && (
            <div className="overflow-hidden rounded-xl border border-slate-300 bg-white">
              <div className="border-b border-slate-200 px-6 py-6">
                <h2 className="text-2xl font-semibold text-slate-900">
                  Audit Logs
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Review recent system security and configuration activity.
                </p>
              </div>

              <div className="grid grid-cols-[1.4fr_1fr_1.2fr] bg-slate-100 px-6 py-4 text-xs font-semibold uppercase text-slate-500">
                <div>Activity</div>
                <div>User</div>
                <div>Date &amp; Time</div>
              </div>

              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="grid min-h-[70px] grid-cols-[1.4fr_1fr_1.2fr] items-center border-b border-slate-100 px-6 last:border-b-0"
                >
                  <div className="font-medium text-slate-700">
                    {log.action}
                  </div>

                  <div className="text-sm text-slate-500">
                    {log.user}
                  </div>

                  <div className="text-sm text-slate-500">
                    {log.date}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  )
}