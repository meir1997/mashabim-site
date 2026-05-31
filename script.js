// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.section, .hero-inner, .quote-card, .card, .steps li, .why-item');
revealEls.forEach(el => el.classList.add('reveal'));
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // Stagger: פריטים באותה קבוצה (כרטיסים/שלבים) נכנסים בזה אחר זה
        const group = el.parentElement
          ? [...el.parentElement.children].filter(c => c.classList.contains('reveal'))
          : [el];
        const idx = group.indexOf(el);
        if (idx > 0) el.style.transitionDelay = Math.min(idx, 6) * 60 + 'ms';
        el.classList.add('is-in');
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-in'));
}

// Contact form -> FormSubmit (AJAX)
async function handleContact(e) {
  e.preventDefault();
  const form = e.target;
  const note = document.getElementById('formNote');
  const button = form.querySelector('button[type="submit"]');
  const originalText = button.textContent;
  button.disabled = true;
  button.textContent = 'שולח...';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });
    if (response.ok) {
      if (note) {
        note.hidden = false;
        note.textContent = 'תודה, נחזור אליכם בהקדם.';
        note.style.color = '';
      }
      form.reset();
    } else {
      throw new Error('Server returned ' + response.status);
    }
  } catch (err) {
    if (note) {
      note.hidden = false;
      note.textContent = 'אירעה שגיאה. ניתן ליצור קשר ישירות במייל או בטלפון.';
      note.style.color = '#c0392b';
    }
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
  return false;
}
window.handleContact = handleContact;
