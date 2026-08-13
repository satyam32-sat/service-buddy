import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const savedUser = localStorage.getItem("servicebuddy-user");

    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);

        if (user?.token) {
          config.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error(
          "Invalid saved user data:",
          error
        );

        localStorage.removeItem("servicebuddy-user");
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;