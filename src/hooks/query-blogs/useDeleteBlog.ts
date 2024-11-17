import { blogsApi } from "@/api/blogs-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useBlogStore } from "@/store/useBlogStory";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const { setModalDelete } = useBlogStore();
    return useMutation({
        mutationFn: async (id: string) => {
            return (await blogsApi.deleteOne(id)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Xoá bài viết thành công");
            queryClient.refetchQueries({ queryKey: ["blogs"] });
            setModalDelete(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Xoá bài viết thất bại");
            return error;
        },
    });
};
