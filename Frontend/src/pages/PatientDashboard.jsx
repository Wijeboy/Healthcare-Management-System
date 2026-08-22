import React from "react";
import PatientDashboardPage from "./PatientPages/Dashboard";

const patient = {
  id: "P001",
  name: "Imasha",
  email: "imasha@medimate.com",
  phone: "+94 77 123 4567",
  dateOfBirth: "1995-06-15",
  gender: "Female",
  address: "Colombo, Sri Lanka",
  avatar:
    "https://images.unsplash.com/photo-1494790108755-2616b612e995?w=150&h=150&fit=crop&crop=face",
};

const dashboardData = {
  nextAppointment: {
    date: "June 10",
    time: "10:00 AM",
    doctor: "Nirmal Jayawardhana",
    isUrgent: true,
  },
  unreadReports: 2,
  pendingBills: 150,
};

const appointments = [
  {
    id: "1",
    date: "June 12, 2024",
    time: "10:00 AM",
    doctor: "Dr. Nimal",
    department: "Cardiology",
    status: "Confirmed",
    avatar:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: "2",
    date: "June 20, 2024",
    time: "2:00 PM",
    doctor: "Dr. Priya Silva",
    department: "General Medicine",
    status: "Pending",
    avatar:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=50&h=50&fit=crop&crop=face",
  },
  {
    id: "3",
    date: "June 25, 2024",
    time: "9:30 AM",
    doctor: "Dr. Rajesh Kumar",
    department: "Neurology",
    status: "Confirmed",
    avatar:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=50&h=50&fit=crop&crop=face",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "bg-green-100 text-green-800 border-green-200";
    case "Pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getDepartmentColor = (department) => {
  switch (department) {
    case "Cardiology":
      return "bg-red-100 text-red-800";
    case "General Medicine":
      return "bg-blue-100 text-blue-800";
    case "Neurology":
      return "bg-purple-100 text-purple-800";
    case "Dermatology":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const month = date.toLocaleDateString("en-US", { month: "short" }).toUpperCase();
  const day = date.getDate();
  return { month, day };
};

export default function PatientDashboard() {
  return (
    <PatientDashboardPage
      patient={patient}
      dashboardData={dashboardData}
      appointments={appointments}
      getStatusColor={getStatusColor}
      getDepartmentColor={getDepartmentColor}
      formatDate={formatDate}
    />
  );
}
