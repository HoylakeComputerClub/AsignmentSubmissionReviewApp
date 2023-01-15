package com.hcc.dto;

public class CommentDto {

    private Long id;
    private Long assignmentId;
    private String commentText;

    private String userJwt;

    public CommentDto(Long assignmentId, String commentText, String userJwt) {
        this.assignmentId = assignmentId;
        this.commentText = commentText;
        this.userJwt = userJwt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAssignmentId() {
        return assignmentId;
    }

    public void setAssignmentId(Long assignmentId) {
        this.assignmentId = assignmentId;
    }

    public String getCommentText() {
        return commentText;
    }

    public void setCommentText(String commentText) {
        this.commentText = commentText;
    }

    public String getUserJwt() {
        return userJwt;
    }

    public void setUserJwt(String userJwt) {
        this.userJwt = userJwt;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "assignmentId=" + assignmentId +
                ", commentText='" + commentText + '\'' +
                ", userJwt='" + userJwt + '\'' +
                '}';
    }
}
