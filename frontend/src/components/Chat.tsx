import { FC, useEffect, useState } from "react";
import { socket } from "../socket";
import { css } from '@emotion/react'
import { useParams } from "react-router-dom";

const messageStyle = (isMyMessage: boolean) => css({
    padding: '10px 15px',
    borderRadius: isMyMessage ? '20px 20px 0 20px' : '20px 20px 20px 0',
    backgroundColor: isMyMessage ? '#e3fee0' : '#ffffff',
    width: 'fit-content',
    margin: isMyMessage ? '5px 0 5px auto' : '5px auto 5px 0',
})

const messageForm = {
    form: css({
        display: 'flex',
        width: '100%',
        marginTop: '15px'
    }),

    input: css({
        borderRadius: '20px', 
        border: 'none',
        outline: 'none',
        padding: '10px 15px',
        flexGrow: '1'
    }),

    button: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5px 10px', 
        backgroundColor: 'lightblue',
        outline: 'none',
        borderRadius: '20px', 
        border: 'none',
        cursor: 'pointer',
        transition: 'all 0.3s',
        marginLeft: '10px',
        '&:hover': {
            backgroundColor: 'lightgreen'
        }
    })
}

const chatStyle = css({
    backgroundColor: 'lightcyan',
    marginLeft: 'auto',
    width: '70%',
    padding: '10px 20px'
})

type message = {
    _id: string;
    user_id: string;
    chat_id: string;
    text: string;
    created_at: string;
};

const Chat: FC = () => {
    const [message, setMessage] = useState<string>("");
    const [messageList, setMessageList] = useState<message[]>([]);
    const user = localStorage.getItem('user');
    const { id } = useParams();

    useEffect(() => {
        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        socket.on("connect", () => {
            console.log(socket.id);
        });

        socket.on("addMessage", (messageDB) => {
            setMessageList((prev) => [...prev, messageDB]);
        });

        return () => {
            console.log("rerender");
            socket.off("addMessage");
            socket.disconnect();
        };
    }, []);

    useEffect(() => {
        const getMessages = fetch(
            `http://localhost:3000/messages/${id}`
        );
        getMessages
            .then((res) => res.json())
            .then((res) => {
                res ? setMessageList(res) : setMessageList([]);
            })
            .catch((error) => console.error(error));
    }, []);

    const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        socket.emit("addMessage", {
            user_id: user,
            chat_id: id,
            text: message,
        });

        setMessage("");
    };

    return (
        <div css={chatStyle}>
            <div>
                {messageList &&
                    messageList.map((message) => (
                        <div
                            css={messageStyle(message.user_id === user)}
                            key={message._id}
                        >
                            {message.text}
                        </div>
                    ))}
            </div>
            <form css={messageForm.form}>
                <input
                    css={messageForm.input}
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button css={messageForm.button} onClick={(e) => sendMessage(e)}>Отправить</button>
            </form>
        </div>
    );
};

export default Chat;
