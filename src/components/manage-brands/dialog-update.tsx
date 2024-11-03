import React, { useEffect } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import useToastMessage from "@/hooks/useToastMessage";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Checkbox } from "../ui/checkbox";
import { useFormCreateBrand } from "@/hooks/query-brands/useFormCreateBrand";
import { useBrandStore } from "@/store/useBrandStore";
import { useCreateBrand } from "@/hooks/query-brands/useCreateBrand";
import { useGetBrand } from "@/hooks/query-brands/useGetBrand";
import { useUpdateBrand } from "@/hooks/query-brands/useUpdateBrand";

function DialogUpdate() {
    const { modalUpdate, setModalUpdate, _id } = useBrandStore();
    const { form, formSchema } = useFormCreateBrand();
    const { data: brand } = useGetBrand(_id);
    const { toastLoading } = useToastMessage();
    const mutation = useUpdateBrand();

    useEffect(() => {
        form.setValue("name", brand?.name ?? "");
        form.setValue("description", brand?.description ?? "");
    }, [brand]);

    const handleUpdateBrand = (body: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ _id, body });
    };

    return (
        <Dialog open={modalUpdate} onOpenChange={setModalUpdate}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật thương hiệu</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(handleUpdateBrand)}
                        className="flex flex-col gap-5 items-center"
                    >
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Tên thương hiệu
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
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Mô tả thương hiệu
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="self-end">Tạo</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default DialogUpdate;
