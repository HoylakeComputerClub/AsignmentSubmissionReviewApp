import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../Services/fetchService';
import { useLocalState } from '../utils/useLocalStorage';


const Dashboard = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    useEffect(() => {
        fetcher("/api/assignments", "get", jwt).then(assignmentsData => {
        setAssignments(assignmentsData);
       })   
    }, []);

    function createAssignment () {
        fetcher("/api/assignments", "post", jwt).then(assignment => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }
    return (
        <div>
            <h1>Dashboard!!!</h1>
            <p>{props.jwt}</p>
            <div style={{margin: "5px"}}>
                <button onClick={() => createAssignment()}>Submit New Assignment</button>
                <div>
                    { assignments ? assignments.map((assignment) => {
                        return <div key={assignment.id}><Link to={`/assignments/${assignment.id}`}>Assignment ID: {assignment.id}</Link></div>;
                    }): <></> }
                </div>
                <button id='submit' type='button' onClick={() => {setJwt(""); window.location.href = "login";}} >
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Dashboard;