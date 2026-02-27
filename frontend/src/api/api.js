import axios from "axios";

// Use the environment variable for API base URL
const API_URL = import.meta.env.VITE_API_URL;

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
});

// Request interceptor: attach access token if present
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor: handle 401 (expired access token)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if error is 401, we haven't retried yet, and refresh token exists
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      localStorage.getItem("refresh")
    ) {
      originalRequest._retry = true;

      try {
        // Use API_URL for production and localhost for development
        const res = await axios.post(`${API_URL}/token/refresh/`, {
          refresh: localStorage.getItem("refresh"),
        });

        // Save new tokens
        localStorage.setItem("access", res.data.access);
        if (res.data.refresh) {
          localStorage.setItem("refresh", res.data.refresh);
        }

        // Retry original request with new access token
        originalRequest.headers.Authorization = `Bearer ${res.data.access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, log out user
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
