import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-client";
import { CreateCategory } from "@/types/category.type";

export const categoriesApi = {
    getAll(params: ParamPagination) {
        const url = "/categories";
        return axiosClient(true).get(url, { params });
    },

    getAllName() {
        const url = "/categories/all";
        return axiosClient(true).get(url);
    },

    create(body: CreateCategory) {
        const url = "/categories";
        return axiosClient(true).post(url, body);
    },

    delete(_id: string) {
        const url = `/categories/${_id}`;
        return axiosClient(true).delete(url);
    },

    updateStatus(_id: string, status: boolean) {
        const url = `/categories/${_id}/status`;
        return axiosClient(true).put(url, {}, { params: { status } });
    },

    get(_id: string) {
        const url = `/categories/${_id}`;
        return axiosClient(true).get(url);
    },

    update(_id: string, body: CreateCategory) {
        const url = `/categories/${_id}`;
        return axiosClient(true).put(url, body);
    },
};
