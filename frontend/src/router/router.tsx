import { RouteObject, createBrowserRouter } from "react-router-dom";
import Page from "../layouts/Page";
import Chat from "../components/chat/Chat";
import HomePage from "../pages/HomePage";
import AuthPage from "../pages/AuthPage";
import SignUpPage from "../pages/SignUpPage";
import AuthRequired from "../components/auth/AuthRequired";


let nesetedPages: RouteObject[] = [
    {
        path: "/chats/:id",
        element: <Chat />
    }
];
 
["", "*", "/", "/home"].forEach((path) => {
    nesetedPages.push({ path: path, element: <HomePage /> })
});


let pages: RouteObject[] = [
    {
        element: <AuthRequired Component={Page} />,
        children: nesetedPages,
    },
];

["/login", "/auth", "/signin"].forEach((path) => {
    pages.push({ path: path, element: <AuthPage /> })
});

["/signup", "/register"].forEach((path) => {
    pages.push({ path: path, element: <SignUpPage /> })
});


const router = createBrowserRouter(pages);

export default router;