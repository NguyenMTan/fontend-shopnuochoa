import { customersApi } from "@/api/customers-api";
import { useQuery } from "@tanstack/react-query";

export const useGetMeCustomer = () => {
    return useQuery({
        queryKey: ["customer-me"],
        queryFn: async () => {
            return (await customersApi.getMe()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
