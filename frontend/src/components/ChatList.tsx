import { FC, useEffect, useState } from "react";
import { css } from "@emotion/react";
import { NavLink } from "react-router-dom";

type chat = {
    _id: string;
    name: string;
    members: string[];
    created_at: string;
};

const chatListStyle = css({
    listStyle: 'none',
    marginTop: '10px',
    'li': {
        marginBottom: '5px'
    }
});

const chatListElementStyle = css({
    borderRadius: '15px',
    transition: 'all 0.3s',
    display: 'block',
    padding: '20px',
    textDecoration: 'none',
    color: 'inherit',
    width: '100%',
    height: '100%',
    '&:hover': {
        backgroundColor: '#f3f6f7'
    },
    '&.active': {
        backgroundColor: '#cff3ff'
    }
});

const ChatList: FC = () => {
    const [chats, setChats] = useState<chat[]>([]);
    const user = localStorage.getItem("user");

    useEffect(() => {
        const getChats = fetch(`http://localhost:3000/chats/${user}`);
        getChats
            .then((res) => res.json())
            .then((res) => {
                res ? setChats(res) : setChats([]);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <ul css={chatListStyle}>
            {chats &&
                chats.map((chat) => (
                    <li key={chat._id}>
                        <NavLink css={chatListElementStyle} to={"/chats/" + chat._id}>{chat.name}</NavLink>
                    </li>
                ))}
        </ul>
    );
};

export default ChatList;
