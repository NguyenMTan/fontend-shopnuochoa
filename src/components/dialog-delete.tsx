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
import { ErrorResponse } from "@/types/error.type";
import { UseMutateFunction, UseMutationResult } from "@tanstack/react-query";
import React from "react";

interface DialogDeleteProps {
    open: boolean;
    setModalDelete: (
        open: boolean,
        props?: { _id: string; name: string }
    ) => void;
    name: string;
    _id: string;
    mutation: UseMutationResult<any, ErrorResponse, string, unknown>;
}

function DialogDelete({
    open,
    name,
    mutation,
    _id,
    setModalDelete,
}: DialogDeleteProps) {
    return (
        <Dialog open={open} onOpenChange={setModalDelete}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Bạn có chắc chắn muốn xoá {name} này
                    </DialogTitle>
                    <DialogFooter>
                        <Button
                            disabled={mutation.isPending}
                            onClick={() => mutation.mutate(_id)}
                            size={"sm"}
                            variant={"destructive"}
                        >
                            Xoá
                        </Button>
                        <Button
                            onClick={() => setModalDelete(false)}
                            size={"sm"}
                        >
                            Thoát
                        </Button>
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    );
}

export default DialogDelete;
