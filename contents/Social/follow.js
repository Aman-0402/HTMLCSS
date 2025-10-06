/* contents/Social/follow.js */
/*
  Lightweight JS:
  - keyboard accessible cards (Enter / Space to open)
  - click handlers on Visit/Open buttons and whole card
  - subtle tilt effect on mousemove
  - entrance animations
  - keyboard shortcuts
*/

(function () {
  const cards = Array.from(document.querySelectorAll('.card'));

  // Open link safely
  function openHref(url) {
    if (!url) return;
    // open in new tab with security
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  // Click / button handlers
  cards.forEach((card, index) => {
    const url = card.dataset.href;
    const btn = card.querySelector('[data-action="open"]');

    // open when the button clicked
    if (btn) {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openHref(url);
      });
    }

    // open when the card clicked
    card.addEventListener('click', () => openHref(url));

    // keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openHref(url);
      }
    });

    // small tilt effect on desktop
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * 10; // rotateX
      const ry = (px - 0.5) * -12; // rotateY
      card.style.transform = `perspective(900px) translateY(-6px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.01)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    // touch feedback for mobile
    card.addEventListener('touchstart', () => {
      card.style.transform = 'translateY(-6px) scale(1.01)';
    });
    
    card.addEventListener('touchend', () => {
      card.style.transform = '';
    });
  });

  // Entrance animation on page load
  window.requestAnimationFrame(() => {
    cards.forEach((c, i) => {
      c.style.opacity = 0;
      c.style.transform = 'translateY(18px)';
      setTimeout(() => {
        c.style.transition = `opacity 520ms ease ${i * 70}ms, transform 520ms cubic-bezier(.2,.9,.2,1) ${i * 70}ms`;
        c.style.opacity = 1;
        c.style.transform = '';
      }, 50);
    });
  });

  // Keyboard shortcuts for quick access
  document.addEventListener('keydown', (e) => {
    // Ignore if user is typing in an input field
    if (e.target.matches('input, textarea, [contenteditable="true"]')) return;
    
    // Ignore if modifier keys are pressed (Ctrl/Cmd)
    if (e.metaKey || e.ctrlKey) return;
    
    const key = e.key.toLowerCase();
    
    switch(key) {
      case 'g':
        // Open GitHub
        const gh = cards.find(c => c.dataset.href && c.dataset.href.includes('github.com'));
        if (gh) {
          e.preventDefault();
          openHref(gh.dataset.href);
        }
        break;
        
      case 'y':
        // Open YouTube
        const yt = cards.find(c => c.dataset.href && c.dataset.href.includes('youtube.com'));
        if (yt) {
          e.preventDefault();
          openHref(yt.dataset.href);
        }
        break;
        
      case 'i':
        // Open first Instagram (AkaRJLive)
        const ig = cards.find(c => c.dataset.href && c.dataset.href.includes('instagram.com'));
        if (ig) {
          e.preventDefault();
          openHref(ig.dataset.href);
        }
        break;
    }
  });

  // Track link clicks (optional analytics)
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const platform = card.querySelector('h3')?.textContent || 'Unknown';
      console.log(`Social link clicked: ${platform}`);
      
      // If you have analytics, track it here
      if (typeof window.ebookApp !== 'undefined' && window.ebookApp.trackEvent) {
        window.ebookApp.trackEvent('social_click', platform);
      }
    });
  });

  // Add visual feedback for keyboard users
  cards.forEach(card => {
    card.addEventListener('focus', () => {
      card.style.outline = '2px solid rgba(0, 240, 255, 0.4)';
      card.style.outlineOffset = '4px';
    });
    
    card.addEventListener('blur', () => {
      card.style.outline = '';
      card.style.outlineOffset = '';
    });
  });

  // Console message
  console.log('%c🔗 Social Links Loaded', 'font-size: 16px; font-weight: bold; color: #00f0ff;');
  console.log('%cKeyboard shortcuts: G (GitHub), Y (YouTube), I (Instagram)', 'color: #ff2d95;');
})();