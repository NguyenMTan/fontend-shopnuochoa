import { usersApi } from "@/api/users-api";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { User } from "@/types/user.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUser = (params: ParamPagination) => {
    return useQuery<ResponsePagination<User>>({
        queryKey: ["users", params.keyword],
        queryFn: async () => {
            return (await usersApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
