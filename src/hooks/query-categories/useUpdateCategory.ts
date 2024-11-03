import { categoriesApi } from "@/api/categories-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { CreateCategory } from "@/types/category.type";
import { ErrorResponse } from "@/types/error.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useUpdateCategory = () => {
    const { toastError, toastSuccess } = useToastMessage();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { setModalUpdate } = useCategoryStore();
    return useMutation({
        mutationFn: async ({
            _id,
            body,
        }: {
            _id: string;
            body: CreateCategory;
        }) => {
            return (await categoriesApi.update(_id, body)).data;
        },
        onSuccess: (data) => {
            toastSuccess("Cập nhật danh mục thành công");
            queryClient.refetchQueries({ queryKey: ["categories"] });
            queryClient.refetchQueries({ queryKey: ["categorie", data._id] });
            queryClient.refetchQueries({ queryKey: ["categories-name"] });
            setModalUpdate(false);
        },
        onError: (error: ErrorResponse) => {
            toastError("Cập nhật danh mục thất bại");
            return error;
        },
    });
};
