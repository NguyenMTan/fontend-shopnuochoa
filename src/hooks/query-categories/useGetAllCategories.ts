import { categoriesApi } from "@/api/categories-api";
import { Category } from "@/types/category.type";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllCategories = (params: ParamPagination) => {
    return useQuery<ResponsePagination<Category>>({
        queryKey: ["categories", params.keyword],
        queryFn: async () => {
            return (await categoriesApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
