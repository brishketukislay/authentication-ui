import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://authentication-node-pxse.onrender.com/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // This ensures cookies (access and refresh tokens) are sent with every request
}
);

// Interceptor to handle response and refresh token logic
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if it's successful
  async (error) => {
    const originalRequest = error.config;
      console.log("API URL:", process.env.REACT_APP_API_URL);
    // If the error status is 401 (Unauthorized) and the request hasn't been retried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the access token using the refresh token stored in the cookie
        const refreshResponse = await axios.post('/users/refresh', {}, { withCredentials: true });

        // If the refresh token is successful, retry the original request
        const { accessToken } = refreshResponse.data;

        // Note: The cookie will automatically be updated by the backend, so no need to manually update it

        // Retry the original request with the new access token (since cookies are updated automatically)
        return axios(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed:', refreshError);

        // Clear cookies (both access and refresh tokens) and redirect to login
        document.cookie = "access_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"; // Clear access token cookie
        document.cookie = "refresh_token=;expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/"; // Clear refresh token cookie

        window.location.href = '/login'; // Redirect user to login page
        return Promise.reject(refreshError);
      }
    }

    // If the error is not a 401 or the request has already been retried, reject the promise
    return Promise.reject(error);
  }
);

export default axiosInstance;
