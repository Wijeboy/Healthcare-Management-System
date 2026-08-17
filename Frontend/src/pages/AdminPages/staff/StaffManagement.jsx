import React, { useState, useEffect, useCallback } from "react";
import { Plus, RefreshCw, AlertCircle, Users, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { staffApi } from "../../../services/api";
import StaffStatCards from "../../../components/admin-components/staff/StaffStatCards";
import StaffFilterBar from "../../../components/admin-components/staff/StaffFilterBar";
import StaffTable from "../../../components/admin-components/staff/StaffTable";
import StaffComplianceWidgets from "../../../components/admin-components/staff/StaffComplianceWidgets";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const ITEMS_PER_PAGE = 10;

const StaffManagement = () => {
  const navigate = useNavigate();

  // ── State ──────────────────────────────────────────────────────────────────
  const [staffList, setStaffList]     = useState([]);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [staffToDelete, setStaffToDelete] = useState(null);
  const [deleting, setDeleting]       = useState(false);

  const [filters, setFilters] = useState({
    search: "", role: "", department: "", status: "", lastLogin: "",
  });

  // ── Fetch staff ────────────────────────────────────────────────────────────
  const fetchStaff = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page:  currentPage,
        limit: ITEMS_PER_PAGE,
        ...(filters.search     && { search:         filters.search }),
        ...(filters.department && { department:     filters.department }),
        ...(filters.status     && { employeeStatus: filters.status }),
      };
      const res = await staffApi.getAll(params);
      setStaffList(res.data || []);
      setTotal(res.total || 0);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Failed to load staff:", err);
      setError("We could not load the staff list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, filters]);

  useEffect(() => { fetchStaff(); }, [fetchStaff]);
  useEffect(() => { setCurrentPage(1); }, [filters]);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleFilterChange  = (field, value) => setFilters((prev) => ({ ...prev, [field]: value }));
  const handleResetFilters  = () => setFilters({ search: "", role: "", department: "", status: "", lastLogin: "" });

  const confirmDeleteStaff = async () => {
    if (!staffToDelete) return;
    setDeleting(true);
    try {
      await staffApi.delete(staffToDelete.id);
      setStaffToDelete(null);
      toast.success("Staff member deleted successfully");
      fetchStaff();
    } catch (err) {
      console.error("Failed to delete staff member:", err);
      toast.error(getFriendlyErrorMessage(err, "We could not delete the staff member. Please try again."));
    } finally {
      setDeleting(false);
    }
  };

  const activeCount = staffList.filter((s) => s.employeeStatus === "Active").length;

  return (
    <div className="flex h-screen bg-[#F8FAFC] text-[#1E293B] font-sans antialiased overflow-hidden">
      <div className="flex-1 flex flex-col overflow-y-auto">
        <main className="p-8 space-y-6 max-w-7xl">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Staff Management</h1>
              <p className="text-xs text-slate-500 mt-1">
                Access and manage staff profiles, roles, departments, and system access control.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={fetchStaff}
                className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                title="Refresh"
              >
                <RefreshCw size={16} />
              </button>
              <button
                className="px-4 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
                onClick={() => navigate("/admin/staff/add")}
              >
                <Plus size={16} />
                Add New Staff
              </button>
            </div>
          </div>

          {/* Stat Cards */}
          <StaffStatCards total={total} active={activeCount} />

          {/* Filter Bar */}
          <StaffFilterBar
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
          />

          {/* Loading */}
          {loading && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 flex flex-col items-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading staff...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-white rounded-xl border border-red-200 p-12 flex flex-col items-center gap-3 text-red-500">
              <AlertCircle size={32} />
              <p className="text-sm font-medium">{error}</p>
              <button onClick={fetchStaff} className="text-xs underline text-slate-500 cursor-pointer">Try again</button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && staffList.length === 0 && (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No staff members found</p>
              <p className="text-xs mt-1">Try adjusting your filters or add a new staff member.</p>
            </div>
          )}

          {/* Table */}
          {!loading && !error && staffList.length > 0 && (
            <StaffTable
              staffList={staffList}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onDelete={(staff) => setStaffToDelete(staff)}
              onEdit={(staff) => navigate(`/admin/staff/edit?id=${staff.id}`, { state: { staff } })}
              onView={(staff) => navigate(`/admin/staff/details?id=${staff.id}`, { state: { staff } })}
            />
          )}

          {/* Compliance Footer */}
          <StaffComplianceWidgets />
        </main>
      </div>

      <ConfirmationModal
        open={Boolean(staffToDelete)}
        title="Delete Staff Member"
        message={staffToDelete ? `Are you sure you want to delete ${staffToDelete.fullName || staffToDelete.name}? This cannot be undone.` : ""}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDeleteStaff}
        onCancel={() => setStaffToDelete(null)}
        loading={deleting}
      />
    </div>
  );
};

export default StaffManagement;



