import { productsApi } from "@/api/products-api";
import useToastMessage from "@/hooks/useToastMessage";
import { InfoProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateProduct = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: InfoProduct }) => {
            return (await productsApi.update(id, data)).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["products"] });
            queryClient.refetchQueries({ queryKey: ["product"] });
            toastSuccess("Cập nhật sản phẩm thành công");
            navigate("/admin/products");
        },
        onError: (error) => {
            toastError("Cập nhật sản phẩm thất bại");
        },
    });
};
