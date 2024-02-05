import { Router } from "express";
import {
    getChatList,
    getChatListByUserId,
    getChatListByUserLogin,
    addChat,
} from "../controllers/chatController";


const router = Router();


// get array of all chats
router.get("/", getChatList);


// get array of all chats by user id
router.get("/:id", getChatListByUserId);


// get array of all chats by user login
router.get("/:login", getChatListByUserLogin);


// add chat
router.post("/", addChat);


export default router;
