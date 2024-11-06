import hero from "@/assets/hero.jpg";
import heroTwo from "@/assets/hero2.jpg";
import { Link } from "react-router-dom";
import "animate.css";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useGetThreeProducts } from "@/hooks/query-products/useGetThreeProducts";
import { calSale, formatPrice } from "@/utils/common";
import doublequotes from "@/assets/doublequotes.svg";
import logoChannel from "@/assets/chanel_logo.png";
import logoGucci from "@/assets/gucci_logo.png";
import logoDior from "@/assets/dior_logo.jpg";
import logoYSL from "@/assets/ysl_logo.png";
import logoTomFord from "@/assets/Tom-Ford-Logo.png";
import logoVersace from "@/assets/versaceLogo.png";
import thumbNoImage from "@/assets/thumb-no-image.png";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllBlogs } from "@/hooks/query-blogs/useGetAllBlogs";

function HomePage() {
    const { data: products } = useGetThreeProducts();
    const { data: blogs } = useGetAllBlogs({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: "",
    });

    return (
        <>
            <div className="w-full bg-black">
                <div className="flex justify-between items-center w-[1170px] mx-auto mt-[57px] mb-[30px]">
                    <div className="w-[517px]">
                        <h1 className="animate__bounceIn font-semibold text-[70px]/[80px] text-white -tracking-[1.4px]">
                            Khám Phá Thế Giới Nước Hoa.
                        </h1>
                        <p className="text-white font-light text-lg/[30px] mt-[22px]">
                            Hương thơm tinh tế từ những thương hiệu hàng đầu,
                            mang đến cho bạn trải nghiệm độc đáo và dấu ấn khó
                            phai.
                        </p>
                        <div className="flex items-center mt-[38px] gap-[38px]">
                            <Link to={"/products"}>
                                <button className="w-[205px] h-[60px] bg-white rounded-[30px] hover:bg-yellow-300">
                                    <p className="font-semibold text-[18px]">
                                        Mua ngay
                                    </p>
                                </button>
                            </Link>
                            <Link to={"/contact"}>
                                <p className="font-semibold text-white text-[18px]/[30px] hover:underline">
                                    hoặc liên hệ Kewtie
                                </p>
                            </Link>
                        </div>
                    </div>
                    <div className="relative flex w-[534px] items-center">
                        <img
                            src={hero}
                            className="w-[330px] h-[540px] rounded-[6px] object-cover z-10"
                            alt=""
                        />
                        <img
                            src={heroTwo}
                            className="-ml-[6px] w-[210px] h-[410px] rounded-[6px] object-cover"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="w-[1170px] mx-auto my-[60px]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="animate__animated animate__backInLeft font-bold text-[38px]/[48px] -tracking-[2%]">
                                Sản phẩm đang giảm giá
                            </h2>
                            <p className="font-normal text-[18px]/[30px] mt-4 w-[458px] text-gray-500">
                                Trải nghiệm những hương thơm đẳng cấp với giá ưu
                                đãi, mang đến phong cách và sự tự tin cho bạn
                                mỗi ngày.
                            </p>
                        </div>
                        <div className="flex gap-[18px]">
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("carouselPrevious")
                                        ?.click()
                                }
                                className="h-[40px] w-[40px] bg-black rounded-full text-white flex justify-center items-center hover:bg-yellow-300 hover:text-black"
                            >
                                <SlArrowLeft />
                            </button>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("carouselNext")
                                        ?.click()
                                }
                                className="h-[40px] w-[40px] bg-black rounded-full text-white flex justify-center items-center hover:bg-yellow-300 hover:text-black"
                            >
                                <SlArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-[1170px] mx-auto my-[60px]"
                >
                    <CarouselContent>
                        {products?.map((product) => (
                            <CarouselItem
                                key={product._id}
                                className="md:basis-1/2 lg:basis-1/3"
                            >
                                <div>
                                    <Card className="relative">
                                        {product.image_url ? (
                                            <Link
                                                to={`/products/${product._id}`}
                                            >
                                                <img
                                                    src={product.image_url}
                                                    className="w-full h-[278px] object-cover rounded-t-xl"
                                                    alt=""
                                                />
                                            </Link>
                                        ) : (
                                            <Link
                                                to={`/products/${product._id}`}
                                            >
                                                <img
                                                    src={thumbNoImage}
                                                    className="w-full h-[278px] object-cover rounded-t-xl"
                                                    alt=""
                                                />
                                            </Link>
                                        )}
                                        <div
                                            className="rounded-tr-xl absolute top-0 right-0 bg-red-600 h-[70px] w-[70px] flex justify-end p-2 box-border items-start"
                                            style={{
                                                clipPath:
                                                    "polygon(0 0, 100% 100%, 100% 0)",
                                            }}
                                        >
                                            <p className="text-white">
                                                -{product.sale}%
                                            </p>
                                        </div>
                                        <CardContent className="">
                                            <h2 className="text-[18px]/[30px] font-semibold py-4 line-clamp-1 h-[40px]">
                                                {product.name}
                                            </h2>
                                            <p className="text-gray-500 mt-[6px] text-[14px]/[21px] line-clamp-1 h-[21px]">
                                                {product.short_description}
                                            </p>
                                            <div className="flex mt-4 justify-between items-center">
                                                <p className="text-red-500 font-semibold text-[18px]/[30px]">
                                                    {formatPrice(
                                                        calSale(
                                                            product.price,
                                                            product.sale
                                                        )
                                                    )}
                                                </p>
                                                <Link
                                                    to={`/products/${product._id}`}
                                                >
                                                    <button className="w-[118px] h-[50px] rounded-full text-[14px]/[26px] bg-black hover:bg-yellow-300 hover:text-black text-white font-semibold">
                                                        Xem chi tiết
                                                    </button>
                                                </Link>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious
                        id="carouselPrevious"
                        className="hidden"
                    />
                    <CarouselNext id="carouselNext" className="hidden" />
                </Carousel>
            </div>
            <div className="w-full bg-black ">
                <div className="flex items-center w-[1170px] mx-auto my-[80px]">
                    <div className="w-[41.97%]">
                        <img src={doublequotes} alt="" />
                        <p className="text-white text-[32px]/[48px] w-[419px] mt-3">
                            "Khám phá bộ sưu tập nước hoa từ các thương hiệu
                            danh tiếng như Chanel, Dior, Gucci, Tom Ford,
                            Versace, và YSL - nơi hương thơm đẳng cấp gặp gỡ
                            phong cách thời thượng."
                        </p>
                    </div>
                    <div className="relative w-[58.03%] h-[481px]">
                        <div className="absolute top-[107px] right-[171px] flex justify-center items-center bg-white w-[235px] h-[235px] rounded-full object-cover">
                            <img
                                className="w-[180px] h-[115px] object-cover"
                                src={logoChannel}
                                alt=""
                            />
                        </div>
                        <div className="absolute top-0 right-[443px] flex justify-center items-center bg-white w-[92px] h-[92px] rounded-full object-cover">
                            <img
                                className="w-[75px] h-[65px] object-cover"
                                src={logoGucci}
                                alt=""
                            />
                        </div>
                        <div className="absolute top-[19px] right-0 flex justify-center items-center bg-white w-[110px] h-[110px] rounded-full object-cover">
                            <img
                                className="w-[72px] h-[85px] object-cover"
                                src={logoVersace}
                                alt=""
                            />
                        </div>
                        <div className="absolute top-[258px] right-[601px] flex justify-center items-center bg-white w-[78px] h-[78px] rounded-full object-cover">
                            <img
                                className="w-[70px] h-[40px] object-cover"
                                src={logoTomFord}
                                alt=""
                            />
                        </div>
                        <div className="absolute bottom-0 right-[389px] flex justify-center items-center bg-white w-[78px] h-[78px] rounded-full object-cover">
                            <img
                                className="w-[80px] h-[50px] object-cover"
                                src={logoYSL}
                                alt=""
                            />
                        </div>
                        <div className="absolute bottom-[29px] right-[32px] flex justify-center items-center bg-white w-[78px] h-[78px] rounded-full object-cover">
                            <img
                                className="w-[80px] h-[50px] object-cover"
                                src={logoDior}
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full">
                <div className="flex justify-between w-[1170px] my-24 mx-auto items-center">
                    <div className="w-2/5">
                        <h2 className="animate__animated animate__backInLeft w-full font-bold text-[38px]/[48px] -tracking-[2%]">
                            Tìm hiểu nước hoa qua bài viết của chúng tôi.
                        </h2>
                        <Link to={"/blogs"}>
                            <p className="mt-4 hover:underline font-medium">
                                Xem hết tất cả bài viết
                            </p>
                        </Link>
                        <div className="flex mt-4 gap-[18px]">
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("carouselPreviousBlog")
                                        ?.click()
                                }
                                className="h-[40px] w-[40px] bg-black rounded-full text-white flex justify-center items-center hover:bg-yellow-300 hover:text-black"
                            >
                                <SlArrowLeft />
                            </button>
                            <button
                                onClick={() =>
                                    document
                                        .getElementById("carouselNextBlog")
                                        ?.click()
                                }
                                className="h-[40px] w-[40px] bg-black rounded-full text-white flex justify-center items-center hover:bg-yellow-300 hover:text-black"
                            >
                                <SlArrowRight />
                            </button>
                        </div>
                    </div>
                    <div className="w-[55%]">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-full"
                        >
                            <CarouselContent>
                                {blogs?.entities?.map((blog) => (
                                    <CarouselItem
                                        key={blog._id}
                                        className="md:basis-1/2 lg:basis-1/2"
                                    >
                                        <div>
                                            <Card className="relative">
                                                {blog.image_url ? (
                                                    <Link
                                                        to={`/blogs/${blog._id}`}
                                                    >
                                                        <img
                                                            src={blog.image_url}
                                                            className="w-full h-[278px] object-cover rounded-t-xl"
                                                            alt=""
                                                        />
                                                    </Link>
                                                ) : (
                                                    <Link
                                                        to={`/blogs/${blog._id}`}
                                                    >
                                                        <img
                                                            src={thumbNoImage}
                                                            className="w-full h-[278px] object-cover rounded-t-xl"
                                                            alt=""
                                                        />
                                                    </Link>
                                                )}

                                                <CardContent className="">
                                                    <h2 className="text-[18px]/[30px] font-semibold py-4 line-clamp-2 h-[80px]">
                                                        {blog.title}
                                                    </h2>
                                                    <p className="text-gray-500 mt-[6px] text-[14px]/[21px] line-clamp-1 h-[21px]">
                                                        Ngày:{" "}
                                                        {new Date(
                                                            blog.created_at
                                                        ).toLocaleDateString()}
                                                    </p>
                                                    <div className="flex mt-4 justify-end items-center">
                                                        <Link
                                                            to={`/blogs/${blog._id}`}
                                                        >
                                                            <button className="w-[118px] h-[50px] rounded-full text-[14px]/[26px] bg-black hover:bg-yellow-300 hover:text-black text-white font-semibold">
                                                                Đọc thêm
                                                            </button>
                                                        </Link>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious
                                id="carouselPreviousBlog"
                                className="hidden"
                            />
                            <CarouselNext
                                id="carouselNextBlog"
                                className="hidden"
                            />
                        </Carousel>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HomePage;
