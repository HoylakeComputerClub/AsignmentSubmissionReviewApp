import React from 'react';


const HomePage = (props) => {
    return (
        <div>
            <h1>Home Page!!!</h1>
            <p>{props.jwt}</p>
        </div>
    )
}

export default HomePage;