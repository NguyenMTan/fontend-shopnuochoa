import React from "react";
import logoBlack from "@/assets/kewtie-black.png";
import {
    FaFacebook,
    FaSquareInstagram,
    FaSquareXTwitter,
} from "react-icons/fa6";
import { AiFillInstagram, AiFillTikTok } from "react-icons/ai";
import { FaFacebookSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <div className="w-full bg-black mt-10">
            <div className="w-[1170px] flex justify-between mx-auto my-16">
                <img
                    src={logoBlack}
                    className="w-[250px] h-[150px] object-cover"
                    alt=""
                />
                <div className="w-[10%]">
                    <div className="flex flex-col gap-2 text-white font-light">
                        <h2 className=" font-semibold text-[18px] pb-3 border-b-2 border-white">
                            Kewtie
                        </h2>
                        <Link to={"/"} className="hover:underline">
                            <p>Trang chủ</p>
                        </Link>
                        <Link to={"/products"} className="hover:underline">
                            <p>Sản phẩm</p>
                        </Link>
                        <Link to={"/blogs"} className="hover:underline">
                            <p>Bài viết</p>
                        </Link>
                        <Link to={"/contact"} className="hover:underline">
                            <p>Liên hệ</p>
                        </Link>
                    </div>
                </div>
                <div className="w-[12%]">
                    <div className="flex flex-col gap-2 text-white font-light">
                        <h2 className=" font-semibold text-[18px] pb-3 border-b-2 border-white">
                            Mạng xã hội
                        </h2>
                        <a href="#" className="hover:underline">
                            <div className="flex items-center gap-2">
                                <FaFacebookSquare />
                                <p>Facebook</p>
                            </div>
                        </a>
                        <a href="#" className="hover:underline">
                            <div className="flex items-center gap-2">
                                <FaSquareInstagram />
                                <p>Instagram</p>
                            </div>
                        </a>
                        <a href="#" className="hover:underline">
                            <div className="flex items-center gap-2">
                                <AiFillTikTok />
                                <p>Tiktok</p>
                            </div>
                        </a>
                        <a href="#" className="hover:underline">
                            <div className="flex items-center gap-2">
                                <FaSquareXTwitter />
                                <p>Twitter</p>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-[20%]">
                    <div className="flex flex-col gap-2 text-white font-light">
                        <h2 className=" font-semibold text-[18px] pb-3 border-b-2 border-white">
                            Địa chỉ
                        </h2>
                        <p>
                            <strong className="font-medium">Vị trí: </strong>
                            phường An Khánh, quận Ninh Kiều, thành phố Cần Thơ
                        </p>
                        <p>
                            <strong className="font-medium">Email: </strong>
                            kewtie@gmail.com
                        </p>
                        <p>
                            <strong className="font-medium">
                                Số điện thoại:{" "}
                            </strong>
                            0123456789
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
