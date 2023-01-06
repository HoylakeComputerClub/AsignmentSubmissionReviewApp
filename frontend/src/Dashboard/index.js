import React from 'react';
import { useLocalState } from '../utils/useLocalStorage';


const Dashboard = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    return (
        <div>
            <h1>Dashboard!!!</h1>
            <p>{props.jwt}</p>
            <div>
                <button id='submit' type='button' onClick={() => {setJwt(""); window.location.href = "login";}} >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard;