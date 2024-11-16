import axiosClient from "./axios-client";

export const reportsApi = {
    getReports: (option: string) => {
        const url = `reports/${option}`;
        return axiosClient(false).get(url);
    },
    getReportCustomers: () => {
        const url = "reports/customer";
        return axiosClient(false).get(url);
    },
    getReportOrders: (option: string) => {
        const url = `reports/order/${option}`;
        return axiosClient(false).get(url);
    },
};
