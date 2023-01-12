import React, { useEffect, useState } from 'react';
import { Badge, Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import fetcher from '../Services/fetchService';
import { useLocalState } from '../utils/useLocalStorage';


const AssignmentView = (props) => {
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState({ "number": "0", "githubUrl": "", "branch": "" });
    const assignmentId = window.location.href.split("/assignments/")[1];

    const [assignmentEnums, setAssignmentEnums] = useState([]);
    
    useEffect(() => {
        fetcher(`/api/assignments/${assignmentId}`, "get", jwt).then(assignmentResponse => {
            console.log(assignmentResponse);
            let assignmentData = assignmentResponse.assignment;
            //console.log(assignmentData);
            if (assignmentData.branch === null) assignmentData.branch = "";
            if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
            if (assignmentData.number === null) assignmentData.number = '0';
            setAssignment(assignmentData)
            setAssignmentEnums(assignmentResponse.assignmentEnums);
        });
    }, [assignmentId])

    useEffect(() => {
        console.log(assignmentEnums);
    }, [assignmentEnums])

    function saveAssignment() {
        setAssignment({...assignment, "status": "ready for review"});
        fetcher(`/api/assignments/${assignmentId}`, "put", jwt, assignment).then((assignmentData) => {setAssignment(assignmentData)})
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
                
                <DropdownButton id='assignmentNumber' variant='success' title={`Assignment ${assignment.number}`}>
                    {assignmentEnums.map(assignmentEnum => <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>{"Assignment " + assignmentEnum.assignmentName}</Dropdown.Item>)}



                </DropdownButton>

            
                </Col>
                </Form.Group>
                <Form.Group as={Row} className='my-5 justify-content-center'>
                    <Col md='10'>
                    <Form.Label>
                        Assignment Number
                    </Form.Label>
                        <Form.Control type='text' id='number' onChange={(e) => {setAssignment({...assignment, "number": e.target.value}); console.log(assignment)}} value={assignment.number} />
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
                    <Button variant='success' onClick={() => {setAssignment({...assignment, status: "ready for review"}); saveAssignment();}} className='m-3'>Submit Assignment</Button>
                    <Button variant='secondary' onClick={() => window.location.href = '/dashboard'} className='m-3'>Back to Dashboard</Button>
                    </Col>
                </Form.Group>
                </> ) : (<></>)}
        </div>
    );
}

export default AssignmentView;