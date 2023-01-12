import React, { useEffect, useState } from 'react';
import { Badge, Button, Card } from 'react-bootstrap';
import fetcher from '../Services/fetchService';
import { useLocalState } from '../utils/useLocalStorage';
import parseJwt from '../utils/jwtUtils';


const Dashboard = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignments, setAssignments] = useState(null);
    useEffect(() => {
        fetcher("/api/assignments", "get", jwt).then(assignmentsData => {
        setAssignments(assignmentsData);
       })   
    }, [jwt]);

    function createAssignment () {
        fetcher("/api/assignments", "post", jwt).then(assignment => {
            window.location.href = `/assignments/${assignment.id}`;
        });
    }

    function deleteAssignment (id) {
        const fetchData = {
            headers: {
                "Content-Type": "application/json"
            },
            method: "delete"
        }
        fetchData.headers.Authorization = `Bearer ${jwt}`


        // fetcher(`/api/assignments/${id}`, "delete", jwt).then((res) => console.log(res));
        fetch(`/api/assignments/${id}`, fetchData).then((res) => console.log(res));
    }
    return (
        <div className='dash'>
            <h1>Dashboard!!!</h1>
            <p>Welcome { parseJwt(jwt)['sub'] }</p>
            <div style={{margin: "5px"}}>
                <Button onClick={() => createAssignment()}>Submit New Assignment</Button>
                <div className='d-grid gap-5' style={{gridTemplateColumns: 'repeat(auto-fill, 340px)', marginTop: '15px'}}>
                    { assignments ? assignments.map((assignment) => {
                        return( <Card style={{ margin: '5px'}} key={assignment.id}>
                                <Card.Body style={{ display: 'flex', flexDirection: 'column', allignItems: 'center', justifyContent: 'space-between'}}>
                                    <Card.Title>{assignment.name}</Card.Title>
                                    <Card.Subtitle style={{marginTop: '5px', marginBottm: '5px'}} className="mb-2 text-muted"><Badge bg="secondary" size='small'>{assignment.status}</Badge></Card.Subtitle>
                                    <Card.Subtitle>Github</Card.Subtitle>
                                    <Card.Text>
                                        {assignment.githubUrl}
                                    </Card.Text>
                                    <Card.Subtitle>Branch</Card.Subtitle>
                                    <Card.Text>
                                        {assignment.branch}
                                    </Card.Text>
                                    <Button style={{margin: '5px', width: "100%"}} onClick={() => window.location.href = `/assignments/${assignment.id}`}>Edit</Button>
                                    <Button style={{margin: '5px', width: "100%"}} variant='danger' onClick={() => deleteAssignment(assignment.id)}>Delete</Button>
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