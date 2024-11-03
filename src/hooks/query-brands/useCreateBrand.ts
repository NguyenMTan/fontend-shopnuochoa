import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";
import { CreateBrand } from "@/types/brand.type";
import { brandsApi } from "@/api/brands-api";
import { ErrorResponse } from "@/types/error.type";
import { useBrandStore } from "@/store/useBrandStore";

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const navigate = useNavigate();
    const { setModalCreate } = useBrandStore();

    return useMutation({
        mutationFn: async (body: CreateBrand) => {
            return (await brandsApi.create(body)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Tạo danh mục thành công");
            queryClient.refetchQueries({ queryKey: ["brands"] });
            queryClient.refetchQueries({ queryKey: ["brands-name"] });
            setModalCreate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Tạo danh mục thất bại");
            return error;
        },
    });
};
