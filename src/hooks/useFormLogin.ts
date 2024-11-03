import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormLogin = () => {
    const formSchema = z.object({
        email: z.string().email(),
        password: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
