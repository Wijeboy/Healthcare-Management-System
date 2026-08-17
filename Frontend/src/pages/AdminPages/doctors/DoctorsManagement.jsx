import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  UserCheck,
  Clock,
  CalendarX,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { mockDoctors } from "../../../data/mockData";
import DoctorsStatCard from "../../../components/admin-components/doctors/DoctorsStatCard";
import DoctorsFilterBar from "../../../components/admin-components/doctors/DoctorsFilterBar";
import DoctorCard from "../../../components/admin-components/doctors/DoctorCard";
import ConfirmationModal from "../../../components/common/ConfirmationModal";

const DoctorsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [department, setDepartment] = useState("All");
  const [specialization, setSpecialization] = useState("All");
  const [status, setStatus] = useState("All");
  const [doctorToDelete, setDoctorToDelete] = useState(null);

  const handleClearFilters = () => {
    setSearchTerm("");
    setDepartment("All");
    setSpecialization("All");
    setStatus("All");
  };

  const handleEditDoctor = (doctorId) => {
    navigate(`/dashboard/doctors-management/edit-doctor?id=${doctorId}`);
  };

  const handleViewDoctor = (doctorId) => {
    navigate(`/dashboard/doctors-management/details?id=${doctorId}`);
  };

  const handleDeleteDoctor = (doctorId) => {
    setDoctorToDelete(
      mockDoctors.find((doctor) => doctor.id === doctorId) || null,
    );
  };

  const confirmDeleteDoctor = () => {
    if (!doctorToDelete) return;
    console.log("Delete doctor requested:", doctorToDelete);
    setDoctorToDelete(null);
  };

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
                Manage doctor profiles, departments, specialties, availability,
                and account status.
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/doctors-management/add-doctor")
              }
              className="flex items-center gap-2 bg-[#1E3A8A] hover:bg-blue-900 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition shadow-sm"
            >
              <Plus size={16} />
              Add New Doctor
            </button>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-4">
            <DoctorsStatCard
              label="Total Doctors"
              value="142"
              icon={Users}
              colorTheme="blue"
            />
            <DoctorsStatCard
              label="Active Doctors"
              value="128"
              icon={UserCheck}
              colorTheme="emerald"
            />
            <DoctorsStatCard
              label="On Duty Today"
              value="68"
              icon={Clock}
              colorTheme="amber"
            />
            <DoctorsStatCard
              label="On Leave"
              value="14"
              icon={CalendarX}
              colorTheme="rose"
            />
          </div>

          {/* Filters */}
          <DoctorsFilterBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            department={department}
            setDepartment={setDepartment}
            specialization={specialization}
            setSpecialization={setSpecialization}
            status={status}
            setStatus={setStatus}
            onClear={handleClearFilters}
          />

          {/* Doctors Grid Container */}
          <div className="bg-white border border-[#E2E8F0] rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Doctors List
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing 6 of 142 doctors
                </p>
              </div>
              <p className="text-xs text-slate-400">
                Last updated: Today, 10:30 AM
              </p>
            </div>

            <div className="p-6 grid grid-cols-3 gap-5">
              {mockDoctors.map((doc) => (
                <DoctorCard
                  key={doc.id}
                  doctor={doc}
                  onView={handleViewDoctor}
                  onEdit={handleEditDoctor}
                  onDelete={handleDeleteDoctor}
                />
              ))}
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-between text-xs text-slate-500">
              <span>Showing page 1 of 24</span>
              <div className="flex items-center gap-1 font-medium">
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-400 hover:bg-slate-50">
                  <ChevronLeft size={16} />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded bg-[#1E3A8A] text-white font-bold">
                  1
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                  2
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                  3
                </button>
                <span className="px-1 text-slate-400">...</span>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-50 text-slate-700">
                  24
                </button>
                <button className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded text-slate-600 hover:bg-slate-50">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>

      <ConfirmationModal
        open={Boolean(doctorToDelete)}
        title="Delete Doctor"
        message={
          doctorToDelete
            ? `Are you sure you want to delete ${doctorToDelete.name}? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteDoctor}
        onCancel={() => setDoctorToDelete(null)}
      />
    </div>
  );
};

export default DoctorsManagement;
