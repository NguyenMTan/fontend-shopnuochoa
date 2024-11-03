import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-client";
import { CreateUser } from "@/types/user.type";
import { Login } from "@/types/login.type";

export const usersApi = {
    login(body: Login) {
        const url = "/users/login";
        return axiosClient(true).post(url, body);
    },

    me() {
        const url = "/users/me";
        return axiosClient(true).get(url);
    },

    getAll(params: ParamPagination) {
        const url = "/users";
        return axiosClient(true).get(url, { params });
    },

    updateStatus(_id: string, status: boolean) {
        const url = `/users/${_id}/status`;
        return axiosClient(true).put(url, {}, { params: { status } });
    },

    createUser(body: CreateUser) {
        const url = "/users";
        return axiosClient(true).post(url, body);
    },

    getOne(_id: string) {
        const url = `/users/${_id}`;
        return axiosClient(true).get(url);
    },

    updateUser(_id: string, name: string) {
        const url = `/users/${_id}`;
        return axiosClient(true).put(url, { name });
    },

    deleteUser(_id: string) {
        const url = `/users/${_id}`;
        return axiosClient(true).delete(url);
    },
};
