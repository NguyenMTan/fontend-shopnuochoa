import { productsApi } from "@/api/products-api";
import useToastMessage from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { CreateProduct } from "@/types/product.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCreateProduct = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (data: CreateProduct) => {
            return (await productsApi.create(data)).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["products"] });
            toastSuccess("Tạo sản phẩm thành công");
            navigate("/admin/products");
        },
        onError: (error: ErrorResponse) => {
            toastError("Tạo sản phẩm thất bại");
        },
    });
};
