import { brandsApi } from "@/api/brands-api";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusBrand = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            _id,
            status,
        }: {
            _id: string;
            status: boolean;
        }) => {
            return (await brandsApi.updateStatus(_id, status)).data;
        },
        onSuccess: (response) => {
            queryClient.refetchQueries({ queryKey: ["brands"] });
            queryClient.refetchQueries({ queryKey: ["brands-name"] });
        },
        onError: (error: ErrorResponse) => error,
    });
};
