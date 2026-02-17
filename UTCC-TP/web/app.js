const API_BASE = "http://localhost:8080/api";
const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("[data-view-section]");

// State management
let currentFilter = {
  trips: null,
  internships: null,
  applications: null,
  reports: null
};

// Auth utilities
function checkAuth() {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");
  
  if (!token || !user) {
    return {
      username: "demo",
      name: "Demo User",
      role: "ADMIN"
    };
  }
  
  return JSON.parse(user);
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

// API utilities
async function fetchAPI(endpoint, options = {}) {
  showLoading();
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers
      }
    });
    
    if (response.status === 401) {
      logout();
      return;
    }
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    showError(error.message);
    throw error;
  } finally {
    hideLoading();
  }
}

// Loading and error states
function showLoading() {
  let loader = document.getElementById("globalLoader");
  if (!loader) {
    loader = document.createElement("div");
    loader.id = "globalLoader";
    loader.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 10000;
    `;
    loader.innerHTML = `<div style="color: white; font-size: 18px;">Loading...</div>`;
    document.body.appendChild(loader);
  }
  loader.style.display = "flex";
}

function hideLoading() {
  const loader = document.getElementById("globalLoader");
  if (loader) {
    loader.style.display = "none";
  }
}

function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #ef4444;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10001;
    animation: slideIn 0.3s ease;
  `;
  errorDiv.textContent = message;
  document.body.appendChild(errorDiv);
  
  setTimeout(() => {
    errorDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => errorDiv.remove(), 300);
  }, 5000);
}

function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: #10b981;
    color: white;
    padding: 16px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 10001;
    animation: slideIn 0.3s ease;
  `;
  successDiv.textContent = message;
  document.body.appendChild(successDiv);
  
  setTimeout(() => {
    successDiv.style.animation = "slideOut 0.3s ease";
    setTimeout(() => successDiv.remove(), 300);
  }, 3000);
}

// Modal utilities
function createModal(title, content, actions = []) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  modal.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    animation: fadeIn 0.2s ease;
  `;
  
  const modalContent = document.createElement("div");
  modalContent.style.cssText = `
    background: white;
    border-radius: 12px;
    padding: 24px;
    max-width: 600px;
    width: 90%;
    max-height: 80vh;
    overflow-y: auto;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  `;
  
  const modalHeader = document.createElement("div");
  modalHeader.style.cssText = `
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  `;
  
  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;
  modalTitle.style.cssText = `margin: 0; font-size: 24px; font-weight: 600;`;
  
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.className = "ghost";
  closeBtn.style.cssText = `font-size: 32px; line-height: 1; padding: 0; width: 32px; height: 32px;`;
  closeBtn.onclick = () => modal.remove();
  
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeBtn);
  
  const modalBody = document.createElement("div");
  modalBody.style.cssText = `margin-bottom: 20px;`;
  if (typeof content === "string") {
    modalBody.innerHTML = content;
  } else {
    modalBody.appendChild(content);
  }
  
  const modalActions = document.createElement("div");
  modalActions.style.cssText = `display: flex; gap: 12px; justify-content: flex-end;`;
  actions.forEach(action => {
    const btn = document.createElement("button");
    btn.textContent = action.label;
    btn.className = action.className || "ghost";
    btn.onclick = () => {
      if (action.onClick) action.onClick();
      if (action.closeOnClick !== false) modal.remove();
    };
    modalActions.appendChild(btn);
  });
  
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalActions);
  modal.appendChild(modalContent);
  
  modal.onclick = (e) => {
    if (e.target === modal) modal.remove();
  };
  
  document.body.appendChild(modal);
  return modal;
}

// Dashboard
async function loadDashboard() {
  try {
    const data = await fetchAPI("/dashboard/summary");
    
    // Update stats
    document.querySelector('.panel-card:nth-child(1) h3').textContent = data.activeTrips || 0;
    document.querySelector('.panel-card:nth-child(1) .muted').textContent = 
      `${data.pendingTrips || 0} awaiting approval`;
    
    document.querySelector('.panel-card:nth-child(2) h3').textContent = data.internshipSlots || 0;
    document.querySelector('.panel-card:nth-child(2) .muted').textContent = 
      `${data.unmatchedSlots || 0} unmatched`;
    
    document.querySelector('.panel-card:nth-child(3) h3').textContent = data.reportsDue || 0;
    
    // Load recent trips and applications
    await Promise.all([
      loadRecentTrips(),
      loadPendingApplications()
    ]);
  } catch (error) {
    console.error("Failed to load dashboard:", error);
  }
}

async function loadRecentTrips() {
  try {
    const trips = await fetchAPI("/v1/trips");
    const recentTrips = trips.slice(0, 3);
    
    const listContainer = document.querySelector('[data-view-section="dashboard"] .list');
    if (!listContainer) return;
    
    listContainer.innerHTML = recentTrips.map(trip => `
      <div class="list-row" data-trip-id="${trip.id}">
        <div>
          <h4>${trip.title}</h4>
          <p>${formatDate(trip.startDate)} - ${formatDate(trip.endDate)} · ${trip.location}</p>
        </div>
        <span class="status ${getStatusClass(trip.status)}">${trip.status}</span>
      </div>
    `).join("");
    
    listContainer.querySelectorAll('.list-row').forEach(row => {
      row.style.cursor = "pointer";
      row.onclick = () => showTripDetails(row.dataset.tripId);
    });
  } catch (error) {
    console.error("Failed to load recent trips:", error);
  }
}

async function loadPendingApplications() {
  try {
    const applications = await fetchAPI("/applications");
    const pending = applications.filter(app => app.status === "PENDING").slice(0, 3);
    
    const queueContainer = document.querySelector('[data-view-section="dashboard"] .queue');
    if (!queueContainer) return;
    
    queueContainer.innerHTML = pending.map(app => `
      <div class="queue-item" data-app-id="${app.id}">
        <div>
          <h4>${app.studentName}</h4>
          <p>${app.type}: ${app.title}</p>
        </div>
        <div class="queue-actions">
          <button class="solid small" onclick="approveApplication('${app.id}')">Approve</button>
          <button class="ghost small" onclick="showApplicationDetails('${app.id}')">Review</button>
        </div>
      </div>
    `).join("");
  } catch (error) {
    console.error("Failed to load pending applications:", error);
  }
}

// Trips
async function loadTrips(status = null) {
  try {
    let trips = await fetchAPI("/v1/trips");
    
    if (status) {
      trips = trips.filter(trip => trip.status.toLowerCase() === status.toLowerCase());
    }
    
    const tripGrid = document.querySelector('[data-view-section="trips"] .trip-grid');
    if (!tripGrid) return;
    
    tripGrid.innerHTML = trips.map(trip => `
      <article class="trip-card" data-trip-id="${trip.id}">
        <h3>${trip.title}</h3>
        <p>${trip.objective || 'No objective specified'}</p>
        <div class="meta">
          <span>${formatDate(trip.startDate)} - ${formatDate(trip.endDate)}</span>
          <span>Budget: ${formatCurrency(trip.budget)}</span>
        </div>
        <span class="status ${getStatusClass(trip.status)}">${trip.status}</span>
        <button class="link" onclick="showTripDetails('${trip.id}')">Open plan</button>
      </article>
    `).join("");
    
    staggerCards();
  } catch (error) {
    console.error("Failed to load trips:", error);
  }
}

async function showTripDetails(tripId) {
  try {
    const trip = await fetchAPI(`/v1/trips/${tripId}`);
    
    const content = `
      <div style="display: grid; gap: 16px;">
        <div>
          <h3 style="margin: 0 0 8px 0;">${trip.title}</h3>
          <p style="margin: 0; color: #666;">${trip.objective}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div>
            <strong>Start Date:</strong><br>${formatDate(trip.startDate)}
          </div>
          <div>
            <strong>End Date:</strong><br>${formatDate(trip.endDate)}
          </div>
          <div>
            <strong>Location:</strong><br>${trip.location}
          </div>
          <div>
            <strong>Budget:</strong><br>${formatCurrency(trip.budget)}
          </div>
          <div>
            <strong>Status:</strong><br>
            <span class="status ${getStatusClass(trip.status)}">${trip.status}</span>
          </div>
          <div>
            <strong>Participants:</strong><br>${trip.participantCount || 0} students
          </div>
        </div>
        ${trip.schedules && trip.schedules.length > 0 ? `
          <div>
            <strong>Schedule:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              ${trip.schedules.map(s => `<li>${s.activity} - ${s.location}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
        ${trip.documents && trip.documents.length > 0 ? `
          <div>
            <strong>Documents:</strong>
            <ul style="margin: 8px 0; padding-left: 20px;">
              ${trip.documents.map(d => `<li>${d.title}</li>`).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;
    
    createModal("Trip Details", content, [
      { label: "Close", className: "ghost" }
    ]);
  } catch (error) {
    console.error("Failed to load trip details:", error);
  }
}

function showCreateTripModal() {
  const form = document.createElement("form");
  form.innerHTML = `
    <div style="display: grid; gap: 16px;">
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Title</label>
        <input type="text" name="title" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Objective</label>
        <textarea name="objective" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px; min-height: 80px;"></textarea>
      </div>
      <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">Start Date</label>
          <input type="date" name="startDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
        </div>
        <div>
          <label style="display: block; margin-bottom: 4px; font-weight: 500;">End Date</label>
          <input type="date" name="endDate" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
        </div>
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Location</label>
        <input type="text" name="location" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
      </div>
      <div>
        <label style="display: block; margin-bottom: 4px; font-weight: 500;">Budget (THB)</label>
        <input type="number" name="budget" required style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 6px;">
      </div>
    </div>
  `;
  
  createModal("Create New Trip", form, [
    { label: "Cancel", className: "ghost" },
    { 
      label: "Create Trip", 
      className: "solid",
      closeOnClick: false,
      onClick: async () => {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        try {
          await fetchAPI("/v1/trips", {
            method: "POST",
            body: JSON.stringify(data)
          });
          
          showSuccess("Trip created successfully!");
          document.querySelector('.modal-overlay').remove();
          await loadTrips();
        } catch (error) {
          console.error("Failed to create trip:", error);
        }
      }
    }
  ]);
}

// Internships
async function loadInternships(filter = null) {
  try {
    let internships = await fetchAPI("/v1/internships");
    
    if (filter === "open") {
      internships = internships.filter(i => i.availableSlots > 0);
    }
    
    const cardGrid = document.querySelector('[data-view-section="internships"] .card-grid');
    if (!cardGrid) return;
    
    cardGrid.innerHTML = internships.map(intern => `
      <div class="card accent" data-internship-id="${intern.id}">
        <h3>${intern.companyName}</h3>
        <p>${intern.position} (${intern.availableSlots} slots)</p>
        <div class="meta">
          <span>${intern.location}</span>
          <span>${intern.workType || 'On-site'}</span>
        </div>
        <button class="link" onclick="showInternshipDetails('${intern.id}')">View details</button>
      </div>
    `).join("");
    
    staggerCards();
  } catch (error) {
    console.error("Failed to load internships:", error);
  }
}

async function showInternshipDetails(internshipId) {
  try {
    const internships = await fetchAPI("/v1/internships");
    const internship = internships.find(i => i.id === internshipId);
    
    if (!internship) {
      showError("Internship not found");
      return;
    }
    
    const content = `
      <div style="display: grid; gap: 16px;">
        <div>
          <h3 style="margin: 0 0 8px 0;">${internship.companyName}</h3>
          <p style="margin: 0; color: #666;">${internship.position}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div>
            <strong>Available Slots:</strong><br>${internship.availableSlots}
          </div>
          <div>
            <strong>Location:</strong><br>${internship.location}
          </div>
          <div>
            <strong>Work Type:</strong><br>${internship.workType || 'On-site'}
          </div>
          <div>
            <strong>Sector:</strong><br>${internship.sector || 'N/A'}
          </div>
        </div>
        ${internship.description ? `
          <div>
            <strong>Description:</strong>
            <p style="margin: 8px 0;">${internship.description}</p>
          </div>
        ` : ''}
      </div>
    `;
    
    createModal("Internship Details", content, [
      { label: "Close", className: "ghost" }
    ]);
  } catch (error) {
    console.error("Failed to load internship details:", error);
  }
}

// Applications
async function loadApplications(status = null) {
  try {
    let applications = await fetchAPI("/applications");
    
    if (status) {
      applications = applications.filter(app => app.status === status.toUpperCase());
    }
    
    const tableContainer = document.querySelector('[data-view-section="applications"] .table');
    if (!tableContainer) return;
    
    const rows = applications.map(app => `
      <div class="table-row" data-app-id="${app.id}">
        <span>${app.studentName}</span>
        <span>${app.major || 'N/A'}</span>
        <span>${app.type}</span>
        <span class="status ${getStatusClass(app.status)}">${app.status}</span>
        <button class="solid small" onclick="showApplicationDetails('${app.id}')">Review</button>
      </div>
    `).join("");
    
    tableContainer.innerHTML = `
      <div class="table-row header">
        <span>Student</span>
        <span>Program</span>
        <span>Type</span>
        <span>Status</span>
        <span>Action</span>
      </div>
      ${rows}
    `;
    
    staggerCards();
  } catch (error) {
    console.error("Failed to load applications:", error);
  }
}

async function showApplicationDetails(applicationId) {
  try {
    const applications = await fetchAPI("/applications");
    const application = applications.find(a => a.id === applicationId);
    
    if (!application) {
      showError("Application not found");
      return;
    }
    
    const content = `
      <div style="display: grid; gap: 16px;">
        <div>
          <h3 style="margin: 0 0 8px 0;">${application.studentName}</h3>
          <p style="margin: 0; color: #666;">${application.major || 'N/A'}</p>
        </div>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
          <div>
            <strong>Type:</strong><br>${application.type}
          </div>
          <div>
            <strong>Status:</strong><br>
            <span class="status ${getStatusClass(application.status)}">${application.status}</span>
          </div>
          <div>
            <strong>Applied Date:</strong><br>${formatDate(application.createdAt)}
          </div>
          <div>
            <strong>Title:</strong><br>${application.title || 'N/A'}
          </div>
        </div>
        ${application.motivation ? `
          <div>
            <strong>Motivation:</strong>
            <p style="margin: 8px 0; padding: 12px; background: #f3f4f6; border-radius: 6px;">${application.motivation}</p>
          </div>
        ` : ''}
      </div>
    `;
    
    const actions = [{ label: "Close", className: "ghost" }];
    
    if (application.status === "PENDING") {
      actions.unshift(
        { 
          label: "Reject", 
          className: "ghost",
          closeOnClick: false,
          onClick: () => handleDecision(applicationId, "REJECTED")
        },
        { 
          label: "Approve", 
          className: "solid",
          closeOnClick: false,
          onClick: () => handleDecision(applicationId, "APPROVED")
        }
      );
    }
    
    createModal("Application Details", content, actions);
  } catch (error) {
    console.error("Failed to load application details:", error);
  }
}

async function handleDecision(applicationId, decision) {
  try {
    await fetchAPI(`/applications/${applicationId}/decision`, {
      method: "PUT",
      body: JSON.stringify({ decision })
    });
    
    showSuccess(`Application ${decision.toLowerCase()} successfully!`);
    document.querySelector('.modal-overlay').remove();
    await loadApplications();
    await loadDashboard();
  } catch (error) {
    console.error("Failed to update application:", error);
  }
}

window.approveApplication = async (applicationId) => {
  await handleDecision(applicationId, "APPROVED");
};

window.showApplicationDetails = showApplicationDetails;
window.showTripDetails = showTripDetails;
window.showInternshipDetails = showInternshipDetails;

// Reports
async function loadReports(status = null) {
  try {
    let reports = await fetchAPI("/v1/reports");
    
    if (status === "pending") {
      reports = reports.filter(r => !r.grade);
    } else if (status === "graded") {
      reports = reports.filter(r => r.grade);
    }
    
    const cardGrid = document.querySelector('[data-view-section="reports"] .card-grid');
    if (!cardGrid) return;
    
    // Group reports by trip/internship
    const grouped = {};
    reports.forEach(report => {
      const key = report.title || "Miscellaneous";
      if (!grouped[key]) {
        grouped[key] = [];
      }
      grouped[key].push(report);
    });
    
    cardGrid.innerHTML = Object.entries(grouped).map(([title, reportList]) => {
      const pending = reportList.filter(r => !r.grade).length;
      const total = reportList.length;
      
      return `
        <div class="card">
          <h3>${title}</h3>
          <p>${total} reports uploaded</p>
          <div class="meta">
            <span>${pending} pending review</span>
            <span>Due ${formatDate(reportList[0].dueDate)}</span>
          </div>
          <button class="link" onclick="showReportList('${title}')">Review batch</button>
        </div>
      `;
    }).join("");
    
    staggerCards();
  } catch (error) {
    console.error("Failed to load reports:", error);
  }
}

window.showReportList = (title) => {
  showSuccess(`Loading reports for: ${title}`);
};

// Notifications
async function loadNotifications() {
  try {
    const notifications = await fetchAPI("/v1/notifications");
    
    const content = document.createElement("div");
    content.style.cssText = "max-height: 400px; overflow-y: auto;";
    
    if (notifications.length === 0) {
      content.innerHTML = `<p style="text-align: center; color: #666;">No notifications</p>`;
    } else {
      content.innerHTML = notifications.map(notif => `
        <div style="padding: 12px; border-bottom: 1px solid #e5e7eb; ${notif.read ? 'opacity: 0.6;' : ''}">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div style="flex: 1;">
              <strong>${notif.title}</strong>
              <p style="margin: 4px 0 0 0; color: #666; font-size: 14px;">${notif.message}</p>
              <span style="font-size: 12px; color: #999;">${formatDate(notif.createdAt)}</span>
            </div>
            ${!notif.read ? `
              <button class="ghost small" onclick="markNotificationRead('${notif.id}')" 
                style="margin-left: 8px;">Mark read</button>
            ` : ''}
          </div>
        </div>
      `).join("");
    }
    
    createModal("Notifications", content, [
      { label: "Close", className: "ghost" }
    ]);
  } catch (error) {
    console.error("Failed to load notifications:", error);
  }
}

window.markNotificationRead = async (notificationId) => {
  try {
    await fetchAPI(`/v1/notifications/${notificationId}/read`, {
      method: "PUT"
    });
    loadNotifications();
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
  }
};

// Utility functions
function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function formatCurrency(amount) {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("th-TH", { 
    style: "currency", 
    currency: "THB",
    minimumFractionDigits: 0
  }).format(amount);
}

function getStatusClass(status) {
  const statusMap = {
    "PENDING": "amber",
    "DRAFT": "slate",
    "APPROVED": "green",
    "PUBLISHED": "green",
    "REJECTED": "red",
    "COMPLETED": "slate"
  };
  return statusMap[status] || "slate";
}

// Navigation and view management
const currentUser = checkAuth();
if (currentUser) {
  const userAvatar = document.getElementById("userAvatar");
  if (userAvatar) {
    userAvatar.textContent = currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : "U";
  }
}

const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", logout);
}

const showSection = (view) => {
  sections.forEach((section) => {
    const isActive = section.dataset.viewSection === view;
    section.classList.toggle("active", isActive);
  });
  
  // Load data when switching views
  switch(view) {
    case "dashboard":
      loadDashboard();
      break;
    case "trips":
      loadTrips();
      break;
    case "internships":
      loadInternships();
      break;
    case "applications":
      loadApplications();
      break;
    case "reports":
      loadReports();
      break;
  }
};

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    navItems.forEach((nav) => nav.classList.remove("active"));
    item.classList.add("active");
    showSection(item.dataset.view);
  });
});

const staggerCards = () => {
  const cards = document.querySelectorAll(".card, .trip-card, .table-row");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;
    card.classList.add("reveal");
  });
};

// Event listeners for buttons
document.getElementById("createTripBtn").addEventListener("click", showCreateTripModal);
document.getElementById("notificationBtn").addEventListener("click", loadNotifications);

// Filter buttons
document.querySelectorAll('[data-view-section="trips"] .filters button').forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const filters = ["draft", "published", "completed", null];
    if (index < 3) {
      loadTrips(filters[index]);
    } else {
      showCreateTripModal();
    }
  });
});

document.querySelectorAll('[data-view-section="internships"] .filters button').forEach((btn, index) => {
  btn.addEventListener("click", () => {
    if (index === 0) {
      loadInternships(null);
    } else if (index === 1) {
      loadInternships("open");
    }
  });
});

document.querySelectorAll('[data-view-section="applications"] .filters button').forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const filters = ["pending", "approved", "rejected"];
    loadApplications(filters[index]);
  });
});

document.querySelectorAll('[data-view-section="reports"] .filters button').forEach((btn, index) => {
  btn.addEventListener("click", () => {
    const filters = ["pending", "graded", null];
    loadReports(filters[index]);
  });
});

// Dashboard action buttons
document.querySelector('.hero-actions .solid').addEventListener("click", () => {
  navItems.forEach((nav) => nav.classList.remove("active"));
  document.querySelector('[data-view="applications"]').classList.add("active");
  showSection("applications");
});

// Initialize
showSection("dashboard");
staggerCards();

