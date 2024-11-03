import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/manage-categories/column";
import DialogCreate from "@/components/manage-categories/dialog-create";
import { DialogUpdate } from "@/components/manage-categories/dialog-update";
import DataTable from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { useDeleteCategory } from "@/hooks/query-categories/useDeleteCategory";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import useDebounce from "@/hooks/useDebouce";
import { useCategoryStore } from "@/store/useCategoryStore";
import React, { useState } from "react";

function CategoriesPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);
    const { modalDelete, setModalDelete, _id, name, setModalCreate } =
        useCategoryStore();
    const mutation = useDeleteCategory();
    const { data, isLoading } = useGetAllCategories({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });
    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Quản lý danh mục</h1>
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <DataTable
                        data={data?.entities ?? []}
                        columns={columns}
                        setKeyword={setKeyword}
                        keyword={keyword}
                        size={7}
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

export default CategoriesPage;
