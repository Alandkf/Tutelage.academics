import axios from 'axios';

// Create axios instance with base URL from environment variable
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  timeout: 10000,
  withCredentials: true, // Important for cookies/authentication
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor - runs before each request
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - runs after each response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // If error is 401 (Unauthorized) and we haven't already tried to refresh
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Try to refresh the token
        await refreshToken();
        
        // Retry the original request
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/';
        }
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to refresh token
export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/refresh-token', {}, {
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw error;
  }
};

// API utility functions
export const apiService = {
  // Auth related functions
  auth: {
    login: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    logout: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    },
    register: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    getCurrentUser: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    refreshToken
  },
  
  // Generic CRUD operations that can be used for any endpoint
  get: async (endpoint, params = {}) => {
    const response = await api.get(endpoint, { params });
    return response.data;
  },
  post: async (endpoint, data = {}) => {
    const response = await api.post(endpoint, data);
    return response.data;
  },
  put: async (endpoint, data = {}) => {
    const response = await api.put(endpoint, data);
    return response.data;
  },
  delete: async (endpoint) => {
    const response = await api.delete(endpoint);
    return response.data;
  }
};

export default api;
