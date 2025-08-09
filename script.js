// script.js - safe, single-run logic for Experience expand/collapse + video unmute
document.addEventListener("DOMContentLoaded", () => {
  try {
    /*** Fade-in animation on scroll ***/
    const fadeElements = document.querySelectorAll(".fade-up");
    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    }, { threshold: 0.2 });
    fadeElements.forEach(el => fadeObserver.observe(el));
  } catch (e) {
    console.error("Fade observer error:", e);
  }

  /*** Build .exp-title / .exp-content safely and enable toggle ***/
  try {
    const expItems = Array.from(document.querySelectorAll(".exp-list li"));
    expItems.forEach(li => {
      // find heading (strong) and existing data-full
      const strong = li.querySelector("strong");
      const headingText = strong ? strong.textContent.trim() : (li.textContent || "").trim();
      let fullText = li.getAttribute("data-full");

      // fallback: if data-full missing or "null", try to extract any text nodes after the strong
      if (!fullText || fullText === "null") {
        // gather text from child nodes that are not the <strong>
        let collected = "";
        li.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE) collected += node.textContent;
          else if (node.nodeType === Node.ELEMENT_NODE && !node.matches("strong")) collected += node.textContent;
        });
        fullText = collected.replace(headingText, "").trim();
      }

      if (!fullText || fullText === "null") fullText = ""; // ensure string

      // store values on dataset for reference
      li.dataset.heading = headingText;
      li.dataset.full = fullText;

      // clear li and build structure once (don't overwrite later)
      li.innerHTML = ""; // safe to clear now - we've captured values
      const titleDiv = document.createElement("div");
      titleDiv.className = "exp-title";
      const strongEl = document.createElement("strong");
      strongEl.textContent = headingText;
      titleDiv.appendChild(strongEl);

      // chevron element for UX (rotates via CSS)
      const chevron = document.createElement("span");
      chevron.className = "chev";
      chevron.setAttribute("aria-hidden", "true");
      chevron.textContent = "›";
      titleDiv.appendChild(chevron);

      const contentDiv = document.createElement("div");
      contentDiv.className = "exp-content";
      // use textContent to avoid accidental HTML injection and preserve text exactly
      contentDiv.textContent = fullText;

      li.appendChild(titleDiv);
      li.appendChild(contentDiv);

      // click toggles expanded class (CSS handles animation)
      titleDiv.addEventListener("click", (e) => {
        e.stopPropagation();
        li.classList.toggle("expanded");
      });
    });

    // Auto-expand all after paint so CSS transitions run smoothly
    // small timeout lets browser paint initial state then transition to expanded
    setTimeout(() => {
      expItems.forEach(li => li.classList.add("expanded"));
    }, 60);

    // Auto-collapse when scrolled out of view, expand when in view
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target;
        if (entry.isIntersecting) {
          target.classList.add("expanded");
        } else {
          target.classList.remove("expanded");
        }
      });
    }, { threshold: 0.45 });

    expItems.forEach(li => scrollObserver.observe(li));
  } catch (e) {
    console.error("Experience expand/collapse error:", e);
  }

  /*** Video autoplay + Tap-to-Unmute (fade away after 2.5s) ***/
  try {
    const introVideo = document.getElementById("introVideo"); // iframe
    const unmuteBtn = document.getElementById("unmuteBtn");

    if (unmuteBtn) {
      // show button gently, then hide after 2.5s
      const showDelay = 500; // initial delay before showing
      const visibleMs = 2500;
      setTimeout(() => {
        unmuteBtn.classList.add("show");
        setTimeout(() => {
          unmuteBtn.classList.remove("show");
        }, visibleMs);
      }, showDelay);

      // click handler - toggles mute by reloading the iframe with mute=0
      unmuteBtn.addEventListener("click", () => {
        if (!introVideo) return;
        const src = introVideo.src;
        // if already unmuted, ignore
        if (src.includes("mute=0")) {
          unmuteBtn.classList.remove("show");
          return;
        }
        const newSrc = src.includes("?") ? src.replace(/mute=1/, "mute=0") : src + "?mute=0";
        introVideo.src = newSrc;
        unmuteBtn.classList.remove("show");
      });
    }

    // Re-load muted autoplay when intro section becomes visible again
    if (introVideo) {
      const introSection = document.querySelector(".intro");
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const base = introVideo.src.split("?")[0];
            introVideo.src = `${base}?autoplay=1&mute=1&controls=0&modestbranding=1&playsinline=1`;
            // show unmute after small delay, then hide
            if (unmuteBtn) {
              setTimeout(() => {
                unmuteBtn.classList.add("show");
                setTimeout(() => unmuteBtn.classList.remove("show"), 2500);
              }, 500);
            }
          } else {
            // when out of view we won't clear src (to avoid flicker on some browsers)
            // but you could set introVideo.src = '' to stop network if desired
          }
        });
      }, { threshold: 0.6 });
      if (introSection) videoObserver.observe(introSection);
    }
  } catch (e) {
    console.error("Video / unmute logic error:", e);
  }
});
