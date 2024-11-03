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
import { useForgotPassword } from "@/hooks/query-customers/useForgotPassword";
import { useFormLogin } from "@/hooks/useFormLogin";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState("");

    const mutation = useForgotPassword();

    function handleForgotPassword() {
        mutation.mutate(email);
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="flex gap-2 flex-col w-full max-w-md bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-semibold text-center">
                    Quên mật khẩu
                </h2>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Nhập email"
                />
                <Button
                    onClick={handleForgotPassword}
                    className="w-full mt-6 bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
                >
                    Gửi
                </Button>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
