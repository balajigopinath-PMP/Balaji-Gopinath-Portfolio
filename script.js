// Video autoplay + stop on scroll
const introVideo = document.getElementById("introVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");

window.addEventListener("scroll", () => {
  const introSection = document.querySelector(".intro");
  const rect = introSection.getBoundingClientRect();
  if (rect.bottom < 0 || rect.top > window.innerHeight) {
    introVideo.src = "";
    videoPlaceholder.style.display = "block";
  } else {
    if (!introVideo.src) {
      introVideo.src = "https://www.youtube.com/embed/0WkZfPto9aI?autoplay=1&mute=1&controls=0";
      videoPlaceholder.style.display = "none";
    }
  }
});

// Experience auto-expand on scroll
const expItems = document.querySelectorAll(".exp-list li");

const bulletObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("expanded");
        const fullText = entry.target.getAttribute("data-full");
        if (!entry.target.querySelector("span")) {
          const span = document.createElement("span");
          span.textContent = fullText;
          entry.target.appendChild(span);
        }
      }, i * 120);
    }
  });
}, { threshold: 0.5 });

expItems.forEach(item => bulletObserver.observe(item));

// Fade-up sections
const fadeElements = document.querySelectorAll(".fade-up");
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, { threshold: 0.3 });

fadeElements.forEach(el => fadeObserver.observe(el));
