document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   MODAL
   ========================= */
const modal = document.getElementById("modal");
const openBtn = document.getElementById("joinBtnTop");
const closeBtn = document.getElementById("closeModal");

function openModal(){
  if (!modal) return;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden","false");
  const first = modal.querySelector("input, button");
  if(first) first.focus();
}
function closeModal(){
  if (!modal) return;
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden","true");
  if (openBtn) openBtn.focus();
}

if (openBtn) openBtn.addEventListener("click", openModal);
if (closeBtn) closeBtn.addEventListener("click", closeModal);

if (modal) {
  modal.addEventListener("click", (e)=>{ if(e.target === modal) closeModal(); });
}

window.addEventListener("keydown", (e)=>{
  if(e.key === "Escape" && modal && modal.classList.contains("show")) closeModal();
});

/* =========================
   SCROLL BAR
   ========================= */
const bar = document.getElementById("scrollbar");
window.addEventListener("scroll", () => {
  if (!bar) return;
  const h = document.documentElement;
  const denom = (h.scrollHeight - h.clientHeight) || 1;
  bar.style.width = ((h.scrollTop / denom) * 100) + "%";
}, { passive: true });

/* =========================
   FORM SUBMIT (DEMO)
   ========================= */
const form = document.getElementById("waitlistForm");
const formWrap = document.getElementById("formWrap");
const successState = document.getElementById("successState");
const modalTop = document.getElementById("modalTop");

if (form){
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Fade form out
    formWrap.style.opacity = "0";
    formWrap.style.transform = "translateY(-6px)";
    modalTop.style.opacity = "0";

    setTimeout(() => {
      formWrap.style.display = "none";
      modalTop.style.display = "none";

      successState.style.display = "block";
      successState.setAttribute("aria-hidden","false");
    }, 350);

    // Close modal after 1.8s
   const modalBackdrop = document.getElementById("modal");
const modalEl = modalBackdrop ? modalBackdrop.querySelector(".modal") : null;

const SUCCESS_VISIBLE_MS = 1600; // stays on screen
const FADE_MS = 260;            // fade duration (matches CSS)

setTimeout(() => {
  // start fade
  if (modalEl) modalEl.classList.add("isClosing");
  if (modalBackdrop) modalBackdrop.classList.add("isClosing");

  // close AFTER fade completes
  setTimeout(() => {
    if (typeof closeModal === "function") closeModal();

    // cleanup classes + reset state for next open
    if (modalEl) modalEl.classList.remove("isClosing");
    if (modalBackdrop) modalBackdrop.classList.remove("isClosing");
  }, FADE_MS);

}, SUCCESS_VISIBLE_MS);
  }); 
}

// =========================
// Mobile Slides (scroll-snap) + dots
// =========================
(function () {
  const track = document.getElementById("mSlidesTrack");
  const dotsWrap = document.getElementById("mDots");
  if (!track || !dotsWrap) return;

  const slides = Array.from(track.children);
  const dots = slides.map(() => {
    const d = document.createElement("div");
    d.className = "mDot";
    dotsWrap.appendChild(d);
    return d;
  });

  function setActiveDot(index) {
    dots.forEach((d, i) => d.classList.toggle("isActive", i === index));
  }

  // initial
  setActiveDot(0);

  // update on scroll (debounced)
  let raf = null;
  track.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const slideWidth = track.clientWidth;
      const index = Math.round(track.scrollLeft / slideWidth);
      setActiveDot(Math.max(0, Math.min(slides.length - 1, index)));
    });
  });

  // Hook slide CTA buttons to your modal open
  // If you already have a function like openModal(), call it here.
  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      // Try to click your existing header CTA if that already opens the modal:
      const existing = document.querySelector(".navCta");
      if (existing && existing !== btn) existing.click();
      // Otherwise, call your modal open function directly if you have one:
      // openModal();
    });
  });
})();

/* =========================
   MOBILE SLIDESHOW
   ========================= */
(function initMobileSlideshow(){
  const track = document.getElementById("mobileTrack");
  if(!track) return;

  const dots = Array.from(document.querySelectorAll(".mobileDots .dot"));
  if(!dots.length) return;

  function setActiveDot(i){
    dots.forEach((d, idx) => d.classList.toggle("isActive", idx === i));
  }

  function currentIndex(){
    const slideWidth = track.clientWidth;
    if(!slideWidth) return 0;
    return Math.max(0, Math.min(dots.length - 1, Math.round(track.scrollLeft / slideWidth)));
  }

  let raf = null;
  track.addEventListener("scroll", () => {
    if(raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => setActiveDot(currentIndex()));
  }, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      track.scrollTo({ left: i * track.clientWidth, behavior: "smooth" });
      setActiveDot(i);
    });
  });

  setActiveDot(0);
})();
