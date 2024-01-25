import { FC, useEffect, useState } from "react";
import { css } from '@emotion/react'
import { NavLink } from "react-router-dom";

type chat = {
    _id: string;
    name: string;
    members: string[],
    created_at: string
};

const chatListStyle = css({
    width: '30%',
    padding: '10px 20px'
})

const ChatList: FC = () => {
    const [chats, setChats] = useState<chat[]>([]);
    const user = localStorage.getItem('user');

    //  useEffect(() => {
    //     const addUser = fetch("http://localhost:3000/chats", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: "user 1",
    //             members: ['65b105a2051494e20121fed8', '65b105a9051494e20121fedc']
    //         }),
    //     });

    //     addUser
    //         .then((res) => res.text())
    //         .then((res) => console.log(res))
    //         .catch((error) => console.error(error));
    // }, []);

    useEffect(() => {
        const getChats = fetch(
            `http://localhost:3000/chats/${user}`
        );
        getChats
            .then((res) => res.json())
            .then((res) => {
                res ? setChats(res) : setChats([]);
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <ul css={chatListStyle}>
            {chats && chats.map((chat) => <li key={chat._id}><NavLink to={ '/chats/' + chat._id }>{chat.name}</NavLink></li>)}
        </ul>
    );
};

export default ChatList;
