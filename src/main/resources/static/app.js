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
    },
    labels: {
      role: "Role",
      user: "User",
      language: "Language",
      status: "Status",
    },
    login: {
      title: "Welcome back",
      subtitle: "Sign in to manage trips, internships, and reports.",
      username: "Username",
      password: "Password",
      demoTitle: "Demo accounts",
      demoNote: "Use these accounts to explore role-based views.",
      error: "Invalid username or password.",
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
      awaiting_review: "Awaiting review",
      in_progress: "In progress",
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
    },
    labels: {
      role: "บทบาท",
      user: "ผู้ใช้",
      language: "ภาษา",
      status: "สถานะ",
    },
    login: {
      title: "ยินดีต้อนรับกลับ",
      subtitle: "ลงชื่อเข้าใช้เพื่อจัดการทริป ฝึกงาน และรายงาน",
      username: "ชื่อผู้ใช้",
      password: "รหัสผ่าน",
      demoTitle: "บัญชีตัวอย่าง",
      demoNote: "ใช้บัญชีเหล่านี้เพื่อดูมุมมองตามบทบาท",
      error: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
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
      awaiting_review: "รอตรวจ",
      in_progress: "กำลังดำเนินการ",
    },
  },
};

const state = reactive({
  token: localStorage.getItem("utcctp_token") || "",
  user: null,
  locale: localStorage.getItem("utcctp_locale") || "th",
});

const apiFetch = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
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
  trips: () => apiFetch("/trips"),
  internships: () => apiFetch("/internships"),
  applications: () => apiFetch("/applications"),
  reports: () => apiFetch("/reports"),
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
        <div class="login-card">
          <p class="eyebrow">{{ $t("labels.language") }}</p>
          <div class="toolbar">
            <button class="ghost" @click="toggleLocale">{{ localeLabel }}</button>
          </div>
          <h1>{{ $t("login.title") }}</h1>
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
          <h2>{{ $t("login.demoTitle") }}</h2>
          <p class="muted">{{ $t("login.demoNote") }}</p>
          <div class="demo-list">
            <div class="demo-item" v-for="demo in demoUsers" :key="demo.username">
              <strong>{{ demo.username }}</strong>
              <span>{{ demo.password }}</span>
              <span class="chip">{{ $t(\`roles.\${demo.role}\`) }}</span>
            </div>
          </div>
        </aside>
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
          <button class="ghost">{{ $t("actions.notifications") }}</button>
          <button class="ghost" @click="toggleLocale">{{ localeLabel }}</button>
          <button class="solid" @click="logout">{{ $t("actions.logout") }}</button>
          <div class="avatar">{{ initials }}</div>
        </div>
      </header>
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
                <p>{{ app.type }} · {{ app.program }}</p>
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
      trips.value = await api.trips();
      applications.value = await api.applications();
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
          <button class="solid">{{ $t("trips.newTrip") }}</button>
        </div>
      </div>
      <div class="trip-grid">
        <article class="trip-card" v-for="trip in trips" :key="trip.id">
          <h3>{{ trip.title }}</h3>
          <p>{{ trip.location }}</p>
          <div class="meta">
            <span>{{ formatDate(trip.startDate) }} - {{ formatDate(trip.endDate) }}</span>
            <span>{{ formatCurrency(trip.budget) }}</span>
          </div>
          <span :class="statusClass(trip.status)">{{ $t(statusKey(trip.status)) }}</span>
          <button class="link">{{ $t("actions.openPlan") }}</button>
        </article>
      </div>
    </section>
  `,
  setup() {
    const trips = ref([]);
    onMounted(async () => {
      trips.value = await api.trips();
    });
    return {
      trips,
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
          <button class="solid">{{ $t("internships.addPosition") }}</button>
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
          <button class="link">{{ $t("actions.viewDetails") }}</button>
        </div>
      </div>
    </section>
  `,
  setup() {
    const internships = ref([]);
    onMounted(async () => {
      internships.value = await api.internships();
    });
    return { internships };
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
          <span>{{ app.program }}</span>
          <span>{{ app.type }}</span>
          <span :class="statusClass(app.status)">{{ $t(statusKey(app.status)) }}</span>
          <button class="solid small">{{ $t("actions.review") }}</button>
        </div>
      </div>
    </section>
  `,
  setup() {
    const applications = ref([]);
    onMounted(async () => {
      applications.value = await api.applications();
    });
    return { applications, statusClass, statusKey };
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
          <button class="solid">{{ $t("filters.uploadTemplate") }}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="card" v-for="report in reports" :key="report.id">
          <h3>{{ report.title }}</h3>
          <p>{{ report.pending }} {{ $t("reports.pendingLabel") }}</p>
          <div class="meta">
            <span :class="statusClass(report.status)">{{ $t(statusKey(report.status)) }}</span>
            <span>{{ report.dueDate }}</span>
          </div>
          <button class="link">{{ $t("actions.reviewBatch") }}</button>
        </div>
      </div>
    </section>
  `,
  setup() {
    const reports = ref([]);
    onMounted(async () => {
      reports.value = await api.reports();
    });
    return { reports, statusClass, statusKey };
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
          <button class="solid">{{ $t("actions.runSummary") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.recommend") }}</h3>
          <p>{{ $t("ai.recommendNote") }}</p>
          <button class="solid">{{ $t("actions.generateMatch") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.draft") }}</h3>
          <p>{{ $t("ai.draftNote") }}</p>
          <button class="solid">{{ $t("actions.createDraft") }}</button>
        </div>
        <div class="card">
          <h3>{{ $t("ai.chatbot") }}</h3>
          <p>{{ $t("ai.chatbotNote") }}</p>
          <button class="solid">{{ $t("actions.openChat") }}</button>
        </div>
      </div>
    </section>
  `,
};

const AdminView = {
  template: `
    <section>
      <div class="section-head">
        <div>
          <p class="eyebrow">{{ $t("nav.admin") }}</p>
          <h2>{{ $t("admin.title") }}</h2>
        </div>
        <div class="filters">
          <button class="ghost">{{ $t("filters.users") }}</button>
          <button class="ghost">{{ $t("filters.roles") }}</button>
          <button class="ghost">{{ $t("filters.auditLogs") }}</button>
          <button class="solid">{{ $t("actions.addUser") }}</button>
        </div>
      </div>
      <div class="card-grid">
        <div class="card accent">
          <h3>{{ $t("admin.activeUsers") }}</h3>
          <p>1,284 accounts</p>
          <div class="meta">
            <span>94 {{ $t("admin.advisors") }}</span>
            <span>6 {{ $t("admin.admins") }}</span>
          </div>
        </div>
        <div class="card accent">
          <h3>{{ $t("admin.security") }}</h3>
          <p>0 {{ $t("admin.alerts") }}</p>
          <div class="meta">
            <span>{{ $t("admin.lastScan") }}: 2 hrs</span>
            <span>{{ $t("admin.pdpaReady") }}</span>
          </div>
        </div>
        <div class="card accent">
          <h3>{{ $t("admin.systemHealth") }}</h3>
          <p>99.98% {{ $t("admin.uptime") }}</p>
          <div class="meta">
            <span>{{ $t("admin.apiAvg") }} 210ms</span>
            <span>{{ $t("admin.cacheHit") }} 88%</span>
          </div>
        </div>
      </div>
    </section>
  `,
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
