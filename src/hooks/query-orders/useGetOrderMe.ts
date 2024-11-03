import { ordersApi } from "@/api/orders-api";
import { Order } from "@/types/order.type";
import { useQuery } from "@tanstack/react-query";

export const useGetOrderMe = () => {
    return useQuery<Order[]>({
        queryKey: ["orders-me"],
        queryFn: async () => {
            return (await ordersApi.me()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
