import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthRequired: FC<{ Component: FC }> = ({ Component }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!localStorage.getItem('user')) {
            navigate('/login'); 
         }
    });

    return (
        <>
            <Component />
        </>
    );
};

export default AuthRequired;
