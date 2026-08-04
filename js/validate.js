/**
 * SKZ : UNVEIL — Form Validation Script
 * Intercepts submission on contact-form, validates fields with regex & character constraints,
 * manages inline error messages/styles, and handles the post-submission success panel.
 */

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("form-success");
  
    // Exit early if the form container does not exist on this page
    if (!form) return;
  
    /**
     * Display error message and apply invalid styling to input field
     */
    function showError(fieldId, message) {
      const errorSpan = document.getElementById(fieldId + "-error");
      const inputElem = document.getElementById(fieldId);
  
      if (errorSpan) {
        errorSpan.textContent = message;
      }
      if (inputElem) {
        inputElem.classList.add("is-invalid");
        inputElem.setAttribute("aria-invalid", "true");
        inputElem.style.borderColor = "#e11d48";
      }
    }
  
    /**
     * Clear error message and restore normal styling to input field
     */
    function clearError(fieldId) {
      const errorSpan = document.getElementById(fieldId + "-error");
      const inputElem = document.getElementById(fieldId);
  
      if (errorSpan) {
        errorSpan.textContent = "";
      }
      if (inputElem) {
        inputElem.classList.remove("is-invalid");
        inputElem.setAttribute("aria-invalid", "false");
        inputElem.style.borderColor = "";
      }
    }
  
    /**
     * Regular Expression test for basic email structure
     */
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    // Intercept the form submission event
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
  
      const nameElem = document.getElementById("name");
      const emailElem = document.getElementById("email");
      const messageElem = document.getElementById("message");
  
      const name = nameElem ? nameElem.value.trim() : "";
      const email = emailElem ? emailElem.value.trim() : "";
      const message = messageElem ? messageElem.value.trim() : "";
  
      // 1. Validate Name Field
      if (name === "") {
        showError("name", "Please enter your name.");
        isValid = false;
      } else {
        clearError("name");
      }
  
      // 2. Validate Email Field
      if (email === "") {
        showError("email", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showError("email", "Please enter a valid email address (e.g., name@example.com).");
        isValid = false;
      } else {
        clearError("email");
      }
  
      // 3. Validate Message Field (Minimum 20 characters required)
      if (message === "") {
        showError("message", "Please enter a message.");
        isValid = false;
      } else if (message.length < 20) {
        showError("message", `Message must be at least 20 characters (currently ${message.length}).`);
        isValid = false;
      } else {
        clearError("message");
      }
  
      // 4. Handle Successful Validation
      if (isValid) {
        form.style.display = "none";
        if (successMsg) {
          successMsg.style.display = "block";
          // Focus the success message for screen reader accessibility
          successMsg.setAttribute("tabindex", "-1");
          successMsg.focus();
        }
      }
    });
  
    // Clear errors live as the user types/edits inputs
    ["name", "email", "message"].forEach(function (id) {
      const inputElem = document.getElementById(id);
      if (inputElem) {
        inputElem.addEventListener("input", function () {
          clearError(id);
        });
      }
    });
  });