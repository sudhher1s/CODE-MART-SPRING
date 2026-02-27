import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method.toUpperCase(), config.url, config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.data);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.status, error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getUser: (id) => api.get(`/auth/user/${id}`),
  updateUser: (id, data) => api.put(`/auth/user/${id}`, data),
};

// Product APIs
export const productAPI = {
  getAllProducts: () => api.get('/products'),
  getProduct: (id) => api.get(`/products/${id}`),
  getProductsByCategory: (category) => api.get(`/products/category/${category}`),
  getProductsBySeller: (sellerId) => api.get(`/products/seller/${sellerId}`),
  searchProducts: (keyword) => api.get(`/products/search?keyword=${keyword}`),
  createProduct: (data, sellerId) => api.post(`/products?sellerId=${sellerId}`, data),
  updateProduct: (id, data, sellerId) => api.put(`/products/${id}?sellerId=${sellerId}`, data),
  deleteProduct: (id, sellerId) => api.delete(`/products/${id}?sellerId=${sellerId}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (buyerId, productId) => api.post(`/orders?buyerId=${buyerId}&productId=${productId}`),
  getOrder: (id) => api.get(`/orders/${id}`),
  getOrdersByBuyer: (buyerId) => api.get(`/orders/buyer/${buyerId}`),
  getOrdersBySeller: (sellerId) => api.get(`/orders/seller/${sellerId}`),
  getAllOrders: () => api.get('/orders'),
  updateOrderStatus: (id, status) => api.put(`/orders/${id}/status?status=${status}`),
};

export default api;
