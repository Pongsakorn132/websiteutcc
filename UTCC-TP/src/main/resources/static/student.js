const API_BASE = "http://localhost:8080/api";
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("[data-view-section]");

function checkAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (!token || !user) {
    return {
      username: "student-demo",
      name: "นักศึกษาทดลอง",
      role: "STUDENT"
    };
  }
  
  const userData = JSON.parse(user);
  
  if (userData.role !== "STUDENT") {
    return {
      username: "student-demo",
      name: "นักศึกษาทดลอง",
      role: "STUDENT"
    };
  }
  
  return userData;
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`
  };
}

const currentUser = checkAuth();
if (currentUser) {
  const userAvatar = document.getElementById("userAvatar");
  const welcomeText = document.getElementById("welcomeText");
  const studentName = document.getElementById("studentName");
  const studentId = document.getElementById("studentId");
  
  if (userAvatar) {
    userAvatar.textContent = currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : "ST";
  }
  if (welcomeText) {
    welcomeText.textContent = `สวัสดี ${currentUser.name || 'นักศึกษา'}`;
  }
  if (studentName) {
    studentName.textContent = currentUser.name || 'นักศึกษา';
  }
  if (studentId) {
    studentId.textContent = `รหัส: ${currentUser.username || '-'}`;
  }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

function switchView(view) {
  const targetNav = document.querySelector(`[data-view="${view}"]`);
  if (targetNav) {
    navItems.forEach((nav) => nav.classList.remove("active"));
    targetNav.classList.add("active");
    showSection(view);
  }
}

const showSection = (view) => {
  sections.forEach((section) => {
    const isActive = section.dataset.viewSection === view;
    section.classList.toggle("active", isActive);
  });
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    showSection(item.dataset.view);
  });
});

const staggerCards = () => {
  const cards = document.querySelectorAll(".card, .trip-card, .stat-card, .application-item, .action-card");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;
    card.classList.add("reveal");
  });
};

async function loadDashboardData() {
  try {
    const response = await fetch(`${API_BASE}/dashboard/student`, {
      headers: getAuthHeaders()
    });
    
    if (response.ok) {
      const data = await response.json();
      
      document.getElementById("tripCount").textContent = data.tripCount || 0;
      document.getElementById("internshipCount").textContent = data.internshipCount || 0;
      document.getElementById("applicationCount").textContent = data.applicationCount || 0;
      document.getElementById("reportCount").textContent = data.reportCount || 0;
      
      loadRecentApplications();
    }
  } catch (error) {
    console.error("Error loading dashboard:", error);
  }
}

async function loadRecentApplications() {
  try {
    const response = await fetch(`${API_BASE}/applications/my?limit=3`, {
      headers: getAuthHeaders()
    });
    
    if (response.ok) {
      const applications = await response.json();
      const container = document.getElementById("recentApplications");
      
      if (applications.length === 0) {
        container.innerHTML = '<p class="muted">ยังไม่มีการสมัคร</p>';
        return;
      }
      
      container.innerHTML = applications.map(app => `
        <div class="application-item">
          <div class="application-info">
            <h3>${app.title || app.tripName || app.internshipName}</h3>
            <p>ประเภท: ${app.type === 'TRIP' ? 'ทริป' : 'ฝึกงาน'}</p>
            <p>วันที่สมัคร: ${new Date(app.createdAt).toLocaleDateString('th-TH')}</p>
          </div>
          <div class="application-status">
            <span class="status ${getStatusClass(app.status)}">${getStatusText(app.status)}</span>
            <button class="ghost small" onclick="viewApplication('${app.id}')">ดูรายละเอียด</button>
          </div>
        </div>
      `).join('');
    }
  } catch (error) {
    console.error("Error loading applications:", error);
    document.getElementById("recentApplications").innerHTML = '<p class="muted">ไม่สามารถโหลดข้อมูลได้</p>';
  }
}

function getStatusClass(status) {
  const statusMap = {
    'PENDING': 'amber',
    'APPROVED': 'green',
    'REJECTED': 'slate',
    'DRAFT': 'slate'
  };
  return statusMap[status] || 'slate';
}

function getStatusText(status) {
  const statusMap = {
    'PENDING': 'รอการอนุมัติ',
    'APPROVED': 'อนุมัติแล้ว',
    'REJECTED': 'ไม่อนุมัติ',
    'DRAFT': 'ฉบับร่าง'
  };
  return statusMap[status] || status;
}

async function applyTrip(tripId) {
  try {
    const response = await fetch(`${API_BASE}/applications`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        tripId: tripId,
        type: "TRIP"
      })
    });
    
    if (response.ok) {
      alert("สมัครเข้าร่วมทริปสำเร็จ!");
      loadDashboardData();
    } else {
      const error = await response.json();
      alert(error.message || "ไม่สามารถสมัครได้ กรุณาลองใหม่อีกครั้ง");
    }
  } catch (error) {
    console.error("Error applying trip:", error);
    alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }
}

async function applyInternship(internshipId) {
  try {
    const response = await fetch(`${API_BASE}/applications`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        internshipId: internshipId,
        type: "INTERNSHIP"
      })
    });
    
    if (response.ok) {
      alert("สมัครฝึกงานสำเร็จ!");
      loadDashboardData();
    } else {
      const error = await response.json();
      alert(error.message || "ไม่สามารถสมัครได้ กรุณาลองใหม่อีกครั้ง");
    }
  } catch (error) {
    console.error("Error applying internship:", error);
    alert("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
  }
}

function viewApplication(id) {
  alert(`กำลังเปิดรายละเอียดการสมัคร ID: ${id}`);
}

showSection("home");
staggerCards();
loadDashboardData();
