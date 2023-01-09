import React from 'react';
import { Link } from 'react-router-dom';


const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page!!!</h1>
            <p>{props.jwt}</p>
            <button>{props.jwt ? <Link to="/dashboard">Go To your Dashboard</Link> : <Link to="/login">Login</Link>}</button>
        </div>
    )
}

export default HomePage;