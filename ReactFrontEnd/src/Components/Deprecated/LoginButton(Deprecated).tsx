import React from "react";
import { useNavigate } from "react-router-dom";



function LoginButton(){

    //Hook shenanigans?
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate("/login")
    }

    return(
        <div className = "Center">
            <button onClick={handleOnClick}>Login Page</button>
        </div>
    )
}

export default LoginButton