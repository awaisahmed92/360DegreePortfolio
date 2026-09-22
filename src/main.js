/**
 * main.js
 * 360techx Portfolio Site — Application Logic
 */
import './styles/main.css';
import './styles/company.css';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initNavbar();
  initMobileMenu();
  initModals();
  initContactForm();
  initSmoothScroll();
});

/* ==========================================================================
   1. THEME TOGGLE (LIGHT / DARK)
   ========================================================================== */
function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('360tx-theme') || 'light';
  applyTheme(saved, btn);

  btn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next, btn);
    localStorage.setItem('360tx-theme', next);
  });
}

function applyTheme(theme, btn) {
  document.documentElement.setAttribute('data-theme', theme);
  btn.textContent = theme === 'dark' ? '☀️' : '🌙';
  btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* ==========================================================================
   2. NAVBAR — SCROLL SHADOW & ACTIVE STATE
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.site-navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 16) {
      navbar.classList.add('nav-scrolled');
    } else {
      navbar.classList.remove('nav-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              'nav-link-active',
              link.getAttribute('href') === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach((s) => observer.observe(s));
}

/* ==========================================================================
   3. MOBILE NAVIGATION
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!btn || !navLinks) return;

  btn.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    btn.textContent = open ? '✕' : '☰';
    btn.setAttribute('aria-expanded', String(open));
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      btn.textContent = '☰';
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !btn.contains(e.target)) {
      navLinks.classList.remove('open');
      btn.textContent = '☰';
      btn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ==========================================================================
   4. MODAL SYSTEM
   ========================================================================== */
function initModals() {
  const modal = document.getElementById('consultation-modal');
  if (!modal) return;

  // Open via data-open-modal attribute
  document.querySelectorAll('[data-open-modal="consultation"]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(modal);
    });
  });

  // Close button
  const closeBtn = document.getElementById('modal-close-btn');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => closeModal(modal));
  }

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });
}

function openModal(modal) {
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

/* ==========================================================================
   5. CONTACT FORM SUBMISSION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successEl = document.getElementById('form-success');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting…';
    }

    // Simulate async submission (replace with real fetch/API call)
    setTimeout(() => {
      form.style.display = 'none';
      if (successEl) successEl.style.display = 'block';
    }, 900);
  });
}

/* ==========================================================================
   6. SMOOTH SCROLL for anchor links
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72'
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}
