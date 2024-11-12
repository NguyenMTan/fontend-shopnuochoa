import { Link } from "react-router-dom";
import { MdBrandingWatermark, MdCategory } from "react-icons/md";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import logoBlack from "@/assets/kewtie-black.png";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { useState } from "react";
import { RiHome2Fill, RiMessage2Fill } from "react-icons/ri";
import { FaTags, FaUsers } from "react-icons/fa6";
import { GiDelicatePerfume } from "react-icons/gi";
import { IoNewspaperSharp, IoPeople } from "react-icons/io5";
import { AiFillFileText } from "react-icons/ai";
import { BiLogoBlogger } from "react-icons/bi";

const menuItems = [
    {
        title: "Trang chủ",
        icon: <RiHome2Fill className="h-5 w-5" />,
        link: "/admin",
    },
    {
        title: "Người dùng",
        icon: <IoPeople className="h-5 w-5" />,
        link: "/admin/users",
    },
    {
        title: "Danh mục",
        icon: <MdCategory className="h-5 w-5" />,
        link: "/admin/categories",
    },
    {
        title: "Thương hiệu",
        icon: <FaTags className="h-5 w-5" />,
        link: "/admin/brands",
    },
    {
        title: "Sản phẩm",
        icon: <GiDelicatePerfume className="h-5 w-5" />,
        link: "/admin/products",
    },
    {
        title: "Khách hàng",
        icon: <FaUsers className="h-5 w-5" />,
        link: "/admin/customers",
    },
    {
        title: "Hóa đơn",
        icon: <AiFillFileText className="h-5 w-5" />,
        link: "/admin/orders",
    },
    {
        title: "Bài viết",
        icon: <IoNewspaperSharp className="h-5 w-5" />,
        link: "/admin/blogs",
    },
    {
        title: "Tin nhắn",
        icon: <RiMessage2Fill className="h-5 w-5" />,
        link: "/admin/chats",
    },
];

function SideBar() {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className="sticky top-0 h-screen flex items-start relative">
            <Sidebar
                className="h-screen border-r "
                collapsed={collapsed}
                collapsedWidth="85px"
                transitionDuration={1000}
            >
                <img
                    src={logoBlack}
                    className="w-[250px] h-[150px] object-cover"
                    alt=""
                />

                <Menu
                    menuItemStyles={{
                        button: ({ level, active }) => {
                            return {
                                backgroundColor: active ? "#333" : undefined,
                                color: active ? "#000" : "#fff",
                                "&:hover": {
                                    backgroundColor: "#eee",
                                    color: "#000",
                                },
                                [`&.active`]: {
                                    backgroundColor: "red",
                                    color: "#b6c8d9",
                                },
                            };
                        },
                    }}
                    className="bg-black h-[579px] pt-5 "
                >
                    {menuItems.map((item) => (
                        <MenuItem
                            className="text-white font-bold"
                            icon={item.icon}
                            component={<Link to={item.link} />}
                        >
                            {item.title}
                        </MenuItem>
                    ))}
                    <button
                        className="absolute bottom-[10px] right-[29px] w-[35px] h-[35px] rounded-full bg-white flex justify-center items-center"
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <div>
                            {collapsed ? (
                                <GoChevronRight className="text-black " />
                            ) : (
                                <GoChevronLeft className="text-black " />
                            )}
                        </div>
                    </button>
                </Menu>
            </Sidebar>
        </div>
    );
}

export default SideBar;
