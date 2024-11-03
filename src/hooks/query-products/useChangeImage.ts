import { productsApi } from "@/api/products-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeImage = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: File }) => {
            return (await productsApi.addImage(id, data, {})).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["product", data] });
            queryClient.refetchQueries({ queryKey: ["products"] });
            toastSuccess("Thay đổi ảnh sản phẩm thành công");
        },
        onError: (error) => {
            toastError("Thay đổi ảnh sản phẩm thất bại");
        },
    });
};
