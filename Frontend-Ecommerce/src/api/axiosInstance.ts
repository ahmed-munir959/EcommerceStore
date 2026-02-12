import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios';

// Create axios instance with base configuration
const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Log request for debugging
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      timestamp: new Date().toISOString(),
    });

    // You can add auth token here if needed
    // config.headers.Authorization = `Bearer ${token}`;
    
    return config;
  },
  (error: AxiosError) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
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