// Hamburger toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

if (menuBtn && navLinks) {
  menuBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

// Close mobile menu on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navLinks && navLinks.classList.contains('open')) {
    navLinks.classList.remove('open');
    if (menuBtn) {
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.focus();
    }
  }
});

// Close mobile menu on outside click
document.addEventListener('click', (e) => {
  if (navLinks && menuBtn && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
    navLinks.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

// Anchor link focus management for accessibility
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.focus({ preventScroll: false });
    }
  });
});
