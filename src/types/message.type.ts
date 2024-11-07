export type InfoMes = {
    id: string;
    email: string;
    name: string;
};

export type Message = {
    _id: string;
    created_at: string;
    sender: InfoMes;
    receiver: InfoMes;
    message: string;
};
