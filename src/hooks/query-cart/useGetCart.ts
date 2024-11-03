import { cartsApi } from "@/api/cart-api";
import { Cart } from "@/types/cart.type";
import { useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
    return useQuery<Cart[]>({
        queryKey: ["cart"],
        queryFn: async () => {
            return (await cartsApi.getCart()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
