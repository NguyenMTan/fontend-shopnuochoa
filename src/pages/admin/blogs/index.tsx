import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/mamage-blogs/column";
import DataTable from "@/components/table/data-table";
import { useDeleteBlog } from "@/hooks/query-blogs/useDeleteBlog";
import { useGetAllBlogs } from "@/hooks/query-blogs/useGetAllBlogs";
import useDebounce from "@/hooks/useDebouce";
import { useBlogStore } from "@/store/useBlogStory";
import { useState } from "react";

const BlogsPage = () => {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { modalDelete, setModalDelete, _id, name } = useBlogStore();
    const mutation = useDeleteBlog();

    const { data, isLoading } = useGetAllBlogs({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Manager Blogs</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                        link_create="/admin/blogs/create-blog"
                    />
                )}
            </div>
            <DialogDelete
                open={modalDelete}
                name={name}
                _id={_id}
                mutation={mutation}
                setModalDelete={setModalDelete}
            />
        </>
    );
};

export default BlogsPage;
