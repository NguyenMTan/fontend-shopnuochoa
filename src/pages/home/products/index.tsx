import CategoryItem from "@/components/home/category-item";
import { Input } from "@/components/ui/input";
import { useGetAllCategories } from "@/hooks/query-categories/useGetAllCategories";
import { useGetProductsByCategory } from "@/hooks/query-products/useGetProductByCategory";
import useDebounce from "@/hooks/useDebouce";
import { calSale, formatPrice } from "@/utils/common";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import thumbNoImage from "@/assets/thumb-no-image.png";
import { useGetAllNameBrands } from "@/hooks/query-brands/useGetAllNameBrands";
import { ParamProduct } from "@/types/pagination.type";

function ProductsHomePage() {
    const { data: categories } = useGetAllCategories({
        page: 1,
        limit: 100,
        sort: "asc",
        keyword: "",
    });
    const { data: brands } = useGetAllNameBrands();
    const [keyword, setKeyword] = useState("");
    const debounced = useDebounce(keyword, 500);
    const [categoryId, setCategoryId] = useState("all");
    const [brandId, setBrandId] = useState("all");
    const paramProduct: ParamProduct = {
        brand_id: brandId,
        category_id: categoryId,
        keyword: debounced,
    };

    const handleGetAllProduct = () => {
        setBrandId("all");
        setCategoryId("all");
    };

    const { data: products } = useGetProductsByCategory(paramProduct);

    return (
        <div className="relative w-full mx-auto flex justify-between gap-2 p-10">
            <div className="sticky top-[142px] h-[500px] flex w-[16%] flex-col gap-2 p-2">
                <Input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Tìm kiếm ..."
                />
                <div className="scroll-sidebar h-[400px] overflow-y-scroll">
                    <button
                        className="flex justify-start items-center pl-2 h-9 w-[100%] rounded-md hover:bg-yellow-300 focus:bg-black focus:text-white"
                        onClick={handleGetAllProduct}
                    >
                        <p className="text-[16px]/[16px] font-medium">
                            Tất cả sản phẩm
                        </p>
                    </button>
                    <div>
                        <p className="pl-2 font-semibold mb-2">Danh mục</p>
                        {categories?.entities?.map((category) => (
                            <CategoryItem
                                setCategoryId={setCategoryId}
                                key={category._id}
                                category={category}
                                categoryId={categoryId}
                            />
                        ))}
                    </div>
                    <div>
                        <p className="pl-2 font-semibold mb-2">Thương hiệu</p>
                        {brands?.map((brand) => (
                            <button
                                onClick={() => setBrandId(brand._id)}
                                key={brand._id}
                                className="flex justify-start items-center pl-10 h-9 w-[100%] rounded-md hover:bg-yellow-300 focus:bg-black focus:text-white"
                            >
                                <p className="text-[16px]/[16px] font-medium">
                                    {brand.name}
                                </p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            <div className="relative w-[80%] gap-[14px] flex flex-wrap">
                {products?.map((product) => (
                    <div
                        key={product._id}
                        className="w-[24%] max-h-[420px] hover:shadow-xl rounded-xl border box-border"
                    >
                        <Link
                            className="relative"
                            to={`/products/${product._id}`}
                        >
                            {product.image_url ? (
                                <img
                                    src={product.image_url}
                                    className="w-full h-[250px] object-cover rounded-t-xl"
                                    alt=""
                                />
                            ) : (
                                <img
                                    src={thumbNoImage}
                                    className="w-full h-[250px] object-cover rounded-t-xl"
                                    alt=""
                                />
                            )}
                            {product.sale != 0 && (
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
                            )}
                        </Link>

                        <div className="w-full p-3 bg-white rounded-b-xl">
                            <h2 className="h-10 line-clamp-2 font-medium text-[18px]/[18px]">
                                {product.name}
                            </h2>
                            <p className="h-[30px] line-clamp-2 mt-2 text-[14px]/[14px]">
                                {product.short_description}
                            </p>
                            <div className="flex items-center justify-between mt-3">
                                <p className="text-[16px]/[16px] font-medium">
                                    {formatPrice(
                                        calSale(
                                            product?.price ?? 0,
                                            product?.sale ?? 0
                                        )
                                    )}
                                </p>
                                <Link to={`/products/${product._id}`}>
                                    <button className="h-[44px] w-[120px] bg-black rounded-3xl text-white hover:text-black hover:bg-yellow-300">
                                        Xem chi tiết
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductsHomePage;
