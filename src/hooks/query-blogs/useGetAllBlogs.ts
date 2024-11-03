import { blogsApi } from "@/api/blogs-api";
import { Blog } from "@/types/blog.type";
import { ParamPagination, ResponsePagination } from "@/types/pagination.type";
import { useQuery } from "@tanstack/react-query";

export const useGetAllBlogs = (params: ParamPagination) => {
    return useQuery<ResponsePagination<Blog>>({
        queryKey: ["blogs", params.keyword],
        queryFn: async () => {
            return (await blogsApi.getAll(params)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
