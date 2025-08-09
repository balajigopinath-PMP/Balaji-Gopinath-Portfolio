document.addEventListener("DOMContentLoaded", () => {
  /*** Fade-in animation on scroll ***/
  const fadeElements = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });
  fadeElements.forEach(el => fadeObserver.observe(el));

  /*** Experience bullets with .exp-title / .exp-content ***/
  document.querySelectorAll(".exp-list li").forEach(li => {
    const headingText = li.querySelector("strong").textContent;
    const fullText = li.getAttribute("data-full");

    // Clear and rebuild HTML
    li.innerHTML = `
      <div class="exp-title"><strong>${headingText}</strong></div>
      <div class="exp-content">${fullText}</div>
    `;

    // Expand all by default
    li.classList.add("expanded");

    // Toggle on click
    li.querySelector(".exp-title").addEventListener("click", () => {
      li.classList.toggle("expanded");
    });
  });

  /*** Auto collapse on scroll away ***/
  const expObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        entry.target.classList.remove("expanded");
      }
    });
  }, { threshold: 0.4 });
  document.querySelectorAll(".exp-list li").forEach(li => expObserver.observe(li));

  /*** Video unmute logic ***/
  const introVideo = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  // Show button at start
  setTimeout(() => {
    unmuteBtn.classList.add("show");
    // Auto-hide after 2.5s
    setTimeout(() => {
      unmuteBtn.classList.remove("show");
    }, 2500);
  }, 500);

  // Click to unmute
  unmuteBtn.addEventListener("click", () => {
    introVideo.src = introVideo.src.replace("mute=1", "mute=0");
    unmuteBtn.classList.remove("show");
  });

  /*** Reload muted video when scrolling back to intro ***/
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let baseSrc = introVideo.src.split("?")[0];
        introVideo.src = `${baseSrc}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`;
        setTimeout(() => {
          unmuteBtn.classList.add("show");
          setTimeout(() => {
            unmuteBtn.classList.remove("show");
          }, 2500);
        }, 500);
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(document.querySelector(".intro"));
});
