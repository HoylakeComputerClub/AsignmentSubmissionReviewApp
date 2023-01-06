import React, { useState } from 'react';
import fetcher from '../Services/fetchService';
import { useLocalState } from '../utils/useLocalStorage';


const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
    function sendLoginRequest () {
        console.log("login submit requested!");
     
    const reqBody = {"username": username, "password": password};
    fetcher("api/auth/login", "post", jwt, reqBody).then(([body, headers]) => {
        setJwt(headers.get("authorization"));
        window.location.href = "dashboard";
      })
      .catch((message) => alert(message));

    }
    return (
        <>
            <div>
                <h1>Login Page!!!</h1>
                <p>{props.jwt}</p>
                <div>
                    <div>
                        <label htmlFor='username'>Username</label>
                        <input type='email' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input type='password' id='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                </div>
            </div>
            <div>
                <button id='submit' type='button' onClick={() => sendLoginRequest()} >
                    Login
                </button>
            </div>
        </>
    )
}

export default Login;