import { create } from "zustand";

type ModalState = {
    _id: string;
    name: string;
    modalDelete: boolean;
    modalCreate: boolean;
    modalUpdate: boolean;
};

interface ModalUserStore extends ModalState {
    setModalDelete: (
        open: boolean,
        props?: { _id: string; name: string }
    ) => void;
    setModalCreate: (open: boolean) => void;
    setModalUpdate: (open: boolean, _id?: string) => void;
}

export const useUserStore = create<ModalUserStore>((set) => ({
    _id: "",
    name: "",
    modalDelete: false,
    modalCreate: false,
    modalUpdate: false,
    setModalDelete: (open, data) => set({ ...data, modalDelete: open }),
    setModalCreate: (open) => set({ modalCreate: open }),
    setModalUpdate: (open, _id) => set({ _id: _id, modalUpdate: open }),
}));
