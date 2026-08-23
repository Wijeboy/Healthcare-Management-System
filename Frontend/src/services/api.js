/**
 * Central API service — all backend calls go through here.
 * Base URL reads from Vite env or defaults to localhost:5000
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
const request = async (method, path, body = null) => {
  const token = localStorage.getItem("hmsToken");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || data.message || `Request failed: ${res.status}`);
  }
  return data;
};

// ─── DOCTORS ────────────────────────────────────────────────────────────────
export const doctorApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/doctors${query ? `?${query}` : ''}`);
  },
  getById:       (id)       => request('GET',   `/admin/doctors/${id}`),
  create:        (data)     => request('POST',  `/admin/doctors`, data),
  update:        (id, data) => request('PUT',   `/admin/doctors/${id}`, data),
  updateStatus:  (id, status) => request('PATCH', `/admin/doctors/${id}/status`, { status }),
  delete:        (id)       => request('DELETE', `/admin/doctors/${id}`),
};

// ─── PATIENTS ────────────────────────────────────────────────────────────────
export const patientApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/patients${query ? `?${query}` : ''}`);
  },
  getById:       (id)       => request('GET',   `/admin/patients/${id}`),
  create:        (data)     => request('POST',  `/admin/patients`, data),
  update:        (id, data) => request('PUT',   `/admin/patients/${id}`, data),
  updateStatus:  (id, status) => request('PATCH', `/admin/patients/${id}/status`, { status }),
  delete:        (id)       => request('DELETE', `/admin/patients/${id}`),
};

// ─── STAFF ───────────────────────────────────────────────────────────────────
export const staffApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/staff${query ? `?${query}` : ''}`);
  },
  getById:           (id)       => request('GET',   `/admin/staff/${id}`),
  create:            (data)     => request('POST',  `/admin/staff`, data),
  update:            (id, data) => request('PUT',   `/admin/staff/${id}`, data),
  updateStatus:      (id, status) => request('PATCH', `/admin/staff/${id}/status`, { status }),
  updatePermissions: (id, permissions) => request('PATCH', `/admin/staff/${id}/permissions`, { permissions }),
  delete:            (id)       => request('DELETE', `/admin/staff/${id}`),
};

// ─── USERS ───────────────────────────────────────────────────────────────────
export const userApi = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/users${query ? `?${query}` : ''}`);
  },
  create:     (data)     => request('POST',  `/admin/users`, data),
  createAdmin:(data)     => request('POST',  `/admin/users/admin`, data),
  update:     (id, data) => request('PUT',   `/admin/users/${id}`, data),
  assignRole: (id, role) => request('PATCH', `/admin/users/${id}/role`, { role }),
  delete:     (id)       => request('DELETE', `/admin/users/${id}`),
};

// ─── REPORTS & ANALYTICS ───────────────────────────────────────────────────
export const reportApi = {
  getOverview: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/reports/overview${query ? `?${query}` : ''}`);
  },
  getAppointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/reports/appointments${query ? `?${query}` : ''}`);
  },
  getPatients: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/reports/patients${query ? `?${query}` : ''}`);
  },
  getDoctors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/reports/doctors${query ? `?${query}` : ''}`);
  },
  getRevenue: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/admin/reports/revenue${query ? `?${query}` : ''}`);
  },
  getExportUrl: (type = 'appointments', format = 'pdf', startDate = '', endDate = '') => {
    const params = new URLSearchParams({ type, format });
    if (startDate) params.append('startDate', startDate);
    if (endDate) params.append('endDate', endDate);
    return `${BASE_URL}/admin/reports/export?${params.toString()}`;
  },
};

// ── SETTINGS ───────────────────────────────────────────────────────────────
export const settingsApi = {
  getAdminProfile: (email) => request('GET', `/admin/settings/profile?email=${encodeURIComponent(email)}`),
  updateAdminProfile: (email, data) => request('PUT', `/admin/settings/profile?email=${encodeURIComponent(email)}`, data),
};

// ─── AUTH ───────────────────────────────────────────────────────────────────
export const authApi = {
  login: (data) => request('POST', '/auth/login', data),
  register: (data) => request('POST', '/auth/register', data),
  forgotPassword: (email) => request('POST', '/auth/forgot-password', { email }),
  resetPassword: (resetToken, newPassword) => request('POST', '/auth/reset-password', { resetToken, newPassword }),
  refreshToken: (refreshToken) => request('POST', '/auth/refresh', { refreshToken }),
  logout: async () => {
    try {
      await request('POST', '/auth/logout');
    } finally {
      localStorage.removeItem('hmsToken');
      localStorage.removeItem('hmsRole');
      localStorage.removeItem('hmsEmail');
    }
  },
};

// ─── PATIENT PORTAL ───────────────────────────────────────────────────────────────────
export const patientPortalApi = {
  getDashboardOverview: () => request('GET', '/patient/dashboard/overview'),
  getDashboardStatistics: () => request('GET', '/patient/dashboard/statistics'),

  getProfile: () => request('GET', '/patient/profile'),
  updateProfile: (data) => request('PUT', '/patient/profile', data),
  updatePassword: (data) => request('PUT', '/patient/password', data),

  uploadFile: (file) => {
    const token = localStorage.getItem("hmsToken");
    const formData = new FormData();
    formData.append("file", file);

    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return fetch(`${BASE_URL}/upload`, {
      method: "POST",
      headers,
      body: formData,
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.message || `Request failed: ${res.status}`);
      }
      return data;
    });
  },

  getAppointments: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/patient/appointments${query ? `?${query}` : ''}`);
  },
  searchDoctors: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/patient/doctors/search${query ? `?${query}` : ''}`);
  },
  bookAppointment: (data) => request('POST', '/patient/appointments/book', data),
  cancelAppointment: (appointmentId, reason) =>
    request('PUT', `/patient/appointments/${appointmentId}/cancel`, { reason }),

  createSupportTicket: (data) => request('POST', '/patient/support/tickets', data),
  getSupportTickets: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request('GET', `/patient/support/tickets${query ? `?${query}` : ''}`);
  },
};
