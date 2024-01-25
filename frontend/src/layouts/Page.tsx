import { FC } from "react";
import { Outlet } from "react-router-dom";
import ChatList from "../components/ChatList";
import { css } from "@emotion/react";

const pageStyle = css({
    display: "flex",
});

const Page: FC = () => {
    return (
        <div css={pageStyle}>
            <ChatList />
            <Outlet />
        </div>
    );
};

export default Page;
