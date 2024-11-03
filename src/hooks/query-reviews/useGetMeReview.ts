import { reviewApi } from "@/api/review-api";
import { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

export const useGetMeReview = () => {
    return useQuery<Review[]>({
        queryKey: ["reviews-me"],
        queryFn: async () => {
            return (await reviewApi.getByMe()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
