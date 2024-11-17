import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { CreateBrand } from "@/types/brand.type";
import { brandsApi } from "@/api/brands-api";
import { ErrorResponse } from "@/types/error.type";
import { useBrandStore } from "@/store/useBrandStore";

export const useCreateBrand = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const { setModalCreate } = useBrandStore();

    return useMutation({
        mutationFn: async (body: CreateBrand) => {
            return (await brandsApi.create(body)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Tạo thương hiệu thành công");
            queryClient.refetchQueries({ queryKey: ["brands"] });
            queryClient.refetchQueries({ queryKey: ["brands-name"] });
            setModalCreate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Tạo thương hiệu thất bại");
            return error;
        },
    });
};
