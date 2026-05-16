/* ============================================================
   LUXMODEL — animations.js  (Advanced Animation Engine)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Stagger Children Reveal ───────────────────────── */
  document.querySelectorAll('[data-stagger]').forEach(container => {
    const children = Array.from(container.children);
    const delay    = parseFloat(container.dataset.stagger || '0.1');

    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          children.forEach((child, i) => {
            child.style.transitionDelay = `${i * delay}s`;
            child.classList.add('visible');
          });
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    children.forEach(c => c.classList.add('reveal'));
    obs.observe(container);
  });

  /* ─── Parallax on Scroll ────────────────────────────── */
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  if (parallaxElements.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          parallaxElements.forEach(el => {
            const speed  = parseFloat(el.dataset.parallax || '0.3');
            const offset = scrollY * speed;
            el.style.transform = `translateY(${offset}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ─── Hero Blob Parallax ────────────────────────────── */
  const blobs = document.querySelectorAll('.hero-blob');
  if (blobs.length) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blobs.forEach((blob, i) => {
        const factor = (i + 1) * 0.4;
        blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  /* ─── Float cards mouse parallax ────────────────────── */
  const floatCards = document.querySelectorAll('.hero-float');
  if (floatCards.length) {
    document.addEventListener('mousemove', e => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      floatCards.forEach((el, i) => {
        const f = (i + 1) * 0.6;
        const base = parseFloat(el.style.getPropertyValue('--float-y') || 0);
        el.style.transform = `translateY(${base + y * f}px) translateX(${x * f * 0.5}px)`;
      });
    });
  }

  /* ─── Gradient Text on Hover ──────────────────────────── */
  document.querySelectorAll('.grad-on-hover').forEach(el => {
    el.addEventListener('mouseenter', () => el.classList.add('grad-text-static'));
    el.addEventListener('mouseleave', () => el.classList.remove('grad-text-static'));
  });

  /* ─── Number Sparkles on Counter Complete ────────────── */
  document.querySelectorAll('.stat-num').forEach(el => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => createSparkles(e.target), 2100);
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    observer.observe(el);
  });

  function createSparkles(el) {
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position:fixed;
        left:${rect.left + Math.random() * rect.width}px;
        top:${rect.top + Math.random() * rect.height}px;
        width:6px;height:6px;
        border-radius:50%;
        background:${['#ff2d78','#a855f7','#3b82f6','#fbbf24'][Math.floor(Math.random()*4)]};
        pointer-events:none;
        z-index:9999;
        animation:sparkle 0.6s ease forwards;
        animation-delay:${i * 80}ms;
      `;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 700 + i * 80);
    }
  }

  /* ─── Scroll Progress Bar ──────────────────────────── */
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progressBar.style.width = `${progress}%`;
    }, { passive: true });
  }

  /* ─── Section Color Accent on Scroll ────────────────── */
  const sections = document.querySelectorAll('[data-accent]');
  if (sections.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const color = e.target.dataset.accent;
          document.documentElement.style.setProperty('--current-accent', color);
        }
      });
    }, { threshold: 0.4 });
    sections.forEach(s => obs.observe(s));
  }

  /* ─── Micro-interaction: Button Press ───────────────── */
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousedown', () => { btn.style.transform = 'scale(0.97)'; });
    btn.addEventListener('mouseup',   () => { btn.style.transform = ''; });
    btn.addEventListener('mouseleave',() => { btn.style.transform = ''; });
  });

  /* ─── Magnetic Effect on Buttons ───────────────────── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x    = e.clientX - rect.left - rect.width  / 2;
      const y    = e.clientY - rect.top  - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ─── Neon Glow Follow Cursor (Hero) ────────────────── */
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position:absolute;pointer-events:none;
      width:400px;height:400px;border-radius:50%;
      background:radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%);
      transform:translate(-50%,-50%);
      transition:left 0.3s ease,top 0.3s ease;z-index:1;
    `;
    heroSection.style.position = 'relative';
    heroSection.style.overflow = 'hidden';
    heroSection.appendChild(glow);

    heroSection.addEventListener('mousemove', e => {
      const rect = heroSection.getBoundingClientRect();
      glow.style.left = `${e.clientX - rect.left}px`;
      glow.style.top  = `${e.clientY - rect.top}px`;
    });
  }

});