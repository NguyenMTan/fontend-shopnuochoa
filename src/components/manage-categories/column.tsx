import Actions from "../table/action";
import { FaCheck } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { Switch } from "../ui/switch";
import { useUserStore } from "@/store/useUserStore";
import { Category } from "@/types/category.type";
import { ColumnDef } from "@tanstack/react-table";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useUpdateStatusCategory } from "@/hooks/query-categories/useUpdateStatusCategory";
import { FaChevronRight } from "react-icons/fa6";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

export const columns: ColumnDef<Category>[] = [
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
                    Tên danh mục
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row, getValue }) => (
            <div>
                {row.getCanExpand() ? (
                    <button
                        {...{
                            onClick: row.getToggleExpandedHandler(),
                            style: {
                                cursor: "pointer",
                            },
                        }}
                    >
                        {row.getIsExpanded() ? (
                            <AiFillCaretDown className="mr-3" />
                        ) : (
                            <AiFillCaretRight className="mr-3" />
                        )}
                    </button>
                ) : (
                    <div></div>
                )}{" "}
                {getValue<boolean>()}
            </div>
        ),
    },
    {
        accessorKey: "Trạng thái",
        header: "Trạng thái",
        cell: ({ cell, row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusCategory();
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
        accessorKey: "Tùy chỉnh",
        header: "Tùy chỉnh",
        cell: ({ cell, row }) => {
            const { _id, name } = row.original;
            const { setModalDelete, setModalUpdate } = useCategoryStore();

            return (
                <Actions
                    setModalDelete={setModalDelete}
                    setModalUpdate={setModalUpdate}
                    _id={_id}
                    name={name}
                />
            );
        },
    },
];
