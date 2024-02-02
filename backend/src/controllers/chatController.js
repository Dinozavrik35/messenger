import Chat from "../models/chat.js";


export async function getChatList(req, res) {
    try {
        const chatList = await find();
        res.status(200).json(chatList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getChatListByUserId(req, res) {
    try {
        const chatList = await Chat.find({ members: { $in: [req.params.id] } }).sort({updatedAt: -1});
        res.status(200).json(chatList);
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log('it is me getChatListByUserId');
    }
}


export async function getChatListByUserLogin(req, res) {
    try {
        const chatList = await Chat.find({ members: { $in: [req.params.login] } }).sort({updatedAt: -1});
        res.status(200).json(chatList);
    } catch (error) {
        console.log('it is me getChatListByUserLogin');
        res.status(500).json({ message: error.message });
    }
}


export async function addChat(req, res) {
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
            res.status(400).json({ message: error.message });
        }
    }
}
