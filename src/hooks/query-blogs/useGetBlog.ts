import { blogsApi } from "@/api/blogs-api";
import { Blog } from "@/types/blog.type";
import { useQuery } from "@tanstack/react-query";

export const useGetBlog = (id: string) => {
    return useQuery<Blog>({
        queryKey: ["blog", id],

        queryFn: async () => {
            return (await blogsApi.getOne(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
