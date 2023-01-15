import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Badge, Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { BrowserRouter, Router, useNavigate } from 'react-router-dom';
import fetcher from '../../Services/fetchService';
import StatusBadge from '../../StatusBadge';
import { useLocalState } from '../../utils/useLocalStorage';
import Comment from '../../Comment';


const AssignmentView = (props) => {
    const navigate = useNavigate();
    const [jwt, setJwt] = useLocalState("", "jwt");
    const [assignment, setAssignment] = useState({ "number": "0", "githubUrl": "", "branch": "", "status": null });
    const assignmentId = window.location.href.split("/assignments/")[1];
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [assignmentStatuses, setAssignmentStatuses] = useState([]);
    const [comments, setComments] = useState([]);
    const previousAssignmentValue = useRef(assignment);

    const [assignmentEnums, setAssignmentEnums] = useState([]);
    const [comment, setComment] = useState({
        id: 1,
        commentText: "",
        assignmentId: assignmentId !== null ? parseInt(assignmentId) : null,
        user: jwt
    });
    useEffect(() => {
        console.log(assignmentId);
    fetcher(`/api/comments?assignmentId=${assignmentId}`, "get", jwt, null).then((commentData) => {
            setComments(commentData);
        });
    }, [])

    function submitComment () {
        console.log(comment);
        fetcher('/api/comments', 'post', jwt, comment).then( data => {
            updateComments(data);
        }).then();
    }

    function updateComment(value) {
        const commentCopy = {...comment};
        commentCopy.commentText = value;
        setComment(commentCopy);
    }

    function updateComments(value) {
        const commentsCopy = [...comments, value];
        setComments(commentsCopy);
    }
    
    useEffect(() => {
        fetcher(`/api/assignments/${assignmentId}`, "get", jwt).then(assignmentResponse => {
            let assignmentData = assignmentResponse.assignment;
            if (assignmentData.branch === null) assignmentData.branch = "";
            if (assignmentData.githubUrl === null) assignmentData.githubUrl = "";
            if (assignmentData.number === null) assignmentData.number = '0';
            setAssignment(assignmentData)
            setAssignmentEnums(assignmentResponse.assignmentEnums);
            setAssignmentStatuses(assignmentResponse.assignmentStatusEnums);
        });
    }, [])

    function updateAssignment (prop, val) {
        const newAssignment = {...assignment};
        newAssignment[prop] = val;
        setAssignment(newAssignment);
    }

    useEffect(() => {
        if (previousAssignmentValue.current.status !== assignment.status) {
           persist();
        }
        previousAssignmentValue.current = assignment;
    }, [assignment])

    function saveAssignment(status) {
        if (status && assignment.status !== status) {
            updateAssignment("status", status);

        } else {
            persist();
        }
           
    }

    function persist() {
        fetcher(`/api/assignments/${assignmentId}`, "put", jwt, assignment).then((assignmentData) => {setAssignment(assignmentData)});
    }

    return (
        <div style={{ width: "1400px" }}><Row className='my-5' style={{ textAlign: "center" }}>
            <Col>
                <h1>Code Reviewer Assignment View</h1>
            </Col>
            <Col>
                <StatusBadge text={assignment.status}></StatusBadge>
            </Col>

        </Row>
        <Col>
            <h2>
                    {assignment.number ? `Assignment ${assignment.number}` : <></>}
                </h2>
            </Col>
            {assignment ? (
                <>   
                <Form.Group as={Row} className='my-5 justify-content-center'>
                    <Col md='10' className='mt-2'>
                        <Form.Label>Github URL</Form.Label>
                        <Form.Control readOnly type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                    </Col>
                    <Col md='10'className='mt-2'>
                        <Form.Label>Branch</Form.Label>
                        <Form.Control readOnly type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                    </Col>
               
                   {assignment.status === "Needs Update" || assignment.status === "Completed" ? <>
                        <Col md='10' className='mt-2'>
                        <Form.Label>Review Video URL</Form.Label>
                        <Form.Control readOnly type='url' id='codeReviewVideoUrl' placeholder='Add a link to your review video here' onChange={(e) => {setAssignment({...assignment, "codeReviewVideoUrl": e.target.value});}} value={assignment.codeReviewVideoUrl} />
                    </Col>
                    <Col md='10' className='mt-2'>
                        {/* <Button variant='success' onClick={() => {saveAssignment(assignmentStatuses[4].status)}} className='m-3'>Complete Review</Button> */}
                        <Button variant='danger' onClick={() => {saveAssignment(assignmentStatuses[2].status)}} className='m-3'>Re-Claim</Button>
                        <Button variant='secondary' onClick={() => navigate('/dashboard')} className='m-3'>Back to Dashboard</Button>
                    </Col>
                    </> : <>
                    <Col md='10' className='mt-2'>
                        <Form.Label>Review Video URL</Form.Label>
                        <Form.Control type='url' id='codeReviewVideoUrl' placeholder='Add a link to your review video here' onChange={(e) => {setAssignment({...assignment, "codeReviewVideoUrl": e.target.value});}} value={assignment.codeReviewVideoUrl} />
                    </Col>
                    <Col md='10' className='mt-2'>
                        <Button variant='success' onClick={() => {saveAssignment(assignmentStatuses[4].status)}} className='m-3'>Complete Review</Button>
                        <Button variant='danger' onClick={() => {saveAssignment(assignmentStatuses[3].status)}} className='m-3'>Reject Assignment</Button>
                        <Button variant='secondary' onClick={() => navigate('/dashboard')} className='m-3'>Back to Dashboard</Button>
                    </Col>
                    </>}
                </Form.Group>
                </> ) : (<></>)}
                <div className="mt-5">
                    <textarea onChange={(e) => {updateComment(e.target.value)}} style={{width: '100%', borderRadius: '7px' }}></textarea>
                    <Button type = 'submit' onClick={() => {submitComment()}} style={{width: '100%'}}>Post Comment</Button>
                </div>
                <div className='mt-5'>
                    {comments.map((comm) => <Comment key={comm.id} c={comm} /> )}
                </div>
        </div>
    );
}

export default AssignmentView;