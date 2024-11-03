import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { string, z } from "zod";

export const useFormCustomer = () => {
    const formSchema = z.object({
        name: z.string().min(1, { message: "Name is required" }),
        gender: z.enum(["male", "female"]),
        address: z.string(),
        phone_number: z.string(),
        status: z.boolean(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        defaultValues: {
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
