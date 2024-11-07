import { Cart } from "@/types/cart.type";
import { Review } from "@/types/review.type";

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

export const formatNumber = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price);
};

export const calSale = (price: number, sale: number) => {
    return price - (price * sale) / 100;
};

export const totalItemsNoSale = (carts: Cart[]) => {
    let total = 0;

    for (const item of carts) {
        total += item.product_id.price * item.quantity;
    }
    return total;
};

export const totalItems = (carts: Cart[]) => {
    let total = 0;

    for (const item of carts) {
        const sale = item.product_id.price * (item.product_id.sale / 100);
        total += (item.product_id.price - sale) * item.quantity;
    }
    return total;
};

export const calAvg = (reviews: Review[]) => {
    let sum = 0;
    const quantity = reviews.length;

    if (quantity == 0) {
        return 0;
    }

    for (const item of reviews) {
        sum += item.point;
    }

    const avg = sum / quantity;

    const formatted = parseFloat(avg.toFixed(1));

    return formatted;
};