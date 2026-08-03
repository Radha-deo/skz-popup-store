document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const messageBox = document.getElementById("form-message");
  
    if (!form) return;
  
    function showError(fieldId, message) {
      const field = document.getElementById(fieldId);
      let error = field.parentElement.querySelector(".error-msg");
  
      if (!error) {
        error = document.createElement("span");
        error.className = "error-msg";
        field.insertAdjacentElement("afterend", error);
      }
  
      error.textContent = message;
    }
  
    function clearError(fieldId) {
      const field = document.getElementById(fieldId);
      const error = field.parentElement.querySelector(".error-msg");
      if (error) error.remove();
    }
  
    function validateEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    form.addEventListener("submit", function (e) {
      e.preventDefault();
  
      let isValid = true;
  
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
  
      ["name", "email", "subject", "message"].forEach(clearError);
  
      if (!name) {
        showError("name", "Please enter your name.");
        isValid = false;
      }
  
      if (!email) {
        showError("email", "Please enter your email address.");
        isValid = false;
      } else if (!validateEmail(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
      }
  
      if (!subject) {
        showError("subject", "Please enter a subject.");
        isValid = false;
      }
  
      if (message.length < 20) {
        showError("message", "Please enter at least 20 characters.");
        isValid = false;
      }
  
      if (isValid) {
        messageBox.textContent = "Thank you! Your message has been sent successfully.";
        form.reset();
      } else {
        messageBox.textContent = "";
      }
    });
  
    ["name", "email", "subject", "message"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", function () {
        clearError(id);
      });
    });
  });