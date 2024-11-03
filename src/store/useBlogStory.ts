import { create } from "zustand";

type ModalState = {
    _id: string;
    name: string;
    modalDelete: boolean;
};

interface ModalAction extends ModalState {
    setModalDelete: (
        open: boolean,
        data?: { _id: string; name: string }
    ) => void;
}

export const useBlogStore = create<ModalAction>((set) => ({
    _id: "",
    name: "",
    modalDelete: false,
    setModalDelete: (open, data) => set({ ...data, modalDelete: open }),
}));
