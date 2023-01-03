# Assignment Submission and Review App Design Document

## Requirements
A learner should be able to login to the application and see a dashboard that outlines the following information:
- What assignments are due, and when.
- A page to review past assignments (optional).
- Status of an assignment that is currently under review and if it needs updating.
- A way to submit (or re-submit) an assignment for review.

When submitting an assignment, the learner will be asked to provide the following information:
- **Github URL** the the public repository.
- which **branch** is the current one.

Once submitted, the **status** updates from `pending submission` to `submitted`

Once a learner has submitted an assignment, an email notification should be sent to all active code reviewers letting them know that a new code review is ready. The first code reviewer to claim the review will be able to start working on it (it should then become unavailable to others for review).

Once a code reviewer has claimed a submitted assignment, the status changes from `submitted` to `in review`.

A code reviewer can reject a code review if it does not satisfy the assignment's criteria.

When a code reviewer rejects an assignment the status will change from `submitted` to `needs update`.
When this happens, a notification will be sent to teh learner telling them that they need to do more work on that assignment. Once they have done their work, they can revisit that assignment for re-submission.

When a learner re-submits an assignment, they will be given a chance to change their **Github URL** and **branch**, then it's status will move from `needs updating` to `in review` and get assigned back to the same code reviewer. A notification will be sent to teh code reviewer.

When a code reviewer has successfully completed their review, they will be able to submit their completed review (by adding the URL to a video recording), and then a notification will be sent to the learner. The status will change from `in review` to `completed`.

### Daily Batch Jobs
- Notify code reviewers for reviews that are sitting stagnant and waiting for review.
- Notify learners if their rejected assignments are still needing updates.

### Appendix

**Statuses:** pending submission, submitted, in review, needs update, completed 




