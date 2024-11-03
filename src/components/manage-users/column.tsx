import { User } from "@/types/user.type";
import { ColumnDef } from "@tanstack/react-table";
import { FaCheck } from "react-icons/fa";
import Actions from "../table/action";
import { useUpdateStatusUser } from "@/hooks/query-users/useUpdateStatusUser";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { ImBlocked } from "react-icons/im";
import { FaLock } from "react-icons/fa6";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<User>[] = [
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
        accessorKey: "Trạng thái",
        header: "Trạng thái",
        cell: ({ cell, row }) => {
            const { _id, status, role } = row.original;
            const mutation = useUpdateStatusUser();
            function handleStatus() {
                mutation.mutate({ _id, status: !status });
            }
            return !role.includes("ADMIN") ? (
                <Switch
                    checkedIcon={<FaCheck />}
                    unCheckedIcon={<FaLock />}
                    checked={status}
                    onCheckedChange={handleStatus}
                />
            ) : (
                <Button variant={"ghost"} disabled={true} size={"icon"}>
                    <ImBlocked />
                </Button>
            );
        },
    },
    {
        accessorKey: "Vai trò",
        header: "Vài trò",
        cell: ({ cell, row }) => {
            const { role } = row.original;
            return <h1>{role}</h1>;
        },
    },
    {
        accessorKey: "Tùy chỉnh",
        header: "Tùy chỉnh",
        cell: ({ cell, row }) => {
            const { _id, role, email } = row.original;
            const { setModalDelete, setModalUpdate } = useUserStore();

            return !role.includes("ADMIN") ? (
                <Actions
                    setModalDelete={setModalDelete}
                    setModalUpdate={setModalUpdate}
                    _id={_id}
                    name={email}
                />
            ) : (
                <Button variant={"ghost"} disabled={true} size={"icon"}>
                    <ImBlocked />
                </Button>
            );
        },
    },
];
