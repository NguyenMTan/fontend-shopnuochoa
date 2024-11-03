import TabImages from "@/components/manage-products/tab-images";
import TabInfo from "@/components/manage-products/tab-info";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAllNameBrands } from "@/hooks/query-brands/useGetAllNameBrands";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllNameCategories";
import { useCreateProduct } from "@/hooks/query-products/useCreateProduct";
import { useFormCreateProduct } from "@/hooks/query-products/useFormCreateProduct";
import useToastMessage from "@/hooks/useToastMessage";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";

const tabData = [
    {
        value: "info",
        title: "Thông tin",
    },
    {
        value: "image",
        title: "Ảnh sản phẩm",
    },
];

function CreateProductPage() {
    const [activeTab, setActiveTab] = useState("info");
    const { form, formSchema } = useFormCreateProduct();
    const { data: categories } = useGetAllNameCategories();
    const { data: brands } = useGetAllNameBrands();
    const [image, setImage] = useState<File>();
    const { toastLoading } = useToastMessage();
    const [extraImages, setExtraImages] = useState<File[]>([]);

    const mutate = useCreateProduct();

    const handleCreate = (values: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        mutate.mutate({
            product: values,
            main_image: image ?? null,
            extra_images: extraImages,
        });
    };

    return (
        <div className="flex flex-col gap-4 ">
            <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>{" "}
            <div className="flex justify-between">
                <Link className="w-[108px]" to={"/admin/products"}>
                    <Button className="flex gap-2">
                        <IoMdArrowRoundBack /> Quay lại
                    </Button>
                </Link>
                <Button
                    type="button"
                    onClick={() =>
                        document.getElementById("createProduct")?.click()
                    }
                >
                    Tạo
                </Button>
            </div>
            <Form {...form}>
                <form
                    autoComplete="off"
                    onSubmit={form.handleSubmit(handleCreate)}
                    className="relative"
                >
                    <Tabs
                        value={activeTab}
                        onValueChange={setActiveTab}
                        className="flex"
                    >
                        {" "}
                        <TabsList className="flex flex-col -ml-1 gap-2 w-[12%] mt-[31px]">
                            {tabData.map((tab) => (
                                <TabsTrigger
                                    key={tab.value}
                                    value={tab.value}
                                    className={cn(
                                        "w-full justify-start p-2 text-black bg-white border border-[#ccc] box-border",
                                        activeTab === tab.value
                                            ? "!bg-black !text-white"
                                            : "hover:bg-black hover:text-white"
                                    )}
                                >
                                    {tab.title}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        <div className="w-[88%]">
                            <TabInfo
                                value="info"
                                form={form}
                                categories={categories}
                                brands={brands}
                            />
                            <TabImages
                                value="image"
                                image={image}
                                setImage={setImage}
                                extraImage={extraImages}
                                setExtraImage={setExtraImages}
                            />
                        </div>
                    </Tabs>
                    <Button id="createProduct" className="hidden">
                        Tạo
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default CreateProductPage;
