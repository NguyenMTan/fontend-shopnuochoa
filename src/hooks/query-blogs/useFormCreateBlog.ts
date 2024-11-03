import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormBlog = () => {
    const formSchema = z.object({
        title: z.string(),
        content: z.string(),
        created_by: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            title: "",
            content: "",
            created_by: "",
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
