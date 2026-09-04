(() => {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* Page load curtain                                                   */
  /* ------------------------------------------------------------------ */
  const curtain = document.querySelector(".page-curtain");
  window.addEventListener("load", () => {
    setTimeout(() => curtain && curtain.classList.add("is-gone"), 350);
  });

  /* ------------------------------------------------------------------ */
  /* Theme toggle — light by default, persisted to localStorage         */
  /* ------------------------------------------------------------------ */
  const root = document.documentElement;
  const themeSwitch = document.getElementById("theme-switch");
  const STORAGE_KEY = "portfolio-theme";

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeSwitch) themeSwitch.setAttribute("aria-checked", theme === "dark");
  }

  const savedTheme = localStorage.getItem(STORAGE_KEY);
  applyTheme(savedTheme === "dark" ? "dark" : "light");

  if (themeSwitch) {
    themeSwitch.addEventListener("click", () => {
      const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Global full-page particle field (behind every section)             */
  /* ------------------------------------------------------------------ */
  const gCanvas = document.getElementById("global-particles");
  if (gCanvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const gctx = gCanvas.getContext("2d");
    let gw, gh, gnodes;

    function gResize() {
      gw = gCanvas.width = window.innerWidth * devicePixelRatio;
      gh = gCanvas.height = document.documentElement.scrollHeight * devicePixelRatio;
      gCanvas.style.height = document.documentElement.scrollHeight + "px";
    }
    function gMakeNodes() {
      const count = Math.max(40, Math.floor((gw * gh) / (60000 * devicePixelRatio * devicePixelRatio)));
      gnodes = Array.from({ length: Math.min(140, count) }, () => ({
        x: Math.random() * gw,
        y: Math.random() * gh,
        vy: (Math.random() * 0.18 + 0.05) * devicePixelRatio,
        r: Math.random() * 1.3 + 0.6,
        drift: Math.random() * Math.PI * 2,
      }));
    }
    function gStyleColor(varName, fallback) {
      const v = getComputedStyle(root).getPropertyValue(varName).trim();
      return v || fallback;
    }
    function gFrame(t) {
      gctx.clearRect(0, 0, gw, gh);
      const c1 = gStyleColor("--accent", "#2D5DF0");
      const c2 = gStyleColor("--accent-2", "#0EA672");
      gnodes.forEach((n, i) => {
        n.y -= n.vy;
        if (n.y < -10) n.y = gh + 10;
        const x = n.x + Math.sin(t / 2000 + n.drift) * 12;
        gctx.globalAlpha = 0.45;
        gctx.fillStyle = i % 5 === 0 ? c2 : c1;
        gctx.beginPath();
        gctx.arc(x, n.y, n.r * devicePixelRatio, 0, Math.PI * 2);
        gctx.fill();
      });
      gctx.globalAlpha = 1;
      requestAnimationFrame(gFrame);
    }
    gResize();
    gMakeNodes();
    requestAnimationFrame(gFrame);
    window.addEventListener("resize", () => { gResize(); gMakeNodes(); });
    window.addEventListener("load", () => gResize());
    setTimeout(gResize, 1200); // catch late layout shifts (fonts/images loading)
  }

  /* ------------------------------------------------------------------ */
  /* Nav: scrolled state, active link, mobile menu                      */
  /* ------------------------------------------------------------------ */
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav-links a");
  const navToggle = document.querySelector(".nav-toggle");
  const navLinksEl = document.querySelector(".nav-links");
  const backToTop = document.querySelector(".back-to-top");
  const scrollProgress = document.querySelector(".scroll-progress");
  const parallaxEls = document.querySelectorAll("[data-parallax]");

  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 12;
    nav && nav.classList.toggle("is-scrolled", scrolled);
    backToTop && backToTop.classList.toggle("is-visible", window.scrollY > 600);

    if (scrollProgress) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      scrollProgress.style.width = `${Math.min(100, Math.max(0, pct))}%`;
    }

    parallaxEls.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const speed = parseFloat(el.dataset.parallax || "0.08");
      const offset = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });

  /* ------------------------------------------------------------------ */
  /* Whole-page cursor-follow glow                                      */
  /* ------------------------------------------------------------------ */
  const cursorGlow = document.querySelector(".cursor-glow");
  if (cursorGlow && window.matchMedia("(pointer: fine)").matches) {
    window.addEventListener("mousemove", (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      cursorGlow.classList.add("is-active");
    }, { passive: true });
    document.addEventListener("mouseleave", () => cursorGlow.classList.remove("is-active"));
  }

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navLinksEl.classList.toggle("mobile-open");
    });
    navLinks.forEach((l) => l.addEventListener("click", () => navLinksEl.classList.remove("mobile-open")));
  }

  const sections = document.querySelectorAll("main section[id]");
  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === `#${entry.target.id}`));
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );
  sections.forEach((s) => navObserver.observe(s));

  backToTop && backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ------------------------------------------------------------------ */
  /* Word-by-word split for .word-reveal elements (run before observing) */
  /* ------------------------------------------------------------------ */
  document.querySelectorAll(".word-reveal").forEach((el) => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map((w, i) => `<span class="word" style="--i:${i}">${w}${i < words.length - 1 ? "&nbsp;" : ""}</span>`)
      .join("");
  });

  /* ------------------------------------------------------------------ */
  /* Scroll reveal                                                      */
  /* ------------------------------------------------------------------ */
  const revealEls = document.querySelectorAll(
    ".reveal, .reveal-stagger, .reveal-left, .reveal-right, .reveal-pop, .section-head, .word-reveal, .stats-grid"
  );
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.classList.contains("stats-grid")) animateStats(entry.target);
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  /* ------------------------------------------------------------------ */
  /* Stats count-up                                                      */
  /* ------------------------------------------------------------------ */
  function animateStats(grid) {
    grid.querySelectorAll(".stat-number").forEach((el) => {
      const target = parseInt(el.dataset.target || "0", 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1400;
      const start = performance.now();
      function tick(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  }

  /* ------------------------------------------------------------------ */
  /* Hero role typing effect                                            */
  /* ------------------------------------------------------------------ */
  const roleEl = document.getElementById("hero-role-text");
  const rolesDataEl = document.getElementById("hero-roles-json");
  if (roleEl) {
    let roles = [];
    try {
      roles = JSON.parse((rolesDataEl && rolesDataEl.textContent) || "[]");
    } catch (e) { roles = []; }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (roles.length && !prefersReducedMotion) {
      let roleIndex = 0, charIndex = 0, deleting = false;

      const tick = () => {
        const current = roles[roleIndex];
        if (!deleting) {
          charIndex++;
          roleEl.textContent = current.slice(0, charIndex);
          if (charIndex === current.length) {
            deleting = true;
            setTimeout(tick, 1400);
            return;
          }
        } else {
          charIndex--;
          roleEl.textContent = current.slice(0, charIndex);
          if (charIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
          }
        }
        setTimeout(tick, deleting ? 35 : 65);
      };
      tick();
    } else if (roles.length) {
      roleEl.textContent = roles[0];
    }
  }

  /* ------------------------------------------------------------------ */
  /* Hero background — subtle animated neural-network canvas            */
  /* (the single orchestrated, non-user-triggered motion moment)        */
  /* ------------------------------------------------------------------ */
  const canvas = document.getElementById("hero-net");
  if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const ctx = canvas.getContext("2d");
    let w, h, nodes;
    const NODE_COUNT_BASE = 90;

    function styleColor(varName, fallback) {
      const v = getComputedStyle(root).getPropertyValue(varName).trim();
      return v || fallback;
    }

    function resize() {
      w = canvas.width = canvas.offsetWidth * devicePixelRatio;
      h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    }

    function makeNodes() {
      const count = Math.min(NODE_COUNT_BASE, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 9000));
      nodes = Array.from({ length: Math.max(30, count) }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.55 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.55 * devicePixelRatio,
        r: Math.random() * 1.4 + 1.1,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function frame(t) {
      ctx.clearRect(0, 0, w, h);
      const dotColor = styleColor("--accent", "#2D5DF0");
      const dotColor2 = styleColor("--accent-2", "#0EA672");
      const lineColor = styleColor("--accent", "#2D5DF0");

      nodes.forEach((n) => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 165 * devicePixelRatio;
          if (dist < maxDist) {
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = (1 - dist / maxDist) * 0.35;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n, i) => {
        const pulse = 0.7 + Math.sin(t / 600 + n.pulse) * 0.3;
        ctx.globalAlpha = pulse;
        ctx.fillStyle = i % 4 === 0 ? dotColor2 : dotColor;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * devicePixelRatio * pulse, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(frame);
    }

    resize();
    makeNodes();
    requestAnimationFrame(frame);
    window.addEventListener("resize", () => { resize(); makeNodes(); });
  }

  /* ------------------------------------------------------------------ */
  /* Hero portrait — subtle 3D tilt that follows the pointer             */
  /* ------------------------------------------------------------------ */
  const portrait = document.querySelector(".hero-portrait");
  const portraitWrap = document.querySelector(".hero-portrait-wrap");
  if (portrait && portraitWrap && window.matchMedia("(pointer: fine)").matches) {
    portraitWrap.addEventListener("mousemove", (e) => {
      const rect = portrait.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      portrait.style.transform = `rotateY(${px * 14}deg) rotateX(${-py * 14}deg) scale(1.02)`;
    });
    portraitWrap.addEventListener("mouseleave", () => {
      portrait.style.transform = "rotateY(0) rotateX(0) scale(1)";
    });
  }

  /* ------------------------------------------------------------------ */
  /* Project card tilt-on-hover                                         */
  /* ------------------------------------------------------------------ */
  if (window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `translateY(-6px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg)`;
      });
      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  /* ------------------------------------------------------------------ */
  /* Contact form — AJAX submit to /contact/submit/                     */
  /* ------------------------------------------------------------------ */
  const form = document.getElementById("contact-form");
  if (form) {
    const statusEl = document.getElementById("form-status");
    const submitBtn = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      statusEl.textContent = "";
      statusEl.className = "form-status";
      submitBtn.classList.add("is-loading");
      submitBtn.disabled = true;

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "X-Requested-With": "XMLHttpRequest" },
        });
        const data = await res.json();

        if (data.ok) {
          statusEl.textContent = data.message;
          statusEl.classList.add("ok");
          form.reset();
        } else {
          const firstError =
            (data.errors && (data.errors.__all__?.[0] || Object.values(data.errors)[0]?.[0])) ||
            "Please check the form and try again.";
          statusEl.textContent = firstError;
          statusEl.classList.add("err");
        }
      } catch (err) {
        statusEl.textContent = "Network error — please try emailing directly instead.";
        statusEl.classList.add("err");
      } finally {
        submitBtn.classList.remove("is-loading");
        submitBtn.disabled = false;
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* "Send from your own email app" fallback — builds a mailto: link    */
  /* from whatever the visitor has already typed into the form.         */
  /* ------------------------------------------------------------------ */
  const mailtoLink = document.getElementById("mailto-fallback");
  const mailtoDataEl = document.getElementById("mailto-template");
  if (mailtoLink && mailtoDataEl && form) {
    let targetEmail = "";
    try {
      targetEmail = JSON.parse(mailtoDataEl.textContent).email || "";
    } catch (e) {}

    mailtoLink.addEventListener("click", (e) => {
      e.preventDefault();
      const name = form.elements["name"]?.value || "";
      const senderEmail = form.elements["email"]?.value || "";
      const subject = form.elements["subject"]?.value || `Message from ${name || "your portfolio site"}`;
      const message = form.elements["message"]?.value || "";

      const bodyLines = [
        message,
        "",
        "---",
        name ? `From: ${name}` : "",
        senderEmail ? `Reply to: ${senderEmail}` : "",
      ].filter(Boolean);

      const mailto =
        `mailto:${targetEmail}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.location.href = mailto;
    });
  }

  /* Current year in footer */
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
