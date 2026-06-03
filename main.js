/* main.js — Blessed Hope Baptist Church */

// --- Sticky nav scroll effect ---
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}, { passive: true });

// --- Dropdown: close others when one opens, toggle on click for mobile ---
const dropdowns = document.querySelectorAll('.nav-dropdown');
dropdowns.forEach(dropdown => {
  const toggle = dropdown.querySelector('.nav-dropdown-toggle');

  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const isOpen = dropdown.classList.contains('open');
    dropdowns.forEach(d => d.classList.remove('open'));
    if (!isOpen) dropdown.classList.add('open');
  });

  dropdown.addEventListener('mouseleave', () => {
    dropdown.classList.remove('open');
  });
  dropdown.addEventListener('mouseenter', () => {
    dropdowns.forEach(d => { if (d !== dropdown) d.classList.remove('open'); });
  });
});

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.nav-dropdown')) {
    dropdowns.forEach(d => d.classList.remove('open'));
  }
});

// --- Mobile hamburger ---
const hamburger = document.getElementById('nav-hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('open');
});
// Close on regular link click, but NOT on dropdown toggles
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (!link.classList.contains('nav-dropdown-toggle')) {
      navLinks.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

// --- Scroll reveal ---
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));
