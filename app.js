// OnlyClouds — app.js

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
}

// Close nav when clicking outside
document.addEventListener('click', e => {
  if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
    closeNav();
  }
});

function showAlert() {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = 'Ha! Nice try ☁️';
  document.getElementById('modal-body').textContent =
    'This is a satire website. No payments, no accounts, no actual clouds were monetised in the making of this site.';
  modal.classList.add('active');
}

function showSubscribe(creator, price) {
  const modal = document.getElementById('modal');
  document.getElementById('modal-title').textContent = `Subscribe to ${creator}`;
  document.getElementById('modal-body').textContent =
    `You almost paid ${price} to receive exclusive cloud photos. This is a parody site — your wallet is safe, but your dignity is questionable.`;
  modal.classList.add('active');
}

function closeModal(event) {
  if (event.target === document.getElementById('modal')) {
    document.getElementById('modal').classList.remove('active');
  }
}

// Animate stats counting up on scroll
function animateCountUp(el, target, suffix) {
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-num[data-target]');
      nums.forEach(el => {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        animateCountUp(el, target, suffix);
      });
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats-bar').forEach(el => observer.observe(el));

// Keyboard: close modal with Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.getElementById('modal').classList.remove('active');
});

// Easter egg: click the nav logo 5 times
let clicks = 0;
document.querySelector('.logo')?.addEventListener('click', () => {
  clicks++;
  if (clicks === 5) {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = '⛈️ Secret Unlocked!';
    document.getElementById('modal-body').textContent =
      'You found the secret! Unfortunately the prize is also just more clouds. Have you considered going outside?';
    modal.classList.add('active');
    clicks = 0;
  }
});
