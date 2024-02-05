import { Schema, Types, model } from "mongoose";

interface IChat {
    name: string;
    members: Types.Array<string>;
    latestMessage: string;
    latestMessageOwner: string;
    createdAt: Date;
    updatedAt: Date;
}

const chatSchema = new Schema<IChat>({
    name: {
        type: String,
        required: true,
    },
    members: {
        type: [String],
        required: true,
    },
    latestMessage: {
        type: String,
    },
    latestMessageOwner: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default model("chat", chatSchema);
