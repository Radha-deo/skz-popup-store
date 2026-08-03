document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("theme-toggle");
  
    if (!toggleBtn) return;
  
    function applyTheme(theme) {
      document.documentElement.setAttribute("data-theme", theme);
      toggleBtn.textContent = theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
      localStorage.setItem("theme", theme);
    }
  
    function loadSavedTheme() {
      const savedTheme = localStorage.getItem("theme");
      applyTheme(savedTheme || "light");
    }
  
    toggleBtn.addEventListener("click", function () {
      const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
      const newTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(newTheme);
    });
  
    loadSavedTheme();
  });