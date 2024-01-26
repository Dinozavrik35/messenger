import { FC } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../components/ChatList";
import { css } from "@emotion/react";
import AddChatForm from "../components/AddChatForm";

const pageStyle = css({
    display: "flex",
    minHeight: '100vh'
});

const asideStyle = css({
    width: '25%',
    padding: "10px 20px",
});

const pageContentStyle = css({
    width: '75%',
    display: 'flex'
});

const Page: FC = () => {
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
