import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw, AlertCircle, Users } from "lucide-react";
import { patientApi } from "../../../services/api";
import PatientStatCards from "../../../components/admin-components/patients/PatientStatCards";
import PatientFilterBar from "../../../components/admin-components/patients/PatientFilterBar";
import PatientsTable from "../../../components/admin-components/patients/PatientsTable";
import PatientComplianceWidgets from "../../../components/admin-components/patients/PatientComplianceWidgets";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const ITEMS_PER_PAGE = 10;

const PatientsManagement = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [patients, setPatients]       = useState([]);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [patientToDelete, setPatientToDelete] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  const [filters, setFilters] = useState({
    search: "", ageRange: "All", gender: "All",
    bloodGroup: "All", status: "All", lastVisitDate: "",
  });

  // ── Fetch patients ─────────────────────────────────────────────────────────
  const fetchPatients = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page:  currentPage,
        limit: ITEMS_PER_PAGE,
        ...(filters.search                  && { search:     filters.search }),
        ...(filters.gender    !== "All"     && { gender:     filters.gender }),
        ...(filters.bloodGroup !== "All"    && { bloodGroup: filters.bloodGroup }),
        ...(filters.status    !== "All"     && { status:     filters.status }),
        ...(filters.ageRange  !== "All"     && { ageRange:   filters.ageRange }),
      };
      const res = await patientApi.getAll(params);
      setPatients(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Failed to load patients:", err);
      setError("We could not load the patients list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => { fetchPatients(); }, [fetchPatients]);
  useEffect(() => { setCurrentPage(1); }, [filters]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleClearFilters = () =>
    setFilters({ search: "", ageRange: "All", gender: "All", bloodGroup: "All", status: "All", lastVisitDate: "" });

  const handleViewPatient = (patient) =>
    navigate(`/admin/patients/details?id=${encodeURIComponent(patient.id)}`, { state: { patient } });

  const confirmDeletePatient = async () => {
    if (!patientToDelete) return;
    setDeleting(true);
    try {
      await patientApi.delete(patientToDelete.id);
      setPatientToDelete(null);
      toast.success("Patient deleted successfully");
      fetchPatients();
    } catch (err) {
      console.error("Failed to delete patient:", err);
      toast.error(getFriendlyErrorMessage(err, "We could not delete the patient. Please try again."));
    } finally {
      setDeleting(false);
    }
  };

  // Stat counts
  const activeCount   = patients.filter((p) => p.status === "Active").length;
  const criticalCount = patients.filter((p) => p.status === "Critical").length;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Patients Management
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Access and manage patient profiles, contact details, medical information, and account status.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchPatients}
                className="p-2.5 border border-slate-200 rounded-xl text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
              <button
                className="px-4 py-2.5 bg-[#0256CA] hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-2 shadow-sm transition cursor-pointer"
                onClick={() => navigate("/admin/patients/add")}
              >
                <Plus size={16} />
                Register New Patient
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <PatientStatCards
            stats={{
              totalPatients: total.toString(),
              activeVisits:  activeCount.toString(),
              criticalAlerts: criticalCount.toString(),
              dataHealth: "99.2%",
            }}
          />

          {/* Filter Bar */}
          <PatientFilterBar filters={filters} setFilters={setFilters} onClear={handleClearFilters} />

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-[#0256CA] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading patients...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-white rounded-xl border border-red-200 p-12 flex flex-col items-center gap-3 text-red-500">
              <AlertCircle size={32} />
              <p className="text-sm font-medium">{error}</p>
              <button onClick={fetchPatients} className="text-xs underline text-slate-500 cursor-pointer">Try again</button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && patients.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No patients found</p>
              <p className="text-xs mt-1">Try adjusting your filters or register a new patient.</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && patients.length > 0 && (
            <PatientsTable
              patients={patients}
              totalCount={total.toString()}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onViewPatient={handleViewPatient}
              onEditPatient={(patient) =>
                navigate(`/admin/patients/edit?id=${encodeURIComponent(patient.id)}`, { state: { patient } })
              }
              onDeletePatient={(patient) => setPatientToDelete(patient)}
            />
          )}

          {/* Compliance Footer */}
          <PatientComplianceWidgets />
        </main>
      </div>

      <ConfirmationModal
        open={Boolean(patientToDelete)}
        title="Delete Patient"
        message={patientToDelete ? `Are you sure you want to delete ${patientToDelete.fullName || patientToDelete.name}? This action cannot be undone.` : ""}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeletePatient}
        onCancel={() => setPatientToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};

export default PatientsManagement;



