import axios from "axios";

// Dynamic Base URL:
// 1. If explicit valid VITE_API_URL provided, use it.
// 2. In production (e.g. Vercel deployment), use same-origin "" so /api routes hit the Vercel backend directly.
// 3. In local dev on localhost, default to http://localhost:5000.
const getBaseUrl = () => {
  const envUrl = (import.meta.env.VITE_API_URL || "").trim();
  if (envUrl && !envUrl.includes("tsg-qlb1.onrender.com") && !envUrl.includes("vercel.com/")) {
    return envUrl.replace(/\/+$/, "");
  }
  if (typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1") {
    return ""; // Same origin on Vercel deployment
  }
  return "http://localhost:5000";
};

const baseURL = getBaseUrl();

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
          const msg =
            error.response?.data?.message ||
            "Your secure JWT session has expired. Please login again.";
          sessionStorage.setItem("session_ended_notice", msg);
          window.location.href = "/login?session=expired";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
