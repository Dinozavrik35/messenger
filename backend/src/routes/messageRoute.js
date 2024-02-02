import { Router } from "express";
import {
    getMessageList,
    getMessageListByChatId,
    addMessage,
} from "../controllers/messageController.js";


const router = Router();


// get array of all messages
router.get("/", getMessageList);


// get array of all messages by chat id
router.get("/:id", getMessageListByChatId);


// add message
router.post("/", addMessage);


export default router;
