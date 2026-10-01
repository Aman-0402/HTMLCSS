// Shared light/dark theme toggle. Include with a relative path from any page:
// <script src="theme-toggle.js" defer></script>
(function () {
  var saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);

  function mount() {
    var btn = document.createElement('button');
    btn.id = 'theme-toggle-btn';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle light and dark theme');
    btn.textContent = saved === 'dark' ? '☀️' : '🌙';
    btn.style.cssText =
      'position:fixed;top:16px;right:16px;z-index:9999;width:44px;height:44px;' +
      'border-radius:50%;border:1px solid rgba(128,128,128,0.35);' +
      'background:rgba(127,127,127,0.15);backdrop-filter:blur(6px);' +
      'font-size:1.25rem;line-height:1;cursor:pointer;' +
      'display:flex;align-items:center;justify-content:center;' +
      'box-shadow:0 4px 14px rgba(0,0,0,0.25);transition:transform .2s ease;';
    btn.addEventListener('mouseenter', function () { btn.style.transform = 'scale(1.08)'; });
    btn.addEventListener('mouseleave', function () { btn.style.transform = 'scale(1)'; });
    btn.addEventListener('click', function () {
      var cur = document.documentElement.getAttribute('data-theme');
      var next = cur === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
    document.body.appendChild(btn);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
