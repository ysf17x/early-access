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

  // Reset title
  const titleEl = document.getElementById("modalTitle");
  if (titleEl) titleEl.textContent = "Request early access";

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

    setTimeout(() => {
      formWrap.style.display = "none";

      // Keep modal top visible so user can close (✕) after success
      modalTop.style.display = "flex";
      modalTop.style.opacity = "1";
      const titleEl = document.getElementById("modalTitle");
      if (titleEl) titleEl.textContent = "You’re in.";

      successState.style.display = "block";
      successState.setAttribute("aria-hidden","false");
    }, 350);

    // Keep the success state open until the user closes it (tap outside or ✕)
  });
}

/* =========================
   MOBILE CAROUSEL DOTS
   ========================= */
(function(){
  const carousel = document.getElementById("mCarousel");
  const dotsWrap = document.getElementById("mDots");
  if (!carousel || !dotsWrap) return;

  const dots = Array.from(dotsWrap.querySelectorAll(".mDot"));
  const setActive = (idx) => {
    dots.forEach((d,i) => d.classList.toggle("isActive", i === idx));
  };

  // click dots -> scroll
  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      const w = carousel.clientWidth;
      carousel.scrollTo({ left: idx * w, behavior: "smooth" });
      setActive(idx);
    });
  });

  // swipe -> update dots
  let raf = null;
  carousel.addEventListener("scroll", () => {
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const w = carousel.clientWidth || 1;
      const idx = Math.round(carousel.scrollLeft / w);
      setActive(Math.max(0, Math.min(dots.length - 1, idx)));
    });
  }, { passive: true });
})();