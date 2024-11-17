import { toast } from "sonner";

const useToastMessage = () => {
    const toastLoading = (message: string) => {
        toast.loading(message, {
            id: "default",
            position: "top-right",
            style: {
                background: "#333",
                color: "#fff",
                border: "none",
            },
            duration: 1500,
        });
    };
    const toastSuccess = (message: string) =>
        toast.success(message, {
            id: "default",
            position: "top-right",
            style: {
                background: "#333",
                color: "#0f0",
                border: "none",
            },
            duration: 1500,
        });

    const toastError = (message: string) =>
        toast.error(message, {
            id: "default",
            position: "top-right",
            style: {
                background: "#333",
                color: "#f00",
                border: "none",
            },
            duration: 1500,
        });

    return { toastLoading, toastSuccess, toastError };
};

export default useToastMessage;
