import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// Request interceptor - attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('digigrow_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('digigrow_token');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error.response?.data || error.message);
 }
);

// ===================== BOOKINGS API =====================
export const bookingApi = {
  create: (data) => api.post('/bookings', data),
  getAll: (page = 0, size = 10, status) =>
    api.get('/bookings', { params: { page, size, status } }),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status, notes) =>
    api.patch(`/bookings/${id}/status`, null, { params: { status, notes } }),
  getStats: () => api.get('/bookings/stats'),
};

// ===================== SERVICES API =====================
export const servicesApi = {
  getAll: () => api.get('/services'),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
};

// ===================== CAMPAIGNS API =====================
export const campaignApi = {
  getAll: (page = 0, size = 10, params = {}) =>
    api.get('/campaigns', { params: { page, size, ...params } }),
  getById: (id) => api.get(`/campaigns/${id}`),
  create: (data) => api.post('/campaigns', data),
  updateStatus: (id, status) =>
    api.patch(`/campaigns/${id}/status`, null, { params: { status } }),
  updateMetrics: (id, metrics) =>
    api.patch(`/campaigns/${id}/metrics`, null, { params: metrics }),
  getStats: () => api.get('/campaigns/stats'),
};

// ===================== CONTACT API =====================
export const contactApi = {
  send: (data) => api.post('/contact', data),
  getAll: (page = 0, size = 10, unreadOnly = false) =>
    api.get('/contact', { params: { page, size, unreadOnly } }),
  markAsRead: (id) => api.patch(`/contact/${id}/read`),
  getUnreadCount: () => api.get('/contact/unread-count'),
};

// ===================== TESTIMONIALS API =====================
export const testimonialApi = {
  getAll: (featuredOnly = false) =>
    api.get('/testimonials', { params: { featuredOnly } }),
  create: (data) => api.post('/testimonials', data),
  update: (id, data) => api.put(`/testimonials/${id}`, data),
  delete: (id) => api.delete(`/testimonials/${id}`),
};

// ===================== NEWSLETTER API =====================
export const newsletterApi = {
  subscribe: (data) => api.post('/newsletter/subscribe', data),
  unsubscribe: (email) => api.post('/newsletter/unsubscribe', { email }),
  getCount: () => api.get('/newsletter/count'),
};

// ===================== AUTH API =====================
export const authApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
};

// ===================== DASHBOARD API =====================
export const dashboardApi = {
  getStats: () => api.get('/dashboard/stats'),
};

export default api;
