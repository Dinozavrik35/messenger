import Message from "../models/message.js";


export async function getMessageList(req, res) {
    try {
        const messageList = await Message.find();
        res.status(200).json(messageList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getMessageListByChatId(req, res) {
    try {
        const messageList = await Message.find({ chatId: req.params.id });
        res.status(200).json(messageList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function addMessage(req, res) {
    const reqMessage = new Message({
        userId: req.body.userId,
        chatId: req.body.chatId,
        text: req.body.text,
    });

    try {
        const newMessage = await reqMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
