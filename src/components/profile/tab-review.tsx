import React from "react";
import { TabsContent } from "../ui/tabs";
import { useGetMeReview } from "@/hooks/query-reviews/useGetMeReview";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteReview } from "@/hooks/query-reviews/useDeleteReview";
import useToastMessage from "@/hooks/useToastMessage";

interface TabReviewProps {
    value: string;
    form?: any;
}

function TabReview(props: TabReviewProps) {
    const { data: reviews } = useGetMeReview();
    const mutation = useDeleteReview();
    const { toastLoading } = useToastMessage();
    const handleDeleteReview = (id: string) => {
        toastLoading("Vui lòng đợi");
        mutation.mutate(id);
    };
    return (
        <TabsContent
            value={props.value}
            className="flex flex-col items-center gap-2 w-full max-h-[455px]"
        >
            <Table className="border">
                <TableHeader className="bg-black sticky top-0">
                    <TableRow className="">
                        <TableHead className="text-white w-[30%]">
                            Tên sản phẩm
                        </TableHead>
                        <TableHead className="text-white w-[40%] text-center">
                            Đánh giá
                        </TableHead>
                        <TableHead className="text-white w-[15%] text-center">
                            Điểm số
                        </TableHead>
                        <TableHead className="text-white text-center w-[15%]">
                            Thao tác
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="bg-white">
                    {reviews?.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell className="font-medium text-[14px]/[14px]">
                                {item.product_id === null ? (
                                    <p className="text-red-500">
                                        Sản phẩm này đã bị xóa
                                    </p>
                                ) : (
                                    item.product_id.name
                                )}
                            </TableCell>
                            <TableCell className="line-clamp-3 text-[14px]/[14px]">
                                {item.comment}
                            </TableCell>
                            <TableCell className="text-center text-[14px]/[14px]">
                                {item.point}
                            </TableCell>
                            <TableCell className="text-center">
                                <button
                                    onClick={() => handleDeleteReview(item._id)}
                                    className="border p-2 rounded-lg bg-red-500 hover:bg-red-400"
                                >
                                    <AiFillDelete className="text-white" />
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow className="sticky bottom-0 bg-black text-white hover:text-white hover:bg-black">
                        <TableCell colSpan={2}>Tổng số lần đánh giá</TableCell>
                        <TableCell colSpan={2} className="text-right">
                            {reviews?.length} lượt đánh giá
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </TabsContent>
    );
}

export default TabReview;
