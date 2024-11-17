import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useCustomerLogin } from "@/hooks/query-customers/useCustomerLogin";
import { useFormLogin } from "@/hooks/useFormLogin";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import React, { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import { IoEyeSharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import "animate.css";
import { useFormRegister } from "@/hooks/query-customers/useFormRegister";
import { useRegisterCustomer } from "@/hooks/query-customers/useRegisterCustomer";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import logo from "@/assets/kewtie-white.png";

const LoginHomePage = () => {
    const { form: formLogin, formSchema: formSchemaLogin } = useFormLogin();
    const { form: formRegister, formSchema: formSchemaRegister } =
        useFormRegister();
    const { toastLoading } = useToastMessage();
    const mutationLogin = useCustomerLogin();
    const mutationRegister = useRegisterCustomer();
    const token = LocalUtils.getLocalToken();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [zIndex, setZIndex] = useState(0);

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, []);

    const handleLogin = (data: z.infer<typeof formSchemaLogin>) => {
        toastLoading("Vui lòng đợi");
        mutationLogin.mutate(data);
    };

    const handleRegister = (data: z.infer<typeof formSchemaRegister>) => {
        console.log("data", data);
        toastLoading("Vui lòng đợi");
        const { confirm_password, ...customer } = data;
        mutationRegister.mutate(customer);
    };

    const handleClickBg = () => {
        setIsActive((prev) => !prev);
        if (!isActive) {
            setZIndex(0);
            setTimeout(() => {
                setZIndex(10);
            }, 1000);
        } else {
            setZIndex(0);
        }
    };

    return (
        <div className="w-full h-screen flex overflow-hidden">
            <div
                className={`z-10 absolute w-[50%] group h-full
                }`}
            >
                {isActive ? (
                    <div
                        className={`bg-black flex justify-center items-center w-full h-full transform transition duration-1000 ease-in-out ${
                            isActive ? "translate-x-[100%]" : "translate-x-0"
                        }`}
                    >
                        <div className="animate__animated animate__lightSpeedInLeft flex flex-col items-end">
                            <h2 className="text-white text-[60px]/[60px] font-semibold w-[410px] text-right">
                                Chào mừng đến với{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                                    Kewtie
                                </span>
                            </h2>
                            <p className="text-white mt-10 w-[325px] text-right">
                                Nếu bạn đã có tài khoản đăng nhập Kewtie, vui
                                lòng ấn vào nút đăng nhập bên dưới.
                            </p>
                            <div className="flex items-center gap-10 mt-10">
                                <Link to={"/"}>
                                    <p className="text-white font-medium hover:underline">
                                        Về trang chủ
                                    </p>
                                </Link>
                                <button
                                    className="bg-white text-black w-[120px] h-[50px] rounded-3xl font-medium px-4 py-2 hover:bg-yellow-300 group-active:bg-yellow-500"
                                    onClick={handleClickBg}
                                >
                                    Đăng nhập
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div
                        className={`bg-black flex justify-center items-center w-full h-full transform transition duration-1000 ease-in-out ${
                            isActive ? "translate-x-[100%]" : "translate-x-0"
                        }`}
                    >
                        <div className="animate__animated animate__rollIn">
                            <h2 className="text-white text-[60px]/[60px] font-semibold w-[410px]">
                                Chào mừng đến với{" "}
                                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-500">
                                    Kewtie
                                </span>
                            </h2>
                            <p className="text-white mt-10 w-[325px]">
                                Nếu bạn chưa có tài khoản đăng nhập Kewtie, vui
                                lòng ấn vào nút đăng kí bên dưới.
                            </p>
                            <div className="flex items-center gap-10 mt-10">
                                <button
                                    className="bg-white text-black w-[120px] h-[50px] rounded-3xl font-medium px-4 py-2 hover:bg-yellow-300 group-active:bg-yellow-500"
                                    onClick={handleClickBg}
                                >
                                    Đăng kí
                                </button>
                                <Link to={"/"}>
                                    <p className="text-white font-medium hover:underline">
                                        Về trang chủ
                                    </p>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div
                className={`relative ${
                    zIndex === 10 ? "z-10" : ""
                } w-[50%] group h-full`}
            >
                <img src={logo} className=" w-[200px] h-[200px]" alt="" />
                <div className={`bg-white w-full h-full`}>
                    <div className={`px-28 pt-0`}>
                        <h2 className="text-[40px]/[40px] font-semibold">
                            Đăng kí
                        </h2>
                        <Form {...formRegister}>
                            <form
                                autoComplete="off"
                                onSubmit={formRegister.handleSubmit(
                                    handleRegister
                                )}
                                className="mt-6"
                            >
                                <FormField
                                    control={formRegister.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formRegister.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mật khẩu</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={formRegister.control}
                                    name="confirm_password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Xác nhận mật khẩu
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <div className="flex gap-2">
                                    <FormField
                                        control={formRegister.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="w-2/5">
                                                <FormLabel>Tên</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={formRegister.control}
                                        name="gender"
                                        render={({ field }) => (
                                            <FormItem className="w-1/5">
                                                <FormLabel>Giới tính</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
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
                                    <FormField
                                        control={formRegister.control}
                                        name="phone_number"
                                        render={({ field }) => (
                                            <FormItem className="w-2/5">
                                                <FormLabel>
                                                    Số điện thoại
                                                </FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <FormField
                                    control={formRegister.control}
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

                                <button
                                    type="submit"
                                    className="w-full mt-6 bg-black text-white p-2 rounded-md hover:bg-yellow-300 hover:text-black focus:outline-none focus:ring focus:ring-yellow-500-500"
                                >
                                    Đăng Ký
                                </button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
            <div className={`w-[50%] group h-full `}>
                <img src={logo} className=" w-[200px] h-[200px]" alt="" />
                <div
                    className={`bg-white w-full h-full 
                    `}
                >
                    <div className={`px-28`}>
                        <h2 className="mt-12 text-[40px]/[40px] font-semibold">
                            Đăng nhập
                        </h2>
                        <Form {...formLogin}>
                            <form
                                onSubmit={formLogin.handleSubmit(handleLogin)}
                                className="mt-10"
                            >
                                <FormField
                                    control={formLogin.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className=""
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={formLogin.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl className="">
                                                <Input
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
                                <div className="flex justify-between mt-4 items-center font-medium">
                                    <Link to={"/forgot-password"}>
                                        <p className="hover:underline">
                                            Quên mật khẩu
                                        </p>
                                    </Link>
                                    <div className="flex gap-2 items-center">
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
                                </div>
                                <div className="w-full flex justify-end">
                                    <button className="mt-5 h-[50px] w-[120px] bg-black text-white font-semibold rounded-3xl hover:bg-yellow-300 hover:text-black">
                                        Đăng Nhập
                                    </button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginHomePage;
