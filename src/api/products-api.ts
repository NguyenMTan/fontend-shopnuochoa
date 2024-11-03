import { ParamPagination, ParamProduct } from "@/types/pagination.type";
import axiosClient from "./axios-client";
import { CreateProduct, InfoProduct } from "@/types/product.type";

export const productsApi = {
    getAll(params: ParamPagination) {
        const url = "/products";
        return axiosClient(true).get(url, { params: params });
    },
    get(_id: string) {
        const url = `/products/${_id}`;
        return axiosClient(true).get(url);
    },
    create: (params: CreateProduct) => {
        const { product, main_image, extra_images } = params;

        const formData = new FormData();
        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("short_description", String(product.short_description));
        formData.append("status", String(product.status));
        formData.append("cost", String(product.cost));
        formData.append("price", String(product.price));
        formData.append("sale", String(product.sale));
        formData.append("stock", String(product.stock));
        formData.append("category_id", product.category_id);
        formData.append("brand_id", product.brand_id);

        if (main_image) {
            formData.append("main_image", main_image);
        }
        if (extra_images.length > 0) {
            extra_images.forEach((file) => {
                formData.append("extra_images", file);
            });
        }

        const url = "/products";
        return axiosClient(true).post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    delete(_id: string) {
        const url = `/products/${_id}`;
        return axiosClient(true).delete(url);
    },
    updateStatus(_id: string, status: boolean) {
        const url = `/products/${_id}/status`;
        return axiosClient(true).put(url, {}, { params: { status } });
    },
    update(_id: string, body: InfoProduct) {
        const url = `/products/${_id}`;
        return axiosClient(true).put(url, body);
    },
    addImage: (id: string, file: File, config: any) => {
        const formData = new FormData();
        formData.append("main_image", file);
        const url = `/products/${id}/main_image`;
        return axiosClient(true).put(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    addExtraImages: (id: string, files: File[]) => {
        const formData = new FormData();
        files.forEach((file) => {
            formData.append("extra_images", file);
        });
        const url = `products/${id}/add_images`;
        return axiosClient(true).put(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    deleteExtraImages: (id: string, files: string[]) => {
        const url = `/products/${id}/delete_images`;
        return axiosClient(true).put(url, { image_ids: files });
    },
    getByCategory(params: ParamProduct) {
        const url = `/products/cb`;
        return axiosClient(false).get(url, { params });
    },
    getSale() {
        const url = "/products/sale";
        return axiosClient(false).get(url);
    },
};
