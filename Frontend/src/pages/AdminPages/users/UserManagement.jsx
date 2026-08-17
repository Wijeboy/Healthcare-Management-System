import React, { useState, useEffect, useCallback } from "react";
import {
  Users, ShieldCheck, UserX, RefreshCw,
  Search, Plus, Trash2, Edit2, AlertCircle,
  ChevronLeft, ChevronRight, X, Check,
} from "lucide-react";
import { userApi } from "../../../services/api";
import ConfirmationModal from "../../../components/common/ConfirmationModal";
import AddAdminModal from "../../../components/admin-components/users/add-admin/AddAdminModal";
import EditRoleModal from "../../../components/admin-components/users/EditRoleModal";
import toast from "react-hot-toast";
import { getFriendlyErrorMessage } from "../../../utils/userMessages";

const ROLE_COLORS = {
  Admin:   "bg-purple-100 text-purple-700",
  Doctor:  "bg-blue-100 text-blue-700",
  Patient: "bg-green-100 text-green-700",
  Staff:   "bg-amber-100 text-amber-700",
};
const STATUS_COLORS = {
  Active:   "bg-emerald-100 text-emerald-700",
  Inactive: "bg-red-100 text-red-700",
};
const ROLES = ["Patient", "Doctor", "Admin", "Staff"];
const ITEMS_PER_PAGE = 12;
// ── Main Component ───────────────────────────────────────────────────────────
const UserManagement = () => {
  const [users, setUsers]             = useState([]);
  const [total, setTotal]             = useState(0);
  const [totalPages, setTotalPages]   = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);
  const [search, setSearch]           = useState("");
  const [roleFilter, setRoleFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [userToDelete, setUserToDelete] = useState(null);
  const [userToEdit, setUserToEdit]   = useState(null);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [deleting, setDeleting]       = useState(false);

  // ── Fetch ────────────────────────────────────────────────────────────────
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page:  currentPage,
        limit: ITEMS_PER_PAGE,
        ...(search                     && { search }),
        ...(roleFilter   !== "All"     && { role:   roleFilter }),
        ...(statusFilter !== "All"     && { status: statusFilter }),
      };
      const res = await userApi.getAll(params);
      // Support both array and paginated response
      if (Array.isArray(res)) {
        setUsers(res);
        setTotal(res.length);
        setTotalPages(1);
      } else {
        setUsers(res.data || []);
        setTotal(res.total || 0);
        setTotalPages(res.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to load users:", err);
      setError("We could not load the users list. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [currentPage, search, roleFilter, statusFilter]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);
  useEffect(() => { setCurrentPage(1); }, [search, roleFilter, statusFilter]);

  // ── Delete ───────────────────────────────────────────────────────────────
  const confirmDelete = async () => {
    if (!userToDelete) return;
    setDeleting(true);
    try {
      await userApi.delete(userToDelete.id);
      setUserToDelete(null);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (err) {
      console.error("Failed to delete user:", err);
      toast.error(getFriendlyErrorMessage(err, "We could not delete the user. Please try again."));
    } finally {
      setDeleting(false);
    }
  };

  // ── Stats ────────────────────────────────────────────────────────────────
  const adminCount  = users.filter((u) => u.role === "Admin").length;
  const doctorCount = users.filter((u) => u.role === "Doctor").length;
  const patientCount = users.filter((u) => u.role === "Patient").length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] font-sans">
      <main className="p-8 space-y-6 max-w-7xl">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">User Management</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage all system accounts — Admins, Doctors, Patients, and Staff — with role and status control.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUsers}
              className="p-2.5 border border-slate-200 rounded-lg text-slate-500 hover:bg-slate-50 transition cursor-pointer"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
            <button
              onClick={() => setShowAddAdmin(true)}
              className="px-4 py-2.5 bg-[#1E3A8A] hover:bg-blue-900 text-white font-bold text-xs rounded-lg flex items-center gap-1.5 shadow-sm transition cursor-pointer"
            >
              <Plus size={16} />
              Add Admin
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Users",   value: total,         icon: Users,       color: "bg-blue-50 text-blue-600" },
            { label: "Admin Users",   value: adminCount,   icon: UserX,       color: "bg-purple-50 text-purple-600" },
            { label: "Doctor Users",  value: doctorCount,  icon: ShieldCheck, color: "bg-blue-50 text-blue-600" },
            { label: "Active Users",  value: users.filter((u) => u.status === "Active").length, icon: Users, color: "bg-emerald-50 text-emerald-600" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
                <Icon size={22} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A]"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] bg-white"
          >
            <option value="All">All Roles</option>
            {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          {(search || roleFilter !== "All" || statusFilter !== "All") && (
            <button
              onClick={() => { setSearch(""); setRoleFilter("All"); setStatusFilter("All"); }}
              className="px-3 py-2 text-xs font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 flex items-center gap-1"
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>

        {/* Table */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-800">All System Users</h3>
              <p className="text-xs text-slate-500 mt-0.5">Showing {users.length} of {total} users</p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="p-12 flex flex-col items-center gap-3 text-slate-400">
              <div className="w-8 h-8 border-2 border-[#1E3A8A] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm">Loading users...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="p-12 flex flex-col items-center gap-3 text-red-500">
              <AlertCircle size={32} />
              <p className="text-sm font-medium">{error}</p>
              <button onClick={fetchUsers} className="text-xs underline text-slate-500 cursor-pointer">Try again</button>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && users.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <Users size={40} className="mx-auto mb-3 opacity-30" />
              <p className="font-medium">No users found</p>
            </div>
          )}

          {/* Table body */}
          {!loading && !error && users.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Profile</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Role</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((user) => {
                    const profile = user.doctor || user.patient || user.staff || user.admin;
                    const profileName = profile?.fullName || "—";
                    return (
                      <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4 text-slate-600">{profileName}</td>
                        <td className="px-6 py-4 font-medium text-slate-800">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${ROLE_COLORS[user.role] || "bg-slate-100 text-slate-600"}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[user.status] || "bg-slate-100 text-slate-600"}`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 text-xs">
                          {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => setUserToEdit(user)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition"
                              title="Change Role"
                            >
                              <Edit2 size={14} />
                            </button>
                            <button
                              onClick={() => setUserToDelete(user)}
                              className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition"
                              title="Delete User"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {!loading && totalPages > 1 && (
            <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Page {currentPage} of {totalPages}</span>
              <div className="flex items-center gap-1">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                  className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setCurrentPage(p)}
                    className={`w-8 h-8 flex items-center justify-center rounded font-bold ${
                      p === currentPage ? "bg-[#1E3A8A] text-white" : "border border-slate-200 hover:bg-slate-50 text-slate-700"
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
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Role Edit Modal */}
      {userToEdit && (
        <EditRoleModal
          user={userToEdit}
          onClose={() => setUserToEdit(null)}
          onSave={fetchUsers}
        />
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        open={Boolean(userToDelete)}
        title="Delete User"
        message={userToDelete ? `Are you sure you want to permanently delete ${userToDelete.email}? Their associated profile data will also be removed.` : ""}
        confirmText={deleting ? "Deleting..." : "Delete"}
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setUserToDelete(null)}
        loading={deleting}
      />

      {showAddAdmin && (
        <AddAdminModal
          onClose={() => setShowAddAdmin(false)}
          onCreated={fetchUsers}
        />
      )}
    </div>
  );
};

export default UserManagement;
