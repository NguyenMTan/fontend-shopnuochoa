import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";
import { CreateUser } from "@/types/user.type";
import { usersApi } from "@/api/users-api";
import { ErrorResponse } from "@/types/error.type";
import { useUserStore } from "@/store/useUserStore";

export const useCreateUser = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();
    const { setModalCreate } = useUserStore();

    return useMutation({
        mutationFn: async (body: CreateUser) => {
            return (await usersApi.createUser(body)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Tạo người dùng thành công");
            queryClient.refetchQueries({ queryKey: ["users"] });
            setModalCreate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Tạo người dùng thất bại");
            return error;
        },
    });
};
