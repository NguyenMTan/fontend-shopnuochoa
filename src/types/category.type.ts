import { Product } from "./product.type";

export type Category = {
    _id: string;
    name: string;
    status: boolean;
    parent_id: string;
    children: Category[];
    product: Product[];
};

export type CreateCategory = Omit<Category, "_id" | "children" | "product">;
