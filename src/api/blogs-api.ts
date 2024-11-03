import { CreateBlog, UpdateBlog } from "@/types/blog.type";
import { ParamPagination } from "@/types/pagination.type";
import axiosClient from "./axios-client";

export const blogsApi = {
    getAll(params: ParamPagination) {
        const url = "/blogs";
        return axiosClient(false).get(url, { params });
    },
    create(body: CreateBlog) {
        const url = "/blogs";
        const formData = new FormData();

        formData.append("title", body.title);
        formData.append("content", body.content);
        formData.append("created_by", body.created_by);

        if (body.main_image) {
            formData.append("main_image", body.main_image);
        }

        return axiosClient(true).post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    getOne(id: string) {
        const url = `/blogs/${id}`;
        return axiosClient(false).get(url);
    },
    deleteOne(id: string) {
        const url = `/blogs/${id}`;
        return axiosClient(true).delete(url);
    },
    updateOne(id: string, body: UpdateBlog) {
        const url = `/blogs/${id}`;
        return axiosClient(true).put(url, body);
    },

    updateImage: (id: string, file: File, config: any) => {
        const formData = new FormData();
        formData.append("main_image", file);
        const url = `/blogs/${id}/main_image`;
        return axiosClient(true).put(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
};
