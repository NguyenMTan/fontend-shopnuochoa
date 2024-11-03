import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCheckout = () => {
    const formSchema = z.object({
        address: z.string(),
        phone_number: z.string(),
        email: z.string().email(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            address: "",
            phone_number: "",
            email: "",
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
