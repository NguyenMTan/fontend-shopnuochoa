import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/manage-products/column";
import DataTable from "@/components/table/data-table";
import { useDeleteProduct } from "@/hooks/query-products/useDeleteProduct";
import { useGetAllProducts } from "@/hooks/query-products/useGetAllProducts";
import useDebounce from "@/hooks/useDebouce";
import { useProductStore } from "@/store/useProductStore";
import React, { useState } from "react";

function ProductsPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { data, isLoading } = useGetAllProducts({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });

    const { modalDelete, setModalDelete, _id, name } = useProductStore();
    const mutation = useDeleteProduct();
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Quản lý sản phẩm</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                        link_create="/admin/products/create-product"
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
        </>
    );
}

export default ProductsPage;
