// Robustni loader sa guardovima – ništa se ne ruši ako neki ID ne postoji
(function () {
  'use strict';

  // Pomocna: sigurno postavi textContent
  function setText(id, value) {
    const el = document.getElementById(id);
    if (el && typeof value !== 'undefined' && value !== null) el.textContent = value;
  }

  // Pomocna: sigurno postavi href + labelu
  function setLink(id, href, label) {
    const el = document.getElementById(id);
    if (!el) return;
    if (href) el.href = href;
    if (typeof label !== 'undefined' && label !== null) el.textContent = label;
  }

  // Učitaj JSON (apsolutna putanja radi i kad si na pod-rutama)
  fetch('/content.json')
    .then(r => {
      if (!r.ok) throw new Error('Ne mogu učitati content.json');
      return r.json();
    })
    .then(populatePage)
    .catch(err => {
      console.error('Greška pri učitavanju sadržaja:', err);
    });

  function populatePage(content) {
    // META (guardovi)
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && content?.site?.description) {
      metaDesc.setAttribute('content', content.site.description);
    }
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && content?.site?.ogTitle) {
      ogTitle.setAttribute('content', content.site.ogTitle);
    }
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc && content?.site?.ogDescription) {
      ogDesc.setAttribute('content', content.site.ogDescription);
    }
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && content?.site?.ogImage) {
      ogImage.setAttribute('content', content.site.ogImage);
    }
    if (content?.site?.title) document.title = content.site.title;

    // NAV
    const navMenu = document.getElementById('navMenu');
    if (navMenu && Array.isArray(content?.nav)) {
      navMenu.innerHTML = '';
      content.nav.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.href || '#';
        a.textContent = item.label || '';
        li.appendChild(a);
        navMenu.appendChild(li);
      });
    }

    // HERO
    setText('heroTitle', content?.hero?.headline || '');
    setText('heroSubtitle', content?.hero?.subheadline || '');
    setLink('heroCta', content?.hero?.ctaHref || '#', content?.hero?.ctaText || '');

    const heroImg = document.getElementById('heroImage');
    if (heroImg && content?.hero?.heroImage) {
      heroImg.src = content.hero.heroImage;
      heroImg.alt = content?.hero?.headline || 'Hero slika';
    }

    // ABOUT
    setText('aboutTitle', content?.about?.title || '');
    setText('aboutText', content?.about?.text || '');
    const aboutImg = document.getElementById('aboutImage');
    if (aboutImg && content?.about?.image) {
      aboutImg.src = content.about.image;
      aboutImg.alt = content?.about?.title || 'O nama';
    }

    // SERVICES (guard)
    const servicesGrid = document.getElementById('servicesGrid');
    if (servicesGrid && Array.isArray(content?.services)) {
      servicesGrid.innerHTML = '';
      content.services.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.innerHTML = `
          <img src="${s.image || ''}" alt="${s.title || ''}" loading="lazy">
          <div class="service-card-content">
            <h3>${s.title || ''}</h3>
            <p>${s.text || ''}</p>
          </div>
        `;
        servicesGrid.appendChild(card);
      });
    }

    // GALLERY – punimo samo ako postoji #galleryGrid (ti koristiš Swiper custom – ovo će biti preskočeno)
    const galleryGrid = document.getElementById('galleryGrid');
    if (galleryGrid && Array.isArray(content?.gallery)) {
      galleryGrid.innerHTML = '';
      content.gallery.forEach((imagePath, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${imagePath}" alt="Galerija slika ${index + 1}" loading="lazy">`;
        galleryGrid.appendChild(item);
      });
    }

    // REASONS
    const reasonsList = document.getElementById('reasonsList');
    if (reasonsList && Array.isArray(content?.reasons)) {
      reasonsList.innerHTML = '';
      content.reasons.forEach(reason => {
        const li = document.createElement('li');
        li.textContent = reason;
        reasonsList.appendChild(li);
      });
    }

    // CONTACT
    setText('contactAddress', content?.contact?.address || '');
    // phone
    const phone = content?.contact?.phone || '';
    const phoneHref = phone ? `tel:${phone.replace(/\s/g, '')}` : '#';
    setLink('contactPhone', phoneHref, phone);
    // email
    const email = content?.contact?.email || '';
    const emailHref = email ? `mailto:${email}` : '#';
    setLink('contactEmail', emailHref, email);
    // working hours
    const workingHoursEl = document.getElementById('workingHours');
    if (workingHoursEl && Array.isArray(content?.contact?.workingHours)) {
      workingHoursEl.innerHTML = '';
      content.contact.workingHours.forEach(h => {
        const li = document.createElement('li');
        li.textContent = h;
        workingHoursEl.appendChild(li);
      });
    }
    // map & CTA
    setLink('mapLink', content?.contact?.mapLink || '#', null);
    setLink('contactCta', emailHref, 'Pošalji Email');

    // FOOTER
    setText('footerCopy', content?.footer?.copy || '');
    const footerSocial = document.getElementById('footerSocial');
    if (footerSocial && Array.isArray(content?.footer?.social)) {
      footerSocial.innerHTML = '';
      content.footer.social.forEach(s => {
        const a = document.createElement('a');
        a.href = s.href || '#';
        a.textContent = s.label || '';
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        footerSocial.appendChild(a);
      });
    }
  }
})();