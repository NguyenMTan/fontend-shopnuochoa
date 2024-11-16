export type Report = {
    gross_sales: number;
    net_sales: number;
    orders_count: number;
    date: string;
};

export type ReportCustomer = {
    customer_used: number;
    customer_register: number;
};

export type ReportOrder = {
    status: string;
    order_count: number;
};
