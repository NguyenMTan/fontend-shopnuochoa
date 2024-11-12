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
import useUserLogin from "@/hooks/query-users/useUserLogin";
import { useFormLogin } from "@/hooks/useFormLogin";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import logoWhite from "@/assets/kewtie-white.png";
import backGround from "@/assets/background-admin-login.jpg";
import { IoEyeSharp } from "react-icons/io5";
import { FaEyeSlash } from "react-icons/fa6";
import { Switch } from "@/components/ui/switch";

const LoginPage = () => {
    const { form, formSchema } = useFormLogin();
    const mutation = useUserLogin();
    const { toastLoading, toastError } = useToastMessage();
    const token = LocalUtils.getLocalToken();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (token) {
            navigate("/admin", { replace: true });
        }
    }, [token]);

    function handleLogin(data: z.infer<typeof formSchema>) {
        toastLoading("Vui lòng đợi");
        mutation.mutate(data);
    }

    return (
        <div className="bg-[#EAEAEC] h-screen w-screen flex">
            <div className="bg-white flex flex-col gap-4 w-2/5 h-screen relative">
                <img
                    src={logoWhite}
                    className="w-[300px] h-[220px] object-cover -top-[15px] -left-[30px] relative "
                    alt=""
                />

                <div className="w-3/5 flex flex-col items-center border border-[#eaeaeadb] rounded-xl p-5 ml-auto mr-auto shadow">
                    <h1 className="text-4xl pb-4 font-medium mb-4">
                        Đăng nhập
                    </h1>

                    {mutation.error?.statusCode === 404 &&
                        toastError("Không tìm thấy email")}
                    <Form {...form}>
                        <form
                            autoComplete="off"
                            onSubmit={form.handleSubmit(handleLogin)}
                            className="flex flex-col gap-5 w-4/5"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="absolute left-4 bg-white text-gray-400">
                                            Email
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                className="border-gray-400"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="relative">
                                        <FormLabel className="absolute left-4 bg-white text-gray-400">
                                            Password
                                        </FormLabel>
                                        <FormControl className="flex">
                                            <Input
                                                className="border-gray-400"
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <div className="ml-auto flex items-center gap-1 font-medium">
                                {/* <Switch
                                    checkedIcon={<IoEyeSharp />}
                                    unCheckedIcon={<FaEyeSlash />}
                                    checked={showPassword}
                                    onCheckedChange={() =>
                                        setShowPassword(!showPassword)
                                    }
                                /> */}
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <div className="flex gap-1 items-center">
                                            <span>Ẩn mật khẩu</span>
                                            <FaEyeSlash />
                                        </div>
                                    ) : (
                                        <div className="flex gap-1 items-center">
                                            <span>Hiện mật khẩu</span>
                                            <IoEyeSharp />
                                        </div>
                                    )}
                                </button>
                            </div>
                            <Button className="hover:opacity-85">
                                Đăng nhập
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="w-3/5 h-screen bg-black relative">
                <img
                    src={backGround}
                    className="w-full h-full object-cover"
                    alt=""
                />
            </div>
        </div>
    );
};

export default LoginPage;
