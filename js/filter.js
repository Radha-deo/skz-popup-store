/**
 * SKZ : UNVEIL — Global Live Filter & Search Script
 * Handles real-time search filtering across products, blog posts, and interactive card grids.
 */

document.addEventListener("DOMContentLoaded", function () {
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
  
    // Exit early if search bar does not exist on the current page
    if (!filterInput) return;
  
    /**
     * Core filtering function to evaluate card text content against search query
     */
    function filterCards() {
      const query = filterInput.value.toLowerCase().trim();
      let visibleCount = 0;
  
      // Target product cards, blog post cards, or general card containers
      const cards = document.querySelectorAll(".product-card, .post-card, .blog-card, .card");
  
      cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        const match = text.includes(query);
  
        card.style.display = match ? "" : "none";
        if (match) visibleCount++;
      });
  
      // Toggle "No results found" feedback message
      if (noResults) {
        noResults.style.display = visibleCount === 0 && query !== "" ? "block" : "none";
      }
    }
  
    // Listen for real-time keystrokes and inputs
    filterInput.addEventListener("input", filterCards);
  
    // Expose global helper so blog.js or products.js can re-trigger filtering after dynamic fetch
    window.applyCardFilter = filterCards;
  });