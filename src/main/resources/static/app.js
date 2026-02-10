const { createApp, reactive, ref, computed, onMounted } = Vue;
const { createRouter, createWebHashHistory, useRoute, useRouter } = VueRouter;
const { createI18n, useI18n } = VueI18n;

const messages = {
  en: {
    app: {
      title: "Trip & Internship Platform",
      subtitle: "University trip, internship, and reporting hub",
    },
    nav: {
      dashboard: "Dashboard",
      trips: "Trips",
      internships: "Internships",
      applications: "Applications",
      reports: "Reports",
      ai: "AI Assistant",
      admin: "Admin",
    },
    actions: {
      notifications: "Notifications",
      createTrip: "Create Trip",
      openApplications: "Open Applications",
      viewAnalytics: "View Analytics",
      logout: "Log out",
      login: "Sign in",
      review: "Review",
      viewAll: "View all",
      openPlan: "Open plan",
      viewDetails: "View details",
      reviewBatch: "Review batch",
      runSummary: "Run Summary",
      generateMatch: "Generate Match",
      createDraft: "Create Draft",
      openChat: "Open Chat",
      addUser: "Add User",
      apply: "Apply",
      approve: "Approve",
      reject: "Reject",
      save: "Save",
      createCompany: "Create Company",
      createPosition: "Create Position",
      uploadReport: "Upload Report",
      send: "Send",
      openNotifications: "Open Notifications",
      close: "Close",
      refresh: "Refresh",
      addSchedule: "Add Schedule",
      addBudget: "Add Budget",
      addDocument: "Add Document",
      publishTrip: "Publish Trip",
      submit: "Submit",
      uploadFile: "Upload File",
    },
    labels: {
      role: "Role",
      user: "User",
      language: "Language",
      status: "Status",
      title: "Title",
      email: "Email",
      major: "Major",
      year: "Year",
      company: "Company",
      position: "Position",
      startDate: "Start date",
      endDate: "End date",
      capacity: "Capacity",
      budget: "Budget",
      objective: "Objective",
      location: "Location",
      file: "File",
      note: "Note",
      score: "Score",
    },
    login: {
      title: "Welcome back",
      subtitle: "Sign in to manage trips, internships, and reports.",
      username: "Username",
      password: "Password",
      demoTitle: "Demo accounts",
      demoNote: "Use these accounts to explore role-based views.",
      error: "Invalid username or password.",
      badge: "Cohort 2026",
      heroTitle: "Orchestrate field trips and internships with clarity.",
      heroNote:
        "A single workspace for planning, approvals, budgets, and student reporting.",
      featurePlan: "Structured trip planning with live schedules",
      featureApprove: "Fast approvals for advisors and staff",
      featureTrack: "Real-time student progress and submissions",
      ticket: "Field Trip Access",
    },
    roles: {
      STUDENT: "Student",
      ADVISOR: "Advisor",
      STAFF: "Faculty Staff",
      ADMIN: "Admin",
    },
    dashboard: {
      eyebrow: "System Overview",
      heroTitle: "Plan trips, place interns, and track outcomes in one flow.",
      heroNote:
        "Built for advisors and faculty teams. All approvals, reports, and analytics stay connected.",
      liveStatus: "Live Status",
      activeTrips: "Active Trips",
      internshipSlots: "Internship Slots",
      reportsDue: "Reports Due",
      upcomingTrips: "Upcoming Trips",
      approvalQueue: "Approval Queue",
      viewAll: "View all",
      awaiting: "Awaiting approval",
      next7Days: "Next 7 days",
      openSlots: "open",
    },
    trips: {
      title: "Manage trips from draft to completion.",
      newTrip: "New Trip",
    },
    internships: {
      title: "Match students to positions with confidence.",
      addPosition: "Add Position",
      slots: "slots",
    },
    applications: {
      title: "Keep approvals moving and transparent.",
      student: "Student",
      program: "Program",
      type: "Type",
    },
    reports: {
      title: "Review outcomes and evaluate performance.",
      pendingLabel: "pending",
    },
    filters: {
      draft: "Draft",
      published: "Published",
      completed: "Completed",
      allSectors: "All sectors",
      openSlots: "Open slots",
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      awaitingReview: "Awaiting review",
      graded: "Graded",
      uploadTemplate: "Upload Template",
      users: "Users",
      roles: "Roles",
      auditLogs: "Audit Logs",
      action: "Action",
    },
    ai: {
      title: "Draft, summarize, and recommend with oversight.",
      summary: "Report Summary",
      recommend: "Placement Matching",
      draft: "Approval Draft",
      chatbot: "Chatbot",
      summaryNote: "Generate a draft summary for advisor review.",
      recommendNote: "Recommend placements based on skills and major.",
      draftNote: "Auto-draft trip approval documents.",
      chatbotNote: "Answer student questions on process and steps.",
    },
    admin: {
      title: "Manage users, permissions, and compliance.",
      activeUsers: "Active Users",
      security: "Security",
      systemHealth: "System Health",
      advisors: "advisors",
      admins: "admins",
      alerts: "critical alerts",
      lastScan: "Last scan",
      pdpaReady: "PDPA ready",
      uptime: "uptime",
      apiAvg: "API avg",
      cacheHit: "Cache hit",
    },
    status: {
      pending: "Pending",
      published: "Published",
      draft: "Draft",
      approved: "Approved",
      rejected: "Rejected",
      completed: "Completed",
      submitted: "Submitted",
      awaiting_review: "Awaiting review",
      graded: "Graded",
      in_progress: "In progress",
      open: "Open",
      closed: "Closed",
    },
  },
  th: {
    app: {
      title: "แพลตฟอร์มทริปและฝึกงาน",
      subtitle: "ศูนย์กลางการจัดการทริป ฝึกงาน และรายงาน",
    },
    nav: {
      dashboard: "ภาพรวม",
      trips: "ทริปดูงาน",
      internships: "ฝึกงาน",
      applications: "คำขอสมัคร",
      reports: "รายงาน",
      ai: "ผู้ช่วย AI",
      admin: "ผู้ดูแลระบบ",
    },
    actions: {
      notifications: "การแจ้งเตือน",
      createTrip: "สร้างทริป",
      openApplications: "เปิดคำขอ",
      viewAnalytics: "ดูสถิติ",
      logout: "ออกจากระบบ",
      login: "เข้าสู่ระบบ",
      review: "ตรวจสอบ",
      viewAll: "ดูทั้งหมด",
      openPlan: "เปิดแผน",
      viewDetails: "ดูรายละเอียด",
      reviewBatch: "ตรวจชุดรายงาน",
      runSummary: "สรุปทันที",
      generateMatch: "สร้างคำแนะนำ",
      createDraft: "สร้างร่าง",
      openChat: "เปิดแชต",
      addUser: "เพิ่มผู้ใช้",
      apply: "สมัคร",
      approve: "อนุมัติ",
      reject: "ไม่อนุมัติ",
      save: "บันทึก",
      createCompany: "สร้างสถานประกอบการ",
      createPosition: "สร้างตำแหน่ง",
      uploadReport: "อัปโหลดรายงาน",
      send: "ส่ง",
      openNotifications: "เปิดการแจ้งเตือน",
      close: "ปิด",
      refresh: "รีเฟรช",
      addSchedule: "เพิ่มตาราง",
      addBudget: "เพิ่มงบ",
      addDocument: "เพิ่มเอกสาร",
      publishTrip: "เผยแพร่ทริป",
      submit: "ยืนยัน",
      uploadFile: "อัปโหลดไฟล์",
    },
    labels: {
      role: "บทบาท",
      user: "ผู้ใช้",
      language: "ภาษา",
      status: "สถานะ",
      title: "ชื่อเรื่อง",
      email: "อีเมล",
      major: "สาขา",
      year: "ชั้นปี",
      company: "สถานประกอบการ",
      position: "ตำแหน่ง",
      startDate: "วันเริ่ม",
      endDate: "วันสิ้นสุด",
      capacity: "จำนวนรับ",
      budget: "งบประมาณ",
      objective: "วัตถุประสงค์",
      location: "สถานที่",
      file: "ไฟล์",
      note: "หมายเหตุ",
      score: "คะแนน",
    },
    login: {
      title: "ยินดีต้อนรับกลับ",
      subtitle: "ลงชื่อเข้าใช้เพื่อจัดการทริป ฝึกงาน และรายงาน",
      username: "ชื่อผู้ใช้",
      password: "รหัสผ่าน",
      demoTitle: "บัญชีตัวอย่าง",
      demoNote: "ใช้บัญชีเหล่านี้เพื่อดูมุมมองตามบทบาท",
      error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
      badge: "รุ่นปี 2026",
      heroTitle: "จัดการทริปและฝึกงานให้เป็นระบบในที่เดียว",
      heroNote:
        "รวมการวางแผน อนุมัติ งบประมาณ และรายงานนักศึกษาไว้ในแพลตฟอร์มเดียว",
      featurePlan: "วางแผนทริปแบบเป็นขั้นตอน พร้อมตารางกิจกรรม",
      featureApprove: "อนุมัติรวดเร็วสำหรับอาจารย์และเจ้าหน้าที่",
      featureTrack: "ติดตามความคืบหน้าและการส่งรายงานแบบเรียลไทม์",
      ticket: "สิทธิ์เข้าร่วมทริป",
    },
    roles: {
      STUDENT: "นักศึกษา",
      ADVISOR: "อาจารย์ที่ปรึกษา",
      STAFF: "เจ้าหน้าที่คณะ",
      ADMIN: "ผู้ดูแลระบบ",
    },
    dashboard: {
      eyebrow: "ภาพรวมระบบ",
      heroTitle: "วางแผนทริป จัดฝึกงาน และติดตามผลในขั้นตอนเดียว",
      heroNote:
        "ออกแบบเพื่ออาจารย์และเจ้าหน้าที่ ให้การอนุมัติ รายงาน และสถิติอยู่ในที่เดียว",
      liveStatus: "สถานะล่าสุด",
      activeTrips: "ทริปที่ดำเนินการ",
      internshipSlots: "ตำแหน่งฝึกงาน",
      reportsDue: "รายงานที่ถึงกำหนด",
      upcomingTrips: "ทริปที่กำลังจะถึง",
      approvalQueue: "คิวอนุมัติ",
      viewAll: "ดูทั้งหมด",
      awaiting: "รออนุมัติ",
      next7Days: "ภายใน 7 วัน",
      openSlots: "ว่าง",
    },
    trips: {
      title: "จัดการทริปตั้งแต่ร่างจนจบกิจกรรม",
      newTrip: "สร้างทริปใหม่",
    },
    internships: {
      title: "จับคู่นักศึกษากับตำแหน่งฝึกงานได้อย่างมั่นใจ",
      addPosition: "เพิ่มตำแหน่ง",
      slots: "ตำแหน่ง",
    },
    applications: {
      title: "อนุมัติคำขออย่างโปร่งใส",
      student: "นักศึกษา",
      program: "สาขา",
      type: "ประเภท",
    },
    reports: {
      title: "ตรวจผลลัพธ์และประเมินผลงาน",
      pendingLabel: "รายการ",
    },
    filters: {
      draft: "ฉบับร่าง",
      published: "เผยแพร่",
      completed: "เสร็จสิ้น",
      allSectors: "ทุกอุตสาหกรรม",
      openSlots: "ตำแหน่งว่าง",
      pending: "รอดำเนินการ",
      approved: "อนุมัติแล้ว",
      rejected: "ไม่อนุมัติ",
      awaitingReview: "รอตรวจ",
      graded: "ให้คะแนนแล้ว",
      uploadTemplate: "อัปโหลดแบบฟอร์ม",
      users: "ผู้ใช้",
      roles: "สิทธิ์",
      auditLogs: "บันทึกตรวจสอบ",
      action: "การจัดการ",
    },
    ai: {
      title: "ช่วยร่าง สรุป และแนะนำ โดยมีคนดูแล",
      summary: "สรุปรายงาน",
      recommend: "จับคู่งานฝึกงาน",
      draft: "ร่างเอกสารอนุมัติ",
      chatbot: "แชตบอท",
      summaryNote: "สร้างสรุปร่างเพื่อให้อาจารย์ตรวจทาน",
      recommendNote: "แนะนำการจับคู่จากทักษะและสาขา",
      draftNote: "ร่างเอกสารขออนุมัติทริปโดยอัตโนมัติ",
      chatbotNote: "ตอบคำถามนักศึกษาเกี่ยวกับขั้นตอน",
    },
    admin: {
      title: "จัดการผู้ใช้ สิทธิ์ และความปลอดภัย",
      activeUsers: "ผู้ใช้ที่ใช้งาน",
      security: "ความปลอดภัย",
      systemHealth: "สถานะระบบ",
      advisors: "อาจารย์ที่ปรึกษา",
      admins: "ผู้ดูแลระบบ",
      alerts: "การแจ้งเตือนสำคัญ",
      lastScan: "สแกนล่าสุด",
      pdpaReady: "พร้อมใช้งาน PDPA",
      uptime: "เวลาพร้อมใช้งาน",
      apiAvg: "API เฉลี่ย",
      cacheHit: "อัตราแคช",
    },
    status: {
      pending: "รอดำเนินการ",
      published: "เผยแพร่",
      draft: "ฉบับร่าง",
      approved: "อนุมัติแล้ว",
      rejected: "ไม่อนุมัติ",
      completed: "เสร็จสิ้น",
      submitted: "ส่งแล้ว",
      awaiting_review: "รอตรวจ",
      graded: "ให้คะแนนแล้ว",
      in_progress: "กำลังดำเนินการ",
      open: "เปิดรับ",
      closed: "ปิดรับ",
    },
  },
};

const state = reactive({
  token: localStorage.getItem("utcctp_token") || "",
  user: null,
  locale: localStorage.getItem("utcctp_locale") || "th",
});

const apiFetch = async (path, options = {}) => {
  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  if (state.token) {
    headers.Authorization = `Bearer ${state.token}`;
  }
  const response = await fetch(`/api/v1${path}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || "Request failed");
  }
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return null;
  }
  return response.json();
};

const api = {
  login: (payload) =>
    apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  me: () => apiFetch("/auth/me"),
  dashboard: () => apiFetch("/dashboard/summary"),
  analytics: () => apiFetch("/analytics/overview"),
  listTrips: () => apiFetch("/trips"),
  getTrip: (id) => apiFetch(`/trips/${id}`),
  createTrip: (payload) =>
    apiFetch("/trips", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateTrip: (id, payload) =>
    apiFetch(`/trips/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  publishTrip: (id) =>
    apiFetch(`/trips/${id}/publish`, {
      method: "POST",
    }),
  addSchedule: (id, payload) =>
    apiFetch(`/trips/${id}/schedule`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  addBudget: (id, payload) =>
    apiFetch(`/trips/${id}/budget`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  addDocument: (id, payload) =>
    apiFetch(`/trips/${id}/documents`, {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listCompanies: () => apiFetch("/companies"),
  createCompany: (payload) =>
    apiFetch("/companies", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  listInternships: () => apiFetch("/internships"),
  createInternship: (payload) =>
    apiFetch("/internships", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updateInternship: (id, payload) =>
    apiFetch(`/internships/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  listApplications: () => apiFetch("/applications"),
  createApplication: (payload) =>
    apiFetch("/applications", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  decideApplication: (id, payload) =>
    apiFetch(`/applications/${id}/decision`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  listReports: () => apiFetch("/reports"),
  createReport: (payload) =>
    apiFetch("/reports", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  gradeReport: (id, payload) =>
    apiFetch(`/reports/${id}/grade`, {
      method: "PUT",
      body: JSON.stringify(payload),
    }),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return apiFetch("/files", { method: "POST", body: formData });
  },
  listNotifications: () => apiFetch("/notifications"),
  markNotificationRead: (id) =>
    apiFetch(`/notifications/${id}/read`, { method: "PUT" }),
  aiSummary: (payload) =>
    apiFetch("/ai/summary", { method: "POST", body: JSON.stringify(payload) }),
  aiRecommend: (payload) =>
    apiFetch("/ai/recommend", { method: "POST", body: JSON.stringify(payload) }),
  aiDraft: (payload) =>
    apiFetch("/ai/draft", { method: "POST", body: JSON.stringify(payload) }),
  aiChat: (payload) =>
    apiFetch("/ai/chat", { method: "POST", body: JSON.stringify(payload) }),
  adminUsers: () => apiFetch("/admin/users"),
  createUser: (payload) =>
    apiFetch("/admin/users", { method: "POST", body: JSON.stringify(payload) }),
  updateUser: (id, payload) =>
    apiFetch(`/admin/users/${id}`, { method: "PUT", body: JSON.stringify(payload) }),
};

const navItems = [
  { path: "/dashboard", label: "nav.dashboard", roles: ["STUDENT", "ADVISOR", "STAFF", "ADMIN"] },
  { path: "/trips", label: "nav.trips", roles: ["STUDENT", "ADVISOR", "STAFF", "ADMIN"] },
  { path: "/internships", label: "nav.internships", roles: ["STUDENT", "ADVISOR", "STAFF", "ADMIN"] },
  { path: "/applications", label: "nav.applications", roles: ["STUDENT", "ADVISOR", "STAFF", "ADMIN"] },
  { path: "/reports", label: "nav.reports", roles: ["STUDENT", "ADVISOR", "STAFF", "ADMIN"] },
  { path: "/ai", label: "nav.ai", roles: ["ADVISOR", "STAFF", "ADMIN"] },
  { path: "/admin", label: "nav.admin", roles: ["ADMIN"] },
];

const formatDate = (value, locale) => {
  if (!value) {
    return "-";
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat(locale === "th" ? "th-TH" : "en-US", {
    month: "short",
    day: "numeric",
  }).format(date);
};

const formatCurrency = (value, locale) =>
  new Intl.NumberFormat(locale === "th" ? "th-TH" : "en-US", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(value);

const statusClass = (status) => {
  const normalized = status?.toLowerCase();
  if (normalized === "published" || normalized === "approved") {
    return "status green";
  }
  if (normalized === "pending" || normalized === "awaiting_review") {
    return "status amber";
  }
  if (normalized === "rejected") {
    return "status red";
  }
  return "status slate";
};

const statusKey = (status) => `status.${status?.toLowerCase() || "draft"}`;

const LoginView = {
  template: `
    <div class="app-shell">
      <div class="bg-shape shape-one" aria-hidden="true"></div>
      <div class="bg-shape shape-two" aria-hidden="true"></div>
      <div class="bg-shape shape-three" aria-hidden="true"></div>
      <section class="login-page">
        <div class="login-hero">
          <div class="login-hero-top">
            <div class="brand brand-inline">
              <div class="brand-mark">UT</div>
              <div>
                <p class="brand-title">UTCCTP</p>
                <p class="brand-subtitle">{{ $t("app.subtitle") }}</p>
              </div>
            </div>
            <div class="login-lang">
              <p class="eyebrow">{{ $t("labels.language") }}</p>
              <button class="ghost pill" @click="toggleLocale">{{ localeLabel }}</button>
            </div>
          </div>
          <div class="login-hero-body">
            <span class="login-badge">{{ $t("login.badge") }}</span>
            <h1>{{ $t("login.heroTitle") }}</h1>
            <p class="hero-note">{{ $t("login.heroNote") }}</p>
            <ul class="login-features">
              <li>{{ $t("login.featurePlan") }}</li>
              <li>{{ $t("login.featureApprove") }}</li>
              <li>{{ $t("login.featureTrack") }}</li>
            </ul>
            <div class="login-ticket">
              <div>
                <span class="ticket-label">UTCCTP</span>
                <span class="ticket-value">{{ $t("login.ticket") }}</span>
              </div>
              <span class="ticket-code">#TRIP-2026</span>
            </div>
          </div>
        </div>
        <div class="login-panel">
          <div class="login-card">
            <h2>{{ $t("login.title") }}</h2>
            <p>{{ $t("login.subtitle") }}</p>
            <form class="login-form" @submit.prevent="submit">
              <div>
                <label>{{ $t("login.username") }}</label>
                <input v-model="username" placeholder="student1" required />
              </div>
              <div>
                <label>{{ $t("login.password") }}</label>
                <input v-model="password" type="password" placeholder="pass123" required />
              </div>
              <button class="solid" type="submit">{{ $t("actions.login") }}</button>
            </form>
            <div v-if="error" class="banner">{{ $t("login.error") }}</div>
          </div>
          <aside class="login-side">
            <div class="login-side-head">
              <h3>{{ $t("login.demoTitle") }}</h3>
              <p class="muted">{{ $t("login.demoNote") }}</p>
            </div>
            <div class="demo-list">
              <div class="demo-item" v-for="demo in demoUsers" :key="demo.username">
                <strong>{{ demo.username }}</strong>
                <span>{{ demo.password }}</span>
                <span class="chip">{{ $t(\`roles.\${demo.role}\`) }}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  `,
  setup() {
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const error = ref(false);
    const demoUsers = [
      { username: "student1", password: "pass123", role: "STUDENT" },
      { username: "advisor1", password: "pass123", role: "ADVISOR" },
      { username: "staff1", password: "pass123", role: "STAFF" },
      { username: "admin1", password: "pass123", role: "ADMIN" },
    ];

    const toggleLocale = () => {
      state.locale = state.locale === "th" ? "en" : "th";
      i18n.global.locale.value = state.locale;
      localStorage.setItem("utcctp_locale", state.locale);
      document.documentElement.lang = state.locale;
    };

    const localeLabel = computed(() => (state.locale === "th" ? "English" : "ไทย"));

    const submit = async () => {
      error.value = false;
      try {
        const data = await api.login({ username: username.value, password: password.value });
        state.token = data.token;
        state.user = data.user;
        localStorage.setItem("utcctp_token", data.token);
        router.push("/dashboard");
      } catch (err) {
        error.value = true;
      }
    };

    return { username, password, submit, error, demoUsers, toggleLocale, localeLabel };
  },
};

const AppLayout = {
  template: `
    <div class="app-shell">
      <div class="bg-shape shape-one" aria-hidden="true"></div>
      <div class="bg-shape shape-two" aria-hidden="true"></div>
      <div class="bg-shape shape-three" aria-hidden="true"></div>
      <header class="top-bar">
        <div class="brand">
          <div class="brand-mark">UT</div>
          <div>
            <p class="brand-title">UTCCTP</p>
            <p class="brand-subtitle">{{ $t("app.subtitle") }}</p>
          </div>
        </div>
        <div class="top-actions">
          <button class="ghost" @click="toggleNotifications">
            {{ $t("actions.notifications") }}
            <span v-if="unreadCount" class="badge">{{ unreadCount }}</span>
          </button>
          <button class="ghost" @click="toggleLocale">{{ localeLabel }}</button>
          <button class="solid" @click="logout">{{ $t("actions.logout") }}</button>
          <div class="avatar">{{ initials }}</div>
        </div>
      </header>
      <div v-if="showNotifications" class="notification-panel">
        <div class="panel-head">
          <h4>{{ $t("actions.notifications") }}</h4>
          <div class="panel-actions">
            <button class="ghost small" @click="loadNotifications">{{ $t("actions.refresh") }}</button>
            <button class="ghost small" @click="toggleNotifications">{{ $t("actions.close") }}</button>
          </div>
        </div>
        <div class="panel-body">
          <div v-if="!notifications.length" class="muted">No notifications</div>
          <div class="notification-item" v-for="item in notifications" :key="item.id">
            <div>
              <strong>{{ item.title }}</strong>
              <p class="muted">{{ item.message }}</p>
            </div>
            <button class="link" @click="markRead(item.id)">Mark read</button>
          </div>
        </div>
      </div>
      <div class="layout">
        <nav class="side-nav">
          <button
            v-for="item in availableNav"
            :key="item.path"
            class="nav-item"
            :class="{ active: route.path === item.path }"
            @click="go(item.path)"
          >
            {{ $t(item.label) }}
          </button>
          <div class="nav-foot">
            <span>{{ $t("labels.role") }}: {{ roleLabel }}</span>
            <span>{{ $t("labels.user") }}: {{ userName }}</span>
          </div>
        </nav>
        <main class="content">
          <router-view />
        </main>
      </div>
    </div>
  `,
  setup() {
    const router = useRouter();
    const route = useRoute();

    const role = computed(() => state.user?.roles?.[0] || "GUEST");
    const availableNav = computed(() =>
      navItems.filter((item) => !item.roles || item.roles.includes(role.value))
    );

    const notifications = ref([]);
    const showNotifications = ref(false);
    let eventSource = null;

    const logout = () => {
      state.token = "";
      state.user = null;
      localStorage.removeItem("utcctp_token");
      router.push("/login");
    };

    const toggleLocale = () => {
      state.locale = state.locale === "th" ? "en" : "th";
      i18n.global.locale.value = state.locale;
      localStorage.setItem("utcctp_locale", state.locale);
      document.documentElement.lang = state.locale;
    };

    const localeLabel = computed(() => (state.locale === "th" ? "English" : "ไทย"));
    const roleLabel = computed(() => (state.user ? i18n.global.t(`roles.${role.value}`) : "-"));
    const userName = computed(() => state.user?.displayName || "-");
    const initials = computed(() =>
      (state.user?.displayName || "U")
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    );

    const go = (path) => router.push(path);

    const loadNotifications = async () => {
      notifications.value = await api.listNotifications();
    };

    const markRead = async (id) => {
      await api.markNotificationRead(id);
      await loadNotifications();
    };

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
      if (showNotifications.value) {
        loadNotifications();
      }
    };

    const unreadCount = computed(
      () => notifications.value.filter((item) => item.status === "UNREAD").length
    );

    const connectStream = () => {
      if (eventSource) {
        eventSource.close();
      }
      if (!state.token) {
        return;
      }
      eventSource = new EventSource(`/api/v1/notifications/stream?token=${state.token}`);
      eventSource.addEventListener("notification", () => {
        loadNotifications();
      });
    };

    onMounted(() => {
      connectStream();
    });

    return {
      availableNav,
      route,
      logout,
      roleLabel,
      userName,
      initials,
      localeLabel,
      toggleLocale,
      go,
      notifications,
      showNotifications,
      unreadCount,
      toggleNotifications,
      loadNotifications,
      markRead,
    };
  },
};

const DashboardView = {
  template: `
    <section v-if="summary">
      <div class="hero reveal">
        <div>
          <p class="eyebrow">{{ $t("dashboard.eyebrow") }}</p>
          <h1>{{ $t("dashboard.heroTitle") }}</h1>
          <p class="hero-note">{{ $t("dashboard.heroNote") }}</p>
          <div class="hero-actions">
            <button class="solid">{{ $t("actions.openApplications") }}</button>
            <button class="ghost">{{ $t("actions.viewAnalytics") }}</button>
          </div>
        </div>
        <div class="hero-panel">
          <div class="panel-title">{{ $t("dashboard.liveStatus") }}</div>
          <div class="panel-grid">
            <div class="panel-card">
              <p>{{ $t("dashboard.activeTrips") }}</p>
              <h3>{{ summary.activeTrips }}</h3>
              <span class="muted">{{ $t("dashboard.awaiting") }}</span>
            </div>
            <div class="panel-card">
              <p>{{ $t("dashboard.internshipSlots") }}</p>
              <h3>{{ summary.internshipSlots }}</h3>
              <span class="muted">{{ summary.unmatchedSlots }} {{ $t("dashboard.openSlots") }}</span>
            </div>
            <div class="panel-card">
              <p>{{ $t("dashboard.reportsDue") }}</p>
              <h3>{{ summary.reportsDue }}</h3>
              <span class="muted">{{ $t("dashboard.next7Days") }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="grid reveal">
        <div class="card">
          <div class="card-head">
            <h2>{{ $t("dashboard.upcomingTrips") }}</h2>
            <button class="link">{{ $t("dashboard.viewAll") }}</button>
          </div>
          <div class="list">
            <div class="list-row" v-for="trip in trips" :key="trip.id">
              <div>
                <h4>{{ trip.title }}</h4>
                <p>{{ trip.location }} · {{ formatDate(trip.startDate) }}-{{ formatDate(trip.endDate) }}</p>
              </div>
              <span :class="statusClass(trip.status)">{{ $t(statusKey(trip.status)) }}</span>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-head">
            <h2>{{ $t("dashboard.approvalQueue") }}</h2>
            <button class="link">{{ $t("actions.openApplications") }}</button>
          </div>
          <div class="queue">
            <div class="queue-item" v-for="app in applications" :key="app.id">
              <div>
                <h4>{{ app.studentName }}</h4>
                <p>{{ app.type }} · {{ app.studentMajor || "-" }}</p>
              </div>
              <div class="queue-actions">
                <button class="solid small">{{ $t("actions.review") }}</button>
                <button class="ghost small">{{ $t("actions.notifications") }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const summary = ref(null);
    const trips = ref([]);
    const applications = ref([]);

    const load = async () => {
      summary.value = await api.dashboard();
      trips.value = await api.listTrips();
      applications.value = await api.listApplications();
    };

    onMounted(load);

    return {
      summary,
      trips,
      applications,
      formatDate: (value) => formatDate(value, state.locale),
      statusClass,
      statusKey,
    };
  },
};

const TripsView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.trips") }}</p>
          <h2>{{ $t("trips.title") }}</h2>
        </div>
        <div class="filters">
          <button class="ghost">{{ $t("filters.draft") }}</button>
          <button class="ghost">{{ $t("filters.published") }}</button>
          <button class="ghost">{{ $t("filters.completed") }}</button>
        </div>
      </div>

      <div v-if="canManage" class="card form-card">
        <h3>{{ $t("actions.createTrip") }}</h3>
        <div class="form-grid">
          <div>
            <label>{{ $t("labels.title") }}</label>
            <input v-model="form.title" placeholder="Industry Visit 2026" />
          </div>
          <div>
            <label>{{ $t("labels.location") }}</label>
            <input v-model="form.location" placeholder="Bangkok" />
          </div>
          <div>
            <label>{{ $t("labels.startDate") }}</label>
            <input type="date" v-model="form.startDate" />
          </div>
          <div>
            <label>{{ $t("labels.endDate") }}</label>
            <input type="date" v-model="form.endDate" />
          </div>
          <div>
            <label>{{ $t("labels.capacity") }}</label>
            <input type="number" v-model="form.capacity" />
          </div>
          <div>
            <label>{{ $t("labels.budget") }}</label>
            <input type="number" v-model="form.budgetTotal" />
          </div>
          <div class="full">
            <label>{{ $t("labels.objective") }}</label>
            <textarea v-model="form.objective" rows="2"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="solid" @click="submitTrip">{{ $t("actions.save") }}</button>
        </div>
      </div>

      <div v-if="canManage" class="card form-card">
        <h3>Trip Tools</h3>
        <div class="form-grid">
          <div class="full">
            <label>{{ $t("labels.status") }}</label>
            <select v-model="selectedTripId">
              <option disabled value="">Select trip</option>
              <option v-for="trip in trips" :key="trip.id" :value="trip.id">
                {{ trip.title }}
              </option>
            </select>
          </div>
          <div>
            <label>Activity</label>
            <input v-model="schedule.activity" />
          </div>
          <div>
            <label>{{ $t("labels.startDate") }}</label>
            <input type="datetime-local" v-model="schedule.startTime" />
          </div>
          <div>
            <label>{{ $t("labels.endDate") }}</label>
            <input type="datetime-local" v-model="schedule.endTime" />
          </div>
          <div>
            <label>Budget Category</label>
            <input v-model="budget.category" />
          </div>
          <div>
            <label>Amount</label>
            <input type="number" v-model="budget.amount" />
          </div>
          <div>
            <label>Document Type</label>
            <input v-model="document.docType" />
          </div>
          <div>
            <label>{{ $t("labels.file") }}</label>
            <input type="file" @change="handleDocFile" />
          </div>
        </div>
        <div class="form-actions">
          <button class="ghost" @click="addSchedule">{{ $t("actions.addSchedule") }}</button>
          <button class="ghost" @click="addBudget">{{ $t("actions.addBudget") }}</button>
          <button class="solid" @click="addDocument">{{ $t("actions.addDocument") }}</button>
        </div>
      </div>

      <div class="trip-grid">
        <article class="trip-card" v-for="trip in trips" :key="trip.id">
          <h3>{{ trip.title }}</h3>
          <p>{{ trip.location }}</p>
          <div class="meta">
            <span>{{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}</span>
            <span>{{ formatCurrency(trip.budgetTotal || 0) }}</span>
          </div>
          <span :class="statusClass(trip.status)">{{ $t(statusKey(trip.status)) }}</span>
          <div class="card-actions">
            <button v-if="isStudent" class="solid small" @click="applyTrip(trip.id)">
              {{ $t("actions.apply") }}
            </button>
            <button v-if="canManage && trip.status === 'DRAFT'" class="ghost small" @click="publishTrip(trip.id)">
              {{ $t("actions.publishTrip") }}
            </button>
          </div>
        </article>
      </div>
    </section>
  `,
  setup() {
    const trips = ref([]);
    const form = reactive({
      title: "",
      objective: "",
      location: "",
      startDate: "",
      endDate: "",
      capacity: "",
      budgetTotal: "",
    });
    const schedule = reactive({ activity: "", startTime: "", endTime: "" });
    const budget = reactive({ category: "", amount: "" });
    const document = reactive({ docType: "", file: null });
    const selectedTripId = ref("");

    const role = computed(() => state.user?.roles?.[0] || "GUEST");
    const canManage = computed(() => ["ADVISOR", "STAFF", "ADMIN"].includes(role.value));
    const isStudent = computed(() => role.value === "STUDENT");

    const loadTrips = async () => {
      trips.value = await api.listTrips();
    };

    const submitTrip = async () => {
      await api.createTrip({
        title: form.title,
        objective: form.objective,
        location: form.location,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        capacity: form.capacity ? Number(form.capacity) : null,
        budgetTotal: form.budgetTotal ? Number(form.budgetTotal) : null,
      });
      form.title = "";
      form.objective = "";
      form.location = "";
      form.startDate = "";
      form.endDate = "";
      form.capacity = "";
      form.budgetTotal = "";
      await loadTrips();
    };

    const applyTrip = async (tripId) => {
      await api.createApplication({ type: "TRIP", tripId });
    };

    const publishTrip = async (tripId) => {
      await api.publishTrip(tripId);
      await loadTrips();
    };

    const addSchedule = async () => {
      if (!selectedTripId.value) {
        return;
      }
      await api.addSchedule(selectedTripId.value, {
        activity: schedule.activity,
        startTime: schedule.startTime ? new Date(schedule.startTime).toISOString() : null,
        endTime: schedule.endTime ? new Date(schedule.endTime).toISOString() : null,
      });
      schedule.activity = "";
      schedule.startTime = "";
      schedule.endTime = "";
    };

    const addBudget = async () => {
      if (!selectedTripId.value) {
        return;
      }
      await api.addBudget(selectedTripId.value, {
        category: budget.category,
        amount: Number(budget.amount || 0),
      });
      budget.category = "";
      budget.amount = "";
    };

    const handleDocFile = (event) => {
      document.file = event.target.files[0] || null;
    };

    const addDocument = async () => {
      if (!selectedTripId.value || !document.file) {
        return;
      }
      const file = await api.uploadFile(document.file);
      await api.addDocument(selectedTripId.value, { docType: document.docType, fileId: file.id });
      document.docType = "";
      document.file = null;
    };

    onMounted(loadTrips);

    return {
      trips,
      form,
      schedule,
      budget,
      document,
      selectedTripId,
      canManage,
      isStudent,
      submitTrip,
      applyTrip,
      publishTrip,
      addSchedule,
      addBudget,
      addDocument,
      handleDocFile,
      formatDate: (value) => formatDate(value, state.locale),
      formatCurrency: (value) => formatCurrency(value, state.locale),
      statusClass,
      statusKey,
    };
  },
};

const InternshipsView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.internships") }}</p>
          <h2>{{ $t("internships.title") }}</h2>
        </div>
        <div class="filters">
          <button class="ghost">{{ $t("filters.allSectors") }}</button>
          <button class="ghost">{{ $t("filters.openSlots") }}</button>
        </div>
      </div>

      <div v-if="canManage" class="card form-card">
        <h3>{{ $t("actions.createCompany") }}</h3>
        <div class="form-grid">
          <div>
            <label>{{ $t("labels.company") }}</label>
            <input v-model="companyForm.name" />
          </div>
          <div>
            <label>Industry</label>
            <input v-model="companyForm.industry" />
          </div>
          <div>
            <label>{{ $t("labels.location") }}</label>
            <input v-model="companyForm.location" />
          </div>
          <div>
            <label>Contact Name</label>
            <input v-model="companyForm.contactName" />
          </div>
          <div>
            <label>Contact Email</label>
            <input v-model="companyForm.contactEmail" />
          </div>
        </div>
        <div class="form-actions">
          <button class="solid" @click="submitCompany">{{ $t("actions.createCompany") }}</button>
        </div>
      </div>

      <div v-if="canManage" class="card form-card">
        <h3>{{ $t("actions.createPosition") }}</h3>
        <div class="form-grid">
          <div class="full">
            <label>{{ $t("labels.company") }}</label>
            <select v-model="positionForm.companyId">
              <option disabled value="">Select company</option>
              <option v-for="company in companies" :key="company.id" :value="company.id">
                {{ company.name }}
              </option>
            </select>
          </div>
          <div>
            <label>{{ $t("labels.position") }}</label>
            <input v-model="positionForm.title" />
          </div>
          <div>
            <label>{{ $t("labels.location") }}</label>
            <input v-model="positionForm.location" />
          </div>
          <div>
            <label>Mode</label>
            <input v-model="positionForm.mode" placeholder="Hybrid" />
          </div>
          <div>
            <label>Slots</label>
            <input type="number" v-model="positionForm.slots" />
          </div>
          <div class="full">
            <label>Description</label>
            <textarea v-model="positionForm.description" rows="2"></textarea>
          </div>
          <div class="full">
            <label>Requirements</label>
            <textarea v-model="positionForm.requirements" rows="2"></textarea>
          </div>
        </div>
        <div class="form-actions">
          <button class="solid" @click="submitPosition">{{ $t("actions.createPosition") }}</button>
        </div>
      </div>

      <div class="card-grid">
        <div class="card accent" v-for="internship in internships" :key="internship.id">
          <h3>{{ internship.company }}</h3>
          <p>{{ internship.title }} ({{ internship.slots }} {{ $t("internships.slots") }})</p>
          <div class="meta">
            <span>{{ internship.location }}</span>
            <span>{{ internship.mode }}</span>
          </div>
          <div class="card-actions">
            <button v-if="isStudent" class="solid small" @click="applyInternship(internship.id)">
              {{ $t("actions.apply") }}
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const internships = ref([]);
    const companies = ref([]);
    const role = computed(() => state.user?.roles?.[0] || "GUEST");
    const canManage = computed(() => ["STAFF", "ADMIN"].includes(role.value));
    const isStudent = computed(() => role.value === "STUDENT");

    const companyForm = reactive({
      name: "",
      industry: "",
      location: "",
      contactName: "",
      contactEmail: "",
    });

    const positionForm = reactive({
      companyId: "",
      title: "",
      description: "",
      requirements: "",
      location: "",
      mode: "",
      slots: "",
    });

    const loadData = async () => {
      internships.value = await api.listInternships();
      companies.value = await api.listCompanies();
    };

    const submitCompany = async () => {
      await api.createCompany(companyForm);
      companyForm.name = "";
      companyForm.industry = "";
      companyForm.location = "";
      companyForm.contactName = "";
      companyForm.contactEmail = "";
      companies.value = await api.listCompanies();
    };

    const submitPosition = async () => {
      await api.createInternship({
        ...positionForm,
        slots: Number(positionForm.slots || 0),
      });
      positionForm.companyId = "";
      positionForm.title = "";
      positionForm.description = "";
      positionForm.requirements = "";
      positionForm.location = "";
      positionForm.mode = "";
      positionForm.slots = "";
      internships.value = await api.listInternships();
    };

    const applyInternship = async (id) => {
      await api.createApplication({ type: "INTERNSHIP", internshipPositionId: id });
    };

    onMounted(loadData);

    return {
      internships,
      companies,
      companyForm,
      positionForm,
      canManage,
      isStudent,
      submitCompany,
      submitPosition,
      applyInternship,
    };
  },
};

const ApplicationsView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.applications") }}</p>
          <h2>{{ $t("applications.title") }}</h2>
        </div>
        <div class="filters">
          <button class="ghost">{{ $t("filters.pending") }}</button>
          <button class="ghost">{{ $t("filters.approved") }}</button>
          <button class="ghost">{{ $t("filters.rejected") }}</button>
        </div>
      </div>
      <div class="table">
        <div class="table-row header">
          <span>{{ $t("applications.student") }}</span>
          <span>{{ $t("applications.program") }}</span>
          <span>{{ $t("applications.type") }}</span>
          <span>{{ $t("labels.status") }}</span>
          <span>{{ $t("filters.action") }}</span>
        </div>
        <div class="table-row" v-for="app in applications" :key="app.id">
          <span>{{ app.studentName }}</span>
          <span>{{ app.studentMajor || "-" }}</span>
          <span>{{ app.type }}</span>
          <span :class="statusClass(app.status)">{{ $t(statusKey(app.status)) }}</span>
          <div class="row-actions">
            <button v-if="canDecide" class="solid small" @click="decide(app.id, 'APPROVE')">
              {{ $t("actions.approve") }}
            </button>
            <button v-if="canDecide" class="ghost small" @click="decide(app.id, 'REJECT')">
              {{ $t("actions.reject") }}
            </button>
            <span v-if="!canDecide" class="muted">{{ app.tripTitle || app.internshipTitle }}</span>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const applications = ref([]);
    const role = computed(() => state.user?.roles?.[0] || "GUEST");
    const canDecide = computed(() => ["ADVISOR", "STAFF", "ADMIN"].includes(role.value));

    const load = async () => {
      applications.value = await api.listApplications();
    };

    const decide = async (id, decision) => {
      await api.decideApplication(id, { decision, note: "" });
      await load();
    };

    onMounted(load);
    return { applications, statusClass, statusKey, canDecide, decide };
  },
};

const ReportsView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.reports") }}</p>
          <h2>{{ $t("reports.title") }}</h2>
        </div>
        <div class="filters">
          <button class="ghost">{{ $t("filters.awaitingReview") }}</button>
          <button class="ghost">{{ $t("filters.graded") }}</button>
        </div>
      </div>

      <div v-if="isStudent" class="card form-card">
        <h3>{{ $t("actions.uploadReport") }}</h3>
        <div class="form-grid">
          <div class="full">
            <label>{{ $t("labels.position") }}</label>
            <select v-model="reportForm.type">
              <option value="TRIP">Trip</option>
              <option value="INTERNSHIP">Internship</option>
            </select>
          </div>
          <div class="full" v-if="reportForm.type === 'TRIP'">
            <label>{{ $t("nav.trips") }}</label>
            <select v-model="reportForm.tripId">
              <option disabled value="">Select trip</option>
              <option v-for="trip in trips" :key="trip.id" :value="trip.id">
                {{ trip.title }}
              </option>
            </select>
          </div>
          <div class="full" v-if="reportForm.type === 'INTERNSHIP'">
            <label>{{ $t("nav.internships") }}</label>
            <select v-model="reportForm.internshipId">
              <option disabled value="">Select position</option>
              <option v-for="internship in internships" :key="internship.id" :value="internship.id">
                {{ internship.title }}
              </option>
            </select>
          </div>
          <div class="full">
            <label>{{ $t("labels.file") }}</label>
            <input type="file" @change="handleReportFile" />
          </div>
        </div>
        <div class="form-actions">
          <button class="solid" @click="submitReport">{{ $t("actions.submit") }}</button>
        </div>
      </div>

      <div class="card-grid">
        <div class="card" v-for="report in reports" :key="report.id">
          <h3>{{ report.title }}</h3>
          <div class="meta">
            <span :class="statusClass(report.status)">{{ $t(statusKey(report.status)) }}</span>
            <span>{{ formatDate(report.submittedAt) }}</span>
          </div>
          <div v-if="canGrade" class="form-grid compact">
            <div>
              <label>{{ $t("labels.score") }}</label>
              <input type="number" v-model="grades[report.id].score" />
            </div>
            <div class="full">
              <label>{{ $t("labels.note") }}</label>
              <input v-model="grades[report.id].comment" />
            </div>
          </div>
          <div class="form-actions" v-if="canGrade">
            <button class="solid small" @click="grade(report.id)">{{ $t("actions.approve") }}</button>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const reports = ref([]);
    const trips = ref([]);
    const internships = ref([]);
    const reportForm = reactive({
      type: "TRIP",
      tripId: "",
      internshipId: "",
      file: null,
    });
    const grades = reactive({});

    const role = computed(() => state.user?.roles?.[0] || "GUEST");
    const isStudent = computed(() => role.value === "STUDENT");
    const canGrade = computed(() => ["ADVISOR", "STAFF", "ADMIN"].includes(role.value));

    const load = async () => {
      reports.value = await api.listReports();
      trips.value = await api.listTrips();
      internships.value = await api.listInternships();
      reports.value.forEach((report) => {
        if (!grades[report.id]) {
          grades[report.id] = { score: "", comment: "" };
        }
      });
    };

    const handleReportFile = (event) => {
      reportForm.file = event.target.files[0] || null;
    };

    const submitReport = async () => {
      if (!reportForm.file) {
        return;
      }
      const file = await api.uploadFile(reportForm.file);
      await api.createReport({
        tripId: reportForm.type === "TRIP" ? reportForm.tripId : null,
        internshipPositionId: reportForm.type === "INTERNSHIP" ? reportForm.internshipId : null,
        fileId: file.id,
      });
      reportForm.tripId = "";
      reportForm.internshipId = "";
      reportForm.file = null;
      await load();
    };

    const grade = async (id) => {
      const gradeData = grades[id];
      await api.gradeReport(id, {
        score: gradeData.score ? Number(gradeData.score) : null,
        comment: gradeData.comment || "",
      });
      await load();
    };

    onMounted(load);
    return {
      reports,
      trips,
      internships,
      reportForm,
      grades,
      isStudent,
      canGrade,
      handleReportFile,
      submitReport,
      grade,
      formatDate: (value) => formatDate(value, state.locale),
      statusClass,
      statusKey,
    };
  },
};

const AiView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.ai") }}</p>
          <h2>{{ $t("ai.title") }}</h2>
        </div>
      </div>
      <div class="ai-grid">
        <div class="card">
          <h3>{{ $t("ai.summary") }}</h3>
          <p>{{ $t("ai.summaryNote") }}</p>
          <select v-model="summary.reportId">
            <option disabled value="">Select report</option>
            <option v-for="report in reports" :key="report.id" :value="report.id">
              {{ report.title }}
            </option>
          </select>
          <button class="solid" @click="runSummary">{{ $t("actions.runSummary") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.recommend") }}</h3>
          <p>{{ $t("ai.recommendNote") }}</p>
          <input v-model="recommend.major" :placeholder="$t('labels.major')" />
          <input v-model="recommend.skills" placeholder="SQL, Python" />
          <button class="solid" @click="runRecommend">{{ $t("actions.generateMatch") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.draft") }}</h3>
          <p>{{ $t("ai.draftNote") }}</p>
          <select v-model="draft.tripId">
            <option disabled value="">Select trip</option>
            <option v-for="trip in trips" :key="trip.id" :value="trip.id">
              {{ trip.title }}
            </option>
          </select>
          <button class="solid" @click="runDraft">{{ $t("actions.createDraft") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.chatbot") }}</h3>
          <p>{{ $t("ai.chatbotNote") }}</p>
          <input v-model="chat.message" placeholder="Ask a question" />
          <button class="solid" @click="runChat">{{ $t("actions.openChat") }}</button>
        </div>
      </div>
      <div v-if="response" class="card ai-response">
        <h3>AI Output</h3>
        <p>{{ response }}</p>
      </div>
    </section>
  `,
  setup() {
    const response = ref("");
    const reports = ref([]);
    const trips = ref([]);
    const summary = reactive({ reportId: "" });
    const recommend = reactive({ major: "", skills: "" });
    const draft = reactive({ tripId: "" });
    const chat = reactive({ message: "" });

    const load = async () => {
      reports.value = await api.listReports();
      trips.value = await api.listTrips();
    };

    const runSummary = async () => {
      if (!summary.reportId) return;
      const result = await api.aiSummary({ reportId: summary.reportId, language: state.locale });
      response.value = result.content;
    };

    const runRecommend = async () => {
      const result = await api.aiRecommend({ major: recommend.major, skills: recommend.skills });
      response.value = result.content;
    };

    const runDraft = async () => {
      if (!draft.tripId) return;
      const result = await api.aiDraft({ tripId: draft.tripId });
      response.value = result.content;
    };

    const runChat = async () => {
      const result = await api.aiChat({ message: chat.message });
      response.value = result.content;
    };

    onMounted(load);

    return { reports, trips, summary, recommend, draft, chat, response, runSummary, runRecommend, runDraft, runChat };
  },
};

const AdminView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.admin") }}</p>
          <h2>{{ $t("admin.title") }}</h2>
        </div>
      </div>
      <div class="card form-card">
        <h3>{{ $t("actions.addUser") }}</h3>
        <div class="form-grid">
          <div>
            <label>{{ $t("labels.user") }}</label>
            <input v-model="form.username" placeholder="user1" />
          </div>
          <div>
            <label>{{ $t("labels.email") }}</label>
            <input v-model="form.email" />
          </div>
          <div>
            <label>{{ $t("labels.major") }}</label>
            <input v-model="form.major" />
          </div>
          <div>
            <label>{{ $t("labels.year") }}</label>
            <input type="number" v-model="form.academicYear" />
          </div>
          <div>
            <label>{{ $t("labels.user") }}</label>
            <input v-model="form.displayName" placeholder="Display Name" />
          </div>
          <div>
            <label>Password</label>
            <input type="password" v-model="form.password" placeholder="pass123" />
          </div>
          <div class="full">
            <label>Roles</label>
            <div class="chip-row">
              <label v-for="role in roleOptions" :key="role" class="chip-check">
                <input type="checkbox" :value="role" v-model="form.roles" />
                <span>{{ role }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="form-actions">
          <button class="solid" @click="submitUser">{{ $t("actions.save") }}</button>
        </div>
      </div>

      <div class="card">
        <div class="card-head">
          <h3>{{ $t("filters.users") }}</h3>
          <button class="ghost" @click="loadUsers">{{ $t("actions.refresh") }}</button>
        </div>
        <div class="table">
          <div class="table-row header">
            <span>{{ $t("labels.user") }}</span>
            <span>{{ $t("labels.email") }}</span>
            <span>{{ $t("labels.major") }}</span>
            <span>{{ $t("labels.status") }}</span>
            <span>{{ $t("filters.action") }}</span>
          </div>
          <div class="table-row" v-for="user in users" :key="user.id">
            <span>{{ user.displayName }}</span>
            <span>{{ user.email || "-" }}</span>
            <span>{{ user.major || "-" }}</span>
            <span class="status green">{{ user.roles.join(", ") }}</span>
            <button class="ghost small" @click="selectUser(user)">Edit</button>
          </div>
        </div>
      </div>
    </section>
  `,
  setup() {
    const users = ref([]);
    const roleOptions = ["STUDENT", "ADVISOR", "STAFF", "ADMIN"];
    const form = reactive({
      id: "",
      username: "",
      displayName: "",
      email: "",
      major: "",
      academicYear: "",
      password: "",
      roles: [],
    });

    const loadUsers = async () => {
      users.value = await api.adminUsers();
    };

    const submitUser = async () => {
      const payload = {
        username: form.username,
        displayName: form.displayName,
        email: form.email,
        major: form.major,
        academicYear: form.academicYear ? Number(form.academicYear) : null,
        password: form.password,
        roles: form.roles,
      };
      if (form.id) {
        await api.updateUser(form.id, payload);
      } else {
        await api.createUser(payload);
      }
      form.id = "";
      form.username = "";
      form.displayName = "";
      form.email = "";
      form.major = "";
      form.academicYear = "";
      form.password = "";
      form.roles = [];
      await loadUsers();
    };

    const selectUser = (user) => {
      form.id = user.id;
      form.username = user.username;
      form.displayName = user.displayName;
      form.email = user.email;
      form.major = user.major;
      form.academicYear = user.academicYear;
      form.roles = [...user.roles];
    };

    onMounted(loadUsers);

    return { users, form, roleOptions, submitUser, loadUsers, selectUser };
  },
};

const routes = [
  { path: "/login", component: LoginView, meta: { public: true } },
  {
    path: "/",
    component: AppLayout,
    children: [
      { path: "", redirect: "/dashboard" },
      { path: "dashboard", component: DashboardView },
      { path: "trips", component: TripsView },
      { path: "internships", component: InternshipsView },
      { path: "applications", component: ApplicationsView },
      { path: "reports", component: ReportsView },
      { path: "ai", component: AiView, meta: { roles: ["ADVISOR", "STAFF", "ADMIN"] } },
      { path: "admin", component: AdminView, meta: { roles: ["ADMIN"] } },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/dashboard" },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: state.locale,
  messages,
});

router.beforeEach(async (to) => {
  if (to.meta.public) {
    return true;
  }
  if (!state.token) {
    return "/login";
  }
  if (!state.user) {
    try {
      state.user = await api.me();
    } catch (error) {
      state.token = "";
      localStorage.removeItem("utcctp_token");
      return "/login";
    }
  }
  if (to.meta.roles && !to.meta.roles.some((role) => state.user.roles.includes(role))) {
    return "/dashboard";
  }
  return true;
});

document.documentElement.lang = state.locale;

const app = createApp({ template: "<router-view />" });
app.use(router);
app.use(i18n);
app.mount("#app");
