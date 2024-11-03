import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const useFormCreateProduct = () => {
    const formSchema = z.object({
        name: z.string(),
        description: z.string(),
        short_description: z.string(),
        status: z.boolean(),
        cost: z.number(),
        price: z.number(),
        sale: z.number(),
        stock: z.number(),
        category_id: z.string(),
        brand_id: z.string(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            short_description: "",
            status: true,
            cost: 0,
            price: 0,
            sale: 0,
            stock: 0,
            category_id: "",
            brand_id: "",
        },
    });

    return { form, formSchema };
};
