import { customersApi } from "@/api/customers-api";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusCustomer = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            _id,
            status,
        }: {
            _id: string;
            status: boolean;
        }) => {
            return (await customersApi.updateStatus(_id, status)).data;
        },
        onSuccess: (response) => {
            queryClient.refetchQueries({ queryKey: ["customers"] });
        },
        onError: (error: ErrorResponse) => error,
    });
};
