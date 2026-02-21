document.getElementById("year").textContent = new Date().getFullYear();

/* =========================
   MODAL
   ========================= */
const modal = document.getElementById("modal");
const openBtn = document.getElementById("joinBtnTop");
const closeBtn = document.getElementById("closeModal");

function openModal(){
  if (!modal) return;

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

    formWrap.style.opacity = "0";
    formWrap.style.transform = "translateY(-6px)";

    setTimeout(() => {
      formWrap.style.display = "none";

      modalTop.style.display = "flex";
      modalTop.style.opacity = "1";

      const titleEl = document.getElementById("modalTitle");
      if (titleEl) titleEl.textContent = "You’re in.";

      successState.style.display = "block";
      successState.setAttribute("aria-hidden","false");
    }, 350);
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

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      const w = carousel.clientWidth || 1;
      carousel.scrollTo({ left: idx * w, behavior: "smooth" });
      setActive(idx);
    });
  });

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

/* =========================
   MOBILE SLIDE 3 — TAP-TO-PREVIEW MODAL
   (Only exists on mobile; desktop is untouched)
   ========================= */
(function(){
  const sheet = document.getElementById("mPostModal");
  if (!sheet) return;

  const closeBtn = document.getElementById("mPostClose");
  const imgEl = document.getElementById("mPostImg");
  const titleEl = document.getElementById("mPostTitle");
  const badgeEl = document.getElementById("mPostBadge");
  const userEl = document.getElementById("mPostUser");
  const timeEl = document.getElementById("mPostTime");
  const tagsWrap = document.getElementById("mPostTags");

  const openSheet = () => {
    sheet.classList.add("show");
    sheet.setAttribute("aria-hidden", "false");
  };

  const closeSheet = () => {
    sheet.classList.remove("show");
    sheet.setAttribute("aria-hidden", "true");
  };

  const setTags = (tagsCsv) => {
    if (!tagsWrap) return;
    tagsWrap.innerHTML = "";
    const tags = String(tagsCsv || "").split(",").map(t => t.trim()).filter(Boolean);
    tags.forEach(t => {
      const s = document.createElement("span");
      s.textContent = t;
      tagsWrap.appendChild(s);
    });
  };

  const populateFromBtn = (btn) => {
    if (!btn) return;
    const img = btn.getAttribute("data-img") || "";
    const title = btn.getAttribute("data-title") || "Post";
    const user = btn.getAttribute("data-user") || "@user";
    const time = btn.getAttribute("data-time") || "";
    const badge = btn.getAttribute("data-badge") || "Saved";
    const tags = btn.getAttribute("data-tags") || "";

    if (imgEl) imgEl.src = img;
    if (titleEl) titleEl.textContent = title;
    if (userEl) userEl.textContent = user;
    if (timeEl) timeEl.textContent = time;
    if (badgeEl) badgeEl.textContent = badge;
    setTags(tags);

    openSheet();
    if (closeBtn) closeBtn.focus();
  };

  document.querySelectorAll(".tapCard").forEach((btn) => {
    btn.addEventListener("click", () => populateFromBtn(btn));
  });

  if (closeBtn) closeBtn.addEventListener("click", closeSheet);

  sheet.addEventListener("click", (e) => {
    const t = e.target;
    if (t && t.getAttribute && t.getAttribute("data-mclose") === "1") closeSheet();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sheet.classList.contains("show")) closeSheet();
  });
})();
