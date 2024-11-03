import axiosClient from "./axios-client";

export const feedbackApi = {
    sendFeedBack(data: {
        name: string;
        email: string;
        phone_number: string;
        message: string;
    }) {
        const url = "/mail";
        return axiosClient(false).post(url, data);
    },
};
