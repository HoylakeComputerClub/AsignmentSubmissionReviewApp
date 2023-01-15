import React from 'react';
import { Badge } from 'react-bootstrap';

const Comment = (props) => {
    


    return (
        <div className='mt-3 comment-bubble' style={{padding: '20px', margin: '10px', border: '1px dotted gray', borderRadius: '7px'}}>
            <div style={{fontWeight: 'bold'}}>
                {`${props.c.createdBy.username}`}  
                <span onClick={() => {props.handleUpdateComment(props.c.id)}} style={{cursor: 'pointer', color: 'blue', paddingLeft: '60px'}}>edit</span>
                <span onClick={() => {props.handleDeleteComment()}} style={{cursor: 'pointer', color: 'red', paddingLeft: '30px'}}>delete</span></div>
            <div>
                {props.c.commentText}
               
            </div>
        </div>
    );




}

export default Comment;