import { checkoutApi } from "@/api/checkout-api";
import useToastMessage from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCheckout = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (body: {
            address: string;
            phone_number: string;
            email: string;
        }) => {
            return (await checkoutApi.checkout(body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Đặt hàng thành công");
            queryClient.refetchQueries({ queryKey: ["cart"] });
            navigate("/thanks");
        },
        onError: (error: ErrorResponse) => {
            toastError(
                "Đặt hàng thất bại, vui lòng kiểm tra số lượng sản phẩm trong kho!"
            );
            return error;
        },
    });
};
