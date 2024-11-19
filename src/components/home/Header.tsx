import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomer";
import useToastMessage from "@/hooks/useToastMessage";
import { LocalUtils } from "@/utils/local-util";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { IoLogOut, IoLogOutOutline } from "react-icons/io5";
import logoBlack from "@/assets/kewtie-logoblack.png";
import textLogoBlack from "@/assets/kewtie-textblack.png";
import { FaInfoCircle } from "react-icons/fa";

const Header = () => {
    const { data } = useGetMeCustomer();
    const navigate = useNavigate();

    const { toastSuccess } = useToastMessage();

    const handleLogout = () => {
        toastSuccess("Đăng xuất thành công!");
        LocalUtils.removeLocalToken();
        window.location.href = "/";
    };

    return (
        <>
            <header className="hidden sm:flex sticky z-[50] -top-3 justify-center items-center w-full h-[102px] bg-black">
                <div className="flex items-center justify-between w-[1170px] h-[50px] bg-black">
                    <Link to={"/"}>
                        <div className="flex items-center">
                            <img
                                src={logoBlack}
                                className="w-[50px] h-[50px] rounded-sm"
                                alt=""
                            />{" "}
                            <img
                                src={textLogoBlack}
                                className="w-[100px] h-[40px] object-cover"
                                alt=""
                            />
                        </div>
                    </Link>
                    <nav className="flex items-center">
                        <Link to={"/"}>
                            <button className="text-sm/[14px] font-medium text-white hover:font-bold focus:font-bold text-center w-24 py-2">
                                Trang chủ
                            </button>
                        </Link>
                        <Link to={"/products"}>
                            <button className="text-sm/[14px] font-medium text-white hover:font-bold focus:font-bold w-24 text-center py-2">
                                Sản phẩm
                            </button>
                        </Link>
                        <Link to={"/blogs"}>
                            <button className="text-sm/[14px] font-medium text-white hover:font-bold focus:font-bold w-24 text-center py-2">
                                Bài viết
                            </button>
                        </Link>
                        <Link to={"/contact"}>
                            <button className="text-sm/[14px] font-medium text-white hover:font-bold focus:font-bold w-24 text-center py-2">
                                Hỗ trợ
                            </button>
                        </Link>
                    </nav>

                    {data ? (
                        <div className="flex items-center gap-5">
                            <Link to={"/cart"}>
                                <Button
                                    size={"icon"}
                                    className="h-[42px] w-[42px] bg-white rounded-full hover:bg-[#f5f5f5] relative"
                                >
                                    <FaCartShopping className="text-black relative h-4 w-4" />
                                </Button>
                            </Link>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="relative h-8 w-8 rounded-full ">
                                        <Avatar className="h-[42px] w-[42px]">
                                            <AvatarFallback>
                                                {data.image_url == "" ? (
                                                    <FaUser className="text-black h-4 w-4" />
                                                ) : (
                                                    <img src={data.image_url} />
                                                )}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="mt-2"
                                    align="end"
                                    forceMount
                                >
                                    <DropdownMenuLabel className="font-normal">
                                        <div className="flex flex-col space-y-1">
                                            <p className="text-sm/[14px] font-medium leading-none">
                                                {data?.name}
                                            </p>
                                            <p className="text-xs/[12px] leading-none text-muted-foreground">
                                                {data?.email}
                                            </p>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="py-2"
                                        onClick={() => navigate("/profile")}
                                    >
                                        <FaInfoCircle className="w-[14px] h-[14px] mr-2" />
                                        <span className="text-sm/[14px]">
                                            Thông tin người dùng
                                        </span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        className="py-2"
                                        onClick={handleLogout}
                                    >
                                        <IoLogOut className="w-[14px] h-[14px] mr-2" />
                                        <span className="text-sm/[14px]">
                                            Đăng xuất
                                        </span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    ) : (
                        <Link to={"/login"}>
                            <button className="text-white text-sm/[14px] w-[117px] py-[18px] font-medium hover:font-bold border border-white hover:border-2 rounded-[25px]">
                                Đăng nhập
                            </button>
                        </Link>
                    )}
                </div>
            </header>
            <header className="bg-white sticky z-[50] -top-3 justify-center items-center w-full h-[102px] sm:hidden"></header>
        </>
    );
};

export default Header;
