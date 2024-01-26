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
    padding: '10px 20px', 
    flexGrow: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end'
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
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const user = localStorage.getItem('user');
    const { id } = useParams();

    useEffect(() => {
        socket.connect();
        socket.emit('create', id);

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
        
        socket.on("typing", () => {
            setIsTyping(true);
        });

        socket.on("stop-typing", () => {
            setIsTyping(false);
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
    }, [id]);

    const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        socket.emit("addMessage", {
            user_id: user,
            chat_id: id,
            text: message,
        });

        setMessage("");
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if(e.target.value.length > 0) {
            socket.emit("typing", id);
        } else {
            socket.emit("stop-typing", id);
        }
    }

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
            { isTyping && 
                <p>набирает сообщение...</p>
            }
            <form css={messageForm.form}>
                <input
                    css={messageForm.input}
                    type="text"
                    value={message}
                    onChange={(e) => handleTyping(e)}
                />
                <button css={messageForm.button} onClick={(e) => sendMessage(e)}>Отправить</button>
            </form>
        </div>
    );
};

export default Chat;
