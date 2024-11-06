import Tiptap from "@/components/tiptap/tiptap-editer";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateBlog } from "@/hooks/query-blogs/useCreateBlog";
import { useFormBlog } from "@/hooks/query-blogs/useFormCreateBlog";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import useToastMessage from "@/hooks/useToastMessage";
import { ChangeEvent, useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { z } from "zod";

function CreateBlogPage() {
    const mutation = useCreateBlog();
    const [image, setImage] = useState<File | null>(null);
    const { form, formSchema } = useFormBlog();
    const { toastLoading } = useToastMessage();
    const { data: user } = useGetMeUser();

    const handleCreateBlog = (data: z.infer<typeof formSchema>) => {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ ...data, main_image: image });
    };

    useEffect(() => {
        if (user) {
            form.setValue("created_by", user.name ?? "");
        }
    }, [user]);

    function hanldeImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
        }
    }
    return (
        <div className="flex flex-col gap-4 ">
            <h1 className="text-2xl font-bold">Tạo bài viết mới</h1>
            <div className="flex justify-between items-center">
                <Link to={"/admin/blogs"}>
                    <Button className="flex gap-2">
                        <IoMdArrowRoundBack /> Quay lại
                    </Button>
                </Link>
                <Button
                    type="button"
                    onClick={() =>
                        document.getElementById("createBlog")?.click()
                    }
                >
                    Tạo
                </Button>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleCreateBlog)}
                    className="w-full  mx-auto bg-white p-4 box-border rounded-lg"
                >
                    <div className="flex gap-[4%]">
                        <div className="w-1/2">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tiêu đề bài viết:</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tiêu đề"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="created_by"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Tên người viết:</FormLabel>
                                        <FormControl>
                                            <Input disabled {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-46% flex">
                            <div className="w-full">
                                <Label htmlFor="picture">
                                    Hình ảnh đại diện cho bài viết:
                                </Label>
                                <Input
                                    required
                                    onChange={hanldeImage}
                                    id="picture"
                                    type="file"
                                    className="hidden"
                                />
                            </div>
                            {image ? (
                                <button
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("picture")
                                            ?.click()
                                    }
                                >
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Picture of the author"
                                        className="w-[400px] h-[150px] rounded-xl object-cover"
                                    />
                                </button>
                            ) : (
                                <button
                                    className="text-white text-3xl w-[400px] h-[150px] rounded-xl bg-gray-400"
                                    type="button"
                                    onClick={() =>
                                        document
                                            .getElementById("picture")
                                            ?.click()
                                    }
                                >
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nội dung bài viết:</FormLabel>
                                <FormControl>
                                    <Tiptap
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button id="createBlog" className="hidden">
                        Tạo
                    </Button>
                </form>
            </Form>
        </div>
    );
}

export default CreateBlogPage;
