import { Customer } from "./customer.type";
import { Product } from "./product.type";

export type Review = {
    _id: string;
    customer_id: Customer;
    product_id: Product;
    comment: string;
    point: number;
};

export type CreateReview = Omit<
    Review,
    "_id" | "customer_id" | "product_id"
> & {
    product_id: string;
};
