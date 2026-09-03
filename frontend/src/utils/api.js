import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    // No token
    if (!token) {
      window.location.href = "/";
      return Promise.reject(
        new Error("No authentication token")
      );
    }

    try {
      // Decode token
      const decodedToken = jwtDecode(token);

      // Check token expiry
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "/";

        return Promise.reject(
          new Error("Token expired")
        );
      }

      // Add token to request
      config.headers.Authorization = `Bearer ${token}`;

      return config;

    } catch (error) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";

      return Promise.reject(error);
    }
  },

  (error) => {
    return Promise.reject(error);
  }
);


// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    // Backend says token is invalid/expired
    if (error.response?.status === 401) {

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      window.location.href = "/login";
    }

      if (error.response?.status === 403) {

         window.location.href = "/"
      }

    return Promise.reject(error);
  }
);

export default api;