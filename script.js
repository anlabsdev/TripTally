// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(10,15,10,0.97)' : 'rgba(10,15,10,0.85)';
});

// ── Hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Phone carousel ──
const phoneImg = document.getElementById('phoneImg');
const dots = document.querySelectorAll('.dot');
let autoSlide;

function setSlide(index) {
  dots.forEach((d, i) => {
    d.classList.toggle('active', i === index);
    if (i === index) {
      phoneImg.style.opacity = '0';
      setTimeout(() => {
        phoneImg.src = d.dataset.img;
        phoneImg.style.opacity = '1';
      }, 200);
    }
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    clearInterval(autoSlide);
    setSlide(i);
    startAutoSlide(i);
  });
});

function startAutoSlide(startIndex = 0) {
  let current = startIndex;
  autoSlide = setInterval(() => {
    current = (current + 1) % dots.length;
    setSlide(current);
  }, 2800);
}
startAutoSlide();

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.feature-card, .step, .screenshot-item, .pricing-card, .qr-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => observer.observe(el));

// ── Lightbox ──
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');

function openLightbox(el) {
  const img = el.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox();
});

// ── QR Code (pure CSS/SVG placeholder with actual URL encoded) ──
// Using Google Charts QR API for a real scannable QR code
const qrCanvas = document.getElementById('qrCanvas');
if (qrCanvas) {
  const playUrl = encodeURIComponent('https://play.google.com/store/apps/details?id=com.triptally.app');
  const qrImg = document.createElement('img');
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${playUrl}&bgcolor=ffffff&color=1b5e20&margin=8`;
  qrImg.alt = 'QR Code to download TripTally';
  qrImg.style.width = '160px';
  qrImg.style.height = '160px';
  qrImg.style.borderRadius = '8px';
  // Fallback in case API fails
  qrImg.onerror = () => {
    qrCanvas.innerHTML = `
      <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;width:160px;height:160px;gap:8px;background:#fff;border-radius:8px;padding:12px;">
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none">
          <!-- QR placeholder pattern -->
          <rect x="10" y="10" width="30" height="30" rx="4" fill="#1b5e20"/>
          <rect x="15" y="15" width="20" height="20" rx="2" fill="#fff"/>
          <rect x="18" y="18" width="14" height="14" rx="1" fill="#1b5e20"/>
          <rect x="60" y="10" width="30" height="30" rx="4" fill="#1b5e20"/>
          <rect x="65" y="15" width="20" height="20" rx="2" fill="#fff"/>
          <rect x="68" y="18" width="14" height="14" rx="1" fill="#1b5e20"/>
          <rect x="10" y="60" width="30" height="30" rx="4" fill="#1b5e20"/>
          <rect x="15" y="65" width="20" height="20" rx="2" fill="#fff"/>
          <rect x="18" y="68" width="14" height="14" rx="1" fill="#1b5e20"/>
          <rect x="60" y="55" width="8" height="8" fill="#1b5e20"/>
          <rect x="72" y="55" width="8" height="8" fill="#1b5e20"/>
          <rect x="84" y="55" width="8" height="8" fill="#1b5e20"/>
          <rect x="60" y="67" width="8" height="8" fill="#1b5e20"/>
          <rect x="84" y="67" width="8" height="8" fill="#1b5e20"/>
          <rect x="60" y="79" width="8" height="8" fill="#1b5e20"/>
          <rect x="72" y="79" width="8" height="8" fill="#1b5e20"/>
          <rect x="84" y="79" width="8" height="8" fill="#1b5e20"/>
          <rect x="46" y="10" width="8" height="8" fill="#1b5e20"/>
          <rect x="46" y="22" width="8" height="8" fill="#1b5e20"/>
          <rect x="46" y="34" width="8" height="8" fill="#1b5e20"/>
          <rect x="46" y="46" width="8" height="8" fill="#1b5e20"/>
          <rect x="10" y="46" width="8" height="8" fill="#1b5e20"/>
          <rect x="22" y="46" width="8" height="8" fill="#1b5e20"/>
          <rect x="34" y="46" width="8" height="8" fill="#1b5e20"/>
        </svg>
        <p style="font-size:10px;color:#1b5e20;font-family:sans-serif;font-weight:700;text-align:center;">Scan for Play Store</p>
      </div>`;
  };
  qrCanvas.appendChild(qrImg);
}

// ── Smooth active nav highlighting ──
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) current = s.id;
  });
  navAnchors.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#e8f5e9' : '';
  });
}, { passive: true });
