import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../../helpers/fetchData";
import { UserModel } from "../../models/UserModel";

const AuthForm: FC = () => {
    const {
        register,
        // formState: { errors },
        handleSubmit,
    } = useForm();
    const navigate = useNavigate();

    const handleLogin = async (loginData: FieldValues) => {
        const { data, error } = await fetchData<UserModel>("/users/auth", "POST", {
            login: loginData.login,
            password: loginData.password,
        });

        if(data) {
            localStorage.setItem("user", data.login);
            navigate("/chats");
        } 

        if(error) console.log(error);
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
