import { useFormCreateCategory } from "@/hooks/query-categories/useFormCreateCategory";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllNameCategories";
import { useGetCategory } from "@/hooks/query-categories/useGetCategory";
import { useUpdateCategory } from "@/hooks/query-categories/useUpdateCategory";
import useToastMessage from "@/hooks/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { z } from "zod";
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";

export function DialogUpdate() {
    const { modalUpdate, setModalUpdate, _id } = useCategoryStore();
    const { form, formSchema } = useFormCreateCategory();
    const { toastLoading } = useToastMessage();
    const { data: categories } = useGetAllNameCategories();
    const { data: category } = useGetCategory(_id);
    const mutation = useUpdateCategory();

    useEffect(() => {
        form.setValue("name", category?.name ?? "");
        form.setValue("status", category?.status ?? true);
        form.setValue("parent_id", category?.parent_id ?? "");
    }, [category]);

    const handleUpdate = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ _id, body: data });
    };
    return (
        <Dialog open={modalUpdate} onOpenChange={setModalUpdate}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin danh mục</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(handleUpdate)}
                        className="flex flex-col gap-2 items-center"
                    >
                        <div>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Tên danh mục
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
                                name="parent_id"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Danh Mục Cha
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            value={field.value ?? ""}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn danh mục cha" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="h-[250px]">
                                                <SelectItem value={"none"}>
                                                    Không có
                                                </SelectItem>
                                                {categories
                                                    ?.filter(
                                                        (item) =>
                                                            item._id !== _id
                                                    )
                                                    .map((item) => (
                                                        <SelectItem
                                                            key={item._id}
                                                            value={item._id}
                                                        >
                                                            {item.name}
                                                        </SelectItem>
                                                    ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-4 mt-3 w-72">
                                        <FormLabel>Trạng thái</FormLabel>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button className="self-end">Cập nhật</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
