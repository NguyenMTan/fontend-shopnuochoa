import React, { Dispatch, SetStateAction, useState } from "react";
import {
    ColumnDef,
    ExpandedState,
    flexRender,
    getCoreRowModel,
    getExpandedRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { ParamPagination } from "@/types/pagination.type";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    setKeyword: Dispatch<SetStateAction<string>>;
    keyword: string;
    link_create?: string;
    size?: number;
    setModalCreate?: (open: boolean) => void;
}

function DataTable<TData, TValue>({
    columns,
    data,
    setKeyword,
    keyword,
    link_create,
    size = 10,
    setModalCreate,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [expanded, setExpanded] = useState<ExpandedState>({});

    const table = useReactTable({
        data,
        columns,
        initialState: {
            columnVisibility: {
                _id: false,
            },
            pagination: {
                pageSize: size,
            },
        },
        state: {
            expanded,
            sorting,
        },
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        getSubRows: (row: any) => row.children,
        getCoreRowModel: getCoreRowModel(),
        getExpandedRowModel: getExpandedRowModel(),
        onExpandedChange: setExpanded,
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="flex justify-between">
                <div className="flex gap-2">
                    {link_create && (
                        <Link to={link_create}>
                            <Button>Tạo</Button>
                        </Link>
                    )}
                    {setModalCreate && (
                        <Button onClick={() => setModalCreate(true)}>
                            Tạo
                        </Button>
                    )}
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Thông tin{" "}
                                <ChevronDownIcon className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex gap-2">
                    <Input
                        onChange={(e) => setKeyword(e.target.value)}
                        value={keyword}
                        placeholder="tìm kiếm"
                        className="max-w-sm bg-white"
                    />
                    <Button>
                        <FaSearch className="mr-2" />
                        Tìm kiếm
                    </Button>
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="bg-black border border-black">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                className="hover:bg-black"
                                key={headerGroup.id}
                            >
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            className="text-white"
                                            key={header.id}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-white">
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    Kết quả không tìm thấy hoặc người dùng không
                                    đủ phân quyền.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div>
                <div className="space-x-2">
                    <Button
                        className="bg-black text-white"
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Trang trước
                    </Button>
                    <span>
                        <strong>
                            Trang hiện tại:{" "}
                            {table.getState().pagination.pageIndex + 1}
                        </strong>
                    </span>
                    <Button
                        className="bg-black text-white"
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Trang sau
                    </Button>
                </div>
            </div>
        </>
    );
}

export default DataTable;
