/* ============================================================
   LUXMODEL — gallery.js  (Gallery & Image Interactions)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Gallery Navigation ────────────────────────────── */
  const galleryItems = document.querySelectorAll('.gallery-item[data-full]');
  const lightbox     = document.getElementById('lightbox');
  const lightboxImg  = document.getElementById('lightbox-img');
  let   currentIndex = 0;

  if (!galleryItems.length || !lightbox) return;

  const images = Array.from(galleryItems).map(el => ({
    src   : el.dataset.full,
    thumb : el.querySelector('img')?.src || el.dataset.full
  }));

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = images[currentIndex].src;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
    updateCounter();
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  function prev() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.style.opacity = '1';
      updateCounter();
    }, 200);
  }

  function next() {
    currentIndex = (currentIndex + 1) % images.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
      lightboxImg.src = images[currentIndex].src;
      lightboxImg.style.opacity = '1';
      updateCounter();
    }, 200);
  }

  function updateCounter() {
    const counter = document.getElementById('lightbox-counter');
    if (counter) counter.textContent = `${currentIndex + 1} / ${images.length}`;
  }

  // Style the lightbox image transition
  if (lightboxImg) lightboxImg.style.transition = 'opacity 0.2s ease';

  // Event listeners
  galleryItems.forEach((item, i) => {
    item.addEventListener('click', () => openLightbox(i));
  });

  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Arrow buttons
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  if (prevBtn) prevBtn.addEventListener('click', e => { e.stopPropagation(); prev(); });
  if (nextBtn) nextBtn.addEventListener('click', e => { e.stopPropagation(); next(); });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
  });

  // Touch / Swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? next() : prev(); }
  });

  /* ─── Masonry / equal-height simulation ──────────────── */
  function balanceGrid() {
    const gallery = document.querySelector('.gallery-grid');
    if (!gallery) return;
    // CSS grid handles this automatically
  }
  balanceGrid();
  window.addEventListener('resize', balanceGrid);

});