
// Dark and Light Theme
const themeButton = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);

function updateThemeButton() {
    if (themeButton) {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        themeButton.textContent = currentTheme === "dark" ? "☀️" : "🌙";
    }
}

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("portfolio-theme", newTheme);
        updateThemeButton();
    });
}

// Mobile Navigation
const menuButton = document.getElementById("menuToggle");
const navigation = document.getElementById("navLinks");

if (menuButton && navigation) {
    menuButton.addEventListener("click", function () {
        navigation.classList.toggle("show");
    });
}

updateThemeButton();




// ==========================================
// PORTFOLIO 4.0 - SIDEBAR FUNCTIONALITY
// ==========================================

const sidebar = document.getElementById("portfolioSidebar");
const sidebarToggle = document.getElementById("sidebarToggle");
const mobileMenuToggle = document.getElementById("mobileSidebarToggle");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const sidebarLinks = document.querySelectorAll(".sidebar-link");

// Desktop sidebar state
const savedSidebarState = localStorage.getItem("portfolio-sidebar");

if (savedSidebarState === "collapsed" && window.innerWidth > 768) {
    document.body.classList.add("sidebar-collapsed");
}

// Desktop open / close
if (sidebarToggle) {
    sidebarToggle.addEventListener("click", function () {

        if (window.innerWidth <= 768) {
            closeMobileSidebar();
            return;
        }

        document.body.classList.toggle("sidebar-collapsed");

        const isCollapsed =
            document.body.classList.contains("sidebar-collapsed");

        localStorage.setItem(
            "portfolio-sidebar",
            isCollapsed ? "collapsed" : "expanded"
        );

        sidebarToggle.setAttribute(
            "aria-expanded",
            String(!isCollapsed)
        );
    });
}

// Mobile sidebar open
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", function () {
        openMobileSidebar();
    });
}

function openMobileSidebar() {
    document.body.classList.add("mobile-sidebar-open");

    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute("aria-expanded", "true");
    }
}

function closeMobileSidebar() {
    document.body.classList.remove("mobile-sidebar-open");

    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute("aria-expanded", "false");
    }
}

// Close when overlay is clicked
if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeMobileSidebar);
}

// Close after selecting a page
sidebarLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        closeMobileSidebar();
    });
});

// Close with Escape key
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeMobileSidebar();
    }
});

// Reset mobile drawer when returning to desktop
window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        closeMobileSidebar();
    }
});

