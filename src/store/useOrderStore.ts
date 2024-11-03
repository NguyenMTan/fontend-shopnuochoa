import { create } from "zustand";

type ModalState = {
    _id: string;
    name: string;
    modalDetail: boolean;
};

interface ModalAction extends ModalState {
    setModalDetail: (
        open: boolean,
        data?: { _id: string; name?: string }
    ) => void;
}

export const useOrderStore = create<ModalAction>((set) => ({
    _id: "",
    name: "",
    modalDetail: false,
    setModalDetail: (open, data) => set({ ...data, modalDetail: open }),
}));
