import { productsApi } from "@/api/products-api";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetThreeProducts = () => {
    return useQuery<Product[]>({
        queryKey: ["products-sale"],
        queryFn: async () => {
            return (await productsApi.getSale()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
