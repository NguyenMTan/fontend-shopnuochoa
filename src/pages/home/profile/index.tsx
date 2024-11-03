import TabInfo from "@/components/profile/tab-info";
import TabOrder from "@/components/profile/tab-order";
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
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFormCustomer } from "@/hooks/query-customers/useFormCustomer";
import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomer";
import { useUpdateCustomer } from "@/hooks/query-customers/useUpdateCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import avataNoImage from "@/assets/thumb-no-image.png";
import { useUpdateImageCustomer } from "@/hooks/query-customers/useUpdateImageCustomer";
import TabReview from "@/components/profile/tab-review";

function ProfilePage() {
    const { form, formSchema } = useFormCustomer();
    const [image, setImage] = useState<File>();
    const { data: customer } = useGetMeCustomer();
    const { toastLoading } = useToastMessage();
    const mutation = useUpdateCustomer();
    const mutationImage = useUpdateImageCustomer();

    useEffect(() => {
        form.setValue("name", customer?.name ?? "");
        form.setValue("address", customer?.address ?? "");
        form.setValue("phone_number", customer?.phone_number ?? "");
    }, [customer]);

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi!");
        mutation.mutate(data);
    };

    const handleUpdateImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        toastLoading("Vui lòng đợi!");
        file && mutationImage.mutate({ id: customer._id, data: file });
        setImage(file);
    };

    return (
        <div className="w-[1170px]  mx-auto mt-10 flex justify-between">
            <div className="top-[142px] w-[38%] h-[500px] p-4 border rounded-lg shadow-md hover:shadow-lg">
                <h2 className="text-[24px] font-medium">
                    Thông tin người dùng:
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleUpdate)}
                        className="flex flex-col items-center gap-2 w-96 mt-4 mx-auto"
                    >
                        {image ? (
                            <button
                                className="hover:opacity-90"
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("hiddenImageCustomer")
                                        ?.click()
                                }
                            >
                                <img
                                    src={URL.createObjectURL(image)}
                                    className="w-[150px] h-[150px] object-cover rounded-full"
                                />
                            </button>
                        ) : (
                            <button
                                className="hover:opacity-90"
                                type="button"
                                onClick={() =>
                                    document
                                        .getElementById("hiddenImageCustomer")
                                        ?.click()
                                }
                            >
                                <img
                                    src={
                                        customer?.image_url == ""
                                            ? avataNoImage
                                            : customer?.image_url
                                    }
                                    className="w-[150px] h-[150px] object-cover rounded-full"
                                />
                            </button>
                        )}
                        <Input
                            multiple
                            onChange={handleUpdateImage}
                            id="hiddenImageCustomer"
                            type="file"
                            className="hidden"
                        />
                        <div className="relative mt-2 w-full">
                            <Label className="absolute left-3 -top-2 bg-white">
                                Email
                            </Label>
                            <Input value={customer?.email} disabled />
                        </div>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel className="absolute left-3 top-0 bg-white">
                                        Tên
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
                            name="address"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel className="absolute left-3 top-0 bg-white">
                                        Địa chỉ
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
                            name="phone_number"
                            render={({ field }) => (
                                <FormItem className="relative w-full">
                                    <FormLabel className="absolute left-3 top-0 bg-white">
                                        Số điện thoại
                                    </FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button className="mt-2 hover:bg-yellow-300 hover:text-black active:bg-yellow-500 w-full">
                            Cập nhật thông tin
                        </Button>
                    </form>
                </Form>
            </div>
            <div className="w-[60%]">
                <Tabs defaultValue="statistical">
                    <TabsList>
                        <TabsTrigger value="statistical">Thống kê</TabsTrigger>
                        <TabsTrigger value="order">Hóa đơn</TabsTrigger>
                        <TabsTrigger value="review">Đánh giá</TabsTrigger>
                    </TabsList>
                    <TabReview value="review" />
                    <TabOrder value="order" />
                </Tabs>
            </div>
        </div>
    );
}

export default ProfilePage;
