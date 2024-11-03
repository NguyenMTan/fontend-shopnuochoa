import { ordersApi } from "@/api/orders-api";
import { Order } from "@/types/order.type";
import { useQuery } from "@tanstack/react-query";

export const useGetOrder = (id: string) => {
    return useQuery<Order>({
        queryKey: ["order", id],
        queryFn: async () => {
            return (await ordersApi.getOne(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
