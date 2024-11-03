import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "../ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import Tiptap from "../tiptap/tiptap-editer";

interface TabInfoProps {
    value: string;
    form: any;
    categories: any;
    brands: any;
}

function TabInfo(props: TabInfoProps) {
    return (
        <TabsContent value={props.value} className="bg-white p-4 rounded-md">
            <div className="flex gap-2">
                <FormField
                    control={props.form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative">
                            <FormLabel className="absolute bg-white left-3">
                                Tên sản phẩm
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={props.form.control}
                    name="short_description"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative">
                            <FormLabel className="absolute bg-white left-3">
                                Mô tả ngắn
                            </FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex gap-2">
                <FormField
                    control={props.form.control}
                    name="cost"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Giá gốc
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(+event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={props.form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Giá tiền
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(+event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex gap-2 ">
                <FormField
                    control={props.form.control}
                    name="sale"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Giảm giá(%)
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(+event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={props.form.control}
                    name="stock"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Số lượng trong kho
                            </FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    onChange={(event) =>
                                        field.onChange(+event.target.value)
                                    }
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="flex gap-2">
                <FormField
                    control={props.form.control}
                    name="category_id"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Danh mục
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn danh mục" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <ScrollArea className="h-40">
                                        {props?.categories?.map((item: any) => (
                                            <SelectItem
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={props.form.control}
                    name="brand_id"
                    render={({ field }) => (
                        <FormItem className="w-1/2 relative mt-3">
                            <FormLabel className="absolute bg-white left-3">
                                Thương hiệu
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Chọn thương hiệu" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <ScrollArea className="h-40">
                                        {props?.brands?.map((item: any) => (
                                            <SelectItem
                                                key={item._id}
                                                value={item._id}
                                            >
                                                {item.name}
                                            </SelectItem>
                                        ))}
                                    </ScrollArea>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <FormField
                control={props.form.control}
                name="description"
                render={({ field }) => (
                    <FormItem className=" mt-5">
                        <FormLabel className=" bg-white left-3 -top-2">
                            Mô tả dài:
                        </FormLabel>
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
        </TabsContent>
    );
}

export default TabInfo;
