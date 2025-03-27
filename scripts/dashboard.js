// Toggle Sidebar
const sidebar = document.getElementById("sidebar");
const sidebarToggle = document.getElementById("sidebar-toggle");
const closeBtn = document.getElementById("close-btn");
const mainContent = document.getElementById("main-content");

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    mainContent.style.marginLeft = sidebar.classList.contains("active") ? "250px" : "0";
});

closeBtn.addEventListener("click", () => {
    sidebar.classList.remove("active");
    mainContent.style.marginLeft = "0";
});