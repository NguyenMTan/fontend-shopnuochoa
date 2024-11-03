import DataTable from "@/components/table/data-table";
import { useGetAllCategories } from "@/hooks/query-brands/useGetAllBrands";
import useDebounce from "@/hooks/useDebouce";
import React, { useState } from "react";
import { columns } from "@/components/manage-brands/column";
import { useBrandStore } from "@/store/useBrandStore";
import DialogDelete from "@/components/dialog-delete";
import { useDeleteBrand } from "@/hooks/query-brands/useDeleteBrand";
import DialogCreate from "@/components/manage-brands/dialog-create";
import DialogUpdate from "@/components/manage-brands/dialog-update";

function BrandsPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { modalDelete, setModalDelete, _id, name, setModalCreate } =
        useBrandStore();
    const mutation = useDeleteBrand();
    const { data, isLoading } = useGetAllCategories({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Quản lý thương hiệu</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                        setModalCreate={setModalCreate}
                    />
                )}
            </div>
            <DialogDelete
                open={modalDelete}
                name={name}
                _id={_id}
                mutation={mutation}
                setModalDelete={setModalDelete}
            />
            <DialogCreate />
            <DialogUpdate />
        </>
    );
}

export default BrandsPage;
