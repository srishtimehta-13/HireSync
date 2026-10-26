import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
  withCredentials: true, // browser will send cookies when available
});

// Interceptor to attach Clerk JWT token for cross-origin API requests (Vercel -> Render)
axiosInstance.interceptors.request.use(
  async (config) => {
    try {
      if (typeof window !== "undefined" && window.Clerk?.session) {
        const token = await window.Clerk.session.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    } catch (err) {
      console.warn("Could not retrieve Clerk token for request", err);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;