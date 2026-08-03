document.addEventListener("DOMContentLoaded", function () {
    const blogList = document.getElementById("blog-list");
    const filterInput = document.getElementById("filter-input");
    const noResults = document.getElementById("no-results");
  
    if (!blogList) return;
  
    fetch("data/posts.json")
      .then(response => response.json())
      .then(posts => {
        posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
        blogList.innerHTML = "";
  
        posts.forEach((post, index) => {
          const postElement = document.createElement("article");
          postElement.classList.add("post-card", "card");
  
          const formattedDate = new Date(post.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric"
          });
  
          postElement.innerHTML = `
            <div class="card-body">
              ${index === 0 ? '<span class="tag">Latest Post</span>' : ''}
              <span class="tag">${post.category}</span>
              <h2 class="card-title">${post.title}</h2>
              <p class="post-meta">${formattedDate}</p>
              <p>${post.summary}</p>
              <details>
                <summary>Read more</summary>
                <p>${post.content}</p>
              </details>
            </div>
          `;
  
          blogList.appendChild(postElement);
        });
  
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
  
            if (noResults) noResults.style.display = visibleCount === 0 ? "block" : "none";
          });
        }
      })
      .catch(error => console.error("Error loading posts:", error));
  });