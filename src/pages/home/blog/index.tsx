import { useGetAllBlogs } from "@/hooks/query-blogs/useGetAllBlogs";
import React from "react";
import { Link } from "react-router-dom";

function BlogHomePage() {
    const { data: blogs } = useGetAllBlogs({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: "",
    });
    return (
        <div className="p-4 w-[1170px] mx-auto ">
            <h1 className="text-3xl font-bold">Tin tức mới nhất về nước hoa</h1>
            <div className="flex flex-col gap-5 mt-4 w-full">
                {blogs?.entities?.map((blog) => (
                    <Link key={blog._id} to={`/blogs/${blog._id}`}>
                        <div className="flex w-full gap-4 border rounded-xl p-2 shadow-lg hover:shadow-xl">
                            <img
                                className="object-cover h-[200px] rounded-lg"
                                src={blog.image_url}
                                width={300}
                            ></img>

                            <div className="flex flex-col gap-2 ">
                                <div>
                                    <h1 className="w-[800px] line-clamp-2 text-2xl font-bold">
                                        {blog.title}
                                    </h1>

                                    <div
                                        className="w-[800px] line-clamp-4"
                                        dangerouslySetInnerHTML={{
                                            __html: blog.content,
                                        }}
                                    />
                                </div>
                                <div className="flex gap-5 items-center">
                                    <p className="text-sm">
                                        Bởi: {blog.created_by}
                                    </p>
                                    <p>
                                        {new Date(
                                            blog.created_at
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default BlogHomePage;
