import axios from "axios";

// Point this at your Express server, e.g. http://localhost:5000/api
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attaches the JWT (issued by the Express/Prisma auth route) to every request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("medimate_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized 401 handling — redirect to login if the token is invalid/expired.
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("medimate_token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
