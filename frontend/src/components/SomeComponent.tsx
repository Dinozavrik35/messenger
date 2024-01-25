import React, { FC, useEffect, useState } from "react";

type User = {
    _id: string,
    id: string,
    name: string,
    creationDate: string
}


type Chat = {
    _id: string,
    id: string,
    name: string,
    creationDate: string
}

const SomeComponent: FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);

    useEffect(() => {
        const getUsers = fetch("http://localhost:3000/users");
        getUsers
            .then(res => res.json())
            .then((res) => {
                res ? setUsers(res) : setUsers([]);
            })
            .catch((error) => console.error(error));
    }, []);

    useEffect(() => {
        const getChats = fetch("http://localhost:3000/chats");
        getChats
            .then(res => res.json())
            .then((res) => {
                res ? setChats(res) : setChats([]);
            })
            .catch((error) => console.error(error));
    }, []);


    // useEffect(() => {
    //     const addUser = fetch("http://localhost:3000/chats", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             name: "user 1",
    //             members: ['65b105a2051494e20121fed8']
    //         }),
    //     });

    //     addUser
    //         .then((res) => res.text())
    //         .then((res) => console.log(res))
    //         .catch((error) => console.error(error));
    // }, []);

    return (
        <>
            чаты
            {chats && chats.map((chat) => <div className="chat-item" key={chat._id}>{chat.name}</div>)}
        </>
    );
};

export default SomeComponent;
