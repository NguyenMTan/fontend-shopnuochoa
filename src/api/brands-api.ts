import { CreateBrand } from "@/types/brand.type";
import { ParamPagination } from "./../types/pagination.type";
import axiosClient from "./axios-client";
export const brandsApi = {
    getAll(params: ParamPagination) {
        const url = "/brands";
        return axiosClient(true).get(url, { params });
    },
    create(body: CreateBrand) {
        const url = "/brands";
        return axiosClient(true).post(url, body);
    },
    get(_id: string) {
        const url = `/brands/${_id}`;
        return axiosClient(true).get(url);
    },
    update(_id: string, body: CreateBrand) {
        const url = `/brands/${_id}`;
        return axiosClient(true).put(url, body);
    },
    delete(_id: string) {
        const url = `/brands/${_id}`;
        return axiosClient(true).delete(url);
    },
    getAllName() {
        const url = "/brands/all";
        return axiosClient(true).get(url);
    },
    updateStatus(_id: string, status: boolean) {
        const url = `/brands/${_id}/status`;
        return axiosClient(true).put(url, {}, { params: { status } });
    },
};
