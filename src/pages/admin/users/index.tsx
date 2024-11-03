import DialogDelete from "@/components/dialog-delete";
import { columns } from "@/components/manage-users/column";
import DialogCreate from "@/components/manage-users/dialog-create";
import { DialogUpdate } from "@/components/manage-users/dialog-update";
import DataTable from "@/components/table/data-table";
import { useDeleteUser } from "@/hooks/query-users/useDeleteUser";
import { useGetAllUser } from "@/hooks/query-users/useGetAllUsers";
import useDebounce from "@/hooks/useDebouce";
import { useUserStore } from "@/store/useUserStore";
import React, { useState } from "react";

function UsersPage() {
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 2000);

    const { modalDelete, setModalDelete, _id, name, setModalCreate } =
        useUserStore();
    const mutation = useDeleteUser();

    const { data, isLoading } = useGetAllUser({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: debounced,
    });

    return (
        <>
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Quản lý người dùng</h1>
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

export default UsersPage;
