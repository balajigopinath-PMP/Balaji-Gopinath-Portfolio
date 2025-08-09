// Video modal
document.getElementById("playVideo").addEventListener("click", function () {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  frame.src = "https://www.youtube.com/embed/0WkZfPto9aI?autoplay=1&mute=1";
  modal.style.display = "block";

  // Show Tap to Unmute after 2.5s
  setTimeout(() => {
    document.querySelector(".tap-to-unmute").classList.add("visible");
  }, 2500);
});

document.querySelector(".close").addEventListener("click", closeVideo);

window.onclick = function (event) {
  const modal = document.getElementById("videoModal");
  if (event.target === modal) closeVideo();
};

function closeVideo() {
  const modal = document.getElementById("videoModal");
  const frame = document.getElementById("videoFrame");
  modal.style.display = "none";
  frame.src = "";
  document.querySelector(".tap-to-unmute").classList.remove("visible");
}

// Tap to Unmute functionality
document.querySelector(".tap-to-unmute").addEventListener("click", function () {
  const iframe = document.getElementById("videoFrame");
  const src = iframe.src.replace("mute=1", "mute=0");
  iframe.src = src;
  this.classList.remove("visible");
});

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
      }, index * 120);
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
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.3 });
fadeElements.forEach(el => fadeObserver.observe(el));
document.addEventListener("DOMContentLoaded", () => {
  const expItems = document.querySelectorAll(".exp-list li");
  const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 });

  // Expand all on load
  expItems.forEach(li => {
    li.innerHTML = `<strong>${li.querySelector("strong").innerText}:</strong> ${li.dataset.full}`;
    observer.observe(li);
  });

  // Click to toggle
  expItems.forEach(li => {
    li.addEventListener("click", () => toggleItem(li));
  });

  function toggleItem(li) {
    if (li.classList.contains("collapsed")) {
      li.innerHTML = `<strong>${li.querySelector("strong").innerText}:</strong> ${li.dataset.full}`;
      li.classList.remove("collapsed");
    } else {
      const heading = li.querySelector("strong").innerText.split(":")[0];
      li.innerHTML = `<strong>${heading}</strong>`;
      li.classList.add("collapsed");
    }
  }

  function handleIntersect(entries) {
    entries.forEach(entry => {
      const li = entry.target;
      if (entry.isIntersecting) {
        li.innerHTML = `<strong>${li.querySelector("strong").innerText}:</strong> ${li.dataset.full}`;
        li.classList.remove("collapsed");
      } else {
        const heading = li.querySelector("strong").innerText.split(":")[0];
        li.innerHTML = `<strong>${heading}</strong>`;
        li.classList.add("collapsed");
      }
    });
  }

  // Fade-up animations
  const faders = document.querySelectorAll(".fade-up");
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  faders.forEach(fade => fadeObserver.observe(fade));

  // Video autoplay + unmute button
  const video = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  let unmuteTimeout = setTimeout(() => unmuteBtn.classList.add("show"), 2500);

  unmuteBtn.addEventListener("click", () => {
    let src = video.src.replace("mute=1", "mute=0");
    video.src = src;
    unmuteBtn.classList.remove("show");
  });

  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        let src = video.src;
        if (!src.includes("autoplay=1")) {
          video.src = src + "&autoplay=1&mute=1";
          clearTimeout(unmuteTimeout);
          unmuteTimeout = setTimeout(() => unmuteBtn.classList.add("show"), 2500);
        }
      } else {
        video.src = video.src.replace("&autoplay=1", "");
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(video);
});
