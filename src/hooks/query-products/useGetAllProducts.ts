import { productsApi } from "@/api/products-api";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (params: ParamPagination) => {
    return useQuery<ResponsePagination<Product>>({
        queryKey: ["products", params.keyword],
        queryFn: async () => {
            return (await productsApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
