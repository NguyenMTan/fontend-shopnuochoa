export type Blog = {
    _id: string;
    title: string;
    content: string;
    created_at: string;
    created_by: string;
    image_id: string;
    image_url: string;
};

export type CreateBlog = Omit<
    Blog,
    "_id" | "created_at" | "image_id" | "image_url"
> & {
    main_image: File | null;
};

export type UpdateBlog = Omit<CreateBlog, "main_image">;
