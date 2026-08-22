import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Clock,
  FileText,
  CreditCard,
  User,
  ChevronRight,
  Plus,
  MoreHorizontal,
  AlertTriangle,
} from "lucide-react";

export default function Dashboard({
  patient,
  dashboardData,
  appointments,
  getStatusColor,
  getDepartmentColor,
  formatDate,
}) {
  const navigate = useNavigate();

  return (
    <section className="p-6 space-y-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">
            Welcome, {patient.name}! 👋
          </h1>
          <p className="text-lg text-black">
            Here's what's happening with your health today.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative overflow-hidden hover:shadow-md transition-shadow">
            {dashboardData?.nextAppointment?.isUrgent && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                  <AlertTriangle size={12} />
                  <span>Urgent</span>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                <Calendar className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Next Appointment</h3>
                <p className="text-sm text-gray-500">Upcoming consultation</p>
              </div>
            </div>

            {dashboardData?.nextAppointment ? (
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-2">
                  <Clock size={16} className="text-gray-400" />
                  <span className="text-gray-700 font-semibold">
                    {dashboardData.nextAppointment.date}, {dashboardData.nextAppointment.time}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-400" />
                  <span className="text-gray-700 font-semibold">
                    Dr. {dashboardData.nextAppointment.doctor}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 mb-4">No upcoming appointments</p>
            )}

            <button
              type="button"
              onClick={() => navigate("/patient/appointments")}
              className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-semibold"
            >
              <span>View Details</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center shadow-md">
                <FileText className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Unread Reports</h3>
                <p className="text-sm text-gray-500">Laboratory results</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-bold text-gray-800 mb-1">
                {dashboardData?.unreadReports || 0}
              </div>
              <p className="text-gray-600">New laboratory reports available</p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/patient/medical-records")}
              className="w-full bg-blue-800 hover:bg-blue-900 text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-semibold shadow-sm"
            >
              <span>Open Portal</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md">
                <CreditCard className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Pending Bills</h3>
                <p className="text-sm text-gray-500">Outstanding payments</p>
              </div>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-bold text-red-600 mb-1">
                Rs.{dashboardData?.pendingBills?.toLocaleString() || 0}
              </div>
              <p className="text-gray-600">Amount due for medical services</p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/patient/payments")}
              className="w-full bg-primary hover:bg-primary-dark text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center space-x-2 font-semibold shadow-sm"
            >
              <span>Pay Now</span>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-800">Upcoming Appointments</h2>
                <p className="text-sm text-gray-500 mt-1">Your scheduled consultations</p>
              </div>
              <button
                type="button"
                onClick={() => navigate("/patient/book-appointment")}
                className="bg-primary text-white px-5 py-2.5 rounded-xl hover:bg-primary-dark transition-colors flex items-center space-x-2 font-semibold shadow-sm hover:shadow-md"
              >
                <Plus size={18} />
                <span>Schedule New</span>
              </button>
            </div>
          </div>

          {appointments && appointments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">Date & Time</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">Doctor</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">Department</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 uppercase tracking-wide">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.map((appointment, index) => {
                    const dateInfo = formatDate(appointment.date);
                    return (
                      <tr key={appointment.id || index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-4">
                            <div className="text-center">
                              <div className="w-12 h-12 bg-primary rounded-xl flex flex-col items-center justify-center text-white shadow-sm">
                                <span className="text-xs font-medium">{dateInfo.month}</span>
                                <span className="text-lg font-bold leading-none">{dateInfo.day}</span>
                              </div>
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{appointment.date}</div>
                              <div className="text-sm text-gray-500">{appointment.time}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            {appointment.avatar ? (
                              <img
                                src={appointment.avatar}
                                alt={appointment.doctor}
                                className="w-8 h-8 rounded-full object-cover"
                              />
                            ) : (
                              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-semibold text-sm">
                                {appointment.doctor.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                              </div>
                            )}
                            <span className="font-semibold text-gray-900">{appointment.doctor}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${getDepartmentColor(appointment.department)}`}>
                            {appointment.department}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(appointment.status)}`}>
                            {appointment.status?.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <Calendar size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-500 mb-2">No upcoming appointments</h3>
              <p className="text-gray-400 mb-4">Schedule your first appointment to get started</p>
              <button
                type="button"
                onClick={() => navigate("/patient/book-appointment")}
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors font-medium"
              >
                Book Appointment
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
