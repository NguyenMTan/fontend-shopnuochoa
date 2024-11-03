import { usersApi } from "@/api/users-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useUserStore } from "@/store/useUserStore";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const { setModalDelete } = useUserStore();

    return useMutation({
        mutationFn: async (_id: string) => {
            return (await usersApi.deleteUser(_id)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Xoá tài khoản thành công");
            queryClient.refetchQueries({ queryKey: ["users"] });
            setModalDelete(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Xoá thất bại");
        },
    });
};
