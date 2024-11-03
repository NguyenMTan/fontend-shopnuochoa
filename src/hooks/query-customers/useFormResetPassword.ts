import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormResetPassword = () => {
    const formSchema = z
        .object({
            password: z
                .string()
                .regex(/[A-Z]/, {
                    message: "Mật khẩu phải có chữ Hoa",
                })
                .regex(/[a-z]/, {
                    message: "Mật khẩu phải có chữ Thường",
                })
                .regex(/\d/, { message: "Mật khẩu phải có số" })
                .regex(/[\W_]/, {
                    message: "Mật khẩu phải có kí tự đặc biệt",
                }),
            confirm_password: z.string(),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: "Mật khẩu không khớp",
            path: ["confirm_password"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            password: "",
            confirm_password: "",
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
