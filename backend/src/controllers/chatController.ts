import { Request, Response } from "express";
import Chat from "../models/chat";

export async function getChatList(req: Request, res: Response) {
    try {
        const chatList = await Chat.find().sort({ updatedAt: -1 });
        res.status(200).json(chatList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getChatListByUserId(req: Request, res: Response) {
    try {
        const chatList = await Chat.find({
            members: { $in: [req.params.id] },
        }).sort({ updatedAt: -1 });
        res.status(200).json(chatList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function getChatListByUserLogin(req: Request, res: Response) {
    try {
        const chatList = await Chat.find({
            members: { $in: [req.params.login] },
        }).sort({ updatedAt: -1 });
        res.status(200).json(chatList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}

export async function addChat(req: Request, res: Response) {
    const reqChat = new Chat({
        name: req.body.name,
        members: req.body.members,
    });

    const existingChat = await Chat.findOne({
        $or: [
            { members: req.body.members },
            { members: req.body.members.reverse() },
        ],
    });

    if (existingChat) {
        res.status(200).json(existingChat);
    } else {
        try {
            const newChat = await reqChat.save();
            res.status(201).json(newChat);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }
}

export async function updateChat(req: Request, res: Response) {
    try {
        const chat = await Chat.findOneAndUpdate(
            { _id: req.body.chatId },
            {
                latestMessage: req.body.text,
                latestMessageOwner: req.body.userId,
                updatedAt: Date.now(),
            }
        );
        res.status(200).json(chat);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
