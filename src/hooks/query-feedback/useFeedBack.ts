import { feedbackApi } from "@/api/feedback-api";
import useToastMessage from "@/hooks/useToastMessage";
import { useMutation } from "@tanstack/react-query";

export const useFeedBack = () => {
    const { toastError, toastSuccess } = useToastMessage();

    return useMutation({
        mutationFn: async (data: {
            name: string;
            email: string;
            message: string;
            phone_number: string;
        }) => {
            return (await feedbackApi.sendFeedBack(data)).data;
        },
        onSuccess: (data) => {
            toastSuccess("gửi phản hồi thành công");
        },
        onError: (error) => {
            toastError("gửi phân hồi thất bại");
        },
    });
};
