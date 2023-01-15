package com.hcc.dto;

public class CommentDto {

    private Long id;
    private Long assignmentId;
    private String text;

    private String user;

    public CommentDto(Long assignmentId, String text, String user) {
        this.assignmentId = assignmentId;
        this.text = text;
        this.user = user;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "CommentDto{" +
                "assignmentId=" + assignmentId +
                ", commentText='" + text + '\'' +
                ", userJwt='" + user + '\'' +
                '}';
    }
}
