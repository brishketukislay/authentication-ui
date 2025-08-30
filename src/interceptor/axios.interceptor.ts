import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://authentication-node-pxse.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensures cookies are sent with requests
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        await axiosInstance.post('/users/refresh');

        // Retry the original request after successful refresh
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        sessionStorage.removeItem('isLoggedIn');
        //window.location.href = '/login'; // Redirect to login

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
