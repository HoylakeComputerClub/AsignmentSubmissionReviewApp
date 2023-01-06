import React, { useState } from 'react';
import { useLocalState } from '../utils/useLocalStorage';


const Login = (props) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [jwt, setJwt] = useLocalState("", "jwt");
    function sendLoginRequest () {
        console.log("login submit requested!");
     
     const reqBody = {"username": username, "password": password};

      fetch("api/auth/login",{"headers": { "Content-Type": "application/json"}, 
      method: "post", body: JSON.stringify(reqBody)}).then((res) => {
        if (res.status === 200) {
            return Promise.all([res, res.headers]);
        } else {
            return Promise.reject("Invalid Login Attempt!");
        }
    })
      .then(([body, headers]) => {
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