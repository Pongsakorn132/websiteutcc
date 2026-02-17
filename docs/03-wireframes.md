# Wireframes and Navigation Map (Draft)

This document provides low-fidelity wireframes for Web and Mobile along with
the navigation map.

## Navigation Map (Web)

- Login
  - Dashboard (role-based)
    - Trips
      - Trip List
      - Trip Detail
      - Trip Create/Edit (Advisor)
      - Trip Approvals (Advisor/Staff)
    - Internships
      - Position List
      - Position Detail
      - Position Create/Edit (Staff)
    - Applications
      - My Applications (Student)
      - Review Queue (Advisor)
    - Reports
      - Report Upload (Student)
      - Report Review (Advisor)
    - Documents
      - Uploads
      - Templates
    - Analytics
    - Admin (Users/Roles/Settings)

## Web Wireframes (ASCII)

### 1) Login

```text
+------------------------------------------------------+
| University Trip/Internship Portal                    |
|                                                      |
|  [ Email ]__________________                          |
|  [ Password ]_______________                          |
|  ( Sign In )                                          |
|  [ ] Remember me    [ Forgot password ]               |
+------------------------------------------------------+
```

### 2) Dashboard (Advisor)

```text
+------------------------------------------------------+
| Logo | Dashboard | Trips | Internships | Reports | Me |
+------------------------------------------------------+
| KPI Cards: [Active Trips] [Pending Apps] [Reports]    |
|------------------------------------------------------|
| Upcoming Trips                                        |
| - Industry Visit 2026   [View] [Approve]              |
| - Lab Tour 2026         [View]                        |
|------------------------------------------------------|
| Applications Awaiting Review                          |
| - Student A / Trip X   [Approve] [Reject]             |
+------------------------------------------------------+
```

### 3) Trip List

```text
+------------------------------------------------------+
| Trips  [Create Trip]  [Filter] [Search]              |
|------------------------------------------------------|
| Trip Name         Dates       Status     Actions     |
| Industry Visit    03/01-03/02 Draft      [Edit]      |
| Lab Tour          04/10-04/10 Published  [View]      |
+------------------------------------------------------+
```

### 4) Trip Detail

```text
+------------------------------------------------------+
| Trip: Industry Visit 2026                             |
| Status: Draft   [Publish] [Edit]                      |
|------------------------------------------------------|
| Overview | Schedule | Budget | Documents | Applicants |
|------------------------------------------------------|
| Overview: objective, dates, capacity, contacts        |
| Schedule: list of activities                          |
| Budget: items and totals                              |
+------------------------------------------------------+
```

### 5) Application Review (Advisor)

```text
+------------------------------------------------------+
| Applications - Trip: Industry Visit                   |
|------------------------------------------------------|
| Student   Major   GPA   Status   Actions              |
| A         CS      3.2   Pending  [Approve] [Reject]   |
| B         EE      3.5   Pending  [Approve] [Reject]   |
+------------------------------------------------------+
```

### 6) Report Upload (Student)

```text
+------------------------------------------------------+
| Report Upload                                         |
|------------------------------------------------------|
| Trip/Internship: [Select]                             |
| File: [Choose file]                                   |
| Comment: [_____________________________]              |
| [Submit]                                              |
+------------------------------------------------------+
```

## Mobile Wireframes (ASCII)

### 1) Student Home

```text
+------------------+
| Dashboard        |
|------------------|
| My Trips          >
| My Internships    >
| Applications      >
| Reports           >
| Notifications     >
+------------------+
```

### 2) Trip Detail (Mobile)

```text
+------------------+
| Industry Visit   |
| 03/01-03/02      |
| Status: Open     |
|------------------|
| Overview         |
| Schedule         |
| Apply            |
+------------------+
```

### 3) Application Status

```text
+------------------+
| Applications     |
|------------------|
| Trip X  Pending  |
| Trip Y Approved  |
| Intern Z Review  |
+------------------+
```

## UI Notes

- Use a single navigation shell on web with role-based menu visibility.
- Mobile uses bottom tabs or a simple list-based nav.
- Keep forms short, with clear progress and status labels.
