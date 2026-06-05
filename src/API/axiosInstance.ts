import axios from "axios";
import type { AxiosError } from "axios";
import { baseURL } from "./endpoints";

const axiosInstance = axios.create({
    baseURL,
    headers: { "Content-Type": "application/json" },
    timeout: 10000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token =
            localStorage.getItem("token") || sessionStorage.getItem("token");

        if (token) {
            config.headers = config.headers || {};
            config.headers["x-access-token"] = token;
        }

        return config;
    },
    (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (res) => res,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            sessionStorage.clear();
            window.location.replace("/login");
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;