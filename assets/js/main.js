document.addEventListener('DOMContentLoaded', function () {

  // ── Splash ────────────────────────────────────────────────
  const splash = document.getElementById('splash');
  const tagline = document.getElementById('header-tagline');

  function dismissSplash() {
    splash.classList.add('splash--hidden');
    if (tagline) tagline.classList.add('tagline--visible');
  }

  if (splash) {
    setTimeout(dismissSplash, 2500);
  }

  // ── Burger menu ──────────────────────────────────────────
  const burger   = document.getElementById('nav-burger');
  const navLinks = document.getElementById('nav-links');

  if (burger && navLinks) {
    burger.addEventListener('click', function () {
      const open = navLinks.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', open);
    });

    // Close on link click (navigation)
    navLinks.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!burger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ── Nav scroll shadow ─────────────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        requestAnimationFrame(function () {
          nav.classList.toggle('nav--scrolled', window.scrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
    nav.classList.toggle('nav--scrolled', window.scrollY > 10);
  }

  // ── Active nav link ───────────────────────────────────────
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) link.classList.add('nav__link--active');
  });

  // ── Modal ─────────────────────────────────────────────────
  const modal      = document.getElementById('modal');
  const modalImg   = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const modalText  = document.getElementById('modal-text');
  const modalClose = modal.querySelector('.modal__close');
  const modalBack  = modal.querySelector('.modal__backdrop');

  // Elements that existed before the modal opened, for focus restoration
  var lastFocused = null;

  function openModal(title, body, image) {
    lastFocused = document.activeElement;
    modalTitle.textContent = title;
    modalText.textContent  = body;
    modalImg.src           = image;
    modalImg.alt           = title;
    modal.classList.add('modal--open');
    document.body.style.overflow = 'hidden';
    trapFocus(modal);
    modalClose.focus();
  }

  function closeModal() {
    modal.classList.remove('modal--open');
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  // Delegate clicks on cards
  document.addEventListener('click', function (e) {
    const card = e.target.closest('[data-modal-trigger]');
    if (card) openModal(
      card.dataset.title,
      card.dataset.body,
      card.dataset.image
    );
  });

  // Keyboard trigger on cards (Enter / Space)
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closeModal(); return; }
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('[data-modal-trigger]');
      if (card) { e.preventDefault(); openModal(card.dataset.title, card.dataset.body, card.dataset.image); }
    }
  });

  modalClose.addEventListener('click', closeModal);
  modalBack.addEventListener('click', closeModal);

  // ── Card fade-in ──────────────────────────────────────────
  const cards = document.querySelectorAll('.card');
  if (cards.length > 0) {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      cards.forEach(function (card) { card.classList.add('card--visible'); });
    } else {
      const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const index = Array.prototype.indexOf.call(cards, entry.target);
            setTimeout(function () {
              entry.target.classList.add('card--visible');
            }, Math.min(index, 6) * 80);
            cardObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
      cards.forEach(function (card) { cardObserver.observe(card); });
      setTimeout(function () {
        cards.forEach(function (card) { card.classList.add('card--visible'); });
      }, 1500);
    }
  }

  // ── Section reveal-on-scroll ──────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length > 0) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      reveals.forEach(function (el) { el.classList.add('reveal--in'); });
    } else {
      const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal--in');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
      reveals.forEach(function (el) { revealObserver.observe(el); });
      // Fallback: ensure everything is visible
      setTimeout(function () {
        reveals.forEach(function (el) { el.classList.add('reveal--in'); });
      }, 2000);
    }
  }

  // Focus trap
  function trapFocus(container) {
    const focusable = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    container.addEventListener('keydown', function trap(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
      }
      if (!modal.classList.contains('modal--open')) container.removeEventListener('keydown', trap);
    });
  }

});
