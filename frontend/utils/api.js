import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/auth/login'
    }
    return Promise.reject(error)
  }
)

// Products API
export const productsAPI = {
  getAll: (params = {}) => api.get('/products/', { params }),
  getById: (id) => api.get(`/products/${id}/`),
  getFeatured: () => api.get('/products/featured/'),
  getByCategory: () => api.get('/products/by_category/'),
  getAfricanStyles: () => api.get('/products/african_styles/'),
  search: (query) => api.get('/products/', { params: { search: query } }),
}

// Categories API
export const categoriesAPI = {
  getAll: () => api.get('/categories/'),
  getById: (id) => api.get(`/categories/${id}/`),
}

// Orders API
export const ordersAPI = {
  getAll: () => api.get('/orders/'),
  getById: (id) => api.get(`/orders/${id}/`),
  create: (data) => api.post('/orders/', data),
  updateStatus: (id, status) => api.patch(`/orders/${id}/update_status/`, { status }),
}

// Customers API
export const customersAPI = {
  getProfile: () => api.get('/customers/'),
  updateProfile: (data) => api.put('/customers/', data),
  create: (data) => api.post('/customers/', data),
}

// Auth API (if implemented)
export const authAPI = {
  login: (credentials) => api.post('/auth/login/', credentials),
  register: (data) => api.post('/auth/register/', data),
  logout: () => api.post('/auth/logout/'),
  refreshToken: () => api.post('/auth/refresh/'),
}

export default api