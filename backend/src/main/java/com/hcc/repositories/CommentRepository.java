package com.hcc.repositories;

import com.hcc.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c " +
    "where c.assignment.id = :assignmentId")
    Set<Comment> findByAssignmentId(Long assignmentId);
}