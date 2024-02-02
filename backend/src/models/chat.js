import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    name: {
        type: String,
        required: true
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
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export default model('chat', chatSchema);