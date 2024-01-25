const express = require('express');
const router = express.Router();
const Message = require('../models/message')

router.get('/', async (req, res) => {
    try {
        const message = await Message.find();
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const message = await Message.find({ chat_id: req.params.id });
        res.json(message);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const message = new Message({
        user_id: req.body.user_id,
        chat_id: req.body.chat_id,
        text: req.body.text
    })

    try {
        const newMessage = await message.save()
        res.status(201).json(newMessage);
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;