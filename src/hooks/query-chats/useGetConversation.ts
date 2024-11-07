import { chatsApi } from "@/api/chats-api";
import { Conversation } from "@/types/conversation.type";
import { useQuery } from "@tanstack/react-query";

export const useGetConversation = (id: string) => {
    return useQuery<Conversation[]>({
        queryKey: ["conversation", id],
        queryFn: async () => {
            return (await chatsApi.getConversation(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
