import axios from "axios";
import { store } from "../store";
import { clearAuthData } from "../store/slices/authSlice";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Send cookies when cross-origin requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // Add logic here in the future
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Add logic here in the future
    return response;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        store.dispatch(clearAuthData());
      }
      if (data && data.message) {
        error.message = data.message;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
