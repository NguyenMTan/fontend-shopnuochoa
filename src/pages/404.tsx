import React from "react";
import image from "@/assets/404.47d3773f.gif";
import { Link } from "react-router-dom";

function NotFoundPage() {
    return (
        <div className="flex flex-col gap-5 justify-center items-center h-screen">
            <img src={image} alt="" />
            <h1 className="text-3xl font-medium">
                Không tìm thấy trang hiện tại
            </h1>
            <Link to={"/"}>
                <button className="bg-black text-white py-2 text-xl px-4 rounded-lg hover:bg-yellow-300 hover:text-black active:bg-yellow-500">
                    Quay về trang chủ
                </button>
            </Link>
        </div>
    );
}

export default NotFoundPage;
