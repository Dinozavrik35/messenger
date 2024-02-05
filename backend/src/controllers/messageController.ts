import { Request, Response } from 'express';
import Message from "../models/message";
import { updateChat } from './chatController';


export async function getMessageList(req: Request, res: Response) {
    try {
        const messageList = await Message.find();
        res.status(200).json(messageList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


export async function getMessageListByChatId(req: Request, res: Response) {
    try {
        const messageList = await Message.find({ chatId: req.params.id });
        res.status(200).json(messageList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


export async function addMessage(req: Request, res: Response) {
    const reqMessage = new Message({
        userId: req.body.userId,
        chatId: req.body.chatId,
        text: req.body.text,
    });

    try {
        const newMessage = await reqMessage.save();
        res.status(201).json(newMessage);
        // const chatUpdateRequest = new Request('');
        // const chatUpdateResponse = new Response('');
        // updateChat(chatUpdateRequest, chatUpdateResponse);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}
