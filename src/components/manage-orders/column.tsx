import { ColumnDef } from "@tanstack/react-table";
import { Order } from "@/types/order.type";
import { useOrderStore } from "@/store/useOrderStore";
import { formatNumber, formatPrice } from "@/utils/common";
import { useUpdateStatusOrder } from "@/hooks/query-orders/useUpdateStatusOrder";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { IoEyeSharp } from "react-icons/io5";

export const columns: ColumnDef<Order>[] = [
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "address",
        header: "Địa chỉ",
    },
    {
        accessorKey: "phone_number",
        header: "Số điện thoại",
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Ngày đặt hàng
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            return (
                <h1 className="ml-6">
                    {new Date(row.original.created_at).toLocaleDateString()}
                </h1>
            );
        },
    },
    {
        accessorKey: "total",
        header: "Tổng tiền",
        cell: ({ row }) => {
            return <h1>{formatPrice(row.original.total)}</h1>;
        },
    },
    {
        accessorKey: "status",
        header: () => {
            return <h1 className="text-center">Thao tác</h1>;
        },
        cell: ({ row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusOrder();
            const { setModalDetail } = useOrderStore();

            const handleModalDetail = () => {
                setModalDetail(true, { _id: row.original._id });
            };

            const handleStatus = (valueStatus: string) => {
                mutation.mutate({ _id, status: valueStatus });
            };

            let currentStatus;
            switch (status) {
                case "waiting":
                    currentStatus = "Chờ xác nhận";
                    break;
                case "shipping":
                    currentStatus = "Đang giao";
                    break;
                case "success":
                    currentStatus = "Giao thành công";
                    break;
                case "false":
                    currentStatus = "Giao thất bại";
                    break;
            }

            return (
                <div className="flex gap-1 justify-center">
                    <Select
                        onValueChange={(valueStatus) =>
                            handleStatus(valueStatus)
                        }
                    >
                        <SelectTrigger
                            className={`w-[160px] font-semibold 
                                ${status === "waiting" && "bg-gray-300"} 
                                ${status === "shipping" && "bg-yellow-300"} 
                                ${status === "success" && "bg-green-300"} 
                                ${status === "false" && "bg-red-300"}`}
                        >
                            <SelectValue placeholder={currentStatus} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Chọn trạng thái</SelectLabel>
                                {status === "waiting" ? (
                                    <SelectItem value="shipping">
                                        Đang giao hàng
                                    </SelectItem>
                                ) : (
                                    <>
                                        <SelectItem value="success">
                                            Giao thành công
                                        </SelectItem>
                                        <SelectItem value="false">
                                            Giao thất bại
                                        </SelectItem>
                                    </>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <button
                        onClick={handleModalDetail}
                        className="flex justify-center items-center rounded-md bg-blue-400 text-white h-9 w-9"
                    >
                        <IoEyeSharp />
                    </button>
                </div>
            );
        },
    },
];
