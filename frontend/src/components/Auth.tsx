import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth: FC = () => {
    const [login, setLogin] = useState<string>("");
    const navigate = useNavigate();
    
    const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log(login);
        const getUser = fetch(`http://localhost:3000/users/${login}`);
        getUser
            .then((res) => res.json())
            .then(() => {
                localStorage.setItem("user", login);
                setLogin("");
                navigate("/chats");
            })
            .catch((error) => console.error(error));
    };

    return (
        <form>
            <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
            />
            <button type="submit" onClick={(e) => handleLogin(e)}>
                Войти
            </button>
        </form>
    );
};

export default Auth;
