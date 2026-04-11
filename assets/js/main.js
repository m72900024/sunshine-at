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

// About section scroll-triggered fade-in
const aboutFadeEls = document.querySelectorAll('.about-fade');
if ('IntersectionObserver' in window) {
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        aboutObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  aboutFadeEls.forEach(el => aboutObserver.observe(el));
} else {
  aboutFadeEls.forEach(el => el.classList.add('is-visible'));
}

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

// Global scroll-triggered fade-in (excluding .about-fade which has its own observer)
const fadeEls = document.querySelectorAll('.fade-in');
if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => fadeObserver.observe(el));
} else {
  fadeEls.forEach(el => el.classList.add('is-visible'));
}

// Anchor link focus management for accessibility
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      // Reveal fade-in elements in target section
      target.querySelectorAll('.fade-in, .about-fade').forEach(el => el.classList.add('is-visible'));
      target.focus({ preventScroll: false });
    }
  });
});

// When sections receive focus via tab, reveal their content
document.querySelectorAll('section[tabindex]').forEach(section => {
  section.addEventListener('focus', () => {
    section.querySelectorAll('.fade-in, .about-fade').forEach(el => el.classList.add('is-visible'));
  });
});
