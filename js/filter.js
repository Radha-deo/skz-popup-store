document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
  
    if (!filterInput) return;
  
    filterInput.addEventListener("input", function () {
      const query = this.value.toLowerCase().trim();
      let visibleCount = 0;
  
      // Target product cards on products.html OR blog cards on blog.html
      const cards = document.querySelectorAll(".product-card, .post-card, .blog-card, .card");
  
      cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(query);
        
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });
  
      // Toggle "No results found" message
      if (noResults) {
        noResults.style.display = (visibleCount === 0 && query !== "") ? "block" : "none";
      }
    });
  });