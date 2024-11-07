import { chatsApi } from "@/api/chats-api";
import { Conversation } from "@/types/conversation.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMessages = (sender_id: string, receiver_id: string) => {
    return useQuery<Conversation>({
        queryKey: ["messages", sender_id],
        queryFn: async () => {
            return (await chatsApi.getMessages(sender_id, receiver_id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
