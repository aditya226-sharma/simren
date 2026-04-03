// ── Navbar scroll effect ──
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile menu toggle ──
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  if (links) links.classList.toggle('open');
}
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    const links = document.querySelector('.nav-links');
    if (links) links.classList.remove('open');
  });
});

// ── Scroll reveal (cards only, NOT gallery items) ──
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .pricing-card, .testimonial-card, .qcard').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ── Gallery Filter ──
function filterGallery(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item => {
    if (cat === 'all' || item.dataset.cat === cat) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

// ── Lightbox ──
let currentIndex = 0;
let visibleItems = [];

function openLightbox(el) {
  visibleItems = [...document.querySelectorAll('.gallery-item:not(.hidden)')];
  currentIndex = visibleItems.indexOf(el);
  showLightboxImage(currentIndex);
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage(index) {
  const item = visibleItems[index];
  if (!item) return;
  const img = item.querySelector('img');
  const caption = item.querySelector('.gallery-overlay p');
  document.getElementById('lb-img').src = img.src;
  document.getElementById('lb-img').alt = img.alt;
  document.getElementById('lb-caption').textContent = caption ? caption.textContent : '';
}

function changeImage(dir, e) {
  if (e) e.stopPropagation();
  currentIndex = (currentIndex + dir + visibleItems.length) % visibleItems.length;
  showLightboxImage(currentIndex);
}

function closeLightbox(e) {
  // Close if: no event, backdrop click, or close button click
  if (!e || e.target.id === 'lightbox' || e.currentTarget.classList.contains('lb-close')) {
    document.getElementById('lightbox').classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ── Keyboard navigation ──
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb || !lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') changeImage(1);
  if (e.key === 'ArrowLeft') changeImage(-1);
  if (e.key === 'Escape') closeLightbox();
});

// ── Contact form ──
function submitForm(e) {
  e.preventDefault();
  const success = document.getElementById('formSuccess');
  if (success) {
    success.style.display = 'block';
    e.target.reset();
    setTimeout(() => { success.style.display = 'none'; }, 5000);
  }
}
