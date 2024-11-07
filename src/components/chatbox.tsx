import { chatSocket } from "@/api/socket";
import { useGetMeCustomer } from "@/hooks/query-customers/useGetMeCustomer";
import { Message } from "@/types/message.type";
import { useQueryClient } from "@tanstack/react-query";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaMessage } from "react-icons/fa6";
import { Input } from "./ui/input";
import { BsSendFill } from "react-icons/bs";
import { useGetMessages } from "@/hooks/query-chats/useGetMessage";
import { format } from "date-fns";

function ChatBox() {
    const [value, setValue] = useState("");
    const { data: me } = useGetMeCustomer();
    const [show, setShow] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const queryClient = useQueryClient();
    const { data: messages } = useGetMessages(
        me?._id ?? "",
        "6720a9999470082c79a1cba4"
    );

    const handleSetValue = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(e.target.value);
        console.log(e.target.value);
        if (me) {
            chatSocket.emit("typing", me._id);
        }
    };

    const handleChat = () => {
        if (me) {
            chatSocket.emit("send-messages", {
                sender: {
                    id: me._id,
                    name: me.name,
                    email: me.email,
                },
                receiver: {
                    id: "6720a9999470082c79a1cba4",
                    name: "Kewtie",
                    email: "kewtie@gmail.com",
                },
                message: value,
            });
            setValue("");
        }
        queryClient.refetchQueries({ queryKey: ["messages"] });
    };

    useEffect(() => {
        const refetchChat = (data: Message) => {
            if (data.receiver.id == me?._id) {
                queryClient.refetchQueries({ queryKey: ["messages"] });
                setIsTyping(false);
            }
        };
        const typingChat = (id: string) => {
            if (id == "6720a9999470082c79a1cba4") {
                setIsTyping(true);
            }
        };

        chatSocket.on("receive-messages", refetchChat);
        chatSocket.on("typing", typingChat);

        return () => {
            chatSocket.off("receive-messages", refetchChat);
            chatSocket.off("typing", typingChat);
        };
    }, [me]);

    return (
        <div className="sticky min-h-20 bottom-5 ">
            <div
                className={`${
                    show ? "block" : "hidden"
                } h-[400px] w-[300px] shadow-lg bg-white absolute right-8 bottom-[70px] rounded-lg`}
            >
                <div className="flex justify-between items-center px-5 h-[11%] rounded-t-lg border-b border-gray-400">
                    <div>
                        <h3 className="font-semibold text-[20px]">Kewtie</h3>
                    </div>
                    <button onClick={() => setShow(false)}>
                        <AiOutlineClose />
                    </button>
                </div>
                <div className="flex flex-col gap-1 items-end w-full h-[75%] p-3 overflow-y-scroll">
                    {messages?.messages.map((message) => (
                        <div
                            key={message._id}
                            className=" text-white p-2 inline-block bg-black rounded-lg text-right"
                        >
                            <p>{message.message}</p>
                            <p className="text-[10px]">
                                {format(message.created_at, "HH:mm dd/MM")}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="flex justify-between h-[14%] border-t border-gray-400 p-[10px]">
                    <Input
                        className="w-[84%]"
                        value={value}
                        onChange={(e) => handleSetValue(e)}
                    />
                    <button
                        onClick={handleChat}
                        className="flex justify-center items-center rounded-lg bg-black text-white hover:bg-yellow-300 hover:text-black active:bg-yellow-500 h-9 w-9"
                    >
                        <BsSendFill />
                    </button>
                </div>
            </div>
            <button
                onClick={() => setShow(!show)}
                className="absolute bottom-0 right-16 p-4 rounded-full bg-black border border-white"
            >
                <FaMessage className="text-white" size={28} />
            </button>
        </div>
    );
}

export default ChatBox;
