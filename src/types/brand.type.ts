import { Product } from "./product.type";

export type Brand = {
    _id: string;
    name: string;
    description: string;
    status: boolean;
    product: Product[];
};

export type CreateBrand = Omit<Brand, "_id" | "product">;
