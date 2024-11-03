import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateUser = () => {
    const formSchema = z.object({
        email: z.string().email({ message: "không đúng định dạng email" }),
        name: z.string(),
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
        status: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
            name: "",
            status: true,
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
