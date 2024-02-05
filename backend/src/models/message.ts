import { Schema, model } from "mongoose";

interface IMessage {
    userId: string;
    chatId: string;
    text: string;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    userId: {
        type: String,
        required: true,
    },
    chatId: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default model("message", messageSchema);
