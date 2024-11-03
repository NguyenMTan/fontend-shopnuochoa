import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateReview = () => {
    const formSchema = z.object({
        comment: z.string(),
        point: z.number(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
            comment: "",
            point: 1,
        },
        resolver: zodResolver(formSchema),
    });

    return { form, formSchema };
};
