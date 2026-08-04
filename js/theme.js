/**
 * SKZ : UNVEIL — Dark / Light Mode Theme Toggle Script
 * Prevents page flash on load, persists preference via localStorage,
 * handles event delegation for dynamic headers, and updates accessibility labels.
 */

// 1. Instantly set theme on initial script execution (prevents white flash on page load)
(function applyInitialTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
  })();
  
  /**
   * Updates theme toggle button text and ARIA attributes to match current state
   */
  function updateToggleText() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;
  
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    const isDark = currentTheme === "dark";
  
    toggleBtn.textContent = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";
    toggleBtn.setAttribute("aria-label", isDark ? "Switch to Light Theme" : "Switch to Dark Theme");
  }
  
  // Expose updateToggleText globally for components.js to invoke post-header load
  window.updateToggleText = updateToggleText;
  
  // 2. Global Click Event Listener (Event Delegation handles dynamically injected headers)
  document.addEventListener("click", function (event) {
    const toggleBtn = event.target.closest("#theme-toggle");
    if (!toggleBtn) return;
  
    const htmlEl = document.documentElement;
    const currentTheme = htmlEl.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
  
    // Apply new theme attribute and save preference locally
    htmlEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  
    // Sync UI button text and attributes
    updateToggleText();
  });
  
  // 3. Sync text when DOM content is ready
  document.addEventListener("DOMContentLoaded", updateToggleText);