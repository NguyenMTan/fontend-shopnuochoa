import { customersApi } from "@/api/customers-api";
import { Customer } from "@/types/customer.type";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";

import { useQuery } from "@tanstack/react-query";

export const useGetAllCustomers = (params: ParamPagination) => {
    return useQuery<ResponsePagination<Customer>>({
        queryKey: ["customers", params.keyword],
        queryFn: async () => {
            return (await customersApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
