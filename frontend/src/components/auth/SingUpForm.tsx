import { FC } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { fetchData } from "../../helpers/fetchData";
import { UserModel } from "../../models/UserModel";

const signInFormStyle = css({
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    maxWidth: '500px',
    margin: '100px auto 0',
    border: '1px solid lightgrey',
    padding: '50px',
    borderRadius: '20px',
    'input': {
        marginBottom: '5px',
        display: 'block',
        width: '100%'
    },
    'p': {
        marginBottom: '10px'
    },
    'button': {
        marginTop: '15px',
        width: '50%'
    }
});

const SingUpForm: FC = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const navigate = useNavigate();

    const handleSignUp = async (newUser: FieldValues) => {
        if (newUser.password !== newUser.repeat) return;
        
        const { data, error } = await fetchData<UserModel>("/users", "POST", {
            login: newUser.login,
            password: newUser.password,
            email: newUser.email,
        });

        if(data) {
            localStorage.setItem("user", data.login);
            navigate("/home");
        } 

        if(error) console.log(error);
    };

    return (
        <form css={signInFormStyle} onSubmit={handleSubmit(handleSignUp)}>
            <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Введите Email"
            />
            {errors.email && <p>email is required</p>}
            <input
                {...register("login", { required: true })}
                type="text"
                placeholder="Введите логин"
            />
            {errors.email && <p>login is required</p>}
            <input
                {...register("password", { required: true })}
                type="password"
                placeholder="Введите пароль"
            />
            {errors.email && <p>password is required</p>}
            <input
                {...register("repeat", { required: true })}
                type="password"
                autoComplete="false"
                placeholder="Повторите пароль"
            />
            {errors.email && <p>password is required</p>}
            <button type="submit">Зарегестрироваться</button>
        </form>
    );
};

export default SingUpForm;
