import cors from "cors";
import { createServer } from "http";
//import { connect, connection } from "mongoose";
import express, { json } from "express";
import { Server } from "socket.io";
import router from "./src/config/routes.js";

import pkg from 'mongoose';

const { connect, connection } = pkg;


import Chat from "./src/models/chat.js";
import Message from "./src/models/message.js";


const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));


connect("mongodb://127.0.0.1/messenger");

const db = connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to db"));

app.use(json());

app.use("/api/v1", router);

// app.listen(3000, () => console.log("Server is running"));

const rooms = new Set();

io.on("connection", (socket) => {
    socket.emit('connection');
    let userId = '';

    socket.on("addMessage", (message) => {
        const messageDB = new Message(message);
        const newMessage = messageDB.save();
        console.log('addChat rooms - ' + rooms);
        newMessage
            .then((res) => {
                console.log(res);
                const whatever = async () => {
                    const chat = await Chat.findOneAndUpdate({ _id: messageDB.chatId }, {
                        latestMessage: messageDB.text,
                        latestMessageOwner: messageDB.userId,
                        updatedAt: Date.now(),
                    });

                    io.to([...chat.members]).emit("addMessage", res);
                    io.to([...chat.members]).emit("chatsUpdated", res);
                };
                whatever();
            })
            .catch((error) => console.log(error));
    });

    socket.on("addChat", (chat) => {
        const chatDB = new Chat(chat);
        const newChat = chatDB.save();
        newChat
            .then((res) => {
                console.log(res);
                io.to([...chatDB.members]).emit("addChat", res);
            })
            .catch((error) => console.log(error));
    });

    socket.on("typing", (user, chat) => {
        io.to(user).emit("typing", chat);
    });

    socket.on("stop-typing", (user, chat) => {
        io.to(user).emit("stop-typing", chat);
    });

    socket.on("create", async function (room) {
        socket.join(room);
        rooms.add(room);
        userId = room;
        console.log('connected - ' + userId);

        let setRooms = new Set();

        const chats = await Chat.find({ members : { $all : [room] } });
        chats.forEach((chat) => {
            chat.members.forEach((member) => setRooms.add(member));
        });

        io.to([...Array.from(setRooms)]).emit("new-connection", room);

        // rooms & setRooms intersection
        io.to(room).emit("online-users", Array.from(new Set([...rooms].filter(i => setRooms.has(i)))));
    });

    socket.on('disconnect', async () => {
        console.log('disconnected - ' + userId)
        let setRooms = new Set();
        const chats = await Chat.find({ members : { $all : [userId] } });
        chats.forEach((chat) => {
            chat.members.forEach((member) => setRooms.add(member));
        })
        io.to([...Array.from(setRooms)]).emit("connection-removed", userId);
    })
});

httpServer.listen(3000);
