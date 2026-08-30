(function () {
  "use strict";
  const { t, formatResult, functionBadgeText, makeCopyLinkButton, makeFavoriteButton } = window.GF;
  // ===================== page infrastructure (3-page layout) =====================

  let langChangeHook = null;

  function setLang(lang) {
    if (!window.GF.hasLang(lang)) lang = "en";
    window.GF.setCurrentLang(lang);
    try { window.localStorage.setItem("gf-lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    const lbl = document.getElementById("langBtnLabel");
    if (lbl) lbl.textContent = window.GF.langLabel(lang);
    const menu = document.getElementById("langMenu");
    if (menu) {
      menu.querySelectorAll(".lang-option").forEach((opt) => {
        opt.setAttribute("aria-current", opt.dataset.lang === lang ? "true" : "false");
      });
    }
    if (window.GF._refreshThemeButton) window.GF._refreshThemeButton();
    if (langChangeHook) langChangeHook();
  }

  function setLangHook(fn) {
    langChangeHook = fn;
  }

  // Generic toggle-button + panel dropdown: hidden-attribute toggle,
  // outside-click close, Escape close. Shared by the language switch and
  // the nav menu so the 4 listeners aren't duplicated per dropdown.
  function initDropdown(btn, menu, { itemSelector, onSelect } = {}) {
    if (!btn || !menu) return;
    btn.addEventListener("click", () => {
      const isOpen = !menu.hidden;
      menu.hidden = isOpen;
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
    if (itemSelector) {
      menu.addEventListener("click", (event) => {
        const opt = event.target.closest(itemSelector);
        if (!opt) return;
        if (onSelect) onSelect(opt);
        menu.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      });
    }
    document.addEventListener("click", (event) => {
      if (!btn.contains(event.target) && !menu.contains(event.target)) {
        menu.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menu.hidden = true;
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  function initLangUI() {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");
    initDropdown(langBtn, langMenu, {
      itemSelector: ".lang-option",
      onSelect: (opt) => setLang(opt.dataset.lang),
    });
  }

  // Nav dropdown trigger (top-right, replaces the old full-width nav row).
  // Items are real <a href> elements, so no navigation logic is needed —
  // just close the menu on item click (before the browser navigates away).
  function initNavUI() {
    const navBtn = document.getElementById("navBtn");
    const navMenu = document.getElementById("subNav");
    if (!navBtn || !navMenu) return;
    navBtn.setAttribute("aria-label", t("navMenu"));
    navBtn.title = t("navMenu");
    initDropdown(navBtn, navMenu, { itemSelector: ".nav-item" });
  }

  // The expression currently in play: the page's own input if any, else the URL.
  function navExpr() {
    const fromUrl = new URL(window.location.href).searchParams.get("expr");
    const input = document.getElementById("exprInput");
    if (input && input.value.trim()) return input.value.trim();
    return fromUrl || "";
  }

  // Single source of truth for "all pages" — used by both the header
  // dropdown and the footer nav, so the 7-entry list is never duplicated.
  function navItems() {
    const expr = navExpr();
    const q = expr ? "?expr=" + encodeURIComponent(expr) : "";
    return [
      { page: "calc", href: "index.html" + q, key: "navCalc" },
      { page: "reasoning", href: "comment-cest-calcule.html" + q, key: "navReasoning" },
      { page: "apps", href: "a-quoi-ca-sert.html" + q, key: "navApps" },
      { page: "app", href: "applications.html" + q, key: "navApp" },
      { page: "pascal", href: "pascal-continuous.html", key: "navPascal" },
      { page: "practice", href: "practice.html", key: "navPractice" },
      { page: "faq", href: "faq.html", key: "navFaq" },
    ];
  }

  function renderHeaderNav(activePage) {
    const nav = document.getElementById("subNav");
    if (!nav) return;
    nav.innerHTML = "";
    for (const it of navItems()) {
      const a = document.createElement("a");
      a.className = "nav-item" + (activePage === it.page ? " active" : "");
      a.href = it.href;
      a.setAttribute("role", "menuitem");
      if (activePage === it.page) a.setAttribute("aria-current", "page");
      a.textContent = t(it.key);
      nav.appendChild(a);
    }
  }

  function renderFooterNav(activePage) {
    const nav = document.getElementById("footerNav");
    if (!nav) return;
    nav.innerHTML = "";
    for (const it of navItems()) {
      const a = document.createElement("a");
      a.className = "footer-nav-link" + (activePage === it.page ? " active" : "");
      a.href = it.href;
      if (activePage === it.page) a.setAttribute("aria-current", "page");
      a.textContent = t(it.key);
      nav.appendChild(a);
    }
  }

  // Kept as the single call-site every page/module already uses —
  // renders both the header dropdown and the footer nav from one call,
  // so no existing renderNav(navKey) call needs to change.
  function renderNav(activePage) {
    renderHeaderNav(activePage);
    renderFooterNav(activePage);
  }

  // A compact "expression = value" context line, used by the detail pages.
  function makeAnswerContext(expr, value, kind) {    const answer = document.createElement("div");
    answer.className = "result-answer";
    if (kind !== "number") {
      const badge = document.createElement("p");
      badge.className = "function-badge";
      badge.dataset.kind = kind;
      badge.textContent = functionBadgeText(kind);
      answer.appendChild(badge);
    }
    const eq = document.createElement("div");
    eq.className = "eq";
    eq.dataset.kind = kind;
    if (kind === "number") {
      const val = document.createElement("span");
      val.className = "eq-val";
      val.textContent = formatResult(value);
      eq.appendChild(val);
    } else {
      const lhs = document.createElement("span");
      lhs.className = "eq-lhs";
      lhs.textContent = expr;
      const op = document.createElement("span");
      op.className = "eq-op";
      op.textContent = "=";
      const val = document.createElement("span");
      val.className = "eq-val";
      val.textContent = formatResult(value);
      eq.appendChild(lhs);
      eq.appendChild(op);
      eq.appendChild(val);
    }
    answer.appendChild(eq);
    const actions = document.createElement("div");
    actions.className = "eq-actions";
    actions.appendChild(makeCopyLinkButton(expr));
    actions.appendChild(makeFavoriteButton(expr, formatResult(value), kind));
    answer.appendChild(actions);
    return answer;
  }

  // Shared page infrastructure for the 3 "detail" pages
  // (comment-cest-calcule.html, a-quoi-ca-sert.html, applications.html):
  // an evaluate-and-render loop, static-text/i18n wiring, and the common
  // init sequence, previously duplicated ~90 lines per page with only the
  // content builder, nav key, and i18n title/lede/empty keys differing.
  function initDetailPage(config) {
    const {
      navKey,
      buildContentBlock,
      titleKey,
      ledeKey,
      emptyKey,
      onComplexResult,
      afterApplyStaticText,
      afterInit,
    } = config;

    const { t, evalExpression, resolveResult, makeFallbackNotice, formatResult } = window.GF;
    const exprInput = document.getElementById("exprInput");
    const evalBtn = document.getElementById("evalBtn");
    const resultArea = document.getElementById("resultArea");
    const resultEmpty = document.getElementById("resultEmpty");

    let last = null; // { expr, value, plot, kind, source }

    function render() {
      resultArea.innerHTML = "";
      if (!last) {
        resultArea.appendChild(resultEmpty);
        return;
      }
      const { expr, value, plot, kind, source } = last;
      resultArea.appendChild(makeAnswerContext(expr, value, kind));
      if (source === "local-fallback") resultArea.appendChild(makeFallbackNotice());
      const block = buildContentBlock(plot, value, kind);
      if (block) {
        resultArea.appendChild(block);
      } else if (kind !== "number" && onComplexResult) {
        onComplexResult(resultArea);
      }
    }

    async function run() {
      const expr = exprInput.value.trim();
      if (!expr) return;
      resultArea.innerHTML = "";
      try {
        const { value, plot, kind, source } = await resolveResult(expr);
        last = { expr, value, plot, kind, source };
        render();
        window.history.replaceState(null, "", window.GF.urlFor(expr));
        renderNav(navKey);
      } catch (e) {
        const p = document.createElement("p");
        p.className = "result-error";
        p.textContent = t("error") + ": " + e.message;
        resultArea.appendChild(p);
      }
    }

    function applyStaticText() {
      document.getElementById("eyebrow").textContent = t("eyebrow");
      document.getElementById("pageTitle").textContent = t(titleKey);
      document.getElementById("pageLede").textContent = t(ledeKey);
      document.title = t(titleKey) + " — gamma-factorial";
      exprInput.placeholder = t("inputPlaceholder");
      evalBtn.textContent = t("evaluate");
      resultEmpty.textContent = t(emptyKey);
      const note = document.getElementById("noteText");
      if (note) note.textContent = t("note", { c1: "1+2i", c2: "1+2j" });
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        el.textContent = t(el.dataset.i18n);
      });
      if (afterApplyStaticText) afterApplyStaticText();
    }

    setLangHook(() => {
      applyStaticText();
      window.GF.renderKeypad();
      renderNav(navKey);
      render();
    });

    evalBtn.addEventListener("click", run);
    exprInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") run();
    });
    const examplesEl = document.getElementById("examples");
    if (examplesEl) {
      examplesEl.addEventListener("click", (event) => {
        const btn = event.target.closest(".example-chip");
        if (!btn) return;
        exprInput.value = btn.dataset.expr;
        run();
        exprInput.focus();
      });
    }

    initLangUI();
    initNavUI();
    setLang(window.GF.detectInitialLang());
    window.GF.initThemeToggle();

    const urlExpr = new URL(window.location.href).searchParams.get("expr");
    if (urlExpr) {
      exprInput.value = urlExpr;
      run();
    } else {
      render();
    }
    exprInput.focus();

    if (afterInit) afterInit({ run, render, exprInput, evalBtn, resultArea, resultEmpty });

    return { run, render };
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, {
    setLang,
    setLangHook,
    initLangUI,
    initNavUI,
    renderNav,
    navExpr,
    makeAnswerContext,
    initDetailPage,
  });
})();
