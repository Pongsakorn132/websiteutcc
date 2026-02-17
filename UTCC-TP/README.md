# UTCC-TP - Trip & Internship Management System

ระบบจัดการทริปและฝึกงาน สำหรับมหาวิทยาลัยหอการค้าไทย (University of the Thai Chamber of Commerce)

## 🎯 คุณสมบัติหลัก

### สำหรับนักศึกษา (Student)
- ✅ เข้าสู่ระบบด้วย Login Page พร้อมรูปภาพพื้นหลัง UTCC
- ✅ Dashboard แสดงสถิติและข้อมูลส่วนตัว
- ✅ สมัครเข้าร่วมทริปการเรียนรู้
- ✅ สมัครตำแหน่งฝึกงาน
- ✅ ติดตามสถานะการสมัคร
- ✅ ส่งและจัดการรายงาน
- ✅ แก้ไขข้อมูลโปรไฟล์

### สำหรับอาจารย์ที่ปรึกษา (Advisor/Staff)
- ✅ Dashboard ภาพรวมระบบ
- ✅ สร้างและจัดการทริป (CRUD)
- ✅ จัดการตำแหน่งฝึกงาน
- ✅ อนุมัติ/ปฏิเสธการสมัคร
- ✅ ตรวจสอบและให้คะแนนรายงาน
- ✅ AI Assistant สำหรับช่วยงาน
- ✅ ระบบการแจ้งเตือน

### สำหรับผู้ดูแลระบบ (Admin)
- ✅ จัดการผู้ใช้งาน
- ✅ ตั้งค่าสิทธิ์การเข้าถึง
- ✅ ดู Audit Logs
- ✅ ตรวจสอบสถานะระบบ

## 🛠 เทคโนโลยีที่ใช้

### Backend
- Java 17
- Spring Boot 3.x
- Spring Security + JWT Authentication
- JPA/Hibernate
- H2 Database (Dev) / PostgreSQL (Prod)

### Frontend
- HTML5 + CSS3 + JavaScript (ES6+)
- Custom Design System (Warm Earth Tones)
- Responsive Design (Mobile-first)
- Vanilla JS (No Framework Dependencies)

## 📦 การติดตั้งและรันโปรเจกต์

### วิธีที่ 1: รันด้วย H2 In-Memory Database (ไม่ต้องติดตั้ง DB)

```bash
# Windows
.\mvnw.cmd -DskipTests spring-boot:run

# Linux/Mac
./mvnw -DskipTests spring-boot:run
```

เปิดเว็บเบราว์เซอร์ที่: **`http://localhost:8080/login.html`**

### วิธีที่ 2: รันด้วย PostgreSQL

1) เริ่ม Database
```bash
docker compose up -d
```

2) รัน Backend + Frontend
```bash
# Windows
$env:SPRING_PROFILES_ACTIVE="postgres"
.\mvnw.cmd -DskipTests spring-boot:run

# Linux/Mac
export SPRING_PROFILES_ACTIVE=postgres
./mvnw -DskipTests spring-boot:run
```

## 🔑 การเข้าสู่ระบบ (Demo Users)

### นักศึกษา
- **Username:** `student1`
- **Password:** `pass123`
- **Role:** STUDENT

### อาจารย์ที่ปรึกษา
- **Username:** `advisor1`
- **Password:** `pass123`
- **Role:** ADVISOR

### เจ้าหน้าที่
- **Username:** `staff1`
- **Password:** `pass123`
- **Role:** STAFF

### ผู้ดูแลระบบ
- **Username:** `admin1`
- **Password:** `pass123`
- **Role:** ADMIN

## 📁 โครงสร้างโปรเจกต์

```
UTCC-TP/
├── src/
│   ├── main/
│   │   ├── java/org/example/utcctp/
│   │   │   ├── api/              # REST API Controllers
│   │   │   ├── auth/             # Authentication & JWT
│   │   │   ├── model/            # JPA Entity Models
│   │   │   ├── repository/       # Data Repositories
│   │   │   ├── security/         # Security Configuration
│   │   │   └── ...
│   │   └── resources/
│   │       ├── static/           # Frontend Files
│   │       │   ├── login.html    # หน้า Login (เข้าระบบ)
│   │       │   ├── index.html    # หน้า Advisor/Admin Dashboard
│   │       │   ├── student.html  # หน้า Student Dashboard
│   │       │   ├── app.js        # Main JavaScript (Advisor/Admin)
│   │       │   ├── student.js    # Student JavaScript
│   │       │   ├── styles.css    # Global Styles
│   │       │   └── images/       # รูปภาพและ Assets
│   │       └── application.yml   # Spring Configuration
│   └── test/
├── web/                          # Development Frontend (sync to static/)
├── pom.xml                       # Maven Dependencies
└── README.md
```

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `POST /api/auth/login` - เข้าสู่ระบบ
- `GET /api/auth/me` - ข้อมูลผู้ใช้ปัจจุบัน
- `GET /api/auth/health` - Health check

### Dashboard (`/api/dashboard`)
- `GET /api/dashboard/summary` - สถิติภาพรวม (Advisor/Admin)
- `GET /api/dashboard/student` - สถิตินักศึกษา (Student)

### Trips (`/api/v1/trips`)
- `GET /api/v1/trips` - รายการทริปทั้งหมด
- `GET /api/v1/trips/{id}` - รายละเอียดทริป
- `POST /api/v1/trips` - สร้างทริปใหม่
- `PUT /api/v1/trips/{id}` - แก้ไขทริป
- `DELETE /api/v1/trips/{id}` - ลบทริป

### Internships (`/api/v1/internships`)
- `GET /api/v1/internships` - รายการตำแหน่งฝึกงาน
- `POST /api/v1/internships` - สร้างตำแหน่งใหม่

### Applications (`/api/applications`)
- `GET /api/applications` - รายการการสมัครทั้งหมด
- `GET /api/applications/my` - การสมัครของฉัน (Student)
- `POST /api/applications` - สมัครใหม่
- `PUT /api/applications/{id}/decision` - อนุมัติ/ปฏิเสธ

### Reports (`/api/v1/reports`)
- `GET /api/v1/reports` - รายการรายงาน
- `POST /api/v1/reports` - ส่งรายงาน
- `PUT /api/v1/reports/{id}/grade` - ให้คะแนนรายงาน

### Notifications (`/api/v1/notifications`)
- `GET /api/v1/notifications` - รายการการแจ้งเตือน
- `PUT /api/v1/notifications/{id}/read` - ทำเครื่องหมายอ่านแล้ว

## 🎨 Design System

- **Color Palette:** Warm Earth Tones (Primary: #1c5f5a, Accent: #d96b2f)
- **Typography:** Space Grotesk (Body), Fraunces (Headings)
- **Border Radius:** 20px (Cards), 12px (Inputs)
- **Shadows:** Soft elevation shadows
- **Animations:** Smooth fade-in, slide-up, stagger effects

## 🔒 Security Features

- ✅ JWT Token-based Authentication
- ✅ Role-based Authorization (STUDENT, ADVISOR, STAFF, ADMIN)
- ✅ CORS Configuration (localhost + production origins)
- ✅ BCrypt Password Encryption
- ✅ Secure HTTP Headers
- ✅ API Endpoint Protection

## 🚀 การ Deploy

### Frontend (Vercel/Static Hosting)

Frontend files อยู่ใน `src/main/resources/static/`

ตั้งค่า Backend URL ใน `config.js`:
```js
window.__APP_CONFIG__ = {
  apiBase: "https://your-backend.onrender.com"
};
```

### Backend (Render/Railway/Heroku)

Deploy Spring Boot app พร้อม expose port 8080:
```bash
java -jar target/utcctp-0.0.1-SNAPSHOT.jar
```

Environment Variables:
- `SPRING_PROFILES_ACTIVE=postgres`
- `DATABASE_URL=postgresql://...`

## ✅ Features ที่พัฒนาเสร็จแล้ว

- ✅ หน้า Login พร้อมรูปภาพพื้นหลัง UTCC
- ✅ Authentication & Authorization ระบบ JWT
- ✅ Student Dashboard พร้อม UX/UI ที่เหมาะสม
- ✅ Advisor/Admin Dashboard
- ✅ การสร้างและจัดการทริป (CRUD)
- ✅ การสร้างและจัดการฝึกงาน (CRUD)
- ✅ ระบบการสมัครพร้อมอนุมัติ
- ✅ ระบบรายงานและให้คะแนน
- ✅ Modal dialogs สำหรับรายละเอียด
- ✅ Filter และ Search ทำงานได้จริง
- ✅ Loading states และ Error handling
- ✅ Notifications system
- ✅ Responsive design ทุกขนาดหน้าจอ
- ✅ เชื่อมต่อ Frontend-Backend เรียบร้อย

## 📱 หน้าจอหลัก

1. **`login.html`** - หน้าเข้าสู่ระบบพร้อมรูปภาพพื้นหลัง UTCC และเลือก Role
2. **`student.html`** - Dashboard สำหรับนักศึกษา (Student-only features)
3. **`index.html`** - Dashboard สำหรับอาจารย์และผู้ดูแล (Advisor/Admin features)

## 🎯 ระบบพร้อมใช้งาน 100%

ระบบได้รับการพัฒนาครบถ้วนและพร้อมออกสู่โลกภายนอก:
- ✅ ทุกหน้าใช้งานได้จริง (Fully Functional)
- ✅ เชื่อมต่อ Backend API สำเร็จ
- ✅ Authentication ทำงานถูกต้อง
- ✅ Role-based access control
- ✅ Responsive ทุกขนาดหน้าจอ
- ✅ Error handling และ Loading states
- ✅ UX/UI ออกแบบมาอย่างดีตาม Design System

## 📄 License

MIT License - University of the Thai Chamber of Commerce © 2026
#   U p d a t e   a u t h o r   e m a i l  
 