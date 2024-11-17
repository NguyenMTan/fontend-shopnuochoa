import { columns } from "@/components/manage-orders/column";
import ModalOrderDetail from "@/components/profile/modal-order-detail";
import DataTable from "@/components/table/data-table";
import { useGetAllOrders } from "@/hooks/query-orders/useGetAllOrders";
import useDebounce from "@/hooks/useDebouce";
import React, { useState } from "react";

function OrdersPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { data, isLoading } = useGetAllOrders({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Quản lý hóa đơn</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                        size={7}
                    />
                )}
            </div>
            <ModalOrderDetail />
        </>
    );
}

export default OrdersPage;
