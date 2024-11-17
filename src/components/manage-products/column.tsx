import { useProductStore } from "@/store/useProductStore";
import { Product } from "@/types/product.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/action";
import { useUpdateStatusProduct } from "@/hooks/query-products/useUpdateStatusProduct";
import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { formatNumber, formatPrice } from "@/utils/common";
import noImage from "@/assets/thumb-no-image.png";

export const columns: ColumnDef<Product>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Tên sản phẩm
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "Ảnh",
        header: "Ảnh chính",
        cell: ({ row }) => {
            const { image_url } = row.original;

            return (
                <img
                    className="w-10 h-10 object-cover"
                    src={image_url === "" ? noImage : image_url}
                    alt=""
                />
            );
        },
    },
    {
        accessorKey: "Trạng thái",
        header: "Trạng thái",
        cell: ({ cell, row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusProduct();
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
    {
        accessorKey: "Giá",
        header: "Giá sản phẩm",
        cell: ({ row }) => {
            return <h1>{formatPrice(row.original.price)}</h1>;
        },
    },
    {
        accessorKey: "Kho",
        header: "Kho",
        cell: ({ row }) => {
            return <h1>{formatNumber(row.original.stock)}</h1>;
        },
    },
    {
        accessorKey: "",
        header: "Thao tác",
        cell: ({ cell, row }) => {
            const { _id, name } = row.original;
            const { setModalDelete } = useProductStore();

            return (
                <Actions
                    setModalDelete={setModalDelete}
                    _id={_id}
                    name={name}
                    link_update={`/admin/products/${_id}`}
                />
            );
        },
    },
];
