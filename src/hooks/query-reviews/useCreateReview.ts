import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { CreateReview } from "@/types/review.type";
import { reviewApi } from "@/api/review-api";
import { ErrorResponse } from "@/types/error.type";

export const useCreateReview = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();

    return useMutation({
        mutationFn: async (body: CreateReview) => {
            return (await reviewApi.create(body)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Đánh giá thành công");
            queryClient.refetchQueries({ queryKey: ["reviews"] });
            queryClient.refetchQueries({ queryKey: ["reviews-me"] });
        },
        onError: (error: ErrorResponse) => {
            toastError("Đánh giá thất bại");
            return error;
        },
    });
};
