import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import fetcher from '../Services/fetchService';
import { useLocalState } from '../utils/useLocalStorage';


const AssignmentView = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState({ "githubUrl": "", "branch": "" });
    const assignmentId = window.location.href.split("/assignments/")[1];
    
    useEffect(() => {
        fetcher(`/api/assignments/${assignmentId}`, "get", jwt).then(assignmentData => {
            if (assignmentData.branch === null) assignmentData.branch = "";
            if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
            setAssignment(assignmentData)
        });
    }, [assignmentId])

    function saveAssignment() {
        fetcher(`/api/assignments/${assignmentId}`, "put", jwt, assignment).then((assignmentData) => {assignmentData.status = "Submitted"; setAssignment(assignmentData)})
    }
    

    return (
        <div>
            <h1>
                Assignment {assignmentId}
            </h1>
            {assignment ? (
                <>
                    <h2>Status: {assignment.status}</h2>
                    <h3>Github URL: <input type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value}); console.log(assignment)}} value={assignment.githubUrl} /></h3>
                    <h3>Branch: <input type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); console.log(assignment)}} value={assignment.branch} /></h3>
                    <button onClick={() => saveAssignment()}>Submit Assignment</button>
                    <button><Link to="/dashboard">Back to Dashboard</Link></button>
                </>
            ) : (<></>)}
        </div>
    );
}

export default AssignmentView;