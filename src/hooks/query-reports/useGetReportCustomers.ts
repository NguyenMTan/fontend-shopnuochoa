import { reportsApi } from "@/api/report-api";
import { ReportCustomer } from "@/types/report.type";
import { useQuery } from "@tanstack/react-query";

export const useGetReportCustomers = () => {
    return useQuery<ReportCustomer>({
        queryKey: ["reportcustomers"],
        queryFn: async () => {
            return (await reportsApi.getReportCustomers()).data;
        },
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: 0,
        refetchOnReconnect: true,
    });
};
