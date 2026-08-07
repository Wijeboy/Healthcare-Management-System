import React, { useEffect, useState } from 'react'
import {
  Users,
  Calendar,
  AlertTriangle,
  BarChart3,
  UserPlus,
  Info,
  ShieldCheck,
} from "lucide-react";
import PatientTable from '../components/PatientManagement/PatientTable';
import AddPatientForm from '../components/PatientManagement/AddPatientForm';
import ConfirmationModal from '../components/common/ConfirmationModal';

const PatientManagement = () => {
  const [showAddPatientForm, setShowAddPatientForm] = useState(false);
  const [patientFormMode, setPatientFormMode] = useState("add");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const isDeleteConfirmOpen = Boolean(deleteTarget);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setShowAddPatientForm(false);
        setDeleteTarget(null);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleAddPatientSubmit = (event) => {
    event.preventDefault();
    console.log("Create new patient");
    handleClosePatientForm();
  };

  const handleOpenAddPatient = () => {
    setSelectedPatient(null);
    setPatientFormMode("add");
    setShowAddPatientForm(true);
  };

  const handleOpenEditPatient = (patient) => {
    setDeleteTarget(null);
    setSelectedPatient(patient);
    setPatientFormMode("edit");
    setShowAddPatientForm(true);
  };

  const handleOpenDeleteConfirm = (patient) => {
    setShowAddPatientForm(false);
    setSelectedPatient(null);
    setPatientFormMode("add");
    setDeleteTarget(patient);
  };

  const handleConfirmDelete = () => {
    console.log("Delete patient", deleteTarget);
    setDeleteTarget(null);
  };

  const handleClosePatientForm = () => {
    setShowAddPatientForm(false);
    setSelectedPatient(null);
    setPatientFormMode("add");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex flex-1">
        
        {/* Workspace */}
        <div className="flex-1 flex flex-col min-w-0">
      

          <main className="p-8 space-y-6 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Patient Management
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Access and manage comprehensive clinical patient records.
                </p>
              </div>
              <button
                type="button"
                onClick={handleOpenAddPatient}
                className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register New Patient</span>
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 relative shadow-sm">
                <span className="absolute top-4 right-4 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  +12%
                </span>
                <div className="p-2.5 w-fit rounded-lg bg-blue-50 text-blue-600 mb-3">
                  <Users className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Total Patients
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">
                  12,842
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 relative shadow-sm">
                <span className="absolute top-4 right-4 text-xs font-medium text-slate-400">
                  Today
                </span>
                <div className="p-2.5 w-fit rounded-lg bg-emerald-50 text-emerald-600 mb-3">
                  <Calendar className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Active Visits
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">48</p>
              </div>

              {/* Card 3 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 relative shadow-sm">
                <span className="absolute top-4 right-4 text-xs font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  High
                </span>
                <div className="p-2.5 w-fit rounded-lg bg-rose-50 text-rose-600 mb-3">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="text-xs font-semibold text-slate-500">
                  Critical Alerts
                </p>
                <p className="text-2xl font-bold text-slate-900 mt-0.5">03</p>
              </div>

              {/* Card 4 */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
                <div>
                  <p className="text-xs font-semibold text-slate-500">
                    Data Health
                  </p>
                  <p className="text-2xl font-bold text-slate-900 mt-0.5">
                    99.2%
                  </p>
                </div>
                <BarChart3 className="w-12 h-12 text-slate-200" />
              </div>
            </div>

            {/* Filter Controls Bar */}
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Age Range
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Ages</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[180px]">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Gender
                  </label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>All Genders</option>
                  </select>
                </div>

                <div className="flex-1 min-w-[200px]">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Last Visit Date
                  </label>
                  <input
                    type="date"
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-end gap-2 pt-5">
                  <button className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors">
                    Clear Filters
                  </button>
                  <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Patient Table Component */}
            <PatientTable
              onView={handleOpenEditPatient}
              onEdit={handleOpenEditPatient}
              onDelete={handleOpenDeleteConfirm}
            />

            {/* Bottom Compliance & Privacy Banners */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Record Integrity Banner */}
              <div className="bg-blue-600 text-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Info className="w-5 h-5 text-blue-200" />
                    <h3 className="font-bold text-base">
                      Record Integrity Check
                    </h3>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed max-w-lg">
                    All records displayed are synchronized with the central
                    Health Information Exchange (HIE). Compliance checks are
                    performed automatically every 15 minutes to ensure HIPAA
                    adherence.
                  </p>
                </div>
                <button className="mt-6 w-fit bg-white text-blue-900 hover:bg-blue-50 text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm transition-colors">
                  View Compliance Logs
                </button>
              </div>

              {/* Data Privacy Banner */}
              <div className="bg-slate-100 border border-slate-200 text-slate-800 rounded-xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3 text-slate-900">
                    <ShieldCheck className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-base">Data Privacy</h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    You are currently viewing PII (Personally Identifiable
                    Information). All access is logged and monitored for
                    security purposes. Avoid sharing your screen during clinical
                    review sessions.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showAddPatientForm && (
        <AddPatientForm
          mode={patientFormMode}
          patient={selectedPatient}
          onClose={handleClosePatientForm}
          onSubmit={handleAddPatientSubmit}
        />
      )}

      <ConfirmationModal
        open={isDeleteConfirmOpen}
        title="Delete Patient"
        message={`Are you sure you want to delete ${deleteTarget?.name || "this patient"}? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
}

export default PatientManagement
