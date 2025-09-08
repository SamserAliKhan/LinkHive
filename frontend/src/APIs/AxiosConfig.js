// src/APIs/AxiosConfig.js
import axios from "axios";

let onLogout; // placeholder for logout callback

export const setLogoutHandler = (handler) => {
  onLogout = handler;
};

const instance = axios.create({
  baseURL: process.env.API_GATEWAY_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,  //Important for sending cookies
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

    // #Case 1: Access token expired
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "TOKEN_EXPIRED" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const res = await instance.post("/auth/refresh");

        if (res.data?.ok) {
          // retry the original request (cookies already updated by backend)
          return instance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh failed:", refreshError);

        // Case 2: Refresh also expired/invalid
        if (refreshError.response?.status === 401) {
          if (onLogout) onLogout(); // trigger centralized logout
        }
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
