import { reportsApi } from "@/api/report-api";
import { ReportTopSell } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReportSell = (option: string) => {
    return useQuery<ReportTopSell[]>({
        queryKey: ["topsell", option],
        queryFn: async () => {
            return (await reportsApi.getReportTopSell(option)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
