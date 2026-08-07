import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import PatientStatCards from "../../components/patients/PatientStatCards";
import PatientFilterBar from "../../components/patients/PatientFilterBar";
import PatientsTable from "../../components/patients/PatientsTable";
import PatientComplianceWidgets from "../../components/patients/PatientComplianceWidgets";
import { mockPatients } from "../../data/mockData";

const PatientsManagement = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
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
              onClick={() => navigate("/dashboard/patients-management/add-patient")}
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
            onViewPatient={(patient) =>
              console.log("View patient:", patient)
            }
            onEditPatient={(patient) =>
              navigate(`/dashboard/patients-management/edit-patient?id=${patient.id}`, {
                state: { patient },
              })
            }
          />

          {/* Compliance & Privacy Footer Widgets */}
          <PatientComplianceWidgets />
        </main>
      </div>
    </div>
  );
};

export default PatientsManagement;
