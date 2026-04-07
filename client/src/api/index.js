import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 15000,
});

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('kg_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('kg_token');
      localStorage.removeItem('kg_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;

// ── Auth
export const registerUser = d => api.post('/auth/register', d);
export const loginUser = d => api.post('/auth/login', d);
export const getMe = () => api.get('/auth/me');

// ── Artisans
export const getArtisans = p => api.get('/artisans', { params: p });
export const getArtisan = slug => api.get(`/artisans/${slug}`);
export const createArtisan = d => api.post('/artisans', d);
export const updateArtisan = (id, d) => api.patch(`/artisans/${id}`, d);
export const getMyArtisanProfile = () => api.get('/artisans/me');
export const getArtisanDashboard = () => api.get('/artisans/me/dashboard');

// ── Products
export const getProducts = p => api.get('/products', { params: p });
export const getFeatured = () => api.get('/products/featured');
export const getProduct = slug => api.get(`/products/${slug}`);
export const createProduct = d => api.post('/products', d);
export const updateProduct = (id, d) => api.patch(`/products/${id}`, d);
export const updateStock = (id, stock) => api.patch(`/products/${id}/stock`, { stock });

// ── Orders
export const placeOrder = d => api.post('/orders', d);
export const getMyOrders = () => api.get('/orders/my');

// ── Haats
export const getHaats = p => api.get('/haats', { params: p });
export const getHaat = slug => api.get(`/haats/${slug}`);
export const createHaat = d => api.post('/haats', d);
export const joinHaat = (id, d) => api.post(`/haats/${id}/join`, d);
export const rsvpHaat = id => api.post(`/haats/${id}/rsvp`);
export const updateParticipant = (haatId, artisanId, status) =>
  api.patch(`/haats/${haatId}/participants/${artisanId}`, { status });
