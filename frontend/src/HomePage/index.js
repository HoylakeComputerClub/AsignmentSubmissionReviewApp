import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import parseJwt from '../utils/jwtUtils';


const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page!!!</h1>
            <p>Welcome {props.jwt ? parseJwt(props.jwt)['sub'] : <></>}</p>
            {props.jwt ? <Button onClick={() => window.location.href = '/dashboard'}>Go To your Dashboard</Button> : <Button onClick={() => window.location.href = '/login'}>Login</Button>}
        </div>
    )
}

export default HomePage;