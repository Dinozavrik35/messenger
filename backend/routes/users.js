const express = require('express');
const router = express.Router();
const User = require('../models/user')

router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


router.get('/:id', async (req, res) => {
    try {
        const user = await User.find({ _id: req.params.id });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        login: req.body.login,
        password: req.body.password, // сделать шифрование
        email: req.body.email
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser);
    } catch(error) {
        res.status(400).json({ message: error.message })
    }
})


router.post('/auth', async (req, res) => {
    try {
        const user = await User.findOne({ login: req.body.login, password: req.body.password });
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;