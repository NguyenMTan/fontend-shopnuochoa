import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useNavigate } from "react-router-dom";
import { CreateBrand } from "@/types/brand.type";
import { brandsApi } from "@/api/brands-api";
import { ErrorResponse } from "@/types/error.type";
import { useBrandStore } from "@/store/useBrandStore";

export const useUpdateBrand = () => {
    const { toastError, toastSuccess } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setModalUpdate } = useBrandStore();
    return useMutation({
        mutationFn: async ({
            _id,
            body,
        }: {
            _id: string;
            body: CreateBrand;
        }) => {
            return (await brandsApi.update(_id, body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Cập nhật thương hiệu thành công");
            queryClient.refetchQueries({ queryKey: ["brands"] });
            queryClient.refetchQueries({ queryKey: ["brands-name"] });
            setModalUpdate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Cập nhật thương hiệu thất bại");
            return error;
        },
    });
};
