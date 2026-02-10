# UTC-TP

Trip and Internship Management Platform (Spring Boot + Vue SPA).

## Run (PostgreSQL)

1) Start database
```bash
docker compose up -d
```

2) Run backend + web
```bash
.\mvnw.cmd -DskipTests spring-boot:run
```

3) Open
`http://localhost:8080/#/login`

Default demo users:
- student1 / pass123
- advisor1 / pass123
- staff1 / pass123
- admin1 / pass123
