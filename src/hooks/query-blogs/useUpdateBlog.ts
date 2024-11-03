import { blogsApi } from "@/api/blogs-api";
import useToastMessage from "@/hooks/useToastMessage";
import { UpdateBlog } from "@/types/blog.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateBlog = () => {
    const { toastError, toastSuccess } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({
            _id,
            body,
        }: {
            _id: string;
            body: UpdateBlog;
        }) => {
            return (await blogsApi.updateOne(_id, body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Cập nhật blog thành công");
            queryClient.refetchQueries({ queryKey: ["blogs"] });
            queryClient.refetchQueries({ queryKey: ["blog", data._id] });
            navigate("/admin/blogs");
        },
        onError: (error: ErrorResponse) => {
            toastError("Cập nhật blog thất bại");
            return error;
        },
    });
};
