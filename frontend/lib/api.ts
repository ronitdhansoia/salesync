import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post('/api/auth/login', { email, password });
    return response.data;
  },
  register: async (data: any) => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },
  getProfile: async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

export const contactsApi = {
  getAll: async () => {
    const response = await api.get('/api/contacts');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/api/contacts', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/api/contacts/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/contacts/${id}`);
    return response.data;
  },
};

export const campaignsApi = {
  getAll: async () => {
    const response = await api.get('/api/campaigns');
    return response.data;
  },
  create: async (data: any) => {
    const response = await api.post('/api/campaigns', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const response = await api.put(`/api/campaigns/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/api/campaigns/${id}`);
    return response.data;
  },
};

export const statsApi = {
  getDashboard: async () => {
    const response = await api.get('/api/demo/stats');
    return response.data;
  },
};

export default api;