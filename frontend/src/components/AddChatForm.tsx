import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";

const AddChatForm: FC = () => {
    const {
        register,
        // formState: { errors },
        handleSubmit,
    } = useForm();
    const user = localStorage.getItem('user');

    const addChat = (data: FieldValues) => {
        const addUser = fetch("http://localhost:3000/chats", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: data.chatMember,
                members: [
                    user,
                    data.chatMember,
                ],
            }),
        });

        addUser
            .then((res) => res.text())
            .then((res) => console.log(res))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit(addChat)}>
            <input
                {...register("chatMember", { required: true })}
                type="text"
                placeholder="Введите id собеседника"
            />
            <button>
                Начать чат
            </button>
        </form>
    );
};

export default AddChatForm;
