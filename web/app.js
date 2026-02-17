const navItems = document.querySelectorAll(".nav-item");
const sections = document.querySelectorAll("[data-view-section]");

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
  const cards = document.querySelectorAll(".card, .trip-card, .table-row");
  cards.forEach((card, index) => {
    card.style.animationDelay = `${Math.min(index * 0.05, 0.4)}s`;
    card.classList.add("reveal");
  });
};

showSection("dashboard");
staggerCards();
