// src/api/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // your backend URL here
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('jwt_token');
    const skipTokenUrls = ['/users/login', '/users/register'];
    const shouldSkipToken = skipTokenUrls.some((url) => config.url?.includes(url));

    if (token && !shouldSkipToken) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
