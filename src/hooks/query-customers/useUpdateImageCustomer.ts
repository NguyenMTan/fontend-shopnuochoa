import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { customersApi } from "@/api/customers-api";

export const useUpdateImageCustomer = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: File }) => {
            return (await customersApi.updateImage(id, data, {})).data;
        },
        onSuccess: (data) => {
            queryClient.refetchQueries({ queryKey: ["customer", data] });
            queryClient.refetchQueries({ queryKey: ["customers"] });
            toastSuccess("Thay đổi ảnh blog thành công");
        },
        onError: (error) => {
            toastError("Thay đổi ảnh blog thất bại");
        },
    });
};
