import { useGetBlog } from "@/hooks/query-blogs/useGetBlog";
import { useParams } from "react-router-dom";

function BlogDetailPage() {
    const _id = useParams().id ?? "";
    const { data: blog } = useGetBlog(_id);

    return (
        <div className="mt-6 p-4 w-[1170px] mx-auto flex flex-col gap-4">
            <h1 className="text-3xl text-center font-bold">{blog?.title}</h1>
            <div className="w-full flex justify-center mt-5">
                <img
                    src={blog?.image_url}
                    className="w-full h-[500px] object-cover rounded-lg"
                    alt=""
                />
            </div>
            <div
                className="w-full"
                dangerouslySetInnerHTML={{ __html: blog?.content ?? "" }}
            />
            <div className="flex gap-2 mt-16 justify-end items-center">
                <h2>Người viết: {blog?.created_by}</h2>
                {blog && (
                    <h2>{new Date(blog?.created_at).toLocaleDateString()}</h2>
                )}
            </div>
        </div>
    );
}

export default BlogDetailPage;
