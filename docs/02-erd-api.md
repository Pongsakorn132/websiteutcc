# ERD and REST API Contract (Draft)

This document provides a draft ERD and a minimal REST API contract for the
Trip/Internship Management platform.

## ERD (Mermaid)

```mermaid
erDiagram
  USER ||--o{ USER_ROLE : has
  ROLE ||--o{ USER_ROLE : assigned
  USER ||--o{ STUDENT_PROFILE : is
  USER ||--o{ ADVISOR_PROFILE : is
  USER ||--o{ STAFF_PROFILE : is

  TRIP ||--o{ TRIP_SCHEDULE : contains
  TRIP ||--o{ TRIP_BUDGET : uses
  TRIP ||--o{ TRIP_DOCUMENT : requires
  TRIP ||--o{ APPLICATION : accepts

  COMPANY ||--o{ INTERNSHIP_POSITION : offers
  INTERNSHIP_POSITION ||--o{ APPLICATION : receives

  USER ||--o{ APPLICATION : submits
  APPLICATION ||--o{ APPROVAL_HISTORY : tracks

  USER ||--o{ REPORT : submits
  REPORT ||--o{ REPORT_GRADE : graded
  REPORT ||--o{ REPORT_FEEDBACK : feedback

  USER ||--o{ NOTIFICATION : receives

  USER ||--o{ AI_REQUEST : triggers
  AI_REQUEST ||--o{ AI_RESPONSE : returns

  USER {
    uuid id
    string username
    string email
    string status
    datetime created_at
  }
  ROLE {
    uuid id
    string name
  }
  USER_ROLE {
    uuid user_id
    uuid role_id
  }
  STUDENT_PROFILE {
    uuid user_id
    string student_id
    string major
    int year
  }
  ADVISOR_PROFILE {
    uuid user_id
    string faculty
  }
  STAFF_PROFILE {
    uuid user_id
    string department
  }
  TRIP {
    uuid id
    string title
    string status
    date start_date
    date end_date
  }
  TRIP_SCHEDULE {
    uuid id
    uuid trip_id
    datetime start_time
    datetime end_time
    string activity
  }
  TRIP_BUDGET {
    uuid id
    uuid trip_id
    decimal amount
    string category
  }
  TRIP_DOCUMENT {
    uuid id
    uuid trip_id
    string doc_type
    string file_url
  }
  COMPANY {
    uuid id
    string name
    string industry
    string status
  }
  INTERNSHIP_POSITION {
    uuid id
    uuid company_id
    string title
    string requirements
    int slots
  }
  APPLICATION {
    uuid id
    uuid user_id
    uuid trip_id
    uuid internship_position_id
    string type
    string status
    datetime created_at
  }
  APPROVAL_HISTORY {
    uuid id
    uuid application_id
    uuid approver_id
    string decision
    string note
    datetime decided_at
  }
  REPORT {
    uuid id
    uuid user_id
    uuid trip_id
    uuid internship_position_id
    string file_url
    string status
  }
  REPORT_GRADE {
    uuid id
    uuid report_id
    uuid grader_id
    decimal score
  }
  REPORT_FEEDBACK {
    uuid id
    uuid report_id
    uuid advisor_id
    string comment
  }
  NOTIFICATION {
    uuid id
    uuid user_id
    string channel
    string message
    string status
  }
  AI_REQUEST {
    uuid id
    uuid user_id
    string type
    json payload
  }
  AI_RESPONSE {
    uuid id
    uuid ai_request_id
    json output
    string status
  }
```

## API Conventions

- Base path: `/api/v1`
- Auth: JWT (Authorization: Bearer <token>)
- Pagination: `page`, `size`, `sort`
- Standard error format:
  - `code` (string), `message` (string), `details` (array)

## Authentication

| Method | Endpoint           | Notes                         |
|--------|--------------------|------------------------------|
| POST   | /auth/login        | Returns access + refresh     |
| POST   | /auth/refresh      | Returns new access token     |
| POST   | /auth/logout       | Invalidates refresh token    |

## Trips

| Method | Endpoint                 | Description                  |
|--------|--------------------------|------------------------------|
| GET    | /trips                   | List trips                   |
| POST   | /trips                   | Create trip (Advisor)        |
| GET    | /trips/{id}              | Trip details                 |
| PUT    | /trips/{id}              | Update trip                  |
| POST   | /trips/{id}/publish      | Publish trip                 |
| GET    | /trips/{id}/schedule     | List schedule items          |
| POST   | /trips/{id}/schedule     | Add schedule item            |

Trip create payload (example):

```json
{
  "title": "Industry Visit 2026",
  "objective": "Observe manufacturing processes",
  "startDate": "2026-03-01",
  "endDate": "2026-03-02"
}
```

## Internship Positions

| Method | Endpoint                         | Description            |
|--------|----------------------------------|------------------------|
| GET    | /internships                     | List positions         |
| POST   | /internships                     | Create position        |
| GET    | /internships/{id}                | Position details       |
| PUT    | /internships/{id}                | Update position        |

## Applications and Approvals

| Method | Endpoint                         | Description             |
|--------|----------------------------------|-------------------------|
| POST   | /applications                    | Apply (trip/internship) |
| GET    | /applications                    | List my applications    |
| GET    | /applications/{id}               | Application detail      |
| PUT    | /applications/{id}/approve       | Approve or reject       |
| GET    | /applications/{id}/history       | Approval history        |

Approval payload:

```json
{
  "decision": "APPROVE",
  "note": "Meets requirements"
}
```

## Reports

| Method | Endpoint                      | Description              |
|--------|-------------------------------|--------------------------|
| POST   | /reports                      | Upload report            |
| GET    | /reports/{id}                 | Report details           |
| PUT    | /reports/{id}/grade           | Grade report             |

## Documents and Files

| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| POST   | /files                        | Upload file (S3/MinIO)    |
| GET    | /files/{id}                   | Download file             |

## Notifications

| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| GET    | /notifications                | List user notifications   |
| PUT    | /notifications/{id}/read      | Mark as read              |

## Analytics

| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| GET    | /analytics/overview           | KPIs and summary          |
| GET    | /analytics/trips              | Trip stats                |
| GET    | /analytics/internships        | Internship stats          |

## AI Assistant

| Method | Endpoint                      | Description               |
|--------|-------------------------------|---------------------------|
| POST   | /ai/summary                   | Summarize report          |
| POST   | /ai/recommend                 | Recommend internships     |
| POST   | /ai/draft                     | Draft approval document   |
| POST   | /ai/chat                      | FAQ chatbot               |

AI request (example):

```json
{
  "type": "REPORT_SUMMARY",
  "input": {
    "reportId": "uuid",
    "language": "en"
  }
}
```
