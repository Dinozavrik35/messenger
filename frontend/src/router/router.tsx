import { createBrowserRouter } from "react-router-dom";
import Page from "../layouts/Page";
import Chat from "../components/Chat";
import Home from "../components/Home";
import Auth from "../components/Auth";

let nesetedPages = [
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

// ["/teams/:teamId", "/teams/:teamId/*"].forEach((path) => {
//     nesetedPages.push({ path: path, element: <AuthRequired component={SingleTeam} /> })
// });

// ["/boards/:boardId", "/teams/:teamId/boards/:boardId"].forEach((path) => {
//     nesetedPages.push({ path: path, element: <AuthRequired component={SingleBoard} /> })
// });

const router = createBrowserRouter([
    {
        path: "/login",
        element: <Auth />,
    },
    // {
    //     path: "/signup",
    //     element: <SignUp />,
    // },
    {
        element: <Page />,
        children: nesetedPages,
    },
]);

export default router;