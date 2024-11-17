import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { reviewApi } from "@/api/review-api";
import { ErrorResponse } from "@/types/error.type";

export const useDeleteReview = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();

    return useMutation({
        mutationFn: async (_id: string) => {
            return (await reviewApi.delete(_id)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Xoá đánh giá thành công");
            queryClient.refetchQueries({ queryKey: ["reviews"] });
            queryClient.refetchQueries({ queryKey: ["reviews-me"] });
        },
        onError: (error: ErrorResponse) => {
            toastError("Xoá đánh giá thất bại");
            return error;
        },
    });
};
