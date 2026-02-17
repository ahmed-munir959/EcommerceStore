import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with base configuration
// axios instance bascially a custom version of axios with predefined settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Important for httpOnly cookies (refreshToken)
});

// Request interceptor
// Automatically attaches your accessToken to every request.
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve token from sessionStorage as per user's requirement
    const token = sessionStorage.getItem('accessToken');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request for debugging
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      timestamp: new Date().toISOString(),
    });

    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
// Global Error Handling, Lets you handle errors in one place.
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful response
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      timestamp: new Date().toISOString(),
    });

    return response;
  },
  (error: AxiosError) => {
    // Handle errors globally
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.message,
      url: error.config?.url,
    });

    // You can handle specific error codes here
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.log('Unauthorized - redirecting to login');
    } else if (error.response?.status === 404) {
      console.log('Resource not found');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;