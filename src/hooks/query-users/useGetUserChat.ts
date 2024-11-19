import { usersApi } from "@/api/users-api";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useGetUserChat = () => {
    return useQuery<User>({
        queryKey: ["user-chat"],
        queryFn: async () => {
            return (await usersApi.getChat()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
