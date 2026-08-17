import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users, UserCheck, Clock, CalendarX,
  Plus, ChevronLeft, ChevronRight, RefreshCw, AlertCircle,
} from "lucide-react";
import { doctorApi } from "../../../services/api";
import DoctorsStatCard from "../../../components/admin-components/doctors/DoctorsStatCard";
import DoctorsFilterBar from "../../../components/admin-components/doctors/DoctorsFilterBar";
import DoctorCard from "../../../components/admin-components/doctors/DoctorCard";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

const ITEMS_PER_PAGE = 9;

const DoctorsManagement = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [doctors, setDoctors]         = useState([]);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [doctorToDelete, setDoctorToDelete] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  const [searchTerm,     setSearchTerm]     = useState("");
  const [department,     setDepartment]     = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [status,         setStatus]         = useState("All");

  // ── Fetch doctors from API ─────────────────────────────────────────────────
  const fetchDoctors = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page:  currentPage,
        limit: ITEMS_PER_PAGE,
        ...(searchTerm              && { search:     searchTerm }),
        ...(department !== "All"    && { department: department }),
        ...(status !== "All"        && { status:     status }),
      };
      const res = await doctorApi.getAll(params);
      setDoctors(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, department, status]);

  useEffect(() => { fetchDoctors(); }, [fetchDoctors]);

  // Reset to page 1 when filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, department, specialization, status]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleClearFilters = () => {
    setSearchTerm(""); setDepartment("All");
    setSpecialization("All"); setStatus("All");
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctorToDelete(doctors.find((d) => d.id === doctorId) || null);
  };

  const confirmDeleteDoctor = async () => {
    if (!doctorToDelete) return;
    setDeleting(true);
    try {
      await doctorApi.delete(doctorToDelete.id);
      setDoctorToDelete(null);
      fetchDoctors();
    } catch (err) {
      alert(`Failed to delete doctor: ${err.message}`);
    } finally {
      setDeleting(false);
    }
  };

  // Compute summary stats from fetched data
  const activeCount   = doctors.filter((d) => d.status === "Active").length;
  const inactiveCount = doctors.filter((d) => d.status === "Inactive").length;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6">
          {/* Header Row */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                Doctors Management
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Manage doctor profiles, departments, specialties, availability, and account status.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchDoctors}
                className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
              <button
                type="button"
                onClick={() => navigate("/admin/doctors/add")}
                className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm"
              >
                <Plus size={16} />
                Add New Doctor
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            <DoctorsStatCard label="Total Doctors"  value={total}        icon={Users}     colorTheme="blue"    />
            <DoctorsStatCard label="Active Doctors" value={activeCount}  icon={UserCheck} colorTheme="emerald" />
            <DoctorsStatCard label="On Duty Today"  value="—"            icon={Clock}     colorTheme="amber"   />
            <DoctorsStatCard label="Inactive"       value={inactiveCount} icon={CalendarX} colorTheme="rose"   />
          </div>

          {/* Filters */}
          <DoctorsFilterBar
            searchTerm={searchTerm}     setSearchTerm={setSearchTerm}
            department={department}     setDepartment={setDepartment}
            specialization={specialization} setSpecialization={setSpecialization}
            status={status}             setStatus={setStatus}
            onClear={handleClearFilters}
          />

          {/* Doctors Grid */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">Doctors List</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing {doctors.length} of {total} doctors
                </p>
              </div>
              <p className="text-xs text-slate-400">Page {currentPage} of {totalPages}</p>
            </div>

            {/* Loading */}
            {loading && (
              <div className="p-12 flex flex-col items-center justify-center gap-3 text-slate-400">
                <div className="w-8 h-8 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm">Loading doctors...</p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="p-12 flex flex-col items-center justify-center gap-3 text-red-500">
                <AlertCircle size={32} />
                <p className="text-sm font-medium">{error}</p>
                <button onClick={fetchDoctors} className="text-xs underline text-slate-500">
                  Try again
                </button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && doctors.length === 0 && (
              <div className="p-12 text-center text-slate-400">
                <Users size={40} className="mx-auto mb-3 opacity-30" />
                <p className="font-medium">No doctors found</p>
                <p className="text-xs mt-1">Try adjusting your filters or add a new doctor.</p>
              </div>
            )}

            {/* Grid */}
            {!loading && !error && doctors.length > 0 && (
              <div className="p-6 grid grid-cols-3 gap-5">
                {doctors.map((doc) => (
                  <DoctorCard
                    key={doc.id}
                    doctor={doc}
                    onView={(id) => navigate(`/admin/doctors/details?id=${id}`)}
                    onEdit={(id) => navigate(`/admin/doctors/edit?id=${id}`)}
                    onDelete={handleDeleteDoctor}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
                <span>Page {currentPage} of {totalPages}</span>
                <div className="flex items-center gap-1 font-medium">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setCurrentPage(p)}
                      className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
                        p === currentPage
                          ? "bg-[#1E3A8A] text-white"
                          : "border border-slate-200 hover:bg-slate-50 text-slate-700"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50 disabled:opacity-40"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      <ConfirmationModal
        open={Boolean(doctorToDelete)}
        title="Delete Doctor"
        message={doctorToDelete ? `Are you sure you want to permanently delete ${doctorToDelete.fullName || doctorToDelete.name}? This action cannot be undone.` : ""}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeleteDoctor}
        onCancel={() => setDoctorToDelete(null)}
      />
    </div>
  );
};

export default DoctorsManagement;
