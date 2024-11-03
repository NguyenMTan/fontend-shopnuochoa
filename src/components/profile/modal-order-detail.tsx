import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { useGetOrder } from "@/hooks/query-orders/useGetOrder";
import { useOrderStore } from "@/store/useOrderStore";
import { calSale, formatPrice } from "@/utils/common";

function ModalOrderDetail() {
    const { modalDetail, setModalDetail, _id } = useOrderStore();

    const { data: order } = useGetOrder(_id);

    return (
        <Dialog open={modalDetail} onOpenChange={setModalDetail}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Chi tiết hoá đơn: {_id}</DialogTitle>
                </DialogHeader>
                <div className="flex gap-4 flex-col">
                    {order?.order_detail.map((item: any) => (
                        <div key={item._id} className="flex gap-4 text-sm">
                            <img
                                src={item.product_id?.image_url}
                                alt="error"
                                width={100}
                            />
                            <div className="flex flex-col gap-2">
                                <h1>{item.product_id?.name}</h1>
                                <h1>Số lượng: {item.quantity}</h1>
                                <h1 className="">
                                    Giá tiền:{" "}
                                    {formatPrice(
                                        calSale(
                                            item.product_id?.price,
                                            item.product_id?.sale
                                        )
                                    )}
                                </h1>
                            </div>
                            <div className="ml-auto ">
                                Tổng tiền:{" "}
                                {formatPrice(
                                    calSale(
                                        item.product_id?.price,
                                        item.product_id?.sale
                                    ) * item?.quantity
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ModalOrderDetail;
