import { productsApi } from "@/api/products-api";
import { ParamProduct } from "@/types/pagination.type";
import { Product } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";

export const useGetProductsByCategory = (params: ParamProduct) => {
    return useQuery<Product[]>({
        queryKey: [
            "products-cates",
            params.category_id,
            params.brand_id,
            params.keyword,
        ],
        queryFn: async () => {
            return (await productsApi.getByCategory(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
