const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [String],
    latest_message: String,
    latest_message_owner: String,
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    },
    updated_at: {
        type: Date,
    },
    deleted_at: {
        type: Date,
    }
})

module.exports = mongoose.model('chat', chatSchema);