export type User = {
    _id: string;
    email: string;
    name: string;
    status: boolean;
    role: string[];
};

export type CreateUser = Omit<User, "_id" | "role">;
