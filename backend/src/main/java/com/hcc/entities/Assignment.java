package com.hcc.entities;

import javax.persistence.*;

@Entity
@Table(name = "assignments")
public class Assignment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "name")
    private String name;

    @Column(name = "github_url")
    private String githubUrl;

    @Column(name = "branch")
    private String branch;

    @Column(name = "code_review_video_url")
    private String codeReviewVideoUrl;

    @ManyToOne(optional = false)
    private User user;


    // constructors
    public Assignment() { }

    public Assignment(String status, String githubUrl, String branch, String codeReviewVideoUrl, User user) {
        this.status = status;
        this.githubUrl = githubUrl;
        this.branch = branch;
        this.codeReviewVideoUrl = codeReviewVideoUrl;
        this.user = user;
    }

    // getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public void setGithubUrl(String githubUrl) {
        this.githubUrl = githubUrl;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getCodeReviewVideoUrl() {
        return codeReviewVideoUrl;
    }

    public void setCodeReviewVideoUrl(String codeReviewVideoUrl) {
        this.codeReviewVideoUrl = codeReviewVideoUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
