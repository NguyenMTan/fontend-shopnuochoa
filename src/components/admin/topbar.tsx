import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import { IoLogOutOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

function TopBar() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { data: user } = useGetMeUser();

    const { toastSuccess } = useToastMessage();

    const handleLogout = () => {
        toastSuccess("Đăng xuất thành công!");
        queryClient.removeQueries({ queryKey: ["user-me"] });
        queryClient.removeQueries({ queryKey: ["users"] });
        LocalUtils.removeLocalToken();
        navigate("/admin/login");
    };

    return (
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Trang quản lý</h1>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className="relative h-8 w-8 rounded-full"
                    >
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-black">
                                <FaUser className="text-white" />
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                {user?.name}
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                {user?.email}
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                        <IoLogOutOutline className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}

export default TopBar;
