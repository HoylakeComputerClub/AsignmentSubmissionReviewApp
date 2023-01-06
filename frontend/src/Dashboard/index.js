import React, { useEffect, useState } from 'react';
import { useLocalState } from '../utils/useLocalStorage';


const Dashboard = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    useEffect(() => {
       fetch("/api/assignments", {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`
        },
        method: "GET"
       }).then((res) => {
        if (res.status === 200) return res.json();
       }).then(assignmentsData => {
        setAssignments(assignmentsData);
       })   
    }, []);

    function createAssignment () {
        fetch("/api/assignments", {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}` 
            },
            method: "POST"
        }).then(res => {
            if (res.status === 200) return res.json()
        }).then(assignment => {
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
                        return <div>Assignment ID: {assignment.id}</div>;
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