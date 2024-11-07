import axiosClient from "./axios-client";

export const chatsApi = {
    getConversation(id: string) {
        const url = `conversations/${id}`;
        return axiosClient(false).get(url);
    },
    getMessages(sender_id: string, receiver_id: string) {
        const url = `messages/${sender_id}`;
        return axiosClient(false).get(url, { params: { receiver_id } });
    },
};
