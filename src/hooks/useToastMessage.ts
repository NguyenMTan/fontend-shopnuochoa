import { toast } from "sonner";

const useToastMessage = () => {
    const toastLoading = (message: string) => {
        toast.loading(message, {
            id: "default",
            position: "top-center",
        });
    };
    const toastSuccess = (message: string) =>
        toast.success(message, {
            id: "default",
            position: "top-center",
        });

    const toastError = (message: string) =>
        toast.error(message, {
            id: "default",
            position: "top-center",
        });

    return { toastLoading, toastSuccess, toastError };
};

export default useToastMessage;
