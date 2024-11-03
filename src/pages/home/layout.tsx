import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import React from "react";
import { Outlet } from "react-router-dom";

function LayoutHomePage() {
    return (
        <div className="flex flex-col">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default LayoutHomePage;
