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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { useFormCustomer } from "@/hooks/query-customers/useFormCustomer";
import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomer";
import { useUpdateCustomer } from "@/hooks/query-customers/useUpdateCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import React, { useEffect } from "react";
import { z } from "zod";

interface TabInfoProps {
    value: string;
    form?: any;
}

function TabInfo(props: TabInfoProps) {
    const { form, formSchema } = useFormCustomer();
    const { data: customer } = useGetMeCustomer();
    const { toastLoading } = useToastMessage();
    const mutation = useUpdateCustomer();

    useEffect(() => {
        form.setValue("name", customer?.name ?? "");
        form.setValue("address", customer?.address ?? "");
        form.setValue("phone_number", customer?.phone_number ?? "");
    }, [customer]);

    function handleUpdate(data: z.infer<typeof formSchema>) {
        toastLoading("Vui lòng đợi!");
        mutation.mutate(data);
    }

    return (
        <TabsContent
            value={props.value}
            className="flex flex-col items-center gap-2 w-full"
        >
            <h1 className="text-2xl font-bold">Thông tin của bạn</h1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleUpdate)}
                    className="flex flex-col gap-2 w-96"
                >
                    <Label>Email</Label>
                    <Input value={customer?.email} disabled />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tên</FormLabel>
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
                            <FormItem>
                                <FormLabel>Địa chỉ</FormLabel>
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
                            <FormItem>
                                <FormLabel>Số điện thoại</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Giới tính</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Chọn giới tính của bạn" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="male">
                                            Nam
                                        </SelectItem>
                                        <SelectItem value="female">
                                            Nữ
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button className="self-end">Lưu</Button>
                </form>
            </Form>
        </TabsContent>
    );
}

export default TabInfo;
