import axiosClient from "./axios-client";

export const reportsApi = {
    getReports: (option: string) => {
        const url = `reports/${option}`;
        return axiosClient(false).get(url);
    },
};
