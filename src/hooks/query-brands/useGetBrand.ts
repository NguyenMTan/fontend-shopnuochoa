import { brandsApi } from "@/api/brands-api";
import { Brand } from "@/types/brand.type";
import { useQuery } from "@tanstack/react-query";

export const useGetBrand = (id: string) => {
    return useQuery<Brand>({
        queryKey: ["category", id],

        queryFn: async () => {
            return (await brandsApi.get(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
