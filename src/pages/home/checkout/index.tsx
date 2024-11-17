import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCheckout } from "@/hooks/query-cart/useCheckout";
import { useFormCheckout } from "@/hooks/query-cart/useFormCheckout";
import { useGetCart } from "@/hooks/query-cart/useGetCart";
import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import {
    calSale,
    formatPrice,
    totalItems,
    totalItemsNoSale,
} from "@/utils/common";
import React, { useEffect } from "react";
import { z } from "zod";

function CheckoutPage() {
    const { form, formSchema } = useFormCheckout();
    const { data: cart } = useGetCart();
    const { data: customer } = useGetMeCustomer();
    const mutation = useCheckout();
    const { toastLoading } = useToastMessage();

    useEffect(() => {
        form.setValue("address", customer?.address ?? "");
        form.setValue("email", customer?.email ?? "");
        form.setValue("phone_number", customer?.phone_number ?? "");
    }, [customer]);

    function handleCheckout(data: z.infer<typeof formSchema>) {
        toastLoading("Vui lòng đợi");
        mutation.mutate(data);
    }

    return (
        <div className="w-full bg-[#eee] min-h-[627px]">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCheckout)}
                    className="flex justify-between w-[92%] mt-14 mx-auto"
                >
                    <div className="w-[68%] h-full">
                        <h2 className="text-[38px]/[38px] font-medium">
                            Thanh toán
                        </h2>
                        <div className="w-full bg-white p-5 rounded-2xl shadow-lg mt-4">
                            <h2 className="text-[20px] font-medium">
                                Nhập thông tin của bạn
                            </h2>
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Địa chỉ nhận hàng:
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Địa chỉ"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email:</FormLabel>
                                        <FormControl>
                                            <Input
                                                disabled
                                                {...field}
                                                placeholder="Email"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Số điện thoại:</FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Địa chỉ"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <p className="text-[14px]/[14px] font-medium my-2">
                                Phương thức thanh toán:
                            </p>
                            <Input
                                disabled
                                value={"Thanh toán khi nhận hàng"}
                            />
                        </div>
                    </div>
                    <div className="sticky z-10 top-[158px] w-[29%] h-[400px] bg-white rounded-2xl p-5">
                        <h2 className="text-[20px] font-medium">
                            Tóm tắt hóa đơn
                        </h2>
                        <ScrollArea className="h-[200px] border-b">
                            {cart?.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between my-1"
                                >
                                    <h2 className="w-[200px] text-[16px]/[16px]">
                                        {item.product_id.name}
                                    </h2>
                                    <p>
                                        {formatPrice(
                                            calSale(
                                                item.product_id.price,
                                                item.product_id.sale
                                            ) * item.quantity
                                        )}
                                    </p>
                                </div>
                            ))}
                        </ScrollArea>
                        <div className="border-b py-1">
                            <div className="flex items-center justify-between">
                                <p>Tổng giá sản phẩm:</p>
                                <p>{formatPrice(totalItems(cart ?? []))}</p>
                            </div>
                            <div className="flex items-center justify-between">
                                <p>Phí ship:</p>
                                <p>{formatPrice(30000)}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between py-1">
                            <p>Thành tiền:</p>
                            <p>{formatPrice(totalItems(cart ?? []) + 30000)}</p>
                        </div>
                        <Button className="w-full mt-2 hover:bg-yellow-300 hover:text-black active:bg-yellow-500">
                            Thanh toán
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default CheckoutPage;
