document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
    const cards = document.querySelectorAll(".project-card");
  
    if (!filterInput || !noResults || !cards.length) return;
  
    filterInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      let visibleCount = 0;
  
      cards.forEach(function (card) {
        const title = card.querySelector(".card-title")?.textContent.toLowerCase() || "";
        const text = card.textContent.toLowerCase();
  
        const match = title.includes(query) || text.includes(query);
  
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });
  
      noResults.style.display = visibleCount === 0 ? "block" : "none";
    });
  });