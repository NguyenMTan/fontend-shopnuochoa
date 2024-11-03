import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TabsContent } from "@/components/ui/tabs";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { FaPlus } from "react-icons/fa6";

interface TabImageProps {
    value: string;
    image: File | undefined;
    setImage: Dispatch<SetStateAction<File | undefined>>;
    extraImage: File[] | undefined;
    setExtraImage: Dispatch<SetStateAction<File[]>>;
}

function TabImages(props: TabImageProps) {
    function handleImage(e: ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        props.setImage(file);
    }

    function handleExtraImage(e: ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        files && props.setExtraImage(Array.from(files));
    }

    return (
        <TabsContent value={props.value} className="bg-white p-4 rounded-md">
            <div className="flex gap-5">
                <div>
                    <div className="flex flex-col gap-4 w-[220px]">
                        <Label htmlFor="hiddenFileInput">
                            Ảnh chính của sản phẩm
                        </Label>
                        <Button
                            className="w-[200px]"
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("hiddenFileInput")
                                    ?.click()
                            }
                        >
                            Thay đổi ảnh
                        </Button>
                        <Input
                            className="hidden"
                            required
                            onChange={handleImage}
                            id="hiddenFileInput"
                            type="file"
                        />
                    </div>
                    {props.image && (
                        <img
                            src={URL.createObjectURL(props.image)}
                            width={120}
                            height={120}
                            alt="Picture of the author"
                            className=" mt-4 rounded-xl object-cover w-[200px] h-[165px]"
                        />
                    )}
                </div>
                <div className="">
                    <div className="flex flex-col gap-4">
                        <Label htmlFor="picture">Ảnh phụ của sản phẩm</Label>
                        <Button
                            type="button"
                            onClick={() =>
                                document
                                    .getElementById("hiddenExtraFilesInput")
                                    ?.click()
                            }
                            className="w-20"
                        >
                            <FaPlus />
                        </Button>
                        <Input
                            multiple
                            onChange={handleExtraImage}
                            id="hiddenExtraFilesInput"
                            type="file"
                            className="hidden"
                        />
                    </div>
                    <ScrollArea className="">
                        <div className="flex flex-wrap gap-4 mt-4 h-[328px]">
                            {props.extraImage?.map((image) => (
                                <img
                                    key={image.name}
                                    src={URL.createObjectURL(image)}
                                    alt="ảnh phụ sản phẩm"
                                    className="w-[200px] h-[165px] rounded-xl object-cover"
                                />
                            ))}
                        </div>
                    </ScrollArea>
                </div>
            </div>
        </TabsContent>
    );
}

export default TabImages;
