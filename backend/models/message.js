const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    chat_id: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('message', messageSchema);