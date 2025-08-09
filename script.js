// Video modal
document.getElementById("playVideo").addEventListener("click", function() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  frame.src = "https://www.youtube.com/embed/0WkZfPto9aI?autoplay=1";
  modal.style.display = "block";
});

document.querySelector(".close").addEventListener("click", function() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  frame.src = "";
  modal.style.display = "none";
});

window.onclick = function(event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) {
    modal.style.display = "none";
    document.getElementById("videoFrame").src = "";
  }
};

// Expand/collapse bullets on scroll
const expItems = document.querySelectorAll(".exp-list li");

function toggleExpandOnView(entries) {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("expanded");
        const fullText = entry.target.getAttribute("data-full");
        if (!entry.target.querySelector("span")) {
          const span = document.createElement("span");
          span.textContent = fullText;
          entry.target.appendChild(span);
        }
      }, index * 120); // Cascade effect
    } else {
      entry.target.classList.remove("expanded");
      const span = entry.target.querySelector("span");
      if (span) span.remove();
    }
  });
}

const bulletObserver = new IntersectionObserver(toggleExpandOnView, { threshold: 0.5 });
expItems.forEach(item => bulletObserver.observe(item));

// Fade-up animation for sections
const fadeElements = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

fadeElements.forEach(el => fadeObserver.observe(el));