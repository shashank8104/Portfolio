/* ================================================================
   PORTFOLIO — main.js
   Handles: navbar scroll, mobile menu, typed text, particle canvas,
            section reveal, project filters, contact form, footer year,
            scroll-to-top, active nav link.
   ================================================================ */

'use strict';

// ─── 1. DOM READY ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initTypedText();
  initParticles();
  initScrollReveal();
  initProjectFilters();
  initContactForm();
  initScrollTopBtn();
  initFooterYear();
  initActiveNavOnScroll();
});


// ═══════════════════════════════════════════════════════════════════
// 2. NAVBAR — adds .scrolled class when user scrolls down
// ═══════════════════════════════════════════════════════════════════
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}


// ═══════════════════════════════════════════════════════════════════
// 3. MOBILE MENU — hamburger toggle
// ═══════════════════════════════════════════════════════════════════
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', toggle);

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // Close menu on outside click (overlay)
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}


// ═══════════════════════════════════════════════════════════════════
// 4. TYPED TEXT — cycling role titles in the hero section
//    EDIT: Add or remove strings in the `words` array below
// ═══════════════════════════════════════════════════════════════════
function initTypedText() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  /* ─── EDIT: Replace with your actual titles ─── */
  const words = [
    '[AI Systems]',
    '[Machine Learning Models]',
    '[Intelligent Applications]',
    '[NLP Solutions]',
    '[LLM-Powered Tools]',
    /* Add more roles here */
  ];

  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  let pause    = false;

  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER  = 1800;
  const PAUSE_BEFORE = 400;

  function tick() {
    const word = words[wordIdx];

    if (pause) {
      pause = false;
      setTimeout(tick, PAUSE_AFTER);
      return;
    }

    if (!deleting) {
      charIdx++;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) {
        deleting = true;
        pause    = true;
        setTimeout(tick, TYPE_SPEED);
        return;
      }
      setTimeout(tick, TYPE_SPEED);
    } else {
      charIdx--;
      el.textContent = word.slice(0, charIdx);
      if (charIdx === 0) {
        deleting = false;
        wordIdx  = (wordIdx + 1) % words.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
      setTimeout(tick, DELETE_SPEED);
    }
  }

  tick();
}


// ═══════════════════════════════════════════════════════════════════
// 5. PARTICLE CANVAS — lightweight, AI-vibe dot network
// ═══════════════════════════════════════════════════════════════════
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  // Particle configuration — tweak to taste
  const CONFIG = {
    count:          90,
    maxSpeed:       0.35,
    minRadius:      1,
    maxRadius:      2.5,
    connectDistance: 130,
    lineOpacity:    0.12,
    dotOpacity:     0.35,
    color:          '95, 142, 255', // r,g,b — matches --clr-primary
    mouseRadius:    160,
  };

  let W, H, particles, mouse = { x: -9999, y: -9999 };

  const resize = () => {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  // Create particles
  const createParticles = () => {
    particles = Array.from({ length: CONFIG.count }, () => ({
      x:   Math.random() * W,
      y:   Math.random() * H,
      vx:  (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      vy:  (Math.random() - 0.5) * CONFIG.maxSpeed * 2,
      r:   CONFIG.minRadius + Math.random() * (CONFIG.maxRadius - CONFIG.minRadius),
    }));
  };
  createParticles();

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      // Update position
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges
      if (p.x < 0 || p.x > W) p.vx *= -1;
      if (p.y < 0 || p.y > H) p.vy *= -1;

      // Mouse repulsion
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONFIG.mouseRadius) {
        const force = (CONFIG.mouseRadius - dist) / CONFIG.mouseRadius;
        p.x += (dx / dist) * force * 1.5;
        p.y += (dy / dist) * force * 1.5;
      }

      // Draw dot
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${CONFIG.color}, ${CONFIG.dotOpacity})`;
      ctx.fill();
    });

    // Draw connecting lines
    particles.forEach((a, i) => {
      for (let j = i + 1; j < particles.length; j++) {
        const b = particles[j];
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONFIG.connectDistance) {
          const alpha = CONFIG.lineOpacity * (1 - dist / CONFIG.connectDistance);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${CONFIG.color}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  };

  draw();
}


// ═══════════════════════════════════════════════════════════════════
// 6. SCROLL REVEAL — fade in sections and cards as they enter viewport
// ═══════════════════════════════════════════════════════════════════
function initScrollReveal() {
  const selectors = ['.reveal', '.reveal-card', '.fade-in-up', '.fade-in-left', '.fade-in-right'];
  const elements  = document.querySelectorAll(selectors.join(', '));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -60px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}


// ═══════════════════════════════════════════════════════════════════
// 7. PROJECT FILTERS — filter cards by category
// ═══════════════════════════════════════════════════════════════════
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards      = document.querySelectorAll('.project-card');
  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;

      cards.forEach((card, i) => {
        const category = card.dataset.category || '';
        const match = filter === 'all' || category === filter;

        if (match) {
          card.classList.remove('hidden');
          // Stagger re-reveal animation
          card.style.opacity   = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            card.style.opacity    = '1';
            card.style.transform  = 'translateY(0)';
          }, i * 60);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}


// ═══════════════════════════════════════════════════════════════════
// 8. CONTACT FORM — client-side validation + submit placeholder
//    EDIT: Replace the submitHandler with your actual backend/EmailJS call
// ═══════════════════════════════════════════════════════════════════
function initContactForm() {
  const form   = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm(form)) return;

    const submitBtn = document.getElementById('form-submit');
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bx bx-loader bx-spin"></i> Sending…';

    try {
      /* ─── EDIT: Replace with your form submission logic ───────────
      // Example using EmailJS:
      //   await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', form);
      //
      // Example using Formspree:
      //   await fetch('https://formspree.io/f/YOUR_ID', {
      //     method: 'POST',
      //     body: new FormData(form),
      //     headers: { 'Accept': 'application/json' }
      //   });
      // ─────────────────────────────────────────────────────────── */

      // Placeholder: simulate a successful submission
      await new Promise(r => setTimeout(r, 1500));

      status.textContent = '✓ Message sent! I\'ll get back to you soon.';
      status.className   = 'form-status success';
      form.reset();
    } catch (err) {
      status.textContent = '✕ Something went wrong. Please try again.';
      status.className   = 'form-status error';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bx bx-send"></i><span>Send Message</span>';
      setTimeout(() => { status.textContent = ''; status.className = 'form-status'; }, 6000);
    }
  });
}

function validateForm(form) {
  let valid = true;

  const fields = [
    { id: 'form-name',    errId: 'err-name',    msg: 'Name is required.',               check: v => v.trim().length > 0 },
    { id: 'form-email',   errId: 'err-email',   msg: 'A valid email is required.',      check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'form-message', errId: 'err-message', msg: 'Please enter a message.',         check: v => v.trim().length > 10 },
  ];

  fields.forEach(({ id, errId, msg, check }) => {
    const input = document.getElementById(id);
    const err   = document.getElementById(errId);
    if (!input || !err) return;

    if (!check(input.value)) {
      err.textContent = msg;
      input.classList.add('invalid');
      valid = false;
    } else {
      err.textContent = '';
      input.classList.remove('invalid');
    }
  });

  return valid;
}


// ═══════════════════════════════════════════════════════════════════
// 9. SCROLL-TO-TOP BUTTON
// ═══════════════════════════════════════════════════════════════════
function initScrollTopBtn() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


// ═══════════════════════════════════════════════════════════════════
// 10. FOOTER YEAR — auto-updates copyright year
// ═══════════════════════════════════════════════════════════════════
function initFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}


// ═══════════════════════════════════════════════════════════════════
// 11. ACTIVE NAV LINK — highlights current section in navbar
// ═══════════════════════════════════════════════════════════════════
function initActiveNavOnScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      });
    },
    { rootMargin: `-${getComputedStyle(document.documentElement).getPropertyValue('--nav-h').trim()} 0px -60% 0px`, threshold: 0 }
  );

  sections.forEach(section => observer.observe(section));
}
