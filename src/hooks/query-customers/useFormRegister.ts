import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormRegister = () => {
    const formSchema = z
        .object({
            email: z.string().email({ message: "không đúng định dạng email" }),
            name: z.string().min(1, { message: "Name is required" }),
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
            gender: z.enum(["male", "female"]),
            address: z.string(),
            phone_number: z.string(),
            status: z.boolean(),
        })
        .refine((data) => data.password === data.confirm_password, {
            message: "Mật khẩu không khớp",
            path: ["confirm_password"],
        });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
            confirm_password: "",
            name: "",
            gender: "male",
            address: "",
            phone_number: "",
            status: true,
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
