import { FC, useEffect, useState } from "react";
import { socket } from "../../socket";
import { css } from "@emotion/react";
import { useLocation, useParams } from "react-router-dom";
import MessageList from "./MessageList";


const messageForm = {
    form: css({
        display: "flex",
        width: "100%",
        marginTop: "15px",
    }),

    input: css({
        borderRadius: "20px",
        border: "none",
        outline: "none",
        padding: "10px 15px",
        flexGrow: "1",
    }),

    button: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "5px 10px",
        backgroundColor: "lightblue",
        outline: "none",
        borderRadius: "20px",
        border: "none",
        cursor: "pointer",
        transition: "all 0.3s",
        marginLeft: "10px",
        "&:hover": {
            backgroundColor: "lightgreen",
        },
    }),
};

const chatStyle = css({
    backgroundColor: "lightcyan",
    marginLeft: "auto",
    padding: "10px 20px",
    flexGrow: "1",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    '> div': {
        overflow: 'auto',
        scrollbarWidth: 'none',
        scrollbarColor: 'lightblue #d9e1e6',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar-thumb': {
            borderColor: 'lightblue',
            borderRadius: '2px',
            border: '0px solid #ffffff',
        },
        '&::-webkit-scrollbar': {
            width: '3px'
        },
        '&::-webkit-scrollbar-track': {
            backgroundColor: 'transparent',
        },
    }
});


const Chat: FC = () => {
    const [message, setMessage] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(false);
    const { id } = useParams();
    const { state } = useLocation();
    
    const user = localStorage.getItem("user");

    
    useEffect(() => {

        socket.on("typing", (chat) => {
            if(chat === id) setIsTyping(true);
        });

        socket.on("stop-typing", (chat) => {
            if(chat === id) setIsTyping(false);
        });

        return () => {
            socket.off("typing");
            socket.off("stop-typing");
            setMessage('');
            socket.emit("stop-typing", state, id);
        };
    }, [id]);


    const sendMessage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        socket.emit("addMessage", {
            userId: user,
            chatId: id,
            text: message,
        });

        setMessage("");
        setIsTyping(false);
        socket.emit("stop-typing", state, id);
    };

    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);

        if (e.target.value.length > 0) {
            socket.emit("typing", state, id);
        } else {
            socket.emit("stop-typing", state, id);
        }
    };

    return (
        <div css={chatStyle}>
            <MessageList id={id} />
            {isTyping && <p>набирает сообщение...</p>}
            <form css={messageForm.form}>
                <input
                    css={messageForm.input}
                    type="text"
                    value={message}
                    onChange={(e) => handleTyping(e)}
                />
                <button
                    css={messageForm.button}
                    onClick={(e) => sendMessage(e)}
                >
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Chat;
