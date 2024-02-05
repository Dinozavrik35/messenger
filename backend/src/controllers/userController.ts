import { Request, Response } from 'express';
import User from "../models/user";

export async function getUserList(req: Request, res: Response) {
    try {
        const userList = await User.find();
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


export async function getUserById(req: Request, res: Response) {
    try {
        const user = await User.findOne({ _id: req.params.id });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


export async function getUserListBySearchQuery(req: Request, res: Response) {
    try {
        const regex = new RegExp(`^@${req.body.login}.*$`);
        const userList = await User.find({ login: regex });
        res.status(200).json(userList);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}


export async function addUser(req: Request, res: Response) {
    const reqUser = new User({
        login: "@" + req.body.login,
        password: req.body.password, // сделать шифрование
        email: req.body.email,
    });

    try {
        const newUser = await reqUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ message: (error as Error).message });
    }
}


export async function authUser(req: Request, res: Response) {
    try {
        const user = await User.findOne({
            login: '@' + req.body.login,
            password: req.body.password,
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
}
