import { productsApi } from "@/api/products-api";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusProduct = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            _id,
            status,
        }: {
            _id: string;
            status: boolean;
        }) => {
            return (await productsApi.updateStatus(_id, status)).data;
        },
        onSuccess: (response) => {
            queryClient.refetchQueries({ queryKey: ["products"] });
        },
        onError: (error: ErrorResponse) => error,
    });
};
