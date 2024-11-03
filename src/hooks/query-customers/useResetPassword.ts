import { customersApi } from "@/api/customers-api";
import useToastMessage from "@/hooks/useToastMessage";
import { Register } from "@/types/register.type";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useResetPassword = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({
            token,
            password,
        }: {
            token: string;
            password: string;
        }) => {
            return (await customersApi.resetPassword(token, password)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Thay đổi mật khẩu thành công!");
            navigate("/login");
        },
        onError: (error) => {
            toastError("Email không tồn tại");
            return error;
        },
    });
};
