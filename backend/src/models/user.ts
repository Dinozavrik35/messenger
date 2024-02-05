import { Schema, model } from "mongoose";

interface IUser {
    login: string;
    password: string;
    email: string;
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
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
            validator: function (v: string) {
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
