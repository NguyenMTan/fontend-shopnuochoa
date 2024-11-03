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
import { useCustomerLogin } from "@/hooks/query-customers/useCustomerLogin";
import { useFormResetPassword } from "@/hooks/query-customers/useFormResetPassword";
import { useResetPassword } from "@/hooks/query-customers/useResetPassword";
import { useFormLogin } from "@/hooks/useFormLogin";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const ResetPasswordPage = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get("token") ?? "";
    const { form, formSchema } = useFormResetPassword();
    const { toastLoading } = useToastMessage();
    const mutation = useResetPassword();

    function handleResetPassword(data: z.infer<typeof formSchema>) {
        console.log("data", data);
        toastLoading("Vui lòng đợi");

        mutation.mutate({ token, password: data.password });
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center">
                    Đăng Nhập
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleResetPassword)}
                        className="mt-6"
                    >
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="confirm_password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Xác nhận password</FormLabel>
                                    <FormControl className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500">
                                        <Input type="password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                        >
                            Lưu
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;
