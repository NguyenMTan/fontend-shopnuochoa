import { customersApi } from "@/api/customers-api";
import useToastMessage from "@/hooks/useToastMessage";
import { UpdateCustomer } from "@/types/customer.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateCustomer = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();

    return useMutation({
        mutationFn: async (data: UpdateCustomer) => {
            return (await customersApi.update(data)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Cập nhật khách hàng thành công!");
            queryClient.refetchQueries({ queryKey: ["customer-me"] });
        },
        onError: (error) => {
            toastError("Cập nhật khách hàng thất bại!");
            return error;
        },
    });
};
