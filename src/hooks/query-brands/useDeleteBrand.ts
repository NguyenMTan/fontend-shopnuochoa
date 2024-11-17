import { useMutation, useQueryClient } from "@tanstack/react-query";
import useToastMessage from "../useToastMessage";
import { useBrandStore } from "@/store/useBrandStore";
import { brandsApi } from "@/api/brands-api";
import { ErrorResponse } from "@/types/error.type";

export const useDeleteBrand = () => {
    const queryClient = useQueryClient();
    const { toastSuccess, toastError } = useToastMessage();
    const { setModalDelete } = useBrandStore();

    return useMutation({
        mutationFn: async (_id: string) => {
            return (await brandsApi.delete(_id)).data;
        },
        onSuccess: (response) => {
            toastSuccess("Xoá thương hiệu thành công");
            queryClient.refetchQueries({ queryKey: ["brands"] });
            queryClient.refetchQueries({ queryKey: ["brands-name"] });
            setModalDelete(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Xoá thương hiệu thất bại");
            return error;
        },
    });
};
