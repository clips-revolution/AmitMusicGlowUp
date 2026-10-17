(() => {
  const config = window.AMIT_SITE;
  const heroVideo = document.querySelector('#hero-video');
  const videoToggle = document.querySelector('#video-toggle');
  const videoSound = document.querySelector('#video-sound');
  if (heroVideo && videoToggle && videoSound) {
    const updatePlayback = () => {
      videoToggle.textContent = heroVideo.paused ? 'הפעלת הסרטון' : 'השהיית הסרטון';
    };
    heroVideo.addEventListener('play', updatePlayback);
    heroVideo.addEventListener('pause', updatePlayback);
    videoToggle.addEventListener('click', () => {
      if (heroVideo.paused) heroVideo.play().catch(updatePlayback);
      else heroVideo.pause();
    });
    videoSound.addEventListener('click', () => {
      heroVideo.muted = !heroVideo.muted;
      videoSound.textContent = heroVideo.muted ? 'הפעלת קול' : 'השתקת קול';
      videoSound.setAttribute('aria-pressed', String(!heroVideo.muted));
      if (!heroVideo.muted && heroVideo.paused) heroVideo.play().catch(updatePlayback);
    });
  }
  if (heroVideo && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => { /* The play button remains available if autoplay is blocked. */ });
  }
  const safeUrl = value => { try { const url = new URL(value); return url.protocol === 'https:' ? url.href : null; } catch { return null; } };
  document.querySelectorAll('[data-social]').forEach(link => {
    const url = safeUrl(config.links[link.dataset.social]);
    if (url) link.href = url;
  });
  document.querySelectorAll('[data-event]').forEach(element => {
    const value = config.event[element.dataset.event];
    if (value) element.textContent = value;
  });
  if (config.event.date && config.event.venue) document.querySelector('#faq-event').textContent = `${config.event.date} · ${config.event.venue}`;
  const ticketUrl = safeUrl(config.event.ticketUrl);
  if (ticketUrl) {
    document.querySelectorAll('[data-ticket-link], #ticket-action').forEach(link => {
      link.href = ticketUrl; link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.replaceChildren(document.createTextNode('לרכישת כרטיסים '));
      const arrow = document.createElement('span'); arrow.textContent = '↖'; link.append(arrow);
    });
    document.querySelector('#ticket-message').textContent = 'הכרטיס שלך ל־GLOW UP מחכה לך. נפגשות שם!';
    document.querySelector('#ticket-note').textContent = 'הרכישה מתבצעת באתר הכרטיסים.';
    document.querySelector('#faq-tickets').textContent = 'לחצי על ״לרכישת כרטיסים״ כדי לעבור לאתר המכירה ולהשלים את הרכישה.';
    document.querySelector('.coming').textContent = 'מכירת הכרטיסים פתוחה';
  }
  document.querySelector('#year').textContent = new Date().getFullYear();
  const dialog = document.querySelector('#credits');
  document.querySelector('#credits-button').addEventListener('click', () => dialog.showModal());
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
})();
