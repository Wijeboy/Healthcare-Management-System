// components/patient/Dashboard/AppointmentTable.jsx
import React from 'react';
import { Eye, X, Edit } from 'lucide-react';

const AppointmentTable = ({ appointments }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'text-success bg-green-100';
      case 'Pending': return 'text-warning bg-yellow-100';
      case 'Cancelled': return 'text-danger bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-text">Upcoming Appointments</h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
          Schedule New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-light">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Doctor</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Department</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-sm text-gray-text">{appointment.date}</td>
                <td className="px-4 py-3 text-sm text-gray-text">Dr. {appointment.doctor}</td>
                <td className="px-4 py-3 text-sm text-gray-text">{appointment.department}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex space-x-2">
                    <button className="p-1 text-primary hover:bg-primary-light rounded">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-200 rounded">
                      <Edit size={16} />
                    </button>
                    <button className="p-1 text-danger hover:bg-red-100 rounded">
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentTable;