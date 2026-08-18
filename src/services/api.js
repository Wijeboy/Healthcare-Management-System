// src/services/api.js (Axios + JWT)
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor for JWT
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('authToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  // Authentication APIs
  async login(credentials) {
    const response = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  async register(userData) {
    const response = await this.api.post('/auth/register', userData);
    return response.data;
  }

  // Dashboard APIs
  async getDashboardOverview() {
    const response = await this.api.get('/dashboard/overview');
    return response.data;
  }

  async getDashboardStatistics() {
    const response = await this.api.get('/dashboard/statistics');
    return response.data;
  }

  // Patient Profile APIs
  async getProfile() {
    const response = await this.api.get('/patient/profile');
    return response.data;
  }

  async updateProfile(data) {
    const response = await this.api.put('/patient/profile', data);
    return response.data;
  }

  async updatePassword(data) {
    const response = await this.api.put('/patient/password', data);
    return response.data;
  }

  // File Upload (Multer)
  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);
    const response = await this.api.post('/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  }

  // Appointments APIs
  async getAppointments(params = {}) {
    const response = await this.api.get('/appointments', { params });
    return response.data;
  }

  async searchDoctors(params = {}) {
    const response = await this.api.get('/appointments/doctors/search', { params });
    return response.data;
  }

  async bookAppointment(data) {
    const response = await this.api.post('/appointments/book', data);
    return response.data;
  }

  async cancelAppointment(appointmentId, reason) {
    const response = await this.api.put(`/appointments/${appointmentId}/cancel`, { reason });
    return response.data;
  }

  // Support APIs
  async createSupportTicket(data) {
    const response = await this.api.post('/support/tickets', data);
    return response.data;
  }

  async getSupportTickets(params = {}) {
    const response = await this.api.get('/support/tickets', { params });
    return response.data;
  }
}

export default new ApiService();