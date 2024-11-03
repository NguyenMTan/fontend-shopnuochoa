import { blogsApi } from "@/api/blogs-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateImageBlog = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: File }) => {
            return (await blogsApi.updateImage(id, data, {})).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["blog", data] });
            queryClient.refetchQueries({ queryKey: ["blogs"] });
            toastSuccess("Thay đổi ảnh blog thành công");
        },
        onError: (error) => {
            toastError("Thay đổi ảnh blog thất bại");
        },
    });
};
