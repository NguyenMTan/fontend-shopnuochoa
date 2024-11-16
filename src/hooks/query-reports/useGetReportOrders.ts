import { reportsApi } from "@/api/report-api";
import { ReportOrder } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReportOrders = (option: string) => {
    return useQuery<ReportOrder[]>({
        queryKey: ["reportorders", option],
        queryFn: async () => {
            return (await reportsApi.getReportOrders(option)).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
