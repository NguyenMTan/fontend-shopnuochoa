import { columns } from "@/components/manage-customers/column";
import DataTable from "@/components/table/data-table";
import { useGetAllCustomers } from "@/hooks/query-customers/useGetAllCustomer";
import useDebounce from "@/hooks/useDebouce";
import React, { useState } from "react";

function CustomersPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { data, isLoading } = useGetAllCustomers({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Manager Customers</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                    />
                )}
            </div>
        </>
    );
}

export default CustomersPage;
