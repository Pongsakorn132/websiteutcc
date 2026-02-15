# UTC-TP

Trip and Internship Management Platform (Spring Boot + Vue SPA).

## Run (No DB Required)

Default profile uses in-memory H2.

```bash
.\mvnw.cmd -DskipTests spring-boot:run
```

Open `http://localhost:8080/#/login`

## Run (PostgreSQL)

1) Start database
```bash
docker compose up -d
```

2) Run backend + web
```bash
$env:SPRING_PROFILES_ACTIVE="postgres"
.\mvnw.cmd -DskipTests spring-boot:run
```

Default demo users:
- student1 / pass123
- advisor1 / pass123
- staff1 / pass123
- admin1 / pass123

## Deploy (Vercel + Render)

Frontend (Vercel) serves `src/main/resources/static`. Set the backend URL in:

`src/main/resources/static/config.js`

Example:

```js
window.__APP_CONFIG__ = {
  apiBase: "https://your-render-app.onrender.com",
};
```

Backend (Render) must run the Spring Boot app and expose port 8080 (or set `PORT` + `server.port`).
