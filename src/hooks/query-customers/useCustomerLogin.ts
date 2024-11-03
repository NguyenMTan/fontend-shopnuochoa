import { customersApi } from "@/api/customers-api";
import useToastMessage from "@/hooks/useToastMessage";
import { ErrorResponse } from "@/types/error.type";
import { Login } from "@/types/login.type";
import { LocalUtils } from "@/utils/local-util";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useCustomerLogin = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (body: Login) => {
            return (await customersApi.login(body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Đăng nhập thành công!");
            LocalUtils.setLocalToken(data);
            navigate("/");
        },
        onError: (error: any) => {
            if (error.statusCode === 401) {
                toastError(error.message);
                return error;
            }
            toastError("Đăng nhập thất bại");
            return error;
        },
    });
};
