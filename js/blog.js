/**
 * SKZ : UNVEIL — News & Journal Fetching Script
 * Dynamically fetches posts from data/posts.json, builds card elements,
 * and handles live search filtering.
 */

document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
  
    // Exit early if the blog container doesn't exist on this page
    if (!blogList) return;
  
    // Fetch journal posts from local JSON data file
    fetch("data/posts.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(posts => {
        // Sort posts chronologically (Newest first)
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        // Clear static skeleton/loader markup
        blogList.innerHTML = "";
  
        // Loop through each post and create HTML card structure
        posts.forEach((post, index) => {
          const postElement = document.createElement("article");
          postElement.classList.add("post-card", "card");
  
          // Format publication date into readable string (e.g., "August 4, 2026")
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
  
          // Optional post thumbnail image markup
          const imageMarkup = post.image 
            ? `<img src="${post.image}" alt="${post.title}" class="post-image" style="width:100%; border-radius:8px 8px 0 0; margin-bottom:1rem;" />` 
            : "";
  
          // Construct internal HTML structure
          postElement.innerHTML = `
            ${imageMarkup}
            <div class="card-body">
              <div class="tag-wrap" style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:0.5rem;">
                ${index === 0 ? '<span class="tag" style="background:var(--primary-color, #682e5c); color:#fff; padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:700;">Latest Post</span>' : ''}
                ${post.category ? `<span class="tag" style="background:rgba(0,0,0,0.05); padding:0.2rem 0.5rem; border-radius:4px; font-size:0.75rem; font-weight:600;">${post.category}</span>` : ''}
              </div>
              <h2 class="card-title" style="margin-top:0.25rem;">${post.title}</h2>
              <p class="post-meta" style="font-size:0.85rem; color:#666; margin-bottom:0.75rem;">${formattedDate}</p>
              <p>${post.summary}</p>
              <details style="margin-top:1rem; cursor:pointer;">
                <summary style="font-weight:600; color:var(--primary-color, #682e5c);">Read more</summary>
                <p style="margin-top:0.5rem; line-height:1.6;">${post.content}</p>
              </details>
            </div>
          `;
  
          blogList.appendChild(postElement);
        });
  
        // Attach real-time search filtering logic
        if (filterInput) {
          filterInput.addEventListener("input", function () {
            const query = this.value.toLowerCase().trim();
            let visibleCount = 0;
  
            document.querySelectorAll(".post-card").forEach(card => {
              const text = card.textContent.toLowerCase();
              const match = text.includes(query);
              
              card.style.display = match ? "" : "none";
              if (match) visibleCount++;
            });
  
            // Toggle empty results notice
            if (noResults) {
              noResults.style.display = visibleCount === 0 ? "block" : "none";
            }
          });
        }
      })
      .catch(error => {
        console.error("Error loading posts:", error);
        blogList.innerHTML = `<p style="color:#e11d48;">Unable to load news updates at this time. Please check back later.</p>`;
      });
  });