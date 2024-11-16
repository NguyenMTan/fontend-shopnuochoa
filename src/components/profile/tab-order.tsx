import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { TabsContent } from "@/components/ui/tabs";
import { useGetOrderMe } from "@/hooks/query-orders/useGetOrderMe";
import { useOrderStore } from "@/store/useOrderStore";
import { formatPrice } from "@/utils/common";
import ModalOrderDetail from "./modal-order-detail";

interface TabOrderProps {
    value: string;
}

function TabOrder(props: TabOrderProps) {
    const { data: orders } = useGetOrderMe();
    const { setModalDetail } = useOrderStore();

    let total = 0;
    orders?.forEach((item) => {
        total += item.total;
    });

    function handleModalDetail(id: string) {
        setModalDetail(true, { _id: id });
    }

    return (
        <>
            <TabsContent
                value={props.value}
                className="flex flex-col items-center gap-2 w-full max-h-[455px] mt-0"
            >
                <Table className="border">
                    <TableHeader className="bg-black sticky top-0">
                        <TableRow className="">
                            <TableHead className="text-white ">
                                Trạng thái đơn hàng
                            </TableHead>
                            <TableHead className="text-white">
                                Địa chỉ
                            </TableHead>
                            <TableHead className="text-white">
                                Số điện thoại
                            </TableHead>
                            <TableHead className="text-white">
                                Ngày thanh toán
                            </TableHead>
                            <TableHead className="text-white text-right">
                                Tổng tiền
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="bg-white">
                        {orders?.map((item) => (
                            <TableRow
                                onClick={() => handleModalDetail(item._id)}
                                key={item._id}
                                className={`cursor-pointer hover:bg-gray-300 active:bg-gray-400`}
                            >
                                <TableCell className="font-medium">
                                    {item.status === "waiting" && (
                                        <div className="bg-gray-200 p-1 flex justify-center items-center rounded-full w-[70%]">
                                            Chờ xác nhận
                                        </div>
                                    )}
                                    {item.status === "shipping" && (
                                        <div className="bg-yellow-300 p-1 flex justify-center items-center rounded-full w-[70%]">
                                            Đang giao
                                        </div>
                                    )}
                                    {item.status === "success" && (
                                        <div className="bg-green-300 p-1 flex justify-center items-center rounded-full w-[70%]">
                                            Giao thành công
                                        </div>
                                    )}
                                    {item.status === "false" && (
                                        <div className="bg-red-300 p-1 flex justify-center items-center rounded-full w-[70%]">
                                            Giao thất bại
                                        </div>
                                    )}
                                </TableCell>
                                <TableCell>{item.address}</TableCell>
                                <TableCell>{item.phone_number}</TableCell>
                                <TableCell>
                                    {new Date(
                                        item.created_at
                                    ).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="text-right">
                                    {formatPrice(item.total)}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow className="sticky bottom-0 bg-black text-white hover:text-black hover:bg-yellow-500">
                            <TableCell colSpan={4}>Tổng tiền đã mua</TableCell>
                            <TableCell className="text-right">
                                {formatPrice(total)}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TabsContent>
            <ModalOrderDetail />
        </>
    );
}

export default TabOrder;
