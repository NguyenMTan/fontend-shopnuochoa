import { brandsApi } from "@/api/brands-api";
import { Brand } from "@/types/brand.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllNameBrands = () => {
    return useQuery<Brand[]>({
        queryKey: ["brands-name"],

        queryFn: async () => {
            return (await brandsApi.getAllName()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
