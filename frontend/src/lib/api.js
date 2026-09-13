import axios from "axios";

// Normalize baseURL from env or fallback to Render in production
const rawUrl =
  import.meta.env.VITE_API_URL ||
  (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1"
    ? "https://tsg-qlb1.onrender.com"
    : "http://localhost:5000");
const baseURL = rawUrl.trim().replace(/\/+$/, "");

const api = axios.create({
  baseURL,
  timeout: 30000,
});

// Request Interceptor: Attach JWT Bearer Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const isAuthPath = window.location.pathname.includes("/login");
      if (!isAuthPath) {
        // Clear stale credentials if invalid/expired
        const hadToken = Boolean(localStorage.getItem("token"));
        if (hadToken) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
