import { FC, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";
import { socket } from "../../socket";
import { fetchData } from "../../helpers/fetchData";
import { ChatModel } from "../../models/ChatModel";

const chatListStyle = css({
    listStyle: "none",
    marginTop: "10px",
    li: {
        marginBottom: "5px",
        a: {
            display: "flex",
            alignItems: "center",
            span: {
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginRight: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                borderRadius: "50%",
                backgroundColor: "#e3fee0",
                padding: "5px",
                width: "50px",
                height: "50px",
                aspectRatio: "1 / 1",
            },
        },
    },
});

const chatListElementStyle = (online: boolean) =>
    css({
        borderRadius: "15px",
        transition: "all 0.3s",
        padding: "15px",
        display: "block",
        textDecoration: "none",
        color: "inherit",
        width: "100%",
        height: "100%",
        position: "relative",
        "&:hover": {
            backgroundColor: "#f3f6f7",
        },
        "&.active": {
            backgroundColor: "#cff3ff",
        },
        p: {
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
        },
        "p:first-of-type": {
            fontWeight: "bold",
        },
        "p:last-of-type": {
            fontSize: "15px",
        },
        "&:before": online
            ? {
                  content: '""',
                  position: "absolute",
                  top: "5px",
                  right: "5px",
                  backgroundColor: "green",
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  aspectRatio: "1 / 1",
              }
            : {},
    });

const ChatList: FC = () => {
    const [chats, setChats] = useState<ChatModel[]>([]);
    const [chatRerender, setChatRerender] = useState(false);
    const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

    const user = localStorage.getItem("user");

    useEffect(() => {
        socket.on("addChat", (chatDB) => {
            setChats((prev) => [chatDB, ...prev]);
            console.log(chats);
        });

        socket.on("chatsUpdated", () => {
            setChatRerender((prev) => !prev);
        });

        socket.on("new-connection", (data: string) => {
            setOnlineUsers(new Set([...onlineUsers, data]));
        });

        socket.on("online-users", (data: string) => {
            setOnlineUsers(new Set([...onlineUsers, ...data]));
        });

        socket.on("connection-removed", (data: string) => {
            console.log(data);
            setOnlineUsers(
                new Set([
                    ...Array.from(onlineUsers).filter((item) => item !== data),
                ])
            );
        });

        return () => {
            socket.off("addChat");
            socket.off("addMessage");
            socket.off("new-connection");
            socket.off("connection-removed");
        };
    }, [onlineUsers]);

    useEffect(() => {
        fetchData<ChatModel[]>(`/chats/${user}`, "GET").then(({ data }) => {
            data ? setChats(data) : setChats([]);
        });
        console.log("fetch");
    }, [chatRerender]);

    return (
        <ul css={chatListStyle}>
            {chats &&
                chats.map((chat) => (
                    <li key={chat._id}>
                        <NavLink
                            css={
                                Array.from(onlineUsers).filter((value) =>
                                    chat.members.includes(value)
                                ).length > 1
                                    ? chatListElementStyle(true)
                                    : chatListElementStyle(false)
                            }
                            state={chat.members.filter((item) => item !== user)}
                            to={"/chats/" + chat._id}
                        >
                            <span>
                                {chat.members
                                    .filter((item) => item !== user)[0][1]
                                    .toUpperCase()}
                            </span>
                            <div>
                                <p>
                                    {chat.members.filter(
                                        (item) => item !== user
                                    )}
                                </p>
                                {chat.latestMessage && (
                                    <p>{chat.latestMessage}</p>
                                )}
                            </div>
                        </NavLink>
                    </li>
                ))}
        </ul>
    );
};

export default ChatList;
