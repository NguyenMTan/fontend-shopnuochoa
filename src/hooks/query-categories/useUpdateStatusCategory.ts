import { categoriesApi } from "@/api/categories-api";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateStatusCategory = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            _id,
            status,
        }: {
            _id: string;
            status: boolean;
        }) => {
            return (await categoriesApi.updateStatus(_id, status)).data;
        },
        onSuccess: (response) => {
            queryClient.refetchQueries({ queryKey: ["categories"] });
            queryClient.refetchQueries({ queryKey: ["categories-name"] });
        },
        onError: (error: ErrorResponse) => error,
    });
};
