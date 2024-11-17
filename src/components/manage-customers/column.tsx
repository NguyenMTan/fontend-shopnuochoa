import { useUpdateStatusCustomer } from "@/hooks/query-customers/useUpdateStatusCustomer";
import { Customer } from "@/types/customer.type";
import { ColumnDef } from "@tanstack/react-table";
import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import noAvatar from "@/assets/thumb-no-image.png";

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "Tên",
        header: "Tên",
        cell: ({ row }) => {
            return <h1>{row.original.name}</h1>;
        },
    },
    {
        accessorKey: "Số điệ thoại",
        header: "Số điện thoại",
        cell: ({ row }) => {
            return <h1>{row.original.phone_number}</h1>;
        },
    },
    {
        accessorKey: "image_url",
        header: "Ảnh đại diện",
        cell: ({ row }) => {
            const { image_url } = row.original;

            return (
                <img
                    className="w-10 h-10 object-cover"
                    src={image_url === "" ? noAvatar : image_url}
                    alt=""
                />
            );
        },
    },
    {
        accessorKey: "status",
        header: "Trạng thái",
        cell: ({ cell, row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusCustomer();
            function handleStatus() {
                mutation.mutate({ _id, status: !status });
            }
            return (
                <Switch
                    checkedIcon={<FaCheck />}
                    unCheckedIcon={<RxCross2 />}
                    checked={status}
                    onCheckedChange={handleStatus}
                />
            );
        },
    },
];
