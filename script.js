document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   MODAL
   ========================= */
const modal = document.getElementById("modal");
const openBtn = document.getElementById("joinBtnTop");
const closeBtn = document.getElementById("closeModal");

function openModal(){
  if (!modal) return;

  // Reset modal to form state every time it opens
  const formWrap = document.getElementById("formWrap");
  const successState = document.getElementById("successState");
  const modalTop = document.getElementById("modalTop");

  if (formWrap && successState && modalTop){
    successState.style.display = "none";
    successState.setAttribute("aria-hidden","true");

    formWrap.style.display = "block";
    formWrap.style.opacity = "1";
    formWrap.style.transform = "translateY(0)";

    modalTop.style.display = "flex";
    modalTop.style.opacity = "1";
  }

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
   SCROLL BAR (desktop only effectively)
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

    // Close modal after showing success briefly (with fade)
    const modalBackdrop = document.getElementById("modal");
    const modalEl = modalBackdrop ? modalBackdrop.querySelector(".modal") : null;

    const SUCCESS_VISIBLE_MS = 1600;
    const FADE_MS = 260;

    setTimeout(() => {
      if (modalEl) modalEl.classList.add("isClosing");
      if (modalBackdrop) modalBackdrop.classList.add("isClosing");

      setTimeout(() => {
        closeModal();

        if (modalEl) modalEl.classList.remove("isClosing");
        if (modalBackdrop) modalBackdrop.classList.remove("isClosing");
      }, FADE_MS);

    }, SUCCESS_VISIBLE_MS);
  });
}

/* =========================
   MOBILE DOTS (carousel indicator)
   ========================= */
const carousel = document.getElementById("mCarousel");
const dotsWrap = document.getElementById("mDots");
const dots = dotsWrap ? Array.from(dotsWrap.querySelectorAll(".mDot")) : [];

function setActiveDot(i){
  dots.forEach((d, idx) => d.classList.toggle("isActive", idx === i));
}

if (carousel && dots.length){
  const slides = Array.from(carousel.querySelectorAll(".mSlide"));

  // Update active dot on swipe/scroll
  let raf = 0;
  carousel.addEventListener("scroll", () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const w = carousel.clientWidth || 1;
      const idx = Math.round(carousel.scrollLeft / w);
      setActiveDot(Math.max(0, Math.min(dots.length - 1, idx)));
    });
  }, { passive: true });

  // Tap dots to jump
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      slides[idx]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
      setActiveDot(idx);
    });
  });
}