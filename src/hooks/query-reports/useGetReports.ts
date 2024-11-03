import { reportsApi } from "@/api/report-api";
import { Report } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReports = (option: string) => {
    return useQuery<Report[]>({
        queryKey: ["reports", option],
        queryFn: async () => {
            return (await reportsApi.getReports(option)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
