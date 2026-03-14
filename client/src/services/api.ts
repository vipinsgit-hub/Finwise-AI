import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const authService = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  login: async (credentials: any) => {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },
  upsertProfile: async (profileData: any) => {
    const response = await api.post('/profile', profileData);
    return response.data;
  },
  calculateFIRE: async (fireData: any) => {
    const response = await api.post('/profile/fire', fireData);
    return response.data;
  }
};

export const adminService = {
  getStats: async () => {
    const response = await api.get('/admin/stats');
    return response.data;
  },
  getBlogs: async () => {
    const response = await api.get('/admin/blogs');
    return response.data;
  },
  createBlog: async (blogData: any) => {
    const response = await api.post('/admin/blogs', blogData);
    return response.data;
  },
  updateBlog: async (id: string, blogData: any) => {
    const response = await api.put(`/admin/blogs/${id}`, blogData);
    return response.data;
  },
  deleteBlog: async (id: string) => {
    const response = await api.delete(`/admin/blogs/${id}`);
    return response.data;
  },
  getMessages: async () => {
    const response = await api.get('/admin/messages');
    return response.data;
  },
  markMessageRead: async (id: string) => {
    const response = await api.put(`/admin/messages/${id}/read`);
    return response.data;
  }
};

export default api;
