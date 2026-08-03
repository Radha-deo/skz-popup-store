function loadComponent(selector, filePath) {
    fetch(filePath)
      .then(response => {
        if (!response.ok) throw new Error("Could not load " + filePath);
        return response.text();
      })
      .then(html => {
        const target = document.querySelector(selector);
        if (target) target.innerHTML = html;
      })
      .catch(error => console.error(error));
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    loadComponent("#header-placeholder", "components/header.html");
    loadComponent("#footer-placeholder", "components/footer.html");
  });