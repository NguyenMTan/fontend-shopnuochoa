export type Customer = {
    _id: string;
    name: string;
    email: string;
    password: string;
    status: boolean;
    address: string;
    phone_number: string;
    gender: string;
    image_id: string;
    image_url: string;
    createdAt: string;
    updatedAt: string;
};

export type UpdateCustomer = Pick<
    Customer,
    "name" | "address" | "phone_number" | "gender"
>;
