import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
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

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    function createAssignment () {
        fetcher("/api/assignments", "post", jwt).then(assignment => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }
    return (
        <div>
            <h1>Dashboard!!!</h1>
            <p>Welcome { parseJwt(jwt)['sub'] }</p>
            <div style={{margin: "5px"}}>
                <Button onClick={() => createAssignment()}>Submit New Assignment</Button>
                <div style={{ display: 'flex', alignItems: 'center', margin: '10px auto', flexWrap: 'wrap'}}>
                    { assignments ? assignments.map((assignment) => {
                        return( <Card style={{ width: '50rem', margin: '5px'}} key={assignment.id}>
                                <Card.Body>
                                    <Card.Title>{assignment.name} <Badge bg="secondary">{assignment.status}</Badge></Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">Status: {assignment.status}</Card.Subtitle>
                                    <Card.Text>
                                    <p>Github URL: {assignment.githubUrl}</p>
                                    <p></p>
                                    </Card.Text>
                                    <Card.Link href={`/assignments/${assignment.id}`}>Update Assignment</Card.Link>
                                    <Card.Link href="#">Another Link</Card.Link>
                                </Card.Body>
                            </Card>);
                    }): <></> }
                </div>
                <Button id='submit' type='button' onClick={() => {setJwt(""); window.location.href = "login";}} >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Dashboard;