// Year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

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
    if (formWrap) {
      formWrap.style.opacity = "0";
      formWrap.style.transform = "translateY(-6px)";
    }
    if (modalTop) modalTop.style.opacity = "0";

    setTimeout(() => {
      if (formWrap) formWrap.style.display = "none";
      if (modalTop) modalTop.style.display = "none";

      if (successState) {
        successState.style.display = "block";
        successState.setAttribute("aria-hidden","false");
      }
    }, 350);

    // Close modal after success
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
        closeModal();

        // cleanup classes + reset state for next open
        if (modalEl) modalEl.classList.remove("isClosing");
        if (modalBackdrop) modalBackdrop.classList.remove("isClosing");
      }, FADE_MS);

    }, SUCCESS_VISIBLE_MS);
  }); 
}

/* =========================
   MOBILE SWIPE DOTS
   ========================= */
(function () {
  const track = document.getElementById("mobileSwipeTrack");
  if (!track) return;

  const dots = Array.from(document.querySelectorAll(".mobileDotItem"));
  const slideCount = dots.length;

  function updateDots() {
    if (!dots.length) return;
    const index = Math.round(track.scrollLeft / track.clientWidth);
    const clamped = Math.max(0, Math.min(slideCount - 1, index));
    dots.forEach((d, i) => d.classList.toggle("active", i === clamped));
  }

  let raf = null;
  track.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(updateDots);
  });

  window.addEventListener("resize", updateDots);
  updateDots();
})();

/* =========================
   MOBILE CTA -> OPEN MODAL
   Uses data-open-modal buttons
   ========================= */
(function () {
  document.querySelectorAll("[data-open-modal]").forEach((btn) => {
    btn.addEventListener("click", () => {
      openModal();
    });
  });
})();