import { categoriesApi } from "@/api/categories-api";
import { Category } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCategory = (id: string) => {
    return useQuery<Category>({
        queryKey: ["category", id],

        queryFn: async () => {
            return (await categoriesApi.get(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
