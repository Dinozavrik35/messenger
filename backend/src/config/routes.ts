import express from "express";
import userRouter from "../routes/userRoute";
import chatRouter from "../routes/chatRoute";
import messageRouter from "../routes/messageRoute";

const router = express.Router();

router.use("/users", userRouter);
router.use("/chats", chatRouter);
router.use("/messages", messageRouter);

export default router;
