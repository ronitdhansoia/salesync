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
    // Don't redirect if using demo token or if we're already on login page
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    const isLoginPage = window.location.pathname === '/login';
    
    if (error.response?.status === 401 && !isDemo && !isLoginPage) {
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
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return {
        contacts: [
          { id: '1', name: 'Priya Sharma', email: 'priya@techcorp.in', company: 'TechCorp India', status: 'qualified' },
          { id: '2', name: 'Rajesh Kumar', email: 'rajesh@startup.co.in', company: 'Mumbai Startup', status: 'contacted' },
          { id: '3', name: 'Anita Patel', email: 'anita@enterprise.com', company: 'Enterprise Solutions', status: 'new' }
        ]
      };
    }
    
    const response = await api.get('/api/contacts');
    return response.data;
  },
  create: async (data: any) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { contact: { id: Date.now().toString(), ...data, status: 'new' } };
    }
    
    const response = await api.post('/api/contacts', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { contact: { id, ...data } };
    }
    
    const response = await api.put(`/api/contacts/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { success: true };
    }
    
    const response = await api.delete(`/api/contacts/${id}`);
    return response.data;
  },
};

export const campaignsApi = {
  getAll: async () => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return {
        campaigns: [
          { id: '1', name: 'Mumbai Tech Leads', description: 'Targeting tech companies in Mumbai', type: 'linkedin', status: 'active' },
          { id: '2', name: 'WhatsApp Festival Campaign', description: 'Diwali greetings and offers', type: 'whatsapp', status: 'paused' },
          { id: '3', name: 'Email Newsletter', description: 'Monthly product updates', type: 'email', status: 'active' }
        ]
      };
    }
    
    const response = await api.get('/api/campaigns');
    return response.data;
  },
  create: async (data: any) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { campaign: { id: Date.now().toString(), ...data, status: 'draft' } };
    }
    
    const response = await api.post('/api/campaigns', data);
    return response.data;
  },
  update: async (id: string, data: any) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { campaign: { id, ...data } };
    }
    
    const response = await api.put(`/api/campaigns/${id}`, data);
    return response.data;
  },
  delete: async (id: string) => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      return { success: true };
    }
    
    const response = await api.delete(`/api/campaigns/${id}`);
    return response.data;
  },
};

export const statsApi = {
  getDashboard: async () => {
    const token = localStorage.getItem('token');
    const isDemo = token?.startsWith('demo-token-');
    
    if (isDemo) {
      // Return demo data instead of making API call
      return {
        totalLeads: 2847,
        totalCampaigns: 12,
        totalMessages: 15420,
        conversionRate: 23.7,
        recentActivity: [
          { type: 'lead', message: 'New lead from Mumbai campaign', time: '2 minutes ago' },
          { type: 'campaign', message: 'LinkedIn campaign reached 1000 prospects', time: '15 minutes ago' },
          { type: 'message', message: '45 WhatsApp messages delivered', time: '1 hour ago' }
        ]
      };
    }
    
    const response = await api.get('/api/demo/stats');
    return response.data;
  },
};

export default api;