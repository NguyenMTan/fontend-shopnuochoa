import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateCategory = () => {
    const formSchema = z.object({
        name: z.string(),
        status: z.boolean(),
        parent_id: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            name: "",
            status: true,
            parent_id: "",
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
