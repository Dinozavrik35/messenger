const baseUrl = import.meta.env.VITE_MESSENGER_API_URL + "/users";

export const authUser = (login: string, password: string) => {
    const userLogin = fetch(`${baseUrl}/auth`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login: login,
            password: password,
        }),
    });
    userLogin
        .then((res) => res.json())
        .then((res) => {
            // localStorage.setItem("user", res.login);
            // // navigate("/chats");
            return res;
        })
        .catch((error) => {
            return error;
        });
};
