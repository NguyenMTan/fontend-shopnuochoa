import { cartsApi } from "@/api/cart-api";
import useToastMessage from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAddCart = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({
            product_id,
            quantity,
        }: {
            product_id: string;
            quantity: number;
        }) => {
            return (await cartsApi.addCart(product_id, quantity))?.data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["cart"] });
            toastSuccess("Đã thêm vào giỏ hàng");
        },
        onError: (error: ErrorResponse) => {
            if (error.statusCode == 401) {
                toastError("Bạn vui lòng đăng nhập");
                navigate("/login");
                return error;
            }
            toastError("Thêm vào giỏ hàng thất bại");
            return error;
        },
    });
};
