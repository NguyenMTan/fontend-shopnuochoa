import axiosClient from "./axios-client";

export const cartsApi = {
    getCart: () => {
        const url = "/carts";
        return axiosClient(false).get(url);
    },
    addCart: (product_id: string, quantity: number) => {
        const url = "/carts";
        return axiosClient(false).post(url, { product_id, quantity });
    },
    deleteCart: (id: string) => {
        const url = `/carts/product/${id}`;
        return axiosClient(false).delete(url);
    },
};
