const video = document.getElementById('introVideo');
const unmuteBtn = document.getElementById('unmuteBtn');

// Show unmute button after 2.5s
setTimeout(() => {
  unmuteBtn.classList.add('show');
}, 2500);

// Unmute logic
unmuteBtn.addEventListener('click', () => {
  video.muted = false;
  video.play();
  unmuteBtn.classList.remove('show');
});

// Pause when scrolled away, reload when back
let introInView = true;
window.addEventListener('scroll', () => {
  const rect = video.getBoundingClientRect();
  const fullyInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
  
  if (!fullyInView && introInView) {
    video.pause();
    introInView = false;
  } else if (fullyInView && !introInView) {
    video.currentTime = 0;
    video.muted = true;
    video.play();
    setTimeout(() => {
      unmuteBtn.classList.add('show');
    }, 2500);
    introInView = true;
  }
});
