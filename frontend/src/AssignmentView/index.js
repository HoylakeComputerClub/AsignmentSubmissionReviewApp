import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
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
        <div><Row className='my-5'>
            <Col>
                <h2>
                    Assignment {assignmentId}
                </h2>
            </Col>
            <Col>
                <Badge style={{lineHeight: '1.6rem', marginTop: '5px', paddingLeft: '20px', paddingRight: '20px', fontSize: '1rem', fontWeight: '300'}}pill bg='success'>{assignment.status}</Badge>
            </Col>
        </Row>
            {assignment ? (
                <><Form.Group as={Row} className='my-5 justify-content-center'>
                <Col md='10'>
                <Form.Label>
                    Assignment
                </Form.Label>
                <DropdownButton id='assignmentName' variant='success' title={assignment.name}>
                    {['1', '2', '3', '4', '5', '6', '7', '8'].map(assignmentNum => <Dropdown.Item eventKey={assignmentNum}>{assignment.name + " " + assignmentNum}</Dropdown.Item>)}



                </DropdownButton>

                    <Form.Control type='dropdown' id='name' onChange={(e) => {setAssignment({...assignment, "name": e.target.value}); console.log(assignment)}} value={assignment.name} />
                </Col>
                </Form.Group>
                <Form.Group as={Row} className='my-5 justify-content-center'>
                    <Col md='10'>
                    <Form.Label>
                        Assignment Name
                    </Form.Label>
                        <Form.Control type='name' id='name' onChange={(e) => {setAssignment({...assignment, "name": e.target.value}); console.log(assignment)}} value={assignment.name} />
                    </Col>
                    <Col md='10'>
                    <Form.Label>
                        Github URL
                    </Form.Label>
                        <Form.Control type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value}); console.log(assignment)}} value={assignment.githubUrl} />
                    </Col>
                    <Col md='10'>
                    <Form.Label>
                        Branch
                    </Form.Label>
                    <Form.Control type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); console.log(assignment)}} value={assignment.branch} />
                    </Col>
                    <Col md='10'>
                    <Button variant='success' onClick={() => {setAssignment({...assignment, status: "ready for review"}); saveAssignment(); window.location.href = '/dashboard'}} className='m-3'>Submit Assignment</Button>
                    <Button variant='secondary' onClick={() => window.location.href = '/dashboard'} className='m-3'>Back to Dashboard</Button>

                    </Col>
                </Form.Group>
                </> ) : (<></>)}
        </div>
    );
}

export default AssignmentView;