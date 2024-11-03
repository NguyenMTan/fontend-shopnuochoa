import { LocalUtils } from "@/utils/local-util";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useLogout = (url: string) => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    queryClient.removeQueries({ queryKey: ["user-me"] });
    LocalUtils.removeLocalToken();
    navigate(url);
};
