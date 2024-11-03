import { Button } from "@/components/ui/button";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useDeleteProductCart } from "@/hooks/query-cart/useDeleteProductCart";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import {
    calSale,
    formatPrice,
    totalItems,
    totalItemsNoSale,
} from "@/utils/common";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TiDelete } from "react-icons/ti";
import { RiDeleteBack2Fill } from "react-icons/ri";
import thumbNoImage from "@/assets/thumb-no-image.png";

function CartPage() {
    const { data: cart } = useGetCart();
    const navigate = useNavigate();
    const mutationAddCart = useAddCart();
    const mutationDeleteCart = useDeleteProductCart();

    function handleQuantity(product_id: string, quantity: number) {
        mutationAddCart.mutate({ product_id, quantity });
    }

    function handleDeleteCart(id: string) {
        mutationDeleteCart.mutate(id);
    }

    return (
        <div className="w-full bg-[#eee] min-h-[627px]">
            <div className="flex justify-between w-[92%] mt-14 mx-auto">
                <div className="w-[68%] h-full">
                    <h2 className="text-[38px]/[38px] font-medium">Giỏ hàng</h2>
                    <p className="mt-2 mb-4">
                        Có {cart?.length} sản phẩm trong giỏ hàng
                    </p>
                    <table className="w-full shadow-2xl rounded-2xl bg-white">
                        <thead>
                            <th className="p-2">Sản phẩm</th>
                            <th className="p-2">Giá</th>
                            <th className="p-2">Số lượng</th>
                            <th className="p-2">Tổng cộng</th>
                            <th></th>
                        </thead>
                        {cart?.map((item) => (
                            <tr
                                key={item._id}
                                className="border-t border-[#ccc]"
                            >
                                <td className="p-4">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={
                                                item.product_id.image_url === ""
                                                    ? thumbNoImage
                                                    : item.product_id.image_url
                                            }
                                            className="w-[165px] h-[180px] rounded-lg object-cover"
                                            alt=""
                                        />
                                        <div>
                                            <h2 className="text-[18px]/[18px] font-medium">
                                                {item.product_id.name}
                                            </h2>
                                            <p className="text-[14px]/[14px] font-light mt-4">
                                                {
                                                    item.product_id
                                                        .short_description
                                                }
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="w-1/12">
                                    <p>
                                        {formatPrice(
                                            calSale(
                                                item.product_id.price,
                                                item.product_id.sale
                                            )
                                        )}
                                    </p>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <Button
                                            onClick={() =>
                                                handleQuantity(
                                                    item.product_id._id,
                                                    -1
                                                )
                                            }
                                            size={"icon"}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">
                                            {item.quantity}
                                        </span>
                                        <Button
                                            onClick={() =>
                                                handleQuantity(
                                                    item.product_id._id,
                                                    1
                                                )
                                            }
                                            size={"icon"}
                                        >
                                            +
                                        </Button>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <p>
                                            {formatPrice(
                                                calSale(
                                                    item.product_id.price,
                                                    item.product_id.sale
                                                ) * item.quantity
                                            )}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex justify-center items-center">
                                        <button
                                            onClick={() =>
                                                handleDeleteCart(
                                                    item.product_id._id
                                                )
                                            }
                                        >
                                            <RiDeleteBack2Fill className="h-8 w-8" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
                <div className="sticky z-10 top-[158px] w-[29%] h-[300px] bg-white rounded-2xl p-5">
                    <h2 className="text-[28px] font-semibold ">
                        Chi tiết giỏ hàng
                    </h2>
                    <div className="flex mt-2 justify-between items-center">
                        <p>Tổng giá gốc sản phẩm:</p>
                        <p>{formatPrice(totalItemsNoSale(cart ?? []))}</p>
                    </div>
                    <div className="flex mt-2 justify-between items-center">
                        <p>Tổng giá sản phẩm đã giảm giá:</p>
                        <p>{formatPrice(totalItems(cart ?? []))}</p>
                    </div>
                    <div className="flex mt-2 justify-between items-center">
                        <p>Phí ship:</p>
                        <p>{formatPrice(30000)}</p>
                    </div>
                    <div className="flex border-t border-[#aaa] pt-2 mt-2 justify-between items-center">
                        <p>Tổng cộng:</p>
                        <p>{formatPrice(totalItems(cart ?? []) + 30000)}</p>
                    </div>
                    <div>
                        {cart && cart.length > 0 ? (
                            <button
                                onClick={() => navigate("/place-order")}
                                className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-yellow-300 hover:text-black active:bg-yellow-500"
                            >
                                Thanh Toán
                            </button>
                        ) : (
                            <button
                                onClick={() => navigate("/products")}
                                className="mt-6 w-full bg-black text-white py-2 rounded-lg hover:bg-yellow-300 hover:text-black active:bg-yellow-500"
                            >
                                Tìm Hàng
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
