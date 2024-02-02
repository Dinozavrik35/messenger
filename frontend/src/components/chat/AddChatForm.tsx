import { css } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { socket } from "../../socket";
import { fetchData } from "../../helpers/fetchData";
import { UserModel } from "../../models/UserModel";

const addChatFormStyle = css({
    display: "flex",
    margin: "0 15px",
    input: {
        width: "100%",
    },
});

const searchListStyle = css({
    margin: "0 15px",
    listStyle: 'none',
    li: {
        padding: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s',
        borderRadius: '15px',
        marginTop: '5px',
        '&:hover': {
            backgroundColor: '#f3f6f7'
        }
    }
});

type user = {
    _id: string;
    login: string;
    password: string;
};

const AddChatForm: FC = () => {
    const {
        register,
        // formState: { errors },
    } = useForm();
    const [inputVal, setInputVal] = useState<string>("");
    const [searchUsers, setSearchUsers] = useState<user[]>([]);
    const navigate = useNavigate();
    
    const user = localStorage.getItem("user");
    
    const addChat = (login: string, name: string) => {
        socket.emit("addChat", {
            name: name,
            members: [user, login],
        });

        socket.on("addChat", (chatDB) => {
            setInputVal("");
            setSearchUsers([]);
            navigate("/chats/" + chatDB._id);
        });
    };

    const findUser = async (login: string, controller: AbortController) => {
        const { data, error } = await fetchData<UserModel[]>("/users/find", "POST", {
            login: login,
        }, controller.signal);

        if(data) {
            setSearchUsers(data);
        } 

        if(error) console.log(error);
    };

    useEffect(() => {
        let controller = new AbortController();
        if (inputVal.length > 0) {
            const delayDebounceFn = setTimeout(() => {
                findUser(inputVal, controller);
            }, 1000);
            return () => clearTimeout(delayDebounceFn);
        } else {
            setSearchUsers([]);
        }

        return () => {
            controller.abort("new request");
        }
    }, [inputVal]);

    return (
        <>
            <form css={addChatFormStyle}>
                <input
                    {...register("chatMember", { required: true })}
                    onChange={(e) => setInputVal(e.target.value)}
                    value={inputVal}
                    type="text"
                    placeholder="Поиск"
                />
            </form>
            {searchUsers && (
                <ul css={searchListStyle}>
                    {searchUsers.map((searchUser) => (
                        <li
                            onClick={() => addChat(searchUser.login, `${searchUser.login}-${user}`)}
                            key={searchUser._id}
                        >
                            {searchUser.login}
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};

export default AddChatForm;
