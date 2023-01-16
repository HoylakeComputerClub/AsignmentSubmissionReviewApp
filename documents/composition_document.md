# Design Document for the Assignment Review App

## Synopsis

## User Stories
### Learner User Stories
- As a Learner i want to be able to log in to the app and be presented with a dashboard
- As a learner I want a dashboard that shows all of my currently working on, submitted, rejected, and completed assignments.
- As a Learner I want to be able to click on a `Create Assignment` button on my dashboard and be presented with a form to allow me to submit an assignment with room for my github url and the branch i am working on.
- As a Learner I wantt to be able to click on an `Edit` button on one of the assignments on my dashboard to edit and resubmit it if it was returned unfinished.
- As a Learner I want to be able to click on a `View` button on a completed assignment on my dashboard and be able to view a review video for the given assignment.

### Reviewer User Stories
- As a Reviewer I want to be able to login to the app and be presented with a dashboard.
- As a Reviewer I want to be able to see any submitted assignments on my dashboard ready to claim.
- As a Reviewer I want to be able to click on a `claim` button on an assignment in my dashboard to claim it ready for review
- As a Reviewer I want to be able to be able to click a `View` button on one of my claimed assignments and get a detail view of the assignment ready to review
- As a Reviewer I want to be able to click a `Reject Assignment` button in an assignment view to reject a learners assignment submission to be resubmitted by them.
- As a Reviewer I want to be able to click on a `Complet Assignment Review` button to mark it as complete.
- As a Reviewer I want to be able to see any resubmitted assignments that I have previously rejected.
- As a Reviewer I want to be able to click a `Reclaim` button on a resubmitted assignment that I previously rejected to do a follow up review.

## Technology Stack
- Frontend **React JS**
- Backend API **Spring Boot with Spring Data JPA with Hibernate and the Postgress Driver**
- Security and Auth **Spring Scurity using JWT for user persistence**
- Database **PostgreSQL server for a relational database**

## Domain Objects (Entities / DTO / ENUM)

### User
- id : Long
- cohortStartDate: Date
- username: String
- password: String
- authorities: List<Authority>

### Authority
- id: Long
- authority: String
- user: User

### Assignment
- id: Long
- status: String
- number: Integer
- githubUrl: String
- branch: String
- reviewVideoUrl: String
- user: User
- codeReviewer: User

### DTOs
- AssignemntResponseDto
- AuthCredentialRequest

### Enums
- AssignmentEnum
- AssignmentStatusEnum
- AuthorityEnum

## Database Tables

### users
- id : number
- cohort_start_date: date
- username: varchar
- password: varchar

### authorities
- id: number
- authority: varchar
- user_id: number

### assignments
- id: number
- branch: varchar
- code_review_video_url: varchar
- github_url: varchar
- number: number
- user_id: number
- code_reviewer_id: number

## Restful Endpoints

- **Login**                     `/api/auth/login`
- **Validate token**            `/api/auth/validate`
- **Get Assignments By User**   `/api/assignments`
- **Get Assignment By Id**      `/api/assignments/{id}`
- **Put Assignment by Id**      `/api/assignments/{id}`
- **Post Assignment**           `/api/assignments`



## Wireframes

### Home Page (Public)
![Home Page (Public)](./images/home_page_public.png)

### Home Page (Authenticated)
![Home Page (Authenticated)](./images/home_page_authenticated.png)

### Login Page
![Login Page](./images/login_page.png)

### Learner Dashboard
![Learner Dashboard](./images/learner_dashboard.png)

### Reviewer Dashboard
![Reviewer Dashboard](./images/reviewer_dashboard.png)

### Learner Assignment View
![Learner Assignment View](./images/learner_assignment_view.png)

### Reviewer Assignment View
![Reviewer Assignment View](./images/reviewer_assignment_view.png)
