import { CreateReview } from "@/types/review.type";
import axiosClient from "./axios-client";

export const reviewApi = {
    create(body: CreateReview) {
        const url = "/reviews";
        return axiosClient(false).post(url, body);
    },
    getByProduct(id: string) {
        const url = `/reviews/product/${id}`;
        return axiosClient(false).get(url);
    },
    getByMe() {
        const url = "/reviews/me";
        return axiosClient(false).get(url);
    },
    delete(id: string) {
        const url = `/reviews/${id}`;
        return axiosClient(false).delete(url);
    },
};
