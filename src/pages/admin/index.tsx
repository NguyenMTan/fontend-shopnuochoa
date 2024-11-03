import React from "react";
import SideBar from "@/components/admin/sidebar";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/admin/topbar";

function LayoutAdminPage() {
    return (
        <div className="flex bg-[#eee]">
            <SideBar />
            <div className="container p-8">
                <TopBar />
                <div className="p-8">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default LayoutAdminPage;
