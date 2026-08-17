import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PatientStatCards from "../../../components/admin-components/patients/PatientStatCards";
import PatientFilterBar from "../../../components/admin-components/patients/PatientFilterBar";
import PatientsTable from "../../../components/admin-components/patients/PatientsTable";
import PatientComplianceWidgets from "../../../components/admin-components/patients/PatientComplianceWidgets";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import { mockPatients } from "../../../data/mockData";

const PatientsManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [filters, setFilters] = useState({
    search: "",
    ageRange: "All",
    gender: "All",
    bloodGroup: "All",
    status: "All",
    lastVisitDate: "",
  });

  const handleClearFilters = () => {
    setFilters({
      search: "",
      ageRange: "All",
      gender: "All",
      bloodGroup: "All",
      status: "All",
      lastVisitDate: "",
    });
  };

  const handleDeletePatient = (patient) => {
    setPatientToDelete(patient);
  };

  const handleViewPatient = (patient) => {
    navigate(
      `/dashboard/patients-management/details?id=${encodeURIComponent(patient.id)}`,
      {
        state: { patient },
      },
    );
  };

  const confirmDeletePatient = () => {
    if (!patientToDelete) return;
    console.log("Delete patient requested:", patientToDelete);
    setPatientToDelete(null);
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Header Title Bar */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Patients Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access and manage patient profiles, contact details, medical
                information, and account status.
              </p>
            </div>

            <button
              className="px-4 py-2.5 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
              onClick={() =>
                navigate("/dashboard/patients-management/add-patient")
              }
            >
              <Plus size={16} />
              Register New Patient
            </button>
          </div>

          {/* Stat Cards */}
          <PatientStatCards
            stats={{
              totalPatients: "12,842",
              activeVisits: "48",
              criticalAlerts: "03",
              dataHealth: "99.2%",
            }}
          />

          {/* Filter Bar */}
          <PatientFilterBar
            filters={filters}
            setFilters={setFilters}
            onClear={handleClearFilters}
          />

          {/* Patients Data Table */}
          <PatientsTable
            patients={mockPatients}
            totalCount="12,842"
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onViewPatient={handleViewPatient}
            onEditPatient={(patient) =>
              navigate(
                `/dashboard/patients-management/edit-patient?id=${encodeURIComponent(patient.id)}`,
                {
                  state: { patient },
                },
              )
            }
            onDeletePatient={handleDeletePatient}
          />

          {/* Compliance & Privacy Footer Widgets */}
          <PatientComplianceWidgets />
        </main>
      </div>

      <ConfirmationModal
        open={Boolean(patientToDelete)}
        title="Delete Patient"
        message={
          patientToDelete
            ? `Are you sure you want to delete ${patientToDelete.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeletePatient}
        onCancel={() => setPatientToDelete(null)}
      />
    </div>
  );
};

export default PatientsManagement;
