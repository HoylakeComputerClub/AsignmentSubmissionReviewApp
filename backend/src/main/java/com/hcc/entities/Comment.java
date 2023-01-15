package com.hcc.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdDate;
    @ManyToOne
    private Assignment assignment;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;

    @Column(columnDefinition = "TEXT", length = 512)
    private String commentText;

    public Comment() {}


    public Comment(LocalDateTime createdDate, Assignment assignment, User createdBy, String commentText) {
        this.createdDate = createdDate;
        this.assignment = assignment;
        this.createdBy = createdBy;
        this.commentText = commentText;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public Assignment getAssignment() {
        return assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    @Override
    public String toString() {
        return "Comment{" +
                "id=" + id +
                ", createdDate=" + createdDate +
                ", assignment=" + assignment +
                ", createdBy=" + createdBy +
                ", commentText='" + commentText + '\'' +
                '}';
    }
}
