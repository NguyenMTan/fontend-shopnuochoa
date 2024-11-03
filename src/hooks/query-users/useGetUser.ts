import { usersApi } from "@/api/users-api";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useGetUser = (id: string) => {
    return useQuery<User>({
        queryKey: ["user", id],
        queryFn: async () => {
            return (await usersApi.getOne(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
