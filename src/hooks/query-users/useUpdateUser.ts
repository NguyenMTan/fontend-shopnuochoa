import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";
import { usersApi } from "@/api/users-api";
import { ErrorResponse } from "@/types/error.type";
import { useUserStore } from "@/store/useUserStore";

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();
    const { setModalUpdate } = useUserStore();

    return useMutation({
        mutationFn: async ({ _id, name }: { _id: string; name: string }) => {
            return (await usersApi.updateUser(_id, name)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Cập nhật tài khoản thành công");
            queryClient.refetchQueries({ queryKey: ["user", response._id] });
            queryClient.refetchQueries({ queryKey: ["users"] });
            setModalUpdate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Cập nhật thất bại");
        },
    });
};
