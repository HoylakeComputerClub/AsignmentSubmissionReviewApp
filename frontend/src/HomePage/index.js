import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const HomePage = (props) => {
    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }
    return (
        <div>
            <h1>Home Page!!!</h1>
            <p>Welcome {parseJwt(props.jwt)['sub'] }</p>
            {props.jwt ? <Button onClick={() => window.location.href = '/dashboard'}>Go To your Dashboard</Button> : <Button onClick={() => window.location.href = '/login'}>Login</Button>}
        </div>
    )
}

export default HomePage;