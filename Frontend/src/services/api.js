/**
 * Central API service — all backend calls go through here.
 * Base URL reads from Vite env or defaults to localhost:5000
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Generic fetch wrapper with error handling
const request = async (method, path, body = null) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || `Request failed: ${res.status}`);
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

