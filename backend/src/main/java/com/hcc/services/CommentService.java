package com.hcc.services;

import com.hcc.dto.CommentDto;
import com.hcc.entities.Assignment;
import com.hcc.entities.Comment;
import com.hcc.entities.User;
import com.hcc.repositories.AssignmentRepository;
import com.hcc.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Service
public class CommentService {
    @Autowired
    CommentRepository commentRepository;

    @Autowired
    AssignmentRepository assignmentRepository;

    public Comment createComment(Comment comment) {
        Comment c = new Comment(LocalDateTime.now(), new Assignment(), new User(), "Some Generated Comment Text");
        return c;
    }

    public Comment save(CommentDto commentDto, User user) {
        Comment comment = new Comment();
        comment.setId(commentDto.getId());
        comment.setCreatedBy(user);
        Assignment assignment = assignmentRepository.getByid(commentDto.getAssignmentId());
        comment.setAssignment(assignment);
        if (commentDto.getId() == null)
            comment.setCreatedDate(LocalDateTime.now());

        comment.setCommentText(commentDto.getCommentText());
        return commentRepository.save(comment);


    }

    public Set<Comment> getCommentsByAssignmentId(Long assignmentId) {
        Set<Comment> comments = commentRepository.findByAssignmentId(assignmentId);
        return comments;
    }


}
