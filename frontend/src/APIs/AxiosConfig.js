import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_GATEWAY_URL || "http://localhost:5000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

//attach interceptors if needed
instance.interceptors.request.use(
  (config) => {
    console.log("Request sent:", config.url, config.method);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;