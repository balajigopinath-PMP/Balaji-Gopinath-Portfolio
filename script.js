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

  /*** Experience bullet expand/collapse ***/
  const expItems = document.querySelectorAll(".exp-list li");

  expItems.forEach(item => {
    const headingText = item.querySelector("strong").textContent;
    const fullText = item.getAttribute("data-full");

    // Store short & full text
    item.setAttribute("data-heading", headingText);

    // Expanded on load
    item.classList.add("expanded");
    item.innerHTML = `<div class="exp-content"><strong>${headingText}</strong>: ${fullText}</div>`;

    // Click toggle
    item.addEventListener("click", () => {
      const isExpanded = item.classList.contains("expanded");
      if (isExpanded) {
        collapseItem(item);
      } else {
        expandItem(item);
      }
    });
  });

  // Expand with smooth animation
  function expandItem(item) {
    const heading = item.getAttribute("data-heading");
    const full = item.getAttribute("data-full");
    item.innerHTML = `<div class="exp-content"><strong>${heading}</strong>: ${full}</div>`;
    item.classList.add("expanded");
    item.querySelector(".exp-content").style.maxHeight = "1000px";
  }

  // Collapse with smooth animation
  function collapseItem(item) {
    const heading = item.getAttribute("data-heading");
    item.innerHTML = `<div class="exp-content"><strong>${heading}</strong></div>`;
    item.classList.remove("expanded");
    item.querySelector(".exp-content").style.maxHeight = "40px";
  }

  /*** Auto expand/collapse on scroll ***/
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        expandItem(entry.target);
      } else {
        collapseItem(entry.target);
      }
    });
  }, { threshold: 0.5 });

  expItems.forEach(item => observer.observe(item));

  /*** Video autoplay + Tap to Unmute logic ***/
  const introVideo = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");
  const videoPlaceholder = document.getElementById("videoPlaceholder");

  // Hide placeholder & play video on load
  videoPlaceholder.style.display = "none";
  introVideo.style.display = "block";

  // Show unmute button after 2.5s
  setTimeout(() => {
    unmuteBtn.style.display = "block";
  }, 2500);

  unmuteBtn.addEventListener("click", () => {
    const iframeSrc = introVideo.src.replace("mute=1", "mute=0");
    introVideo.src = iframeSrc;
    unmuteBtn.style.display = "none";
  });

  // Reload muted video when scrolling back to intro
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let baseSrc = introVideo.src.split("?")[0];
        introVideo.src = `${baseSrc}?autoplay=1&mute=1&controls=0&modestbranding=1`;
        setTimeout(() => {
          unmuteBtn.style.display = "block";
        }, 2500);
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(document.querySelector(".intro"));
});
