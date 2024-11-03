import { useBrandStore } from "@/store/useBrandStore";
import { Brand } from "@/types/brand.type";
import { ColumnDef } from "@tanstack/react-table";
import Actions from "../table/action";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { useUpdateStatusBrand } from "@/hooks/query-brands/useUpdateStatusBrand";
import { Switch } from "../ui/switch";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";

export const columns: ColumnDef<Brand>[] = [
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
                    Tên thương hiệu
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "Mô tả",
        header: "Mô tả",
        cell: ({ row }) => {
            return <h1>{row.original.description}</h1>;
        },
    },
    {
        accessorKey: "Trạng thái",
        header: "Trạng thái",
        cell: ({ cell, row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusBrand();
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
        accessorKey: "",
        header: "Thao tác",
        cell: ({ cell, row }) => {
            const { _id, name } = row.original;
            const { setModalDelete, setModalUpdate } = useBrandStore();
            return (
                <Actions
                    setModalDelete={setModalDelete}
                    _id={_id}
                    name={name}
                    setModalUpdate={setModalUpdate}
                />
            );
        },
    },
];
