import { chatSocket } from "@/api/socket";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetConversation } from "@/hooks/query-chats/useGetConversation";
import { useGetMessages } from "@/hooks/query-chats/useGetMessage";
import { useGetMeUser } from "@/hooks/query-users/useGetMeUser";
import useDebounce from "@/hooks/useDebouce";
import { Conversation } from "@/types/conversation.type";
import { Message } from "@/types/message.type";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { BsSendFill } from "react-icons/bs";

function ChatPage() {
    const { data: me } = useGetMeUser();
    const [value, setValue] = useState("");
    const [select, setSelect] = useState("");
    const [initialConversations, setInitialConversations] = useState<
        Conversation[]
    >([]);
    const queryClient = useQueryClient();
    const { data: conversations } = useGetConversation(me?._id ?? "");
    const { data: messages } = useGetMessages(select, me?._id ?? "");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const handleSetValue = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setValue(e.target.value);
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
                    id: select,
                },
                message: value,
            });
            setValue("");
            console.log("select", select);
            queryClient.refetchQueries({ queryKey: ["messages", select] });
        }
    };

    const handleSelectMessage = (id: string) => {
        setSelect(id);
    };

    const handleSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value;
        const updatedConversations = initialConversations.map(
            (conversation) => {
                const filteredParticipants = conversation.participants.filter(
                    (participant) =>
                        participant.email
                            .toLowerCase()
                            .includes(search.toLowerCase())
                );
                return {
                    _id: conversation._id,
                    participants: filteredParticipants,
                    messages: conversation.messages,
                    created_at: conversation.created_at,
                };
            }
        );
        if (search === "") {
            setInitialConversations(conversations ?? []);
            return;
        }
        setInitialConversations(updatedConversations);
    };

    useEffect(() => {
        if (conversations && conversations?.length > 0) {
            setInitialConversations(conversations);
        }
    }, [conversations]);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);

    useEffect(() => {
        const refetchChat = (data: Message) => {
            queryClient.refetchQueries({ queryKey: ["messages"] });
            if (data.receiver.id == me?._id) {
                setIsTyping(false);
            }
        };

        const typingChat = (id: string) => {
            if (id == select) {
                setIsTyping(true);
            }
        };
        const noTypingChat = (id: string) => {
            if (id == select) {
                setIsTyping(false);
            }
        };

        chatSocket.on("receive-messages", refetchChat);
        chatSocket.on("typing", typingChat);
        chatSocket.on("notyping", noTypingChat);

        return () => {
            chatSocket.off("receive-messages", refetchChat);
            chatSocket.off("typing", typingChat);
            chatSocket.off("notyping", noTypingChat);
        };
    }, [select]);
    return (
        <>
            {me?.role[0] === "ADMIN" ? (
                <div className="w-full">
                    <h1 className="text-2xl font-bold">Quản lý tin nhắn</h1>
                    <div className="flex justify-between w-full mt-6 h-[500px]">
                        <div className="shadow-md h-full w-[27%] bg-white p-4 overflow-y-scroll">
                            <div className="sticky top-0 bg-white pb-4">
                                <Input
                                    onChange={handleSearchValue}
                                    placeholder="Tìm kiếm theo gmail"
                                />
                            </div>
                            <div className="">
                                {initialConversations?.map((item) =>
                                    item.participants
                                        .filter((par) => par.id !== me?._id)
                                        .map((parM) => (
                                            <button
                                                key={parM.id}
                                                onClick={() =>
                                                    handleSelectMessage(parM.id)
                                                }
                                                className={`${
                                                    select === parM.id &&
                                                    "bg-black text-white"
                                                } line-clamp-1 rounded-lg p-2 my-1 flex w-full cursor-pointer items-center justify-start gap-2 px-2 text-black hover:bg-yellow-300 hover:text-black`}
                                            >
                                                {parM.email}
                                            </button>
                                        ))
                                )}
                            </div>
                        </div>
                        <div className="shadow-md w-[72%] h-full bg-white">
                            <div className="flex border-b items-center p-4 w-full h-[10%] bg-white">
                                <h2 className="font-semibold text-[24px]">
                                    Tin nhắn từ:{" "}
                                    {messages?.messages[0].sender.name}
                                </h2>
                            </div>
                            <div className="flex flex-col gap-1 p-3 w-full h-[80%] bg-white overflow-y-scroll">
                                {messages?.messages?.map((item) => (
                                    <div
                                        className={`${
                                            me?._id === item.receiver.id
                                                ? "self-start border"
                                                : "self-end bg-black text-white"
                                        } p-2 inline-block rounded-lg`}
                                        key={item._id}
                                    >
                                        <p>{item.message}</p>

                                        <p className="text-[10px]">
                                            {format(
                                                item.created_at,
                                                "HH:mm dd/MM"
                                            )}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-1 px-2 justify-center items-center border-t w-full h-[10%] bg-white">
                                <Input
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
                    </div>
                </div>
            ) : (
                <div>
                    <p>Người dùng không đủ phân quyền</p>
                </div>
            )}
        </>
    );
}

export default ChatPage;
