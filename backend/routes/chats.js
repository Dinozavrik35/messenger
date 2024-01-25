const express = require('express');
const router = express.Router();
const Chat = require('../models/chat')

router.get('/', async (req, res) => {
    try {
        const chat = await Chat.find();
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const chat = await Chat.find({ members : { $all : [req.params.id] } });
        res.json(chat);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const chat = new Chat({
        name: req.body.name,
        members: req.body.members
    })

    try {
        const newChat = await chat.save()
        res.status(201).json(newChat);
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;