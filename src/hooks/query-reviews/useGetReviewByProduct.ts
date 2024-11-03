import { reviewApi } from "@/api/review-api";
import { Review } from "@/types/review.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewByProduct = (id: string) => {
    return useQuery<Review[]>({
        queryKey: ["reviews", id],
        queryFn: async () => {
            return (await reviewApi.getByProduct(id)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
