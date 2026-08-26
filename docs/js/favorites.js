(function () {
  "use strict";
  const { t } = window.GF;
  // ===================== favorites =====================
  // A user-curated, uncapped list of saved expressions, persisted in
  // localStorage("gf-favorites") — distinct from history (recent, capped,
  // clearable in bulk) and pinned curves (transient comparison, max 3).
  // The toggle button lives in nav.js's makeAnswerContext(), so this state
  // must be reachable from all 4 pages, not just index.html.

  const FAV_KEY = "gf-favorites";

  function loadFavorites() {
    let raw = null;
    try { raw = window.localStorage.getItem(FAV_KEY); } catch (e) { return []; }
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.filter((f) => f && typeof f.expr === "string") : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites() {
    try { window.localStorage.setItem(FAV_KEY, JSON.stringify(favorites)); } catch (e) { /* ignore */ }
  }

  const favorites = loadFavorites();

  function isFavorite(expr) {
    return favorites.some((f) => f.expr === expr);
  }

  function toggleFavorite(expr, display, kind) {
    const idx = favorites.findIndex((f) => f.expr === expr);
    if (idx >= 0) favorites.splice(idx, 1);
    else favorites.unshift({ expr, display, kind, ts: Date.now() });
    saveFavorites();
    renderFavoritesList();
  }

  function removeFavorite(expr) {
    const idx = favorites.findIndex((f) => f.expr === expr);
    if (idx < 0) return;
    favorites.splice(idx, 1);
    saveFavorites();
    renderFavoritesList();
  }

  function getFavorites() {
    return favorites.slice();
  }

  function renderFavoritesList() {
    const section = document.getElementById("favoritesSection");
    const list = document.getElementById("favoritesList");
    if (!section || !list) return; // not every page has a favorites browser (only index.html)
    list.innerHTML = "";
    if (favorites.length === 0) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    for (const fav of favorites) {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "history-item favorite-item";

      const status = document.createElement("span");
      status.className = "h-status";

      const main = document.createElement("span");
      main.className = "h-main";
      const exprSpan = document.createElement("span");
      exprSpan.className = "h-expr";
      exprSpan.textContent = fav.expr;
      const valueSpan = document.createElement("span");
      valueSpan.className = "h-value";
      valueSpan.textContent = fav.display;
      main.appendChild(exprSpan);
      main.appendChild(valueSpan);

      const remove = document.createElement("span");
      remove.className = "pinned-remove favorite-remove";
      remove.textContent = "×";
      remove.setAttribute("role", "button");
      remove.setAttribute("tabindex", "0");
      remove.setAttribute("aria-label", t("removeFavorite", { expr: fav.expr }));
      remove.addEventListener("click", (event) => {
        event.stopPropagation();
        removeFavorite(fav.expr);
      });
      remove.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          event.stopPropagation();
          removeFavorite(fav.expr);
        }
      });

      item.appendChild(status);
      item.appendChild(main);
      item.appendChild(remove);
      item.addEventListener("click", () => {
        const exprInput = document.getElementById("exprInput");
        const evalBtn = document.getElementById("evalBtn");
        if (!exprInput || !evalBtn) return;
        exprInput.value = fav.expr;
        evalBtn.click();
      });
      list.appendChild(item);
    }
  }

  function makeFavoriteButton(expr, display, kind) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "text-btn fav-btn";

    function refresh() {
      const fav = isFavorite(expr);
      btn.textContent = (fav ? "★ " : "☆ ") + t(fav ? "removeFromFavorites" : "addToFavorites");
      btn.setAttribute("aria-pressed", String(fav));
    }

    btn.addEventListener("click", () => {
      toggleFavorite(expr, display, kind);
      refresh();
    });
    refresh();
    return btn;
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, {
    isFavorite,
    toggleFavorite,
    removeFavorite,
    getFavorites,
    renderFavoritesList,
    makeFavoriteButton,
  });
})();
