import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateBrand = () => {
    const formSchema = z.object({
        name: z.string(),
        status: z.boolean(),
        description: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
            description: "",
            status: true,
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
