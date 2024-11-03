import Actions from "@/components/table/action";
import { useBlogStore } from "@/store/useBlogStory";
import { Blog } from "@/types/blog.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Blog>[] = [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "image_url",
        header: "ảnh chính",
        cell: ({ row }) => {
            const { image_url } = row.original;

            return (
                <img
                    className="w-10 h-10 object-cover"
                    src={image_url}
                    alt=""
                />
            );
        },
    },
    {
        accessorKey: "title",
        header: "Tiêu đề",
    },
    {
        accessorKey: "created_at",
        header: "Ngày tạo",
    },
    {
        accessorKey: "created_by",
        header: "Người tạo",
    },

    {
        accessorKey: "",
        header: "actions",
        cell: ({ cell, row }) => {
            const { _id, title } = row.original;
            const { setModalDelete } = useBlogStore();

            return (
                <Actions
                    link_update={`/admin/blogs/${_id}`}
                    setModalDelete={setModalDelete}
                    _id={_id}
                    name={title}
                />
            );
        },
    },
];
