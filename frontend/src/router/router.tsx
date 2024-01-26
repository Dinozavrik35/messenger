import { RouteObject, createBrowserRouter } from "react-router-dom";
import Page from "../layouts/Page";
import Chat from "../components/Chat";
import Home from "../components/Home";
import AuthPage from "../pages/AuthPage";
import SignUpPage from "../pages/SignUpPage";


let nesetedPages: RouteObject[] = [
    // {
    //     path: "/user",
    //     element: <AuthRequired component={User} />,
    // },
    // {
    //     path: "/teams",
    //     element: <AuthRequired component={Teams} />,
    // },
    {
        path: "/chats/:id",
        element: <Chat />
    }
];
 
["", "*", "/", "/home"].forEach((path) => {
    nesetedPages.push({ path: path, element: <Home /> })
});


let pages: RouteObject[] = [
    {
        element: <Page />,
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