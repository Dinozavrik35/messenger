import User from "../models/user.js";

export async function getUserList(req, res) {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getUserById(req, res) {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function getUserListBySearchQuery(req, res) {
    try {
        const regex = new RegExp(`^@${req.body.login}.*$`);
        const userList = await User.find({ login: regex });
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export async function addUser(req, res) {
    const reqUser = new User({
        login: "@" + req.body.login,
        password: req.body.password, // сделать шифрование
        email: req.body.email,
    });

    try {
        const newUser = await reqUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}


export async function authUser(req, res) {
    try {
        const user = await User.findOne({
            login: '@' + req.body.login,
            password: req.body.password,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
