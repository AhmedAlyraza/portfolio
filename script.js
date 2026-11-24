/* =========================================
   AHMED ALI PORTFOLIO — Advanced Animations
========================================= */

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- 1. Mobile menu toggle ---------- */
const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");

if (menuButton && nav) {
  const closeMenu = () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = "☰";
    document.body.style.overflow = "";
  };

  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.innerHTML = isOpen ? "✕" : "☰";
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  nav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", closeMenu)
  );

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("open")) closeMenu();
  });
}

/* ---------- 2. Dynamic year ---------- */
const yearEl = document.querySelector("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ---------- 3. Active nav link on scroll ---------- */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

if (sections.length && navLinks.length) {
  const updateActiveLink = () => {
    let current = "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 120) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${current}`
      );
    });
  };
  window.addEventListener("scroll", updateActiveLink, { passive: true });
  updateActiveLink();
}

/* ---------- 4. Scroll reveal (with stagger) ---------- */
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-grid > *, .skill-card, .timeline-item, " +
      ".work-featured-card, .work-mini-card, .education-card, " +
      ".fact, .contact-panel, .hero-copy > *, .hero-visual, .explorer-card"
  );

  revealTargets.forEach((el, i) => {
    el.classList.add("reveal");
    el.style.transitionDelay = `${Math.min(i * 0.05, 0.4)}s`;
    revealObserver.observe(el);
  });
}

/* ---------- 5. Scroll progress bar ---------- */
const progressBar = document.createElement("div");
progressBar.className = "scroll-progress";
document.body.appendChild(progressBar);

const updateProgress = () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progressBar.style.width = `${scrolled}%`;
};
window.addEventListener("scroll", updateProgress, { passive: true });
updateProgress();

/* ---------- 6. Typing effect for hero role ---------- */
const roleEl = document.querySelector(".profile-role");
if (roleEl && !prefersReducedMotion) {
  const roles = [
    "Web Developer",
    "WordPress Expert",
    "Shopify Builder",
    "MERN Enthusiast",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const typeLoop = () => {
    const current = roles[roleIndex];
    if (isDeleting) {
      roleEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      roleEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? 40 : 90;

    if (!isDeleting && charIndex === current.length) {
      speed = 1600;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      speed = 300;
    }
    setTimeout(typeLoop, speed);
  };

  setTimeout(typeLoop, 800);
}

/* ---------- 7. Counter animation ---------- */
const counters = document.querySelectorAll(".fact-number");
if (counters.length && !prefersReducedMotion) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const hasPlus = el.querySelector("span") !== null;
        const target = parseInt(el.textContent, 10);
        if (isNaN(target)) return;

        let current = 0;
        const duration = 1200;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          current = Math.floor(eased * target);
          el.innerHTML = hasPlus ? `${current}<span>+</span>` : current;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObserver.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((c) => counterObserver.observe(c));
}

/* ---------- 8. 3D tilt on profile card ---------- */
const profileCard = document.querySelector(".profile-card");
if (
  profileCard &&
  !prefersReducedMotion &&
  window.matchMedia("(hover: hover)").matches
) {
  profileCard.addEventListener("mousemove", (e) => {
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 8;
    const rotateX = -((y - cy) / cy) * 8;
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotate(2deg)`;
  });

  profileCard.addEventListener("mouseleave", () => {
    profileCard.style.transform = "rotate(2deg)";
  });
}

/* ---------- 9. Magnetic buttons ---------- */
const magnetButtons = document.querySelectorAll(
  ".button-primary, .header-cta"
);
if (
  magnetButtons.length &&
  !prefersReducedMotion &&
  window.matchMedia("(hover: hover)").matches
) {
  magnetButtons.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) translateY(-3px)`;
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "";
    });
  });
}

/* ---------- 10. Project card 3D tilt ---------- */
const tiltCards = document.querySelectorAll(".work-featured-card");
if (
  tiltCards.length &&
  !prefersReducedMotion &&
  window.matchMedia("(hover: hover)").matches
) {
  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotateY = ((x - cx) / cx) * 5;
      const rotateX = -((y - cy) / cy) * 5;
      card.style.transform = `translateY(-6px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty("--mx", `${x}px`);
      card.style.setProperty("--my", `${y}px`);
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

/* ---------- 11. Cursor glow follower ---------- */
if (
  !prefersReducedMotion &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {
  const cursorGlow = document.createElement("div");
  cursorGlow.className = "cursor-glow";
  document.body.appendChild(cursorGlow);

  let mx = 0;
  let my = 0;
  let gx = 0;
  let gy = 0;

  window.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  const animateGlow = () => {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    cursorGlow.style.transform = `translate(${gx - 200}px, ${gy - 200}px)`;
    requestAnimationFrame(animateGlow);
  };
  animateGlow();
}

/* ---------- 12. Parallax on hero glows + orbits ---------- */
const parallaxEls = document.querySelectorAll(
  ".glow-one, .glow-two, .orbit-a, .orbit-b"
);
if (parallaxEls.length && !prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y < window.innerHeight * 1.5) {
        parallaxEls.forEach((el, i) => {
          const speed = i % 2 === 0 ? 0.15 : -0.1;
          el.style.transform = `translateY(${y * speed}px)`;
        });
      }
    },
    { passive: true }
  );
}

/* ---------- 13. Skill card mouse-follow glow ---------- */
const skillCards = document.querySelectorAll(".skill-card");
if (skillCards.length && window.matchMedia("(hover: hover)").matches) {
  skillCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      card.style.setProperty("--my", `${e.clientY - rect.top}px`);
    });
  });
}

/* ---------- 14. Back-to-top progress ring ---------- */
const backTop = document.querySelector(".back-top");
if (backTop) {
  const ring = document.createElement("span");
  ring.className = "back-top-ring";
  backTop.appendChild(ring);

  window.addEventListener(
    "scroll",
    () => {
      const h = document.documentElement;
      const percent = h.scrollTop / (h.scrollHeight - h.clientHeight);
      ring.style.transform = `scaleX(${percent})`;
    },
    { passive: true }
  );
}

/* ---------- 15. Image reveal mask on scroll ---------- */
const projectImages = document.querySelectorAll(".work-featured-image");
if (
  projectImages.length &&
  "IntersectionObserver" in window &&
  !prefersReducedMotion
) {
  const imgObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("image-visible");
          imgObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  projectImages.forEach((img) => imgObserver.observe(img));
}

/* =========================================
   16. FILTERABLE PROJECT EXPLORER
========================================= */

const PROJECTS = [
  // ---------- WordPress ----------
  {
    name: "Algorithm Zero",
    category: "wordpress",
    desc: "Digital solutions company website — web development, AI automation, app development, design and SEO services.",
    stack: ["WordPress", "SEO", "Services"],
    live: "https://algorithmzero.com/",
    type: "live",
    emoji: "⚡",
  },
  {
    name: "Technolube",
    category: "wordpress",
    desc: "Industrial business website showcasing automatic lubrication systems, product ranges and applications.",
    stack: ["WordPress", "Industrial", "Catalog"],
    live: "https://technolube.ca/",
    type: "live",
    emoji: "⚙️",
  },
  {
    name: "Bon Appetit",
    category: "wordpress",
    desc: "Catering business website with custom theme tweaks and SEO improvements.",
    stack: ["WordPress", "Elementor", "SEO"],
    live: "https://bonappetit.co.uk/",
    type: "live",
    emoji: "🍽️",
  },
  {
    name: "Easy Home Buyers 123",
    category: "wordpress",
    desc: "Real estate website with lead-gen forms and custom WordPress templates.",
    stack: ["WordPress", "SEO", "Forms"],
    live: "https://easyhomebuyers123.com/",
    type: "live",
    emoji: "🏡",
  },
  {
    name: "Abbas Apparel",
    category: "wordpress",
    desc: "Industrial business website showcasing product catalog and company profile.",
    stack: ["WordPress", "Catalog"],
    live: "https://www.abbasapparel.com/",
    type: "live",
    emoji: "🏭",
  },
  {
    name: "Prime Three",
    category: "wordpress",
    desc: "Technology company website with modern layout and service presentation.",
    stack: ["WordPress", "Business"],
    live: "https://www.primethree.com/",
    type: "live",
    emoji: "🚀",
  },

  // ---------- Shopify ----------
  {
    name: "Shopify Storefront Work",
    category: "shopify",
    desc: "Storefront customization, product setup and content updates for Shopify clients (NDA-protected samples available on request).",
    stack: ["Shopify", "Liquid", "E-commerce"],
    live: "mailto:ahmedalyraza@gmail.com?subject=Shopify%20work%20samples",
    type: "inquiry",
    emoji: "🛍️",
  },

  // ---------- Zendesk ----------
  {
    name: "Fynlo Help Center",
    category: "zendesk",
    desc: "Zendesk knowledge base with organized guides covering bookkeeping, income, expenses and client management.",
    stack: ["Zendesk", "Help Center", "KB"],
    live: "https://assist.fynloapps.com/hc/en-us",
    type: "live",
    emoji: "📚",
  },
  {
    name: "TradeReply Help Center",
    category: "zendesk",
    desc: "Zendesk knowledge base for a B2B trade platform — categories, article structure and theming.",
    stack: ["Zendesk", "B2B"],
    live: "https://tradereply.zendesk.com/hc/en-us",
    type: "live",
    emoji: "🔁",
  },
  {
    name: "Mymanu Support",
    category: "zendesk",
    desc: "Zendesk help center for consumer audio products with troubleshooting categories.",
    stack: ["Zendesk", "Support"],
    live: "https://support.mymanu.com/hc/en-gb",
    type: "live",
    emoji: "🎧",
  },
  {
    name: "Kudo Help Centre",
    category: "zendesk",
    desc: "Zendesk knowledge base with product guides and account help articles.",
    stack: ["Zendesk", "KB"],
    live: "https://support.kudo.com/hc/en-us",
    type: "live",
    emoji: "💬",
  },

  // ---------- Freshdesk ----------
  {
    name: "Energy Healing Flow Support",
    category: "freshdesk",
    desc: "Freshdesk support portal setup with categories, request forms and workflow improvements.",
    stack: ["Freshdesk", "Support Portal"],
    live: "https://hilfe.energy-healing-flow.de/support/home",
    type: "live",
    emoji: "🌿",
  },

  // ---------- MERN (replace with your real repos) ----------
  {
    name: "MERN Practice — REST API",
    category: "mern",
    desc: "Express + MongoDB CRUD API built while learning MERN. Replace this card with your actual repo + live URL.",
    stack: ["MongoDB", "Express", "Node.js"],
    github: "https://github.com/AhmedAlyraza",
    type: "code",
    emoji: "🧩",
  },
  {
    name: "MERN Practice — React App",
    category: "mern",
    desc: "React front-end consuming a Node/Express API. Replace with your real project details.",
    stack: ["React", "Node.js", "MERN"],
    github: "https://github.com/AhmedAlyraza",
    type: "code",
    emoji: "⚛️",
  },

  // ---------- Laravel ----------
  {
    name: "Laravel Practice Project",
    category: "laravel",
    desc: "Laravel practice with routing, controllers, migrations and Blade templates. Replace with real repo URL.",
    stack: ["Laravel", "PHP", "MySQL"],
    github: "https://github.com/AhmedAlyraza",
    type: "code",
    emoji: "🐘",
  },

  // ---------- Next.js (Vercel) ----------
  {
    name: "Next.js Practice — Vercel Deploy",
    category: "nextjs",
    desc: "Next.js App Router project deployed on Vercel. Replace with your live Vercel URL.",
    stack: ["Next.js", "Vercel", "React"],
    live: "https://vercel.com/dashboard",
    type: "live",
    emoji: "▲",
  },
];

const explorerGrid = document.getElementById("explorerGrid");
const filterBar = document.getElementById("filterBar");
const filterEmpty = document.getElementById("filterEmpty");

function renderProjects(filter = "all") {
  if (!explorerGrid) return;

  const filtered =
    filter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === filter);

  if (!filtered.length) {
    explorerGrid.innerHTML = "";
    if (filterEmpty) filterEmpty.hidden = false;
    return;
  }
  if (filterEmpty) filterEmpty.hidden = true;

  explorerGrid.innerHTML = filtered
    .map((p, i) => {
      const linkLabel =
        p.type === "inquiry"
          ? "Request samples"
          : p.type === "code"
          ? "View live"
          : "Visit";

      const liveLink = p.live
        ? `<a class="explorer-link" href="${p.live}" target="_blank" rel="noopener noreferrer">${linkLabel} <span>↗</span></a>`
        : "";

      const githubLink = p.github
        ? `<a class="explorer-link explorer-link-gh" href="${p.github}" target="_blank" rel="noopener noreferrer">GitHub <span>↗</span></a>`
        : "";

      return `
        <article class="explorer-card" style="animation-delay:${i * 0.05}s">
          <div class="explorer-card-top">
            <span class="explorer-emoji">${p.emoji}</span>
            <span class="explorer-cat">${p.category.toUpperCase()}</span>
          </div>
          <h3>${p.name}</h3>
          <p>${p.desc}</p>
          <div class="explorer-tags">${p.stack
            .map((s) => `<span>${s}</span>`)
            .join("")}</div>
          <div class="explorer-actions">${liveLink}${githubLink}</div>
        </article>
      `;
    })
    .join("");
}

if (filterBar && explorerGrid) {
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-chip");
    if (!btn) return;

    filterBar
      .querySelectorAll(".filter-chip")
      .forEach((c) => c.classList.remove("active"));
    btn.classList.add("active");

    renderProjects(btn.dataset.filter);
  });

  renderProjects("all");
}

/* =========================================
   17. SKILL CARD → FILTER JUMP
========================================= */
document.querySelectorAll(".skill-card").forEach((card) => {
  const filterKey = card.dataset.filter;
  if (!filterKey) return;

  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");

  const jump = () => {
    const explorer = document.getElementById("skill-projects");
    if (explorer) {
      explorer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    const chip = document.querySelector(
      `.filter-chip[data-filter="${filterKey}"]`
    );
    if (chip) chip.click();
  };

  card.addEventListener("click", jump);
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      jump();
    }
  });
});