import { brandsApi } from "@/api/brands-api";
import { Brand } from "@/types/brand.type";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = (params: ParamPagination) => {
    return useQuery<ResponsePagination<Brand>>({
        queryKey: ["brands", params.keyword],
        queryFn: async () => {
            return (await brandsApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
