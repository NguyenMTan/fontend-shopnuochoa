import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetUser } from "@/hooks/query-users/useGetUser";
import { useUpdateUser } from "@/hooks/query-users/useUpdateUser";
import useToastMessage from "@/hooks/useToastMessage";
import { useUserStore } from "@/store/useUserStore";
import { useState } from "react";

export function DialogUpdate() {
    const { modalUpdate, setModalUpdate, _id } = useUserStore();
    const [name, setName] = useState("");
    const { data: user } = useGetUser(_id);
    const { toastLoading } = useToastMessage();

    const mutation = useUpdateUser();

    function handleUpdate() {
        toastLoading("Vui lòng đợi");
        mutation.mutate({ _id, name });
    }
    return (
        <Dialog open={modalUpdate} onOpenChange={setModalUpdate}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Cập nhật thông tin người dùng</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div>
                        <div className="relative mt-5">
                            <label
                                className="absolute left-3 bg-white -top-[14px]"
                                htmlFor="name"
                            >
                                Tên người dùng
                            </label>
                            <Input
                                autoComplete="off"
                                id="name"
                                defaultValue={user?.name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <Button className="self-end" onClick={handleUpdate}>
                        Cập nhật
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
