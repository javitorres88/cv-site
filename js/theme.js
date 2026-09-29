/* Theme toggling for Javier Torres — personal site.
   Persists the visitor's choice in localStorage and falls back to
   the operating system preference (light/dark). */

(function () {
  'use strict';

  var STORAGE_KEY = 'javier-site-theme';
  var root = document.documentElement;
  var toggle = document.getElementById('theme-toggle');

  function currentTheme() {
    return root.getAttribute('data-theme') || 'light';
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (toggle) {
      var isDark = theme === 'dark';
      toggle.setAttribute('aria-pressed', String(isDark));
      toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    }
    if (persist) {
      try { localStorage.setItem(STORAGE_KEY, theme); } catch (e) {}
    }
  }

  // Reflect the current theme on the toggle (icon + accessible state).
  setTheme(currentTheme(), false);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      setTheme(next, true);
    });
  }

  // When the visitor has no stored preference, follow system changes.
  var stored = null;
  try { stored = localStorage.getItem(STORAGE_KEY); } catch (e) {}
  if (!stored && window.matchMedia) {
    var mq = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', function (event) {
        setTheme(event.matches ? 'dark' : 'light', false);
      });
    } else if (typeof mq.addListener === 'function') {
      mq.addListener(function (event) {
        setTheme(event.matches ? 'dark' : 'light', false);
      });
    }
  }
})();