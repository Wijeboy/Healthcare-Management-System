import React from 'react'
import { mockStaff } from '../data/mockData';
import StatCard from '../components/StaffManagement/StatCard';
import AddMemberCard from '../components/StaffManagement/AddMemberCard';
import StaffCard from '../components/StaffManagement/StaffCard';
import { Stethoscope, Activity, Users2, Calendar, Plus } from "lucide-react";

const StaffManagement = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      

      <div className="flex flex-1">

        {/* Main Content Workspace */}
        <main className="flex-1 p-8 overflow-y-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Staff & Doctor Management
              </h2>
              <p className="text-sm text-slate-500 mt-1">
                Manage hospital practitioners, administrative staff, and their
                clinical schedules.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-blue-900 hover:bg-blue-950 text-white text-sm font-semibold px-4 py-2.5 rounded-lg shadow-sm transition-colors">
              <Plus className="w-4 h-4" />
              <span>Add New Doctor/Staff</span>
            </button>
          </div>

          {/* Key Metrics Stats Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              icon={Stethoscope}
              iconBgColor="bg-blue-50"
              iconTextColor="text-blue-600"
              label="Active Doctors"
              value="142"
            />
            <StatCard
              icon={Activity}
              iconBgColor="bg-emerald-50"
              iconTextColor="text-emerald-600"
              label="Nursing Staff"
              value="284"
            />
            <StatCard
              icon={Users2}
              iconBgColor="bg-slate-100"
              iconTextColor="text-slate-600"
              label="On Duty"
              value="68"
            />
            <StatCard
              icon={Calendar}
              iconBgColor="bg-rose-50"
              iconTextColor="text-rose-500"
              label="On Leave"
              value="12"
            />
          </div>

          {/* Grid View for Staff Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {mockStaff.map((member) => (
              <StaffCard key={member.id} member={member} />
            ))}
            <AddMemberCard />
          </div>
        </main>
      </div>
    </div>
  );
}

export default StaffManagement