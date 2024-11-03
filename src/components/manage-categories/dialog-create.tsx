import { useCreateCategory } from "@/hooks/query-categories/useCreateCategory";
import { useFormCreateCategory } from "@/hooks/query-categories/useFormCreateCategory";
import useToastMessage from "@/hooks/useToastMessage";
import { useCategoryStore } from "@/store/useCategoryStore";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { useGetAllNameCategories } from "@/hooks/query-categories/useGetAllNameCategories";

function DialogCreate() {
    const { modalCreate, setModalCreate } = useCategoryStore();
    const { form, formSchema } = useFormCreateCategory();
    const { toastLoading } = useToastMessage();
    const { data: categories } = useGetAllNameCategories();
    const mutation = useCreateCategory();

    const handleCreateUser = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        form.reset();
        mutation.mutate(data);
    };

    return (
        <Dialog open={modalCreate} onOpenChange={setModalCreate}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo danh mục mới</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(handleCreateUser)}
                        className="flex flex-col gap-5 items-center"
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
                                            Danh mục cha
                                        </FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Không có" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent className="h-[250px]">
                                                {categories?.map((item) => (
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
                        </div>
                        <Button className="self-end">Tạo</Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export default DialogCreate;
