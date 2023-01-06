import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocalState } from '../utils/useLocalStorage';


const AssignmentView = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState(null);
    const assignmentId = window.location.href.split("/assignments/")[1];
    
    useEffect(() => {
        axios(`/api/assignments/${assignmentId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}` 
            },
            method: "get"
        }).then(res => {
            if (res.status === 200) return res.data
        }).then(assignmentData => {
            setAssignment(assignmentData)
        });
    }, [assignmentId])
    

    return (
        <div>
            <h1>
                Assignment {assignmentId}
            </h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>Github URL: <input type='url' id='githubUrl' /></h3>
                    <h3>Branch: <input type='text' id='githubUrl' /></h3>
                    <button>Submit Assignment</button>
                </>
            ) : (<></>)}
        </div>
    );
}

export default AssignmentView;