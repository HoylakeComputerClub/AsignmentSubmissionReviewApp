package com.hcc.controllers;

import com.hcc.dto.CommentDto;
import com.hcc.entities.Comment;
import com.hcc.entities.User;
import com.hcc.repositories.CommentRepository;
import com.hcc.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;
    @Autowired
    CommentRepository commentRepo;

    @PostMapping
    ResponseEntity<?> createComment(@RequestBody CommentDto commentDto, @AuthenticationPrincipal User user) {

        System.out.println(commentDto);
        Comment comment = commentService.save(commentDto, user);

        return ResponseEntity.ok(comment);
    }

    @GetMapping
    public ResponseEntity<Set<?>> getCommentsByAssignment(@RequestParam Long assignmentId) {
        Set<Comment> comments = commentService.getCommentsByAssignmentId(assignmentId);
        return ResponseEntity.ok(comments);
    }
}
