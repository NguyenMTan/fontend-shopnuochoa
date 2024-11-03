import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useUserStore } from "@/store/useUserStore";
import { useFormCreateUser } from "@/hooks/query-users/useFormCreateUser";
import useToastMessage from "@/hooks/useToastMessage";
import { useCreateUser } from "@/hooks/query-users/useCreateUser";
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

function DialogCreate() {
    const { modalCreate, setModalCreate } = useUserStore();
    const { form, formSchema } = useFormCreateUser();
    const { toastLoading } = useToastMessage();
    const mutation = useCreateUser();

    const handleCreateUser = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        form.reset();
        mutation.mutate(data);
    };

    return (
        <Dialog open={modalCreate} onOpenChange={setModalCreate}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Tạo người dùng mới</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form
                        autoComplete="off"
                        onSubmit={form.handleSubmit(handleCreateUser)}
                        className="flex flex-col gap-2 items-center"
                    >
                        <div>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Email
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
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Mật khẩu
                                        </FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="mt-5 relative w-72">
                                        <FormLabel className="absolute bg-white left-3 -top-2">
                                            Tên người dùng
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
                                name="status"
                                render={({ field }) => (
                                    <FormItem className="mt-5 w-72">
                                        <div className="flex gap-4">
                                            <FormLabel>Trạng thái</FormLabel>
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={
                                                        field.onChange
                                                    }
                                                />
                                            </FormControl>
                                        </div>
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
