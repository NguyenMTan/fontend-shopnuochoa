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
            toastSuccess("Tạo danh mục thành công");
            queryClient.refetchQueries({ queryKey: ["reviews"] });
            queryClient.refetchQueries({ queryKey: ["reviews-me"] });
        },
        onError: (error: ErrorResponse) => {
            toastError("Tạo danh mục thất bại");
            return error;
        },
    });
};
