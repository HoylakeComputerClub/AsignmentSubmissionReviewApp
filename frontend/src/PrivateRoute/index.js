import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import fetcher from "../Services/fetchService";
import { useLocalState } from "../utils/useLocalStorage";

const PrivateRoute = ({ children }) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [isLoading, setIsLoading] = useState(true);
    const [isValid, setIsValid] = useState(null);

    if (jwt) {
        fetcher(`/api/auth/validate?token=${jwt}`, 'get', jwt).then(isValid => {
            console.log("Somethings wrong in first if");
            setIsValid(isValid);
            setIsLoading(false);
        });
    } else {
        console.log("somethings wrong in else");
        return <Navigate to='/login' />
    }

    return isLoading ? <div><h1>Loading...</h1></div> : isValid ? children : <Navigate to='/login' />;

};

export default PrivateRoute;