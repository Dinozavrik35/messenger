import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../components/chat/ChatList";
import { css } from "@emotion/react";
import AddChatForm from "../components/chat/AddChatForm";
import { socket } from "../socket";

const pageStyle = css({
    display: "flex",
    height: "100vh",
});

const asideStyle = css({
    width: "25%",
    maxWidth: '350px',
    padding: "10px 20px",
    borderRight: "1px solid #d9e1e6",
});

const pageContentStyle = css({
    width: "75%",
    flexGrow: '1',
    display: "flex",
});

const Page: FC = () => {
    const user = localStorage.getItem("user");

    useEffect(() => {
        socket.connect();

        socket.on('connection', () => {
            socket.emit("create", user);
        })

        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div css={pageStyle}>
            <aside css={asideStyle}>
                <AddChatForm />
                <ChatList />
            </aside>
            <div css={pageContentStyle}>
                <Outlet />
            </div>
        </div>
    );
};

export default Page;
