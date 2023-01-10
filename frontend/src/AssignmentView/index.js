import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
                    <h3>Assignment Name: <input type='name' id='name' onChange={(e) => {setAssignment({...assignment, "name": e.target.value}); console.log(assignment)}} value={assignment.name} /></h3>
                    <h3>Github URL: <input type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value}); console.log(assignment)}} value={assignment.githubUrl} /></h3>
                    <h3>Branch: <input type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); console.log(assignment)}} value={assignment.branch} /></h3>
                    <Button variant='success' onClick={() => {setAssignment({...assignment, status: "ready for review"}); saveAssignment(); window.location.href = '/dashboard'}} className='m-3'>Submit Assignment</Button>
                    <Button variant='secondary' onClick={() => window.location.href = '/dashboard'}>Back to Dashboard</Button>
                </>
            ) : (<></>)}
        </div>
    );
}

export default AssignmentView;