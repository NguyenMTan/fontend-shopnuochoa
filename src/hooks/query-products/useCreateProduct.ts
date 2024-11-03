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
            toastSuccess("Tạo product thành công");
            navigate("/admin/products");
        },
        onError: (error: ErrorResponse) => {
            if (error.statusCode === 422) {
                toastError("Lỗi không thể tạo sản phẩm đã tồn tại");
            } else {
                toastError("Tạo thất bại");
            }
        },
    });
};
