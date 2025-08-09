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
