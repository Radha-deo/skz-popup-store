document.addEventListener("DOMContentLoaded", function () {
    // 1. Load Header
    const headerElem = document.querySelector("header");
    if (headerElem) {
      fetch("components/header.html")
        .then((res) => res.text())
        .then((html) => {
          headerElem.innerHTML = html;
  
          // Highlight Active Link
          const currentPage = window.location.pathname.split("/").pop() || "index.html";
          const navLinks = headerElem.querySelectorAll(".site-nav a");
          navLinks.forEach((link) => {
            if (link.getAttribute("href") === currentPage) {
              link.classList.add("active");
            }
          });
  
          // Ensure toggle text reflects current theme
          if (typeof updateToggleText === "function") {
            updateToggleText();
          }
        })
        .catch((err) => console.error("Error loading header:", err));
    }
  
    // 2. Load Footer
    const footerElem = document.querySelector("footer");
    if (footerElem) {
      fetch("components/footer.html")
        .then((res) => res.text())
        .then((html) => {
          footerElem.innerHTML = html;
        })
        .catch((err) => console.error("Error loading footer:", err));
    }
  });