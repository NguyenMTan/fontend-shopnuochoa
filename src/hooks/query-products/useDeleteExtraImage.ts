import { productsApi } from "@/api/products-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteExtraImages = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: string[] }) => {
            return (await productsApi.deleteExtraImages(id, data)).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["product", data] });
            queryClient.refetchQueries({ queryKey: ["products"] });
            toastSuccess("Xoá ảnh phụ thành công");
        },
        onError: (error) => {
            toastError(error.message);
        },
    });
};
