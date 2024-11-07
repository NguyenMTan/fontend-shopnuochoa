import { InfoMes, Message } from "./message.type";

export type Conversation = {
    _id: string;
    participants: InfoMes[];
    messages: Message[];
    created_at: string;
};
