import Footer from "@/components/home/Footer";
import Header from "@/components/home/Header";
import ScrollToTop from "@/components/scroll-to-top";
import { Outlet } from "react-router-dom";

function LayoutHomePage() {
    return (
        <div className="flex flex-col">
            <ScrollToTop />
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default LayoutHomePage;
