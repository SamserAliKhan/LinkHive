// src/APIs/AxiosConfig.js
import axios from "axios";

let onLogout; // placeholder for logout callback

export const setLogoutHandler = (handler) => {
  onLogout = handler;
};

const instance = axios.create({
  baseURL: process.env.API_GATEWAY_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// Request interceptor (for logging/debugging)
instance.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config.url, config.method);
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor (auto-refresh)
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Attempt refresh
        await instance.post("/auth/refresh");

        // Retry original request
        return instance(originalRequest);
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);
        if (onLogout) onLogout(); // trigger centralized logout
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
