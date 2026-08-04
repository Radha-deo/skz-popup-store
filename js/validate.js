document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const successMsg = document.getElementById("form-success");
  
    if (!form) return;
  
    // Show error message beneath field
    function showError(fieldId, message) {
      const errorSpan = document.getElementById(fieldId + "-error");
      if (errorSpan) {
        errorSpan.textContent = message;
      }
    }
  
    // Clear error message for field
    function clearError(fieldId) {
      const errorSpan = document.getElementById(fieldId + "-error");
      if (errorSpan) {
        errorSpan.textContent = "";
      }
    }
  
    // Regex check for email formatting
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    // Intercept submit event
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      let isValid = true;
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
  
      // 1. Validate Name (Not empty)
      if (name === "") {
        showError("name", "Please enter your name.");
        isValid = false;
      } else {
        clearError("name");
      }
  
      // 2. Validate Email (Not empty and valid format)
      if (email === "") {
        showError("email", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showError("email", "Please enter a valid email address (e.g. name@domain.com).");
        isValid = false;
      } else {
        clearError("email");
      }
  
      // 3. Validate Message (At least 20 characters)
      if (message === "") {
        showError("message", "Please enter a message.");
        isValid = false;
      } else if (message.length < 20) {
        showError("message", `Message must be at least 20 characters (currently ${message.length}).`);
        isValid = false;
      } else {
        clearError("message");
      }
  
      // 4. On successful validation
      if (isValid) {
        form.style.display = "none";
        if (successMsg) {
          successMsg.style.display = "block";
        }
      }
    });
  
    // Clear errors live as user types
    ["name", "email", "message"].forEach(function (id) {
      const inputElem = document.getElementById(id);
      if (inputElem) {
        inputElem.addEventListener("input", function () {
          clearError(id);
        });
      }
    });
  });