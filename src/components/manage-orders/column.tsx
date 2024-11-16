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
import { useState } from "react";

export const columns: ColumnDef<Order>[] = [
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
        header: "Địa chỉ",
    },
    {
        accessorKey: "phone_number",
        header: "Số điện thoại",
    },
    {
        accessorKey: "created_at",
        header: "Ngày đặt",
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
        header: "Trạng thái",
        cell: ({ row }) => {
            const { _id, status } = row.original;
            const mutation = useUpdateStatusOrder();

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
                <Select
                    onValueChange={(valueStatus) => handleStatus(valueStatus)}
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
            );
        },
    },
];
