/* ==============================================================
   planeopen — landing page interactions
   ============================================================== */

(() => {
  "use strict";

  // ------------------------------------------------- Night sky (stars in hero)
  const starsLayer = document.querySelector(".hero-stars");
  if (starsLayer) {
    const STAR_COUNT = 70;
    const frag = document.createDocumentFragment();
    for (let i = 0; i < STAR_COUNT; i++) {
      const s = document.createElement("span");
      // 8% chance amber, 8% chance green, rest white
      const r = Math.random();
      s.className = "star";
      if (r < 0.08) s.classList.add("star--amber");
      else if (r < 0.16) s.classList.add("star--green");

      const size = (0.6 + Math.random() * 1.6).toFixed(2);
      const max = (0.35 + Math.random() * 0.55).toFixed(2);
      s.style.top = `${(Math.random() * 95).toFixed(2)}%`;
      s.style.left = `${(Math.random() * 100).toFixed(2)}%`;
      s.style.width = `${size}px`;
      s.style.height = `${size}px`;
      s.style.setProperty("--max", max);
      s.style.animationDelay = `${(Math.random() * 4).toFixed(2)}s`;
      s.style.animationDuration = `${(2.5 + Math.random() * 4).toFixed(2)}s`;
      frag.appendChild(s);
    }
    starsLayer.appendChild(frag);
  }

  // ------------------------------------------------- UTC clock (desktop + mobile drawer)
  const clockEls = [
    document.getElementById("utc-clock"),
    document.getElementById("utc-clock-mobile"),
  ].filter(Boolean);
  function tickClock() {
    if (!clockEls.length) return;
    const d = new Date();
    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mm = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");
    const text = `${hh}:${mm}:${ss}`;
    clockEls.forEach((el) => (el.textContent = text));
  }
  tickClock();
  setInterval(tickClock, 1000);

  // ------------------------------------------------- Mobile menu (hamburger drawer)
  const burger = document.querySelector(".topbar-burger");
  const drawer = document.getElementById("mobile-menu");
  if (burger && drawer) {
    drawer.removeAttribute("hidden");

    function setMenu(open) {
      burger.setAttribute("aria-expanded", String(open));
      drawer.dataset.open = String(open);
      document.body.style.overflow = open ? "hidden" : "";
    }
    setMenu(false);

    burger.addEventListener("click", () => {
      setMenu(burger.getAttribute("aria-expanded") !== "true");
    });
    drawer.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => setMenu(false));
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        setMenu(false);
      }
    });
  }

  // ------------------------------------------------- Footer year
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ------------------------------------------------- Copy buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const payload = btn.dataset.copy || "";
      const label = btn.querySelector(".copy-btn-text");
      const original = label ? label.textContent : btn.textContent;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(payload);
        } else {
          // fallback for file:// (offline open)
          const ta = document.createElement("textarea");
          ta.value = payload;
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        if (label) label.textContent = "COPIADO ✓";
        else btn.textContent = "COPIADO ✓";
        btn.classList.add("is-copied");
        setTimeout(() => {
          if (label) label.textContent = original;
          else btn.textContent = original;
          btn.classList.remove("is-copied");
        }, 1800);
      } catch (e) {
        if (label) label.textContent = "ERRO";
        else btn.textContent = "ERRO";
        setTimeout(() => {
          if (label) label.textContent = original;
          else btn.textContent = original;
        }, 1800);
      }
    });
  });

  // ------------------------------------------------- Scroll-collapse topbar
  // At top of page: 3 floating pills.
  // After scrolling past SCROLL_TRIGGER: collapses into one 100dvw fixed bar.
  const topbar = document.querySelector(".topbar");
  if (topbar) {
    const SCROLL_TRIGGER = 60;
    let pending = false;
    function syncTopbar() {
      pending = false;
      topbar.classList.toggle("is-scrolled", window.scrollY > SCROLL_TRIGGER);
    }
    window.addEventListener(
      "scroll",
      () => {
        if (!pending) {
          pending = true;
          requestAnimationFrame(syncTopbar);
        }
      },
      { passive: true },
    );
    syncTopbar();
  }

  // ------------------------------------------------- Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener("click", (e) => {
      const href = a.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // ------------------------------------------------- Ticker: duplicate content for seamless loop
  const tickerTrack = document.querySelector(".ticker-track");
  if (tickerTrack) {
    tickerTrack.innerHTML = tickerTrack.innerHTML + tickerTrack.innerHTML;
  }

  // ------------------------------------------------- Subtle radar tag swap (rotates which blips show data tag)
  const blips = Array.from(document.querySelectorAll(".radar-blips .blip"));
  const tagPool = [
    "AAL2841 · 35K",
    "UAL856 · 38K",
    "DLH401 · 41K",
    "LAN801 · 31K",
    "QFA12 · 39K",
    "AFR65 · 37K",
    "AZU2701 · 33K",
    "RAM200N · 28K",
    "JBU465 · 36K",
    "CES512 · 40K",
  ];
  if (blips.length) {
    let cycle = 0;
    setInterval(() => {
      // pick 3 blips to wear a data tag this cycle
      blips.forEach((b) => {
        b.classList.remove("blip--tag");
        b.removeAttribute("data-tag");
      });
      const order = blips
        .map((b, i) => [i, Math.random()])
        .sort((a, b) => a[1] - b[1])
        .slice(0, 3)
        .map(([i]) => i);
      order.forEach((i, k) => {
        const tag = tagPool[(cycle + k) % tagPool.length];
        blips[i].dataset.tag = tag;
        blips[i].classList.add("blip--tag");
      });
      cycle += 1;
    }, 4000);
  }

  // ------------------------------------------------- Honor reduced motion
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) {
    document.querySelectorAll(".radar-sweep, .ticker-track, .blip-tri, .signal-dot, .dot--live, .dot--amber, .hero-headline-accent::after").forEach((n) => {
      n.style.animation = "none";
    });
  }
})();
