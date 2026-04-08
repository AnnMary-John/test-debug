import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

export const api = axios.create({
  baseURL: `${BASE_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const loginApi = (email: string, password: string) =>
  api.post<{ access_token: string; user: { id: string; email: string; name: string; role: string } }>('/auth/login', { email, password });

// Vendors
export const getVendors = () => api.get('/vendors');
export const createVendor = (data: Record<string, unknown>) => api.post('/vendors', data);
export const updateVendor = (id: string, data: Record<string, unknown>) => api.patch(`/vendors/${id}`, data);

// Applications
export const getApplications = () => api.get('/applications');
export const updateApplication = (id: string, data: Record<string, unknown>) => api.patch(`/applications/${id}`, data);
export const createApplication = (data: Record<string, unknown>) => api.post('/applications', data);
