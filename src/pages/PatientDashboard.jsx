import React from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  FileText, 
  Pill, 
  CreditCard, 
  HelpCircle, 
  LogOut, 
  PhoneCall, 
  Search, 
  Bell, 
  Moon, 
  User, 
  Settings, 
  ExternalLink, 
  Plus, 
  MoreVertical 
} from 'lucide-react';

const PatientDashboard = () => {
  return (
    <div className="flex h-screen bg-[#F4F6FA] font-sans text-gray-800">
      
      {/* ================= SIDEBAR ================= */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between p-5">
        <div>
          {/* Brand Header */}
          <div className="mb-6">
            <h1 className="text-lg font-bold text-blue-900 tracking-tight">
              Medimate Healthcare
            </h1>
          </div>

          {/* User Profile Card */}
          <div className="flex items-center gap-3 bg-gray-100 p-3 rounded-xl mb-6">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150" 
              alt="Imasha" 
              className="w-10 h-10 rounded-full object-cover" 
            />
            <div>
              <p className="text-xs text-gray-500 font-medium">Welcome,</p>
              <p className="text-sm font-bold text-gray-800">Imasha</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a href="#" className="flex items-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium text-sm shadow-sm transition">
              <LayoutDashboard size={18} />
              Dashboard
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
              <Calendar size={18} />
              Appointments
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
              <FileText size={18} />
              Records
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
              <Pill size={18} />
              Prescriptions
            </a>
            <a href="#" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm transition">
              <CreditCard size={18} />
              Payments
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm">
            <HelpCircle size={18} />
            Support
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl font-medium text-sm">
            <LogOut size={18} />
            Logout
          </a>
          <button className="w-full bg-red-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-red-700 transition">
            <PhoneCall size={18} />
            Call Doctor
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT AREA ================= */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Dashboard</h2>

          {/* Search bar & utilities */}
          <div className="flex items-center gap-4">
            <div className="relative w-80">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search appointments, records, doctors..."
                className="w-full bg-gray-100 pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center gap-2 text-gray-500">
              <button className="p-2 hover:bg-gray-100 rounded-full"><Bell size={18} /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full"><Moon size={18} /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full"><User size={18} /></button>
              <button className="p-2 hover:bg-gray-100 rounded-full"><Settings size={18} /></button>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <div className="p-8 space-y-8 flex-1">
          
          {/* Welcome Greeting */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              Welcome, Imasha 👋
            </h3>
            <p className="text-gray-500 text-sm mt-1">
              Here's what's happening with your health today.
            </p>
          </div>

          {/* Top 3 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Urgent Appointment Card */}
            <div className="relative bg-white border-2 border-blue-600 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <span className="absolute top-0 right-0 bg-blue-900 text-white text-[10px] uppercase font-bold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Urgent
              </span>
              <div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <Calendar size={22} />
                </div>
                <p className="text-xs font-medium text-gray-500">Next Appointment</p>
                <h4 className="text-lg font-bold text-blue-900 mt-1">June 10, 10:00 AM</h4>
                <p className="text-xs text-gray-500 mt-1">Dr. Nirmal Jayawardhana</p>
              </div>
              <button className="mt-6 w-full py-2 border border-blue-600 text-blue-600 font-semibold text-xs rounded-xl hover:bg-blue-50 transition">
                View Details &gt;
              </button>
            </div>

            {/* Unread Reports Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <FileText size={22} />
                </div>
                <p className="text-xs font-medium text-gray-500">Unread Reports</p>
                <h4 className="text-xl font-bold text-gray-900 mt-1">2 new reports</h4>
              </div>
              <button className="mt-6 w-full py-2 border border-gray-300 text-gray-700 font-semibold text-xs rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition">
                Open Portal <ExternalLink size={14} />
              </button>
            </div>

            {/* Pending Bills Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <CreditCard size={22} />
                </div>
                <p className="text-xs font-medium text-gray-500">Pending Bills</p>
                <h4 className="text-xl font-bold text-red-600 mt-1">Rs. 150</h4>
              </div>
              <button className="mt-6 w-full py-2 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 flex items-center justify-center gap-2 transition">
                Pay now <CreditCard size={14} />
              </button>
            </div>
          </div>

          {/* Upcoming Appointments Table Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-base font-bold text-gray-800">Upcoming Appointments</h4>
              <button className="bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-medium flex items-center gap-2 hover:bg-slate-800 transition">
                <Plus size={16} />
                Schedule New
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-3 px-4 rounded-l-lg">Date</th>
                    <th className="py-3 px-4">Doctor Name</th>
                    <th className="py-3 px-4">Department</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 rounded-r-lg text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm">
                  <tr>
                    {/* Date Block */}
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="bg-blue-50 text-blue-700 font-bold px-3 py-1.5 rounded-lg text-center text-xs">
                        <span className="block text-[10px] uppercase font-normal text-blue-500">Jun</span>
                        12
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-xs">June 12, 2024</p>
                        <p className="text-[11px] text-gray-400">10:00 AM</p>
                      </div>
                    </td>

                    {/* Doctor Info */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=100" 
                          alt="Doctor" 
                          className="w-8 h-8 rounded-full object-cover" 
                        />
                        <span className="font-semibold text-xs text-gray-800">Dr. Nimal</span>
                      </div>
                    </td>

                    {/* Department */}
                    <td className="py-4 px-4">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[11px] font-medium inline-flex items-center gap-1">
                        ♡ Cardiology
                      </span>
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4">
                      <span className="bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase">
                        Confirmed
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-4 px-4 text-right">
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-8 py-3 flex items-center justify-between text-xs text-gray-400">
          <p>© 2024 CareConnect Health Systems. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Audit Log</a>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default PatientDashboard;