import EmblaCarousel from "@/components/embla-carousel";
import RatingReview from "@/components/rating-review";
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
import { Textarea } from "@/components/ui/textarea";
import { useAddCart } from "@/hooks/query-cart/useAddCart";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useCreateReview } from "@/hooks/query-reviews/useCreateReview";
import { useFormCreateReview } from "@/hooks/query-reviews/useFormCreateReview";
import { useGetReviewByProduct } from "@/hooks/query-reviews/useGetReviewByProduct";
import useToastMessage from "@/hooks/useToastMessage";
import { calAvg, calSale, formatPrice } from "@/utils/common";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { z } from "zod";
import avataNoImage from "@/assets/thumb-no-image.png";
import ChatBox from "@/components/chatbox";

function ProductDetailPage() {
    const productId = useParams().id ?? "";
    const { data: product } = useGetProduct(productId ?? "");
    const { form, formSchema } = useFormCreateReview();
    const [quantity, setQuantity] = useState(1);
    const mutation = useAddCart();
    const mutationReview = useCreateReview();
    const { toastLoading } = useToastMessage();
    const { data: reviews } = useGetReviewByProduct(productId);

    function handleQuantity(quantity: number) {
        if (quantity > 0) {
            setQuantity(quantity);
        }
    }
    useEffect(() => {
        console.log(mutation.error);
    }, [mutation.error]);

    const handleAddCart = () => {
        mutation.mutate({ product_id: product?._id ?? "", quantity: quantity });
        setQuantity(1);
    };

    const handleCreateReview = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi...");
        form.reset();
        mutationReview.mutate({ ...data, product_id: productId });
    };

    return (
        <>
            <div className="container p-8 flex flex-col gap-2">
                <div className="flex w-[1170px] mx-auto justify-around min-h-[400px]">
                    <div className=" flex justify-center">
                        {product && <EmblaCarousel product={product} />}
                    </div>
                    <div className="w-[460px] text-lg flex flex-col gap-2">
                        <h1 className="text-3xl font-bold mb-2 ">
                            {product?.name}
                        </h1>
                        <div className="flex items-center gap-1 text-[14px]/[14px] text-gray-400">
                            <p>{reviews && calAvg(reviews)} </p>
                            <RatingReview
                                allowFraction
                                initialValue={calAvg(reviews ?? [])}
                                readonly
                                size={14}
                            />
                            <p className="mx-1">/</p>
                            <p>{reviews?.length} Lượt đánh giá</p>
                        </div>
                        <p className="text-[14px]/[14px] text-gray-400">
                            Số lượng: {product?.stock}
                        </p>
                        {product?.sale ? (
                            <div className="flex flex-col gap-2 ">
                                <div className="flex">
                                    <p>Giá gốc: </p>
                                    <p className="line-through">
                                        {formatPrice(product?.price ?? 0)}
                                    </p>
                                </div>
                                <div>
                                    <p className="font-semibold text-[20px] text-red-500">
                                        Giá giảm:{" "}
                                        {formatPrice(
                                            calSale(
                                                product?.price ?? 0,
                                                product?.sale ?? 0
                                            )
                                        )}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-1">
                                <p className="font-semibold text-[20px]">
                                    Giá gốc:{" "}
                                    {formatPrice(
                                        calSale(
                                            product?.price ?? 0,
                                            product?.sale ?? 0
                                        )
                                    )}
                                </p>
                            </div>
                        )}

                        <div className="flex items-center mt-4">
                            <Button
                                className="rounded-r-none"
                                onClick={() => handleQuantity(quantity - 1)}
                                size={"icon"}
                            >
                                -
                            </Button>
                            <Input
                                className="w-14 text-center rounded-none"
                                onChange={(e) =>
                                    handleQuantity(+e.target.value)
                                }
                                value={quantity}
                            />
                            <Button
                                className="rounded-l-none"
                                onClick={() => handleQuantity(quantity + 1)}
                                size={"icon"}
                            >
                                +
                            </Button>
                        </div>
                        {product?.status ? (
                            <Button
                                className="mt-2 h-10 hover:bg-yellow-300 hover:text-black active:bg-yellow-500"
                                onClick={handleAddCart}
                                size={"sm"}
                            >
                                Thêm giỏ hàng
                            </Button>
                        ) : (
                            <Button
                                disabled
                                className="mt-2 h-10 hover:bg-yellow-300 hover:text-black active:bg-yellow-500"
                                onClick={handleAddCart}
                                size={"sm"}
                            >
                                Sản phẩm đã bị khóa
                            </Button>
                        )}
                    </div>
                </div>
                <div className="w-[1170px] mx-auto">
                    <div
                        className="w-full mt-4"
                        dangerouslySetInnerHTML={{
                            __html: product?.description ?? "",
                        }}
                    />
                </div>
                <div className="w-[1170px] mx-auto">
                    <Form {...form}>
                        <form
                            autoComplete="off"
                            className="border rounded-lg p-4 mt-10 mx-auto"
                            onSubmit={form.handleSubmit(handleCreateReview)}
                        >
                            <h2 className="text-[20px] font-medium m-2">
                                Đánh giá sản phẩm
                            </h2>
                            <FormField
                                control={form.control}
                                name="point"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="m-2 text-[14px]">
                                            Cho điểm chất lượng:
                                        </FormLabel>
                                        <FormControl>
                                            <RatingReview
                                                size={24}
                                                onClick={(e) =>
                                                    field.onChange(e)
                                                }
                                                showTooltip
                                                tooltipDefaultText="Đánh giá của bạn"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="comment"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="m-2 text-[14px]">
                                            Viết đánh giá:
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                className="w-[90%] mx-auto"
                                                {...field}
                                                rows={2}
                                                placeholder="Nêu cảm nhận của bạn về sản phẩm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="w-full flex justify-end pr-11">
                                <button className="h-[36px] w-[120px] bg-black text-white mt-2 rounded-lg hover:bg-yellow-300 hover:text-black active:bg-yellow-500">
                                    Đánh giá
                                </button>
                            </div>
                        </form>
                    </Form>
                </div>
                <div className="w-[1170px] mx-auto mt-2 p-4 border rounded-lg">
                    <h2 className="font-medium text-[20px]">
                        Đánh giá của người dùng
                    </h2>
                    {reviews?.map((review) => (
                        <div
                            key={review._id}
                            className="p-4 border rounded-lg my-2"
                        >
                            <div className="w-full flex items-center justify-between">
                                <div className="flex gap-2 items-center">
                                    <img
                                        src={
                                            review.customer_id.image_url === ""
                                                ? avataNoImage
                                                : review.customer_id.image_url
                                        }
                                        className="h-10 w-10 rounded-full"
                                        alt=""
                                    />
                                    <h3 className="font-medium">
                                        {review.customer_id.name}
                                    </h3>
                                </div>
                                <RatingReview
                                    readonly
                                    initialValue={review.point}
                                    size={20}
                                />
                            </div>
                            <p className="mt-2">{review.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
            <ChatBox />
        </>
    );
}

export default ProductDetailPage;
