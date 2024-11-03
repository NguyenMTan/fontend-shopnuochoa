import ImageDeleteIcon from "@/components/image-delete-icon";
import Tiptap from "@/components/tiptap/tiptap-editer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useGetAllNameBrands } from "@/hooks/query-brands/useGetAllNameBrands";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllNameCategories";
import { useUpdateCategory } from "@/hooks/query-categories/useUpdateCategory";
import { useAddExtraImage } from "@/hooks/query-products/useAddExtraImage";
import { useChangeImage } from "@/hooks/query-products/useChangeImage";
import { useCreateProduct } from "@/hooks/query-products/useCreateProduct";
import { useDeleteExtraImages } from "@/hooks/query-products/useDeleteExtraImage";
import { useFormCreateProduct } from "@/hooks/query-products/useFormCreateProduct";
import { useGetProduct } from "@/hooks/query-products/useGetProduct";
import { useUpdateProduct } from "@/hooks/query-products/useUpdateProduct";
import useToastMessage from "@/hooks/useToastMessage";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { z } from "zod";

function UpdateProductPage() {
    const id = useParams().id ?? "";
    const [activeTab, setActiveTab] = useState("info");
    const { form, formSchema } = useFormCreateProduct();
    const { data: categories } = useGetAllNameCategories();
    const { data: brands } = useGetAllNameBrands();
    const [image, setImage] = useState<File>();
    const mutationImage = useChangeImage();
    const { toastLoading } = useToastMessage();
    const [extraImages, setExtraImages] = useState<File[]>([]);
    const mutationAddExtraImage = useAddExtraImage();
    const mutationDeleteExtraImage = useDeleteExtraImages();

    const { data: product } = useGetProduct(id);

    useEffect(() => {
        form.setValue("name", product?.name ?? "");
        form.setValue("status", product?.status ?? true);
        form.setValue("price", product?.price ?? 0);
        form.setValue("cost", product?.cost ?? 0);
        form.setValue("sale", product?.sale ?? 0);
        form.setValue("stock", product?.stock ?? 0);
        form.setValue("category_id", product?.category_id ?? "");
        form.setValue("brand_id", product?.brand_id ?? "");
        form.setValue("description", product?.description ?? "");
        form.setValue("short_description", product?.short_description ?? "");
    }, [product]);

    const mutation = useUpdateProduct();

    const handleCreate = (values: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ id, data: values });
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        toastLoading("Vui lòng đợi!");
        file && mutationImage.mutate({ id, data: file });
        setImage(file);
    };

    const handleDeleteExtraImages = (productId: string, imageId: string) => {
        toastLoading("Vui lòng đợi");
        mutationDeleteExtraImage.mutate({ id: productId, data: [imageId] });
    };

    const handleAddExtraImages = (e: ChangeEvent<HTMLInputElement>) => {
        toastLoading("Vui lòng đợi");
        const files = e.target.files;
        files && mutationAddExtraImage.mutate({ id, data: Array.from(files) });
        e.target.value = "";
    };

    return (
        <div className="flex flex-col gap-4 ">
            <h1 className="text-2xl font-bold">Cập nhật sản phẩm</h1>{" "}
            <Link to={"/admin/products"}>
                <Button className="flex gap-2">
                    <IoMdArrowRoundBack /> Quay lại
                </Button>
            </Link>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCreate)}
                    className="flex flex-col gap-2 bg-white p-2 rounded-md relative"
                >
                    <div className="w-full flex gap-2">
                        <div className="w-1/2">
                            <div className="flex gap-2">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem className="relative w-1/2">
                                            <FormLabel className="absolute left-2 bg-white px-1">
                                                Tên sản phẩm
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="short_description"
                                    render={({ field }) => (
                                        <FormItem className="relative w-1/2">
                                            <FormLabel className="absolute left-2 bg-white px-1">
                                                Mô tả ngắn
                                            </FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <FormField
                                    control={form.control}
                                    name="cost"
                                    render={({ field }) => (
                                        <FormItem className="relative w-1/2">
                                            <FormLabel className="absolute left-2 bg-white px-1">
                                                Giá gốc
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            +event.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="price"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2 relative">
                                            <FormLabel className="absolute left-2 bg-white">
                                                Giá tiền
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            +event.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <FormField
                                    control={form.control}
                                    name="sale"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2 relative">
                                            <FormLabel className="absolute left-2 bg-white px-1">
                                                Giảm giá(%)
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            +event.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="stock"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2 relative">
                                            <FormLabel className="absolute left-2 bg-white">
                                                Số lượng trong kho
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(event) =>
                                                        field.onChange(
                                                            +event.target.value
                                                        )
                                                    }
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-2 mt-2">
                                <FormField
                                    control={form.control}
                                    name="category_id"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2 relative">
                                            <FormLabel className="absolute left-2 bg-white px-1">
                                                Danh mục
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn danh mục" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="h-[250px]">
                                                    {categories?.map(
                                                        (item: any) => (
                                                            <SelectItem
                                                                key={item._id}
                                                                value={item._id}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brand_id"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2 relative">
                                            <FormLabel className="absolute left-2 bg-white">
                                                Thương hiệu
                                            </FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                value={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Chọn thương hiệu" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="h-[250px]">
                                                    {brands?.map(
                                                        (item: any) => (
                                                            <SelectItem
                                                                key={item._id}
                                                                value={item._id}
                                                            >
                                                                {item.name}
                                                            </SelectItem>
                                                        )
                                                    )}
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="w-1/2 flex justify-between">
                            <div className="flex flex-col gap-1">
                                <p className="font-medium text-[14px]">
                                    Ảnh chính:
                                </p>
                                <Input
                                    onChange={handleChangeImage}
                                    id="hiddenFileInput"
                                    type="file"
                                    className="hidden"
                                />
                                {image ? (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "hiddenFileInput"
                                                )
                                                ?.click()
                                        }
                                    >
                                        <img
                                            src={URL.createObjectURL(image)}
                                            alt="Main Image"
                                            className="w-[173px] h-[173px] rounded-lg object-cover"
                                        />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "hiddenFileInput"
                                                )
                                                ?.click()
                                        }
                                    >
                                        <img
                                            src={product?.image_url}
                                            alt="Main Image"
                                            className="w-[173px] h-[173px] rounded-lg object-cover"
                                        />
                                    </button>
                                )}
                            </div>
                            <div className="flex w-[450px] flex-col gap-1">
                                <p className="font-medium text-[14px]">
                                    Ảnh phụ:{" "}
                                </p>
                                <Input
                                    multiple
                                    onChange={handleAddExtraImages}
                                    id="hiddenExtraFilesInput"
                                    type="file"
                                    className="hidden"
                                />
                                <ScrollArea className="h-[173px]  w-full border rounded-md">
                                    <div className="flex flex-wrap items-center justify-start gap-2 p-2">
                                        {product?.images?.map((image) => (
                                            <ImageDeleteIcon
                                                key={image.image_id}
                                                id={id}
                                                image={image}
                                                onDelete={
                                                    handleDeleteExtraImages
                                                }
                                            />
                                        ))}
                                        <Button
                                            type="button"
                                            onClick={() =>
                                                document
                                                    .getElementById(
                                                        "hiddenExtraFilesInput"
                                                    )
                                                    ?.click()
                                            }
                                            className="w-[100px] h-[100px] bg-gray-400"
                                        >
                                            <FaPlus />
                                        </Button>
                                    </div>
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="mt-2">
                                <FormLabel className="left-2 bg-white -top-2 px-1">
                                    Nhập thông tin mô tả:
                                </FormLabel>
                                <FormControl>
                                    <Tiptap
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="absolute right-0 -top-[52px]">
                        Cập nhật
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default UpdateProductPage;
