# Workflows and Role Permissions

This document captures the agreed core workflows and role permissions for the
Trip/Internship Management platform.

## Roles

- Student
- Advisor (Faculty/Academic)
- Faculty Staff
- Admin

## Core Workflows

1) Trip planning and execution
   - Advisor creates a trip draft (dates, objectives, budget, schedule).
   - Faculty Staff reviews budget and required documents.
   - Advisor submits for approval; Admin/Faculty Staff approves as policy requires.
   - Trip is published and opens for student applications.
   - Students apply; Advisor reviews and approves/rejects.
   - Notifications are sent for status changes and upcoming dates.
   - After trip completion, students upload reports; Advisor reviews and grades.

2) Internship posting and placement
   - Faculty Staff manages company profiles and positions.
   - Students browse positions and submit applications.
   - Advisor reviews applications and approves or requests changes.
   - Students confirm placements; system tracks internship status.
   - Students upload reports and evaluations; Advisor grades.

3) Document and reporting flow
   - System stores required documents for trips and internships.
   - Students upload reports and evaluation forms.
   - Advisor provides feedback and grades.
   - Faculty Staff and Admin access aggregated reports and statistics.

4) Notification and tracking
   - System sends email/in-app notifications for approvals, deadlines, and schedule
     changes.
   - Students can track application and internship status in real time.

## Role Permission Matrix (High Level)

Legend: C=create, R=read, U=update, D=delete, A=approve, G=grade

| Feature / Data Domain         | Student | Advisor | Faculty Staff | Admin |
|------------------------------|---------|---------|---------------|-------|
| Trip (metadata, schedule)    | R       | CRUD    | R/U           | CRUD  |
| Trip applications            | C/R     | A/R/U   | R             | R/U   |
| Internship positions         | R       | R       | CRUD          | CRUD  |
| Internship applications      | C/R     | A/R/U   | R             | R/U   |
| Reports and evaluations      | C/R/U   | R/G/U   | R             | R     |
| Budget and documents         | R       | R/U     | CRUD          | CRUD  |
| Notifications                | R       | R       | R             | R     |
| Users and roles              | R (self)| R (adv) | R (faculty)   | CRUD  |
| Analytics and statistics     | R (self)| R       | R/U           | R/U   |

## Notes and Assumptions

- Approval policy is configurable: some universities may require both Faculty
  Staff and Admin approval for trips or budgets.
- Students only see their own applications, schedules, and reports.
- Advisors only see students in their assigned cohorts or groups.

## Open Questions

- Is SSO/LDAP required for authentication?
- Which channels are required for notifications (email, SMS, push)?
- Are there compliance requirements such as PDPA-specific retention rules?
