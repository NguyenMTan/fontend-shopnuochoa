import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { cartsApi } from "@/api/cart-api";

export const useDeleteProductCart = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();

    return useMutation({
        mutationFn: async (id: string) => {
            return (await cartsApi.deleteCart(id)).data;
        },
        onSuccess: () => {
            toastSuccess("Xoá sản phẩm trong giỏ hàng thành công");
            queryClient.invalidateQueries({ queryKey: ["cart"] });
        },
        onError: () => {
            toastError("Xoá sản phẩm trong giỏ hàng thất bại");
        },
    });
};
