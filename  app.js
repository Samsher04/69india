/* ============================================================
   LUXMODEL — app.js  (Core Interactions)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Page Loader ─────────────────────────────────────── */
  const loader = document.getElementById('page-loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('hidden'), 1600);
    });
  }

  /* ─── Custom Cursor ────────────────────────────────────── */
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  if (dot && ring) {
    let mx = -100, my = -100;
    let rx = -100, ry = -100;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      dot.style.left  = mx + 'px';
      dot.style.top   = my + 'px';
    });

    // Smooth ring follow
    function animateRing() {
      rx += (mx - rx) * 0.14;
      ry += (my - ry) * 0.14;
      ring.style.left = rx + 'px';
      ring.style.top  = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hover state
    document.querySelectorAll('a, button, .model-card, .cat-card, .glass-card, [data-cursor]').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
  }

  /* ─── Particles ────────────────────────────────────────── */
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const COLORS = ['#ff2d78', '#a855f7', '#3b82f6', '#06b6d4', '#f97316'];

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function Particle() {
      this.x     = Math.random() * W;
      this.y     = Math.random() * H;
      this.r     = Math.random() * 1.5 + 0.5;
      this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
      this.vx    = (Math.random() - 0.5) * 0.3;
      this.vy    = (Math.random() - 0.5) * 0.3;
      this.alpha = Math.random() * 0.5 + 0.1;
    }

    function initParticles() {
      particles = [];
      const count = Math.min(Math.floor((W * H) / 14000), 80);
      for (let i = 0; i < count; i++) particles.push(new Particle());
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();
    window.addEventListener('resize', () => { resize(); initParticles(); });
  }

  /* ─── Sticky Navbar ────────────────────────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  /* ─── Mobile Nav ───────────────────────────────────────── */
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    mobileMenu.querySelectorAll('.mobile-menu-link').forEach(l => {
      l.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── Active Nav Link ──────────────────────────────────── */
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  /* ─── Scroll Reveal ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── Animated Counters ────────────────────────────────── */
  function animateCounter(el, target, duration = 2000) {
    const start = performance.now();
    const isFloat = target % 1 !== 0;
    const update = (ts) => {
      const progress = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // cubic ease-out
      const current = ease * target;
      el.textContent = isFloat ? current.toFixed(1) : Math.floor(current).toLocaleString();
      if (progress < 1) requestAnimationFrame(update);
      else el.classList.add('count-flash');
    };
    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el     = e.target;
        const target = parseFloat(el.dataset.count || el.textContent.replace(/[^0-9.]/g, ''));
        const suffix = el.dataset.suffix || '';
        const dur    = parseInt(el.dataset.duration || '2000');
        animateCounter(el, target, dur);
        if (suffix) el.insertAdjacentHTML('afterend', `<span class="stat-suffix">${suffix}</span>`);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

  /* ─── FAQ Accordion ────────────────────────────────────── */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-question');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ─── Like Buttons ─────────────────────────────────────── */
  document.querySelectorAll('.like-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      btn.classList.toggle('liked');
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = btn.classList.contains('liked') ? 'fas fa-heart' : 'far fa-heart';
      }
      // Update count
      const countEl = btn.querySelector('.like-count');
      if (countEl) {
        const n = parseInt(countEl.textContent.replace(/[^0-9]/g, '')) || 0;
        countEl.textContent = btn.classList.contains('liked') ? formatNumber(n + 1) : formatNumber(n - 1 < 0 ? 0 : n - 1);
      }
      if (btn.classList.contains('liked')) showToast('Added to your likes! ❤️', 'success');
    });
  });

  /* ─── Save / Bookmark ──────────────────────────────────── */
  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      btn.classList.toggle('saved');
      showToast(btn.classList.contains('saved') ? 'Saved to collection! 🔖' : 'Removed from collection', 'info');
    });
  });

  /* ─── Share Button ─────────────────────────────────────── */
  document.querySelectorAll('.share-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (navigator.share) {
        navigator.share({ title: 'Check this creator on LUXMODEL', url: window.location.href });
      } else {
        navigator.clipboard.writeText(window.location.href).then(() => showToast('Link copied to clipboard! 🔗', 'success'));
      }
    });
  });

  /* ─── Toast Notifications ──────────────────────────────── */
  window.showToast = function(msg, type = 'info', duration = 3500) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const icons = { success: 'fas fa-check-circle', error: 'fas fa-times-circle', info: 'fas fa-info-circle' };
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <i class="${icons[type] || icons.info} toast-icon"></i>
      <span class="toast-text">${msg}</span>
      <i class="fas fa-times toast-close"></i>
    `;
    container.appendChild(toast);
    requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('show')));

    const remove = () => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    };
    toast.querySelector('.toast-close').addEventListener('click', remove);
    setTimeout(remove, duration);
  };

  /* ─── Back to Top ──────────────────────────────────────── */
  const btt = document.getElementById('back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => {
      btt.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
    btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  /* ─── Newsletter Form ──────────────────────────────────── */
  const nlForm = document.getElementById('newsletter-form');
  if (nlForm) {
    nlForm.addEventListener('submit', e => {
      e.preventDefault();
      const emailInput = nlForm.querySelector('input[type="email"]');
      if (emailInput && emailInput.value) {
        showToast('You\'re on the list! Welcome to LUXMODEL 🎉', 'success');
        emailInput.value = '';
      }
    });
  }

  /* ─── Hero Search ──────────────────────────────────────── */
  const heroSearch = document.getElementById('hero-search');
  if (heroSearch) {
    heroSearch.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        const query = heroSearch.value.trim();
        if (query) window.location.href = `explore.html?q=${encodeURIComponent(query)}`;
      }
    });
  }
  const heroSearchBtn = document.getElementById('hero-search-btn');
  if (heroSearchBtn && heroSearch) {
    heroSearchBtn.addEventListener('click', () => {
      const query = heroSearch.value.trim();
      if (query) window.location.href = `explore.html?q=${encodeURIComponent(query)}`;
      else window.location.href = 'explore.html';
    });
  }

  /* ─── Testimonial Slider ───────────────────────────────── */
  const track  = document.querySelector('.testimonials-track');
  const dots   = document.querySelectorAll('.testimonial-dot');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  if (track && dots.length) {
    let current = 0;
    const cards = track.querySelectorAll('.testimonial-card');
    const total = cards.length;
    const gap   = 24;

    function goTo(idx) {
      current = (idx + total) % total;
      const card = cards[current];
      track.style.transition = 'transform 0.5s cubic-bezier(0.4,0,0.2,1)';
      track.style.transform  = `translateX(-${current * (card.offsetWidth + gap)}px)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-play
    let autoPlay = setInterval(() => goTo(current + 1), 5000);
    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => { autoPlay = setInterval(() => goTo(current + 1), 5000); });

    goTo(0);
  }

  /* ─── Card Tilt Effect ─────────────────────────────────── */
  document.querySelectorAll('.model-card, .cat-card, .team-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r   = card.getBoundingClientRect();
      const x   = e.clientX - r.left;
      const y   = e.clientY - r.top;
      const cx  = r.width  / 2;
      const cy  = r.height / 2;
      const rx  = ((y - cy) / cy) * -8;
      const ry  = ((x - cx) / cx) *  8;
      card.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-8px)`;
      // Shine
      const shine = card.querySelector('.tilt-card-shine');
      if (shine) { shine.style.setProperty('--x', `${(x/r.width)*100}%`); shine.style.setProperty('--y', `${(y/r.height)*100}%`); }
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── Smooth Scroll for Anchor Links ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });

  /* ─── Contact Form ─────────────────────────────────────── */
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      const btn = contactForm.querySelector('[type="submit"]');
      if (btn) { btn.textContent = 'Sending...'; btn.disabled = true; }
      setTimeout(() => {
        showToast('Message sent! We\'ll get back to you soon 📬', 'success');
        contactForm.reset();
        if (btn) { btn.textContent = 'Send Message'; btn.disabled = false; }
      }, 1500);
    });
  }

  /* ─── Marquee Duplicate ────────────────────────────────── */
  document.querySelectorAll('.marquee-track').forEach(track => {
    const clone = track.innerHTML;
    track.innerHTML += clone;
  });

  /* ─── Typing Effect ─────────────────────────────────────── */
  const typingEls = document.querySelectorAll('[data-typing]');
  typingEls.forEach(el => {
    const words  = el.dataset.typing.split(',').map(w => w.trim());
    let wi = 0, ci = 0, deleting = false;
    function type() {
      const word = words[wi];
      if (!deleting) {
        el.textContent = word.substring(0, ++ci);
        if (ci >= word.length) { deleting = true; setTimeout(type, 1800); return; }
      } else {
        el.textContent = word.substring(0, --ci);
        if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; }
      }
      setTimeout(type, deleting ? 60 : 100);
    }
    type();
  });

  /* ─── Number formatter ─────────────────────────────────── */
  function formatNumber(n) {
    if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
    if (n >= 1000)    return (n / 1000).toFixed(1) + 'K';
    return n.toString();
  }

  /* ─── Lazy load images ─────────────────────────────────── */
  if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          if (img.dataset.src) { img.src = img.dataset.src; img.removeAttribute('data-src'); }
          obs.unobserve(img);
        }
      });
    }, { rootMargin: '200px' });
    document.querySelectorAll('img[data-src]').forEach(img => imgObserver.observe(img));
  }

  /* ─── Tab Switching (Details Page) ─────────────────────── */
  const tabBtns   = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const panel = document.getElementById(`tab-${target}`);
      if (panel) panel.classList.add('active');
    });
  });

  /* ─── Lightbox ─────────────────────────────────────────── */
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item[data-full]').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.full;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    function closeLightbox() { lightbox.classList.remove('open'); document.body.style.overflow = ''; }
    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && lightbox.classList.contains('open')) closeLightbox(); });
  }

  console.log('%cLUXMODEL ✦ Premium Creator Platform', 'color: #a855f7; font-size: 16px; font-weight: bold; font-family: Syne, sans-serif;');
});