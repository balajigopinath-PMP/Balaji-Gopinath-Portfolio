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
  const video = document.getElementById("introVideo");
  const unmuteBtn = document.getElementById("unmuteBtn");

  expItems.forEach(item => {
    let expanded = false;
    item.addEventListener("click", () => {
      if (!expanded) {
        item.innerHTML = `<strong>${item.textContent}</strong>: ${item.dataset.full}`;
        expanded = true;
      } else {
        item.innerHTML = `<strong>${item.textContent.split(":")[0]}</strong>`;
        expanded = false;
      }
    });

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !expanded) {
          item.innerHTML = `<strong>${item.textContent}</strong>: ${item.dataset.full}`;
          expanded = true;
        } else if (!entry.isIntersecting && expanded) {
          item.innerHTML = `<strong>${item.textContent.split(":")[0]}</strong>`;
          expanded = false;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(item);
  });

  let videoVisible = true;
  const videoObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (!videoVisible) {
          video.src = video.src;
          videoVisible = true;
          setTimeout(() => unmuteBtn.classList.add("visible"), 2500);
        }
      } else {
        videoVisible = false;
      }
    });
  }, { threshold: 0.5 });

  videoObserver.observe(video);
});
