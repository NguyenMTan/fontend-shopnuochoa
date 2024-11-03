import { categoriesApi } from "@/api/categories-api";
import { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNameCategories = () => {
    return useQuery<Category[]>({
        queryKey: ["categories-name"],

        queryFn: async () => {
            return (await categoriesApi.getAllName()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
