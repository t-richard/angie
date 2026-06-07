document.addEventListener('DOMContentLoaded', function () {

  // ── Splash ────────────────────────────────────────────────
  const splash = document.getElementById('splash');
  const tagline = document.getElementById('header-tagline');

  function dismissSplash() {
    splash.classList.add('splash--hidden');
    if (tagline) tagline.classList.add('tagline--visible');
  }

  if (splash) {
    const timer = setTimeout(dismissSplash, 2500);
    splash.addEventListener('click', function () {
      clearTimeout(timer);
      dismissSplash();
    });
  }

  // ── Active nav link ───────────────────────────────────────
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav__link').forEach(function (link) {
    const href = link.getAttribute('href').replace(/\/$/, '') || '/';
    if (href === path) {
      link.classList.add('nav__link--active');
    }
  });

});
