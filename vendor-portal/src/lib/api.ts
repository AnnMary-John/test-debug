import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

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
  api.post<{ access_token: string; user: { id: string; email: string; name: string; role: string; vendorId: string } }>('/auth/login', { email, password });

// Fleet (Data fetched based on user's vendorId)
export const getCars = () => api.get('/cars');
export const getDrivers = (search?: string, page = 1, limit = 20) => 
  api.get<{ data: any[], total: number }>('/drivers', { params: { search, page, limit } });
