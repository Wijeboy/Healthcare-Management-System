// src/types/index.ts
export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address: string;
  avatar?: string;
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  doctor: string;
  department: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed';
  reason?: string;
  isUrgent?: boolean;
  avatar?: string;
}

export interface DashboardData {
  nextAppointment?: {
    date: string;
    time: string;
    doctor: string;
    isUrgent?: boolean;
  };
  unreadReports: number;
  pendingBills: number;
}

export interface MedicalRecord {
  id: string;
  date: string;
  type: string;
  doctor: string;
  diagnosis: string;
  notes?: string;
  attachments?: string[];
}

export interface Prescription {
  id: string;
  date: string;
  doctor: string;
  medications: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
  instructions?: string;
}