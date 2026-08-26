(function () {
  "use strict";
  const { t } = window.GF;
  // ===================== theme toggle =====================
  // Light/dark follows prefers-color-scheme unless the user picks a side;
  // the explicit choice persists in localStorage("gf-theme") and is applied
  // as data-theme on <html>, which style.css reads via :root[data-theme=...].

  const THEME_KEY = "gf-theme";

  function storedTheme() {
    try { return window.localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function appliedTheme() {
    const attr = document.documentElement.dataset.theme;
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function refreshThemeButton() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const next = appliedTheme() === "dark" ? "light" : "dark";
    // The label announces what clicking will switch TO.
    // Inline SVG icons: crisp and consistent across platforms, unlike emoji.
    const ICONS = {
      dark:
        '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      light:
        '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    };
    btn.innerHTML = ICONS[next];
    const label = t(next === "dark" ? "themeToDark" : "themeToLight");
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function cycleTheme() {
    const next = appliedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    refreshThemeButton();
  }

  function initThemeToggle() {
    const stored = storedTheme();
    if (stored === "dark" || stored === "light") {
      document.documentElement.dataset.theme = stored;
    }
    const btn = document.getElementById("themeToggle");
    if (!btn || btn.dataset.themeBound === "true") return;
    btn.dataset.themeBound = "true";
    btn.addEventListener("click", cycleTheme);
    refreshThemeButton();
  }


  window.GF = window.GF || {};
  Object.assign(window.GF, {
    initThemeToggle,
  });
  // Internal bridge, not a public API: setLang() in nav.js needs to refresh
  // the theme button's icon/label when the language changes (the aria-label
  // text is localized). Not exported as a public GF.* name since it's not
  // meant to be called by page scripts directly.
  window.GF._refreshThemeButton = refreshThemeButton;
})();
