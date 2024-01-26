import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AuthForm: FC = () => {
    const {
        register,
        // formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const handleLogin = (loginData: FieldValues) => {
        console.log(loginData);
        const userLogin = fetch(`http://localhost:3000/users/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                login: loginData.login,
                password: loginData.password,
            }),
        });
        userLogin
            .then((res) => res.json())
            .then((res) => {
                localStorage.setItem("user", res._id);
                navigate("/chats");
            })
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)}>
            <input
                {...register("login", { required: true })}
                type="text"
                placeholder="Введите логин"
            />
            <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Введите пароль"
            />
            <button type="submit">Войти</button>
        </form>
    );
};

export default AuthForm;
