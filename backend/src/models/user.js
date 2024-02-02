import { Schema, model } from "mongoose";

const userSchema = new Schema({
    login: {
        type: String,
        required: true,
        minLength: [2, "Must be at least 2, got {VALUE}"],
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Must be at least 8, got {VALUE}"],
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: (props) => `${props.value} is not a valid email!`,
        },
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export default model("user", userSchema);