import { useAuthStore } from "@/store/auth";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://172.20.10.2:7338", // CAMBIAR POR LA URL DE LA API
    headers: {
        "Content-Type": "application/json"
    }
});

axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await useAuthStore.getState().token;
  
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

const userEndpoints = {
    register: "/auth/create",
    login: "/auth/login",
    //logout: "api/v1/auth/logout",
    resetPassword: "/auth/resetPassword",
    verifyPassword: "/auth/verifyPassword",
    getUser: "/auth/getUser",
    editAccount: "/auth/editUser",
};

export { axiosInstance, userEndpoints };