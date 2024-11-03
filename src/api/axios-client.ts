import { LocalUtils } from "@/utils/local-util";
import axios from "axios";

const axiosClient = (redirect: boolean = false) => {
    const configAxios = axios.create({
        headers: {
            "Content-Type": "application/json",
        },
        baseURL: "http://localhost:3000/",
    });

    configAxios.interceptors.request.use((config) => {
        const local = LocalUtils.getLocalToken();

        if (local && !config.headers.Authorization) {
            config.headers.Authorization = `Bearer ${local}`;
        }

        return config;
    });

    configAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response.status === 401) {
                LocalUtils.removeLocalToken();
                if (redirect) {
                    window.location.href = "/admin/login";
                }
            }
            return Promise.reject(error.response.data);
        }
    );

    return configAxios;
};

export default axiosClient;
