import express from "express";
import userRouter from "../routes/userRoute.js";
import chatRouter from "../routes/chatRoute.js";
import messageRouter from "../routes/messageRoute.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/chats", chatRouter);
router.use("/messages", messageRouter);

export default router;
