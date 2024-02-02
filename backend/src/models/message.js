import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    chatId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default model('message', messageSchema);