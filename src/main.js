/**
 * main.js
 * Application logic for x360Degree Inc. Corporate Website
 */
import './styles/main.css';
import './styles/company.css';
import { companyProducts, clientIndustries, clientTestimonials } from './data/productsData.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initCostEstimator();
  initModals();
  initContactForm();
});

/* =========================================================================
   1. THEME TOGGLE (LIGHT / DARK)
   ========================================================================= */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(themeBtn, currentTheme);

  themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateThemeIcon(themeBtn, nextTheme);
  });
}

function updateThemeIcon(btn, theme) {
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
}

/* =========================================================================
   2. MOBILE NAVIGATION MENU
   ========================================================================= */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.style.display === 'flex';
    navLinks.style.display = isOpen ? 'none' : 'flex';
    navLinks.style.flexDirection = 'column';
    navLinks.style.position = 'absolute';
    navLinks.style.top = '76px';
    navLinks.style.left = '0';
    navLinks.style.width = '100%';
    navLinks.style.background = 'var(--bg-surface)';
    navLinks.style.padding = '24px';
    navLinks.style.boxShadow = 'var(--shadow-lg)';
  });
}

/* =========================================================================
   3. INTERACTIVE PROJECT COST & SCOPE ESTIMATOR
   ========================================================================= */
function initCostEstimator() {
  const container = document.getElementById('project-cost-estimator');
  if (!container) return;

  const typeBtns = container.querySelectorAll('.est-type-btn');
  const checkboxes = container.querySelectorAll('.est-feature-checkbox');
  const platformRadios = container.querySelectorAll('input[name="est-platform"]');
  const timelineSelect = container.querySelector('#est-timeline');

  const priceEl = document.getElementById('est-calculated-price');
  const durationEl = document.getElementById('est-calculated-duration');

  let basePrice = 6500;
  let multiplier = 1.0;

  function calculateEstimate() {
    let total = basePrice;

    // Checkboxes additions
    checkboxes.forEach(cb => {
      if (cb.checked) {
        total += parseInt(cb.dataset.price || 0);
      }
    });

    // Platform additions
    platformRadios.forEach(rad => {
      if (rad.checked) {
        multiplier = parseFloat(rad.dataset.multiplier || 1.0);
      }
    });

    const finalTotal = Math.round(total * multiplier);
    const weeks = Math.max(4, Math.round(finalTotal / 2200));

    if (priceEl) {
      priceEl.textContent = `$${finalTotal.toLocaleString()}`;
    }
    if (durationEl) {
      durationEl.textContent = `~ ${weeks} to ${weeks + 2} Weeks`;
    }
  }

  typeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      typeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      basePrice = parseInt(btn.dataset.basePrice || 6500);
      calculateEstimate();
    });
  });

  checkboxes.forEach(cb => cb.addEventListener('change', calculateEstimate));
  platformRadios.forEach(rad => rad.addEventListener('change', calculateEstimate));
  if (timelineSelect) timelineSelect.addEventListener('change', calculateEstimate);

  calculateEstimate();
}

/* =========================================================================
   4. MODAL SYSTEM (SCHEDULE DEMO / GET QUOTE)
   ========================================================================= */
function initModals() {
  const modal = document.getElementById('consultation-modal');
  const openBtns = document.querySelectorAll('[data-open-modal="consultation"]');
  const closeBtn = document.getElementById('close-consultation-modal');

  if (!modal) return;

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('active');
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
}

/* =========================================================================
   5. CONTACT / CONSULTATION FORM SUBMISSION
   ========================================================================= */
function initContactForm() {
  const form = document.getElementById('consultation-form');
  const successMsg = document.getElementById('consultation-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting Request...';
    }

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) successMsg.style.display = 'block';
    }, 1000);
  });
}
