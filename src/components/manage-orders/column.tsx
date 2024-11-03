import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order.type";
import { useOrderStore } from "@/store/useOrderStore";
import { formatNumber, formatPrice } from "@/utils/common";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "_id",
        header: "ID",
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => {
            const { setModalDetail } = useOrderStore();
            const handleModalDetail = () => {
                setModalDetail(true, { _id: row.original._id });
            };
            return (
                <h1
                    onClick={handleModalDetail}
                    className="cursor-pointer hover:text-orange-500"
                >
                    {row.original.email}
                </h1>
            );
        },
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "phone_number",
        header: "Phone number",
    },
    {
        accessorKey: "created_at",
        header: "Date",
    },
    {
        accessorKey: "total",
        header: "Total",
        cell: ({ row }) => {
            return <h1>{formatPrice(row.original.total)}</h1>;
        },
    },
];
