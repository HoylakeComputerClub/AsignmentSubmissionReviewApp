import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Dropdown, DropdownButton, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
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
        id: null,
        commentText: "",
        assignmentId: assignmentId !== null ? parseInt(assignmentId) : null,
        user: jwt
    });

    useEffect(() => {
        console.log(assignmentId);
    fetcher(`/api/comments?assignmentId=${assignmentId}`, "get", jwt, null).then((commentData) => {
            console.log(commentData);
            setComments(commentData);

        });
    }, [])

    
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

    function saveAssignment() {
        if (assignment.status === assignmentStatuses[0].status) {
            updateAssignment("status", assignmentStatuses[1].status);
        } else if (assignment.status === assignmentStatuses[3].status) {
            updateAssignment("status", assignmentStatuses[5].status);
        } else {
            persist();
        }
           
    }

    function persist() {
        fetcher(`/api/assignments/${assignmentId}`, "put", jwt, assignment).then((assignmentData) => {setAssignment(assignmentData)});
    }

    function submitComment () {
        if (comment.id) {
            fetcher(`/api/comments/${comment.id}`, 'put', jwt, comment).then( data => {
                const commentsCopy = [...comments];
                const idx = commentsCopy.findIndex((c) => c.id === data.id);
                console.log("commentsubmit")
                commentsCopy[idx] = data;
                updateComments(commentsCopy);
                updateComment("");
            }).catch((err) => console.log(err));

        } else {
            fetcher('/api/comments', 'post', jwt, comment).then( data => {
                const commentsCopy = [...comments];
                commentsCopy.push(data);
                setComments(data);
                updateComment("");
            }).catch(err => console.log(err));

        }
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

    function handleDeleteComment (commentId) {
        // DELETE logic goes here

    }

    function handleUpdateComment (commentId) {
        // UPDATE logic goes here
        const idx = comments.findIndex(c => c.id === commentId);
        console.log(idx);
        console.log("handleupdate");
        const commentCopy = {
            id: commentId,
            commentText: comments[idx].commentText,
            assignmentId: assignmentId,
            user: jwt,
            createdBy: comments[idx].createdBy
        }
        setComment(commentCopy);
    }
    
    return (
        <div><Row className='my-5'>
            <Col>
                <h1>Learner Assignment View</h1>
                <h2>
                    {assignment.number ? `Assignment ${assignment.number}` : <></>}
                </h2>
            </Col>
            <Col>
            <StatusBadge text={assignment.status}></StatusBadge>
            </Col>
        </Row>
            {assignment ? (
                <>
                <Form.Group as={Row} className='my-5 justify-content-center'>
                {/* <Col md='10'>
                <Form.Label>
                    Assignment
                </Form.Label>
                
                <DropdownButton id='assignmentNumber' variant='success' onSelect={(e) => {updateAssignment("number", e);}} title={assignment.number ? `Assignment ${assignment.number}` : 'Select an Assignment'}>
                    {assignmentEnums.map(assignmentEnum => <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>{"Assignment " + assignmentEnum.assignmentName}</Dropdown.Item>)}



                </DropdownButton>

            
                </Col>
                </Form.Group>
                <Form.Group as={Row} className='my-5 justify-content-center'>
                    <Col md='10'>
                    <Form.Label>
                        Github URL
                    </Form.Label>
                        <Form.Control type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                    </Col>
                    <Col md='10'>
                    <Form.Label>
                        Branch
                    </Form.Label>
                    <Form.Control type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                    </Col> */}
                    {assignment.status === "Completed" || assignment.status === "In Review" || assignment.status === "Submitted" || assignment.status === "Resubmitted" || assignment.status === "Needs Update" ? 
                    <>
                     {assignment.status === "Submitted" || assignment.status === "In Review" || assignment.status === "Resubmitted" ? 
                        <>
                        <Col md='10'>
                            <Form.Label>Github URL</Form.Label>
                            <Form.Control readOnly type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                        </Col>
                        <Col md='10'>
                            <Form.Label>Branch</Form.Label>
                            <Form.Control readOnly type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                        </Col>
                        <Col md='10'>
                                {/* <Button variant='success' onClick={() => {window.open(assignment.codeReviewVideoUrl, '_blank'); }} className='m-3'>Watch Review Video</Button> */}
                                <Button variant='secondary' onClick={() => navigate('/dashboard')} className='m-3'>Back to Dashboard</Button>
                        </Col>
                        </>: assignment.status === "Completed" ? <>
                            <Col md='10'>
                                <Form.Label>Github URL</Form.Label>
                                <Form.Control readOnly type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                            </Col>
                            <Col md='10'>
                                <Form.Label>Branch</Form.Label>
                                <Form.Control readOnly type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                            </Col>
                            <Col md='10'>
                                <Form.Label>Review Video URL</Form.Label>
                                <Form.Control readOnly type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.codeReviewVideoUrl} />
                            </Col>

                            <Col md='10'>
                                <Button variant='success' onClick={() => {window.open(assignment.codeReviewVideoUrl, '_blank'); }} className='m-3'>Watch Review Video</Button>
                                <Button variant='secondary' onClick={() => navigate( '/dashboard')} className='m-3'>Back to Dashboard</Button>
                            </Col>
                    </> : <>
                    <Col md='10'>
                    <Form.Label>
                        Github URL
                    </Form.Label>
                        <Form.Control type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                    </Col>
                    <Col md='10'>
                    <Form.Label>
                        Branch
                    </Form.Label>
                    <Form.Control type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                    </Col>
                    <Col md='10'>
                <Form.Label>
                    Assignment
                </Form.Label>
                
                <DropdownButton id='assignmentNumber' variant='success' onSelect={(e) => {updateAssignment("number", e);}} title={assignment.number ? `Assignment ${assignment.number}` : 'Select an Assignment'}>
                    {assignmentEnums.map(assignmentEnum => <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>{"Assignment " + assignmentEnum.assignmentName}</Dropdown.Item>)}

                </DropdownButton>

            
                </Col>
                    

                        <Col md='10'>
                        <Button variant='success' onClick={() => {saveAssignment()}} className='m-3'>Resubmit Assignment</Button>
                        <Button variant='secondary' onClick={() => navigate( '/dashboard')} className='m-3'>Back to Dashboard</Button>
                        </Col>

                    </> }
               
                    </> : <>
                    <Col md='10'>
                    <Form.Label>
                        Github URL
                    </Form.Label>
                        <Form.Control type='url' id='githubUrl' onChange={(e) => {setAssignment({...assignment, "githubUrl": e.target.value});}} value={assignment.githubUrl} />
                    </Col>
                    <Col md='10'>
                    <Form.Label>
                        Branch
                    </Form.Label>
                    <Form.Control type='text' id='branch' onChange={(e) => {setAssignment({...assignment, "branch": e.target.value}); }} value={assignment.branch} />
                    </Col>
                    <Col md='10'>
                <Form.Label>
                    Assignment
                </Form.Label>
                
                <DropdownButton id='assignmentNumber' variant='success' onSelect={(e) => {updateAssignment("number", e);}} title={assignment.number ? `Assignment ${assignment.number}` : 'Select an Assignment'}>
                    {assignmentEnums.map(assignmentEnum => <Dropdown.Item key={assignmentEnum.assignmentNumber} eventKey={assignmentEnum.assignmentNumber}>{"Assignment " + assignmentEnum.assignmentName}</Dropdown.Item>)}



                </DropdownButton>

            
                </Col>
                    

                        <Col md='10'>
                        <Button variant='success' onClick={() => {saveAssignment()}} className='m-3'>Submit Assignment</Button>
                        <Button variant='secondary' onClick={() => navigate( '/dashboard')} className='m-3'>Back to Dashboard</Button>
                        </Col>
                    
                    </>}
                </Form.Group>
                </> ) : (<></>)}
                <div className="mt-5">
                    <textarea value={comment.commentText} onChange={(e) => {updateComment(e.target.value)}} style={{width: '100%', borderRadius: '7px' }}></textarea>
                    <Button onClick={() => {submitComment()}} style={{width: '100%'}}>Post Comment</Button>
                </div>
                <div className='mt-5'>
                    <h4>Comments</h4>
                    {comments.map((comm) =>( 
                        <Comment key={comm.id} c={comm} username={comm.createdBy.username} commentText={comm.commentText} id={comments.id}handleDeleteComment={handleDeleteComment} handleUpdateComment={handleUpdateComment}/>    
                    ))}
                </div>
        </div>
    );
}

export default AssignmentView;