import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";
import { MessageModel } from "../../models/MessageModel";
import { css } from "@emotion/react";
import { fetchData } from "../../helpers/fetchData";
import { socket } from "../../socket";

const messageStyle = (isMyMessage: boolean) =>
    css({
        padding: "10px 15px",
        borderRadius: isMyMessage ? "20px 20px 0 20px" : "20px 20px 20px 0",
        backgroundColor: isMyMessage ? "#e3fee0" : "#ffffff",
        width: "fit-content",
        margin: isMyMessage ? "5px 0 5px auto" : "5px auto 5px 0",
    });

const MessageList: FC<{ id: string | undefined }> = ({ id }) => {
    const [messageList, setMessageList] = useState<MessageModel[]>([]);
    const messageDiv = useRef<HTMLInputElement>(null);
    const user = localStorage.getItem("user");

    useLayoutEffect(() => {
        messageDiv.current?.scrollTo({
            top: messageDiv.current?.scrollHeight,
            left: 0,
        });
    });

    useEffect(() => {
        fetchData<MessageModel[]>(`/messages/${id}`, "GET").then(({ data }) => {
            data ? setMessageList(data) : setMessageList([]);
        });

        socket.on("addMessage", (messageDB) => {
            if(messageDB.chatId === id) setMessageList((prev) => [...prev, messageDB]);
        });

        return () => {
            socket.off("addMessage");
        };
    }, [id]);

    return (
        <div ref={messageDiv}>
            {messageList &&
                messageList.map((message) => (
                    <div
                        css={messageStyle(message.userId === user)}
                        key={message._id}
                    >
                        {message.text}
                    </div>
                ))}
        </div>
    );
};

export default MessageList;
