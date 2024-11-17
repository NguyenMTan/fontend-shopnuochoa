import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { Login } from "@/types/login.type";
import { usersApi } from "@/api/users-api";
import { LocalUtils } from "@/utils/local-util";
import { ErrorResponse } from "@/types/error.type";
import { useNavigate } from "react-router-dom";

const useUserLogin = () => {
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async (body: Login) => {
            return (await usersApi.login(body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Đăng nhập thành công");
            LocalUtils.setLocalToken(data);
            navigate("/admin");
        },
        onError: (error: ErrorResponse) => {
            if (error.statusCode === 401) {
                toastError("Sai mật khẩu");
            } else if (error.statusCode === 404) {
                toastError("Không tìm thấy email");
            }
            return error;
        },
    });
};

export default useUserLogin;
