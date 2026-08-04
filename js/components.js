/**
 * SKZ : UNVEIL — Reusable Components Loader
 * Asynchronously loads header.html and footer.html components into placeholder wrappers,
 * automatically highlights the active navigation link, and syncs theme toggle controls.
 */

document.addEventListener("DOMContentLoaded", function () {
    // 1. Load Header Component
    const headerContainer = document.getElementById("header-placeholder") || document.querySelector("header");
  
    if (headerContainer) {
      fetch("components/header.html")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then((html) => {
          headerContainer.innerHTML = html;
  
          // Automatically Highlight Current Page Active Nav Link
          const currentPage = window.location.pathname.split("/").pop() || "index.html";
          const navLinks = headerContainer.querySelectorAll(".site-nav a");
  
          navLinks.forEach((link) => {
            const href = link.getAttribute("href");
            if (href === currentPage || (currentPage === "" && href === "index.html")) {
              link.classList.add("active");
            } else {
              link.classList.remove("active");
            }
          });
  
          // Sync Dark/Light Mode toggle button state after dynamic inject
          if (typeof updateToggleText === "function") {
            updateToggleText();
          } else if (typeof initTheme === "function") {
            initTheme();
          }
        })
        .catch((err) => console.error("Error loading header component:", err));
    }
  
    // 2. Load Footer Component
    const footerContainer = document.getElementById("footer-placeholder") || document.querySelector("footer");
  
    if (footerContainer) {
      fetch("components/footer.html")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then((html) => {
          footerContainer.innerHTML = html;
        })
        .catch((err) => console.error("Error loading footer component:", err));
    }
  });