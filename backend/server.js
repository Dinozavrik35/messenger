const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require("express");
const Message = require("./models/message");

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});

const cors = require("cors");

const corsOptions = {
    origin: "http://localhost:5173",
};

app.use(cors(corsOptions));

const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/messenger");

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("open", () => console.log("Connected to db"));

app.use(express.json());

const usersRouter = require("./routes/users");
const chatsRouter = require("./routes/chats");
const messagesRouter = require("./routes/messages");
app.use("/users", usersRouter);
app.use("/chats", chatsRouter);
app.use("/messages", messagesRouter);

// app.listen(3000, () => console.log("Server is running"));

io.on("connection", (socket) => {
    console.log(socket.id);
    socket.join("room of people");

    socket.on("addMessage", (message) => {
        const messageDB = new Message(message);
        const newMessage = messageDB.save();
        newMessage
            .then((res) => {
                console.log(res);
                io.to("room of people").emit("addMessage", res);
            })
            .catch((error) => console.log(error));
    });

    socket.on("disconnect", () => {
        console.log(socket + " removed");
    });
});

httpServer.listen(3000);
