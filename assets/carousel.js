// Inicijalizacija Swiper karusela sa dobrim defaultima za mobitel
const swiper = new Swiper('.cardSwiper', {
  slidesPerView: 1.1,
  spaceBetween: 12,
  centeredSlidesBounds: true,
  grabCursor: true,
  watchOverflow: true,
  keyboard: { enabled: true },
  a11y: { enabled: true },
  // Breakpoints za tablet/desktop
  breakpoints: {
    640: { slidesPerView: 2, spaceBetween: 16 },
    1024:{ slidesPerView: 3, spaceBetween: 20 }
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
});

// LIGHTBOX (uvećanje slike na klik)
(function(){
  const lb = document.getElementById('lightbox');
  const imgEl = lb.querySelector('.lightbox__img');
  const captionEl = lb.querySelector('.lightbox__caption');
  const closeBtn = lb.querySelector('.lightbox__close');

  function openLightbox(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = alt || '';
    lb.classList.add('is-open');
    lb.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lb.classList.remove('is-open');
    lb.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Očisti src da oslobodimo memoriju na mobilnim
    imgEl.src = '';
  }

  // Klik na sliku u kartici -> otvori lightbox
  document.querySelectorAll('.card__img').forEach(img => {
    img.addEventListener('click', () => {
      const full = img.getAttribute('data-full') || img.src;
      const alt = img.getAttribute('alt') || '';
      openLightbox(full, alt);
    });
  });

  // Zatvaranje
  closeBtn.addEventListener('click', closeLightbox);
  lb.addEventListener('click', (e) => {
    // Klik izvan figure zatvara
    if (e.target === lb) closeLightbox();
  });

  // Esc zatvara
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lb.classList.contains('is-open')) {
      closeLightbox();
    }
  });

  // Spriječi scroll pozadinske stranice na iOS-u (dodatno)
  lb.addEventListener('touchmove', (e) => {
    if (lb.classList.contains('is-open')) e.preventDefault();
  }, { passive: false });
})();
