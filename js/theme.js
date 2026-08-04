// 1. Instantly set theme on initial page load (prevents white flash)
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  })();
  
  // 2. Global Click Listener for the Theme Toggle Button
  document.addEventListener("click", function (event) {
    // Check if clicked element or its parent is the theme toggle button
    const toggleBtn = event.target.closest("#theme-toggle");
    if (!toggleBtn) return;
  
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
  
    // Apply & Save
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    
    // Update Button Text
    updateToggleText();
  });
  
  // Function to keep button label matching current state
  function updateToggleText() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;
    
    const currentTheme = document.documentElement.getAttribute("data-theme");
    toggleBtn.textContent = currentTheme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode";
  }
  
  // Update text whenever DOM content or header component finishes loading
  document.addEventListener("DOMContentLoaded", updateToggleText);