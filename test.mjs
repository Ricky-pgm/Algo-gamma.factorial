import pkg from "jsdom";
const { JSDOM, VirtualConsole } = pkg;
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DOCS = path.join(path.dirname(fileURLToPath(import.meta.url)), "docs");
let failures = 0;

function ok(cond, label) {
  if (cond) console.log("  PASS", label);
  else { failures++; console.log("  FAIL", label); }
}

// Inline local <script src> files and drop external stylesheets so jsdom can
// execute everything without a network/resource loader.
function inlinePage(file) {
  let html = fs.readFileSync(`${DOCS}/${file}`, "utf8");
  html = html.replace(/<script src="([^"]+)"><\/script>/g, (_, src) =>
    `<script>${fs.readFileSync(`${DOCS}/${src}`, "utf8")}</script>`);
  html = html.replace(/<link rel="stylesheet"[^>]*>/g, "");
  return html;
}

// Absorbs any property access / method call / coercion — stands in for a
// canvas 2D context so plot code runs under jsdom without node-canvas.
const magic = new Proxy(function () {}, {
  get: (t, p) => (p === Symbol.toPrimitive ? () => 0 : magic),
  apply: () => magic,
  set: () => true,
});

// Mirrors gamma_factorial/api.py's _serialize(): a real Complex becomes a
// bare number, a non-real one becomes {real, imag}.
function serializeComplex(c) {
  return c.isReal ? c.re : { real: c.re, imag: c.im };
}

// Synthesizes a same-shape response for GF.resolveResult()'s fetch calls,
// reusing the page's own math functions (window.GF) — no real network
// call, no separate "expected value" to keep in sync by hand.
function fakeApiFetch(window) {
  return async (url) => {
    const [, op, ...parts] = new URL(url, "http://localhost").pathname.split("/");
    const args = parts.map((p) => window.GF.parseNumber(decodeURIComponent(p)));
    const compute = {
      factorial: () => window.GF.factorial(args[0]),
      gamma: () => window.GF.gamma(args[0]),
      "double-factorial": () => window.GF.doubleFactorial(args[0]),
      binomial: () => window.GF.binomial(args[0], args[1]),
      beta: () => window.GF.beta(args[0], args[1]),
    }[op];
    if (!compute) return { ok: false, status: 404, json: async () => ({}) };
    try {
      const result = serializeComplex(compute());
      return { ok: true, status: 200, json: async () => ({ input: parts, operation: op, result }) };
    } catch (e) {
      return { ok: false, status: 400, json: async () => ({ detail: e.message }) };
    }
  };
}

function loadPage(file, { fetchImpl = "fake", seedLocalStorage = null } = {}) {
  const html = inlinePage(file);
  const errors = [];
  const vc = new VirtualConsole();
  vc.on("jsdomError", (e) => {
    const m = e.message || "";
    if (m.includes("Could not load")) return; // stripped stylesheets
    errors.push("jsdomError: " + m);
  });
  vc.on("error", (m) => errors.push("console.error: " + m));
  const dom = new JSDOM(html, {
    url: "http://localhost/" + file,
    runScripts: "dangerously",
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
      window.HTMLCanvasElement.prototype.getContext = () => magic;
      if (seedLocalStorage) {
        for (const [k, v] of Object.entries(seedLocalStorage)) {
          if (v !== null && v !== undefined) window.localStorage.setItem(k, v);
        }
      }
      window.addEventListener("error", (e) => errors.push("window.onerror: " + (e.error && e.error.stack || e.message)));
      if (fetchImpl === "fake") {
        // window.GF isn't defined yet at this point (the page's own
        // <script> hasn't run), but it will be by the time anything
        // actually calls fetch(), since that only happens from a click
        // handler after the page has finished loading.
        window.fetch = fakeApiFetch(window);
      } else if (fetchImpl === "offline") {
        window.fetch = async () => { throw new TypeError("network unreachable (simulated)"); };
      }
    },
  });
  return { dom, errors };
}

// Flushes pending microtasks (e.g. the fetch()/then chain inside
// resolveResult) so DOM assertions right after a .click() see the
// post-await state instead of racing it.
function flush() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function navChecks(d) {
  const links = [...d.querySelectorAll("#subNav a")];
  ok(links.length === 6, `subNav has 6 entries (got ${links.length})`);
  const hrefs = links.map(a => a.getAttribute("href").split("?")[0]).sort();
  ok(JSON.stringify(hrefs) === JSON.stringify(["a-quoi-ca-sert.html", "applications.html", "comment-cest-calcule.html", "faq.html", "index.html", "pascal-continuous.html"]), "nav hrefs complete");
}

function themeChecks(w, d) {
  const btn = d.getElementById("themeToggle");
  ok(!!btn, "theme toggle present");
  if (!btn) return;
  btn.click();
  ok(d.documentElement.dataset.theme === "dark", "click -> data-theme=dark");
  ok(w.localStorage.getItem("gf-theme") === "dark", "choice persisted");
  ok(btn.querySelector("svg") !== null, "icon is an inline SVG");
  ok((btn.getAttribute("aria-label") || "").length > 0, "aria-label translated");
  btn.click();
  ok(d.documentElement.dataset.theme === "light", "second click -> back to light");
}

console.log("== window.GF export surface (docs/js/*.js split) ==");
{
  // Guards against a module silently losing (or unintentionally gaining)
  // a public export across the 9-file split of the former single-file
  // shared.js — a page loading fine tells you nothing about this, since
  // a missing GF.foo only breaks whichever code path calls it.
  const PUBLIC_GF_KEYS = [
    "t", "detectInitialLang", "hasLang", "setCurrentLang", "langLabel",
    "Complex", "GammaError", "parseNumber", "formatResult", "evalExpression",
    "gamma", "gammaSafe", "factorial", "doubleFactorial", "binomial", "beta",
    "resolveResult", "makeFallbackNotice",
    "evalAt", "defaultRange", "makeTextButton", "makeToolButton", "urlFor",
    "makeCopyLinkButton", "functionBadgeText", "round",
    "buildReasoning", "makeReasoningBlock",
    "buildPractical", "makePracticalBlock",
    "insertAtCursor", "renderKeypad",
    "initThemeToggle",
    "setLang", "setLangHook", "initLangUI", "renderNav", "navExpr",
    "makeAnswerContext", "initDetailPage",
    "isFavorite", "toggleFavorite", "removeFavorite", "getFavorites",
    "renderFavoritesList", "makeFavoriteButton",
    "renderMiniChart", "initDomainSlider",
  ];
  const { dom: gfDom } = loadPage("index.html");
  const actualKeys = Object.keys(gfDom.window.GF).filter((k) => !k.startsWith("_")).sort();
  const expectedSorted = [...PUBLIC_GF_KEYS].sort();
  const missing = expectedSorted.filter((k) => !actualKeys.includes(k));
  const extra = actualKeys.filter((k) => !expectedSorted.includes(k));
  ok(missing.length === 0, `no missing GF exports${missing.length ? " -> " + missing.join(", ") : ""}`);
  ok(extra.length === 0, `no unexpected GF exports${extra.length ? " -> " + extra.join(", ") : ""}`);
  ok(typeof gfDom.window.GF._refreshThemeButton === "function", "internal theme->nav bridge present");
}

console.log("== index.html ==");
{
  const { dom, errors } = loadPage("index.html");
  const w = dom.window, d = w.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  ok(!!w.GF, "window.GF defined");
  navChecks(d);
  themeChecks(w, d);
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  ok(!!input && !!evalBtn, "input + eval button exist");
  if (input && evalBtn) {
    input.value = "5!";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("120"), "evaluating 5! shows 120");
    input.value = "gamma(-0.5)";
    evalBtn.click();
    await flush();
    input.value = "(-0.5)!";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("1.7724538509055163"), "(-0.5)! parenthesized form evaluates");
    input.value = "C(10,3)";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("120"), "C(10,3) exact integer result");
    input.value = "gamma(-0.5)";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("-3.5449077018110304"), "gamma(-0.5) = -2*sqrt(pi)");
    ok(d.querySelectorAll(".example-chip").length >= 12, `example chips rendered (${d.querySelectorAll(".example-chip").length})`);
    ok(d.querySelectorAll(".spec-panel").length === 1, "spec panel present in aside");
    ok(d.querySelector(".result-fallback-notice") === null, "no fallback notice when API mock succeeds");

    // Regression guard for the index.html cleanup that dropped its local
    // makeTextButton/makeToolButton/urlFor/defaultRange copies in favor of
    // GF.* (plot.js) — pin-to-compare exercises makeTextButton end to end.
    input.value = "5!";
    evalBtn.click();
    await flush();
    const pinBtn = [...d.querySelectorAll(".text-btn")].find((b) => b.textContent === "pin to compare");
    ok(!!pinBtn, "pin to compare button renders");
    if (pinBtn) {
      pinBtn.click();
      ok(d.getElementById("pinnedSection").hidden === false, "pinned section becomes visible after pinning");
      ok(d.querySelectorAll(".pinned-chip").length === 1, "pinned chip added to the list");
    }

    // Favorites: toggle button lives in every result's .eq-actions (via
    // nav.js's makeAnswerContext), independent of whether a plot exists.
    const favBtn = d.querySelector(".fav-btn");
    ok(!!favBtn, "favorite toggle button renders");
    if (favBtn) {
      ok(favBtn.getAttribute("aria-pressed") === "false", "favorite toggle starts unfavorited");
      favBtn.click();
      ok(favBtn.getAttribute("aria-pressed") === "true", "favorite toggle switches to favorited");
      ok(w.localStorage.getItem("gf-favorites") !== null, "favorites persisted to localStorage");
      ok(d.getElementById("favoritesSection").hidden === false, "favorites section becomes visible after favoriting");
      ok(d.querySelectorAll(".favorites-list .favorite-item").length === 1, "favorite item added to the sidebar list");
    }

    ok(w.localStorage.getItem("gf-history") !== null, "history persisted to localStorage after eval");
    ok(w.localStorage.getItem("gf-pinned") !== null, "pinned curves persisted to localStorage after pinning");
  }
}

console.log("== index.html persistence (simulated reload) ==");
{
  // First pass: evaluate, pin, and favorite something, then capture what
  // got written to localStorage.
  const { dom, errors } = loadPage("index.html");
  const w = dom.window, d = w.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  input.value = "6!";
  evalBtn.click();
  await flush();
  const pinBtn = [...d.querySelectorAll(".text-btn")].find((b) => b.textContent === "pin to compare");
  if (pinBtn) pinBtn.click();
  const favBtn = d.querySelector(".fav-btn");
  if (favBtn) favBtn.click();

  const seed = {
    "gf-history": w.localStorage.getItem("gf-history"),
    "gf-pinned": w.localStorage.getItem("gf-pinned"),
    "gf-favorites": w.localStorage.getItem("gf-favorites"),
  };

  // Second pass: a fresh JSDOM instance seeded with the first pass's
  // localStorage — each loadPage() otherwise gets its own isolated store,
  // so this is how a page reload is simulated here.
  const { dom: dom2, errors: errors2 } = loadPage("index.html", { seedLocalStorage: seed });
  const d2 = dom2.window.document;
  ok(errors2.length === 0, "reload: no script errors" + (errors2.length ? " -> " + errors2.join(" | ") : ""));
  ok(d2.getElementById("historySection").hidden === false, "reload: history section restored visible");
  ok(d2.querySelectorAll(".history-item").length >= 1, "reload: history items restored");
  ok(d2.getElementById("pinnedSection").hidden === false, "reload: pinned section restored visible");
  ok(d2.querySelectorAll(".pinned-chip").length === 1, "reload: pinned chip restored");
  ok(d2.getElementById("favoritesSection").hidden === false, "reload: favorites section restored visible");
  ok(d2.querySelectorAll(".favorites-list .favorite-item").length === 1, "reload: favorite item restored");

  // Exercise the Complex-reconstruction path: evaluate a plottable
  // expression on the reloaded page so rerenderPlot() reads the restored
  // pin's .value.isReal — if reconstruction were skipped (a plain object
  // instead of a real GF.Complex instance), this would throw.
  const input2 = d2.getElementById("exprInput");
  const evalBtn2 = d2.getElementById("evalBtn");
  input2.value = "7!";
  evalBtn2.click();
  await flush();
  ok(errors2.length === 0, "reload: plotting alongside a restored pin does not throw");
}

console.log("== index.html persistence: corrupted/absent localStorage ==");
{
  const badSeeds = [
    { key: "gf-history", value: "{not valid json" },
    { key: "gf-pinned", value: "null" },
    { key: "gf-pinned", value: '[{"expr":"x"}]' },
    { key: "gf-favorites", value: '"just a string"' },
  ];
  for (const { key, value } of badSeeds) {
    const { dom, errors } = loadPage("index.html", { seedLocalStorage: { [key]: value } });
    const d = dom.window.document;
    ok(errors.length === 0, `corrupted ${key} does not throw a script error`);
    ok(d.getElementById("historySection").hidden === true, `corrupted ${key}: history still shows empty state`);
    ok(d.getElementById("favoritesSection").hidden === true, `corrupted ${key}: favorites still shows empty state`);
  }

  // No seeding at all: the "never used this feature before" case.
  const { dom, errors } = loadPage("index.html");
  const d = dom.window.document;
  ok(errors.length === 0, "no gf-history/gf-pinned/gf-favorites keys yet: no script error");
  ok(d.getElementById("historySection").hidden === true, "history hidden with no stored key");
  ok(d.getElementById("pinnedSection").hidden === true, "pinned hidden with no stored key");
  ok(d.getElementById("favoritesSection").hidden === true, "favorites hidden with no stored key");
}

console.log("== comment-cest-calcule.html ==");
{
  const { dom, errors } = loadPage("comment-cest-calcule.html");
  const w = dom.window, d = w.document;
  navChecks(d);
  themeChecks(w, d);
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  // Test reasoning toggle: 5! has 6 steps, so toggle should appear
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  if (input && evalBtn) {
    input.value = "5!";
    evalBtn.click();
    await flush();
    const toggle = d.querySelector(".reasoning-toggle");
    ok(!!toggle, "reasoning toggle button appears for 5! (6 steps)");
    if (toggle) {
      ok(toggle.getAttribute("aria-expanded") === "false", "toggle starts collapsed");
      const extraBefore = d.querySelector(".reasoning-extra");
      ok(extraBefore && extraBefore.hidden, "extra steps hidden initially");
      toggle.click();
      ok(toggle.getAttribute("aria-expanded") === "true", "toggle expands on click");
      ok(extraBefore && !extraBefore.hidden, "extra steps visible after click");
      toggle.click();
      ok(toggle.getAttribute("aria-expanded") === "false", "toggle collapses again");
    }

    // Favorites work from a detail page too (favorites.js is a shared
    // module, not index.html-only) — this page has no #favoritesSection,
    // so only the toggle button + persistence are checked, not a list.
    const favBtn = d.querySelector(".fav-btn");
    ok(!!favBtn, "favorite toggle button renders on a detail page");
    if (favBtn) {
      favBtn.click();
      ok(favBtn.getAttribute("aria-pressed") === "true", "favorite toggle works from a detail page");
      ok(w.localStorage.getItem("gf-favorites") !== null, "favoriting from a detail page persists to localStorage");
    }
  }
}

console.log("== a-quoi-ca-sert.html ==");
{
  const { dom, errors } = loadPage("a-quoi-ca-sert.html");
  const d = dom.window.document;
  navChecks(d);
  themeChecks(dom.window, d);
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  ok(!!input && !!evalBtn, "input + eval button exist");
  if (input && evalBtn) {
    input.value = "5!";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("120"), "evaluating 5! shows 120");
    ok(d.querySelector(".practical") !== null, "practical-use block renders for 5!");
  }
}

console.log("== faq.html ==");
{
  const { dom, errors } = loadPage("faq.html");
  const w = dom.window, d = w.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  navChecks(d);
  themeChecks(w, d);
  ok(d.querySelectorAll(".faq-item").length === 8, "8 FAQ items rendered");
  ok(d.body.textContent.includes("What exactly does"), "English copy applied");
  w.GF.setLang("fr");
  ok(d.body.textContent.includes("Foire aux questions"), "switching to French re-renders FAQ");
  w.GF.setLang("de");
  ok(d.body.textContent.includes("Häufig gestellte Fragen"), "switching to German re-renders FAQ");
}

console.log("== applications.html ==");
{
  const { dom, errors } = loadPage("applications.html");
  const w = dom.window, d = w.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  ok(!!w.GF, "window.GF defined");
  navChecks(d);
  themeChecks(w, d);
  ok(d.querySelectorAll(".domain-card").length === 6, "6 domain cards rendered");
  ok(d.querySelectorAll(".domain-card .example-chip").length >= 12, "domain cards have example chips");
  ok(d.querySelectorAll(".domain-stat").length === 6, "domain cards have stat numbers");
  ok(d.querySelectorAll(".domain-icon").length === 6, "domain cards have icons");
  const csDesc = d.querySelector('[data-domain="cs"] .domain-desc');
  ok(csDesc && csDesc.textContent.includes("76 years"), "CS card has compelling description");
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  ok(!!input && !!evalBtn, "input + eval button exist");
  if (input && evalBtn) {
    input.value = "C(49,6)";
    evalBtn.click();
    await flush();
    ok(d.body.textContent.includes("13983816"), "C(49,6) evaluates to 13983816");
  }
  w.GF.setLang("fr");
  const csDescFR = d.querySelector('[data-domain="cs"] .domain-desc');
  ok(csDescFR && csDescFR.textContent.includes("76 ans"), "FR translation applied to domain cards");
  const statFR = d.querySelector('[data-domain="cs"] .domain-stat');
  ok(statFR && statFR.textContent.includes("2,4"), "FR stat number uses comma separator");
  w.GF.setLang("de");
  const csDescDE = d.querySelector('[data-domain="cs"] .domain-desc');
  ok(csDescDE && csDescDE.textContent.includes("76 Jahre"), "DE translation applied to domain cards");
  w.GF.setLang("en");

  ok(d.querySelectorAll(".domain-expand").length === 6, "6 domain cards have a learn-more accordion");
  ok(d.querySelectorAll(".domain-inline-result").length === 6, "6 domain cards have an inline-result container");
  const csCard = d.querySelector('[data-domain="cs"]');
  const csChip = csCard.querySelector(".domain-expand-example .example-chip");
  ok(!!csChip, "CS accordion example has its own chip");
  if (csChip) {
    const before = w.scrollY;
    csChip.click();
    await flush();
    const inlineResult = csCard.querySelector(".domain-inline-result");
    ok(!inlineResult.hidden && inlineResult.textContent.trim().length > 0, "clicking a card chip shows a result inline in that card");
    ok(w.scrollY === before, "clicking a card chip does not scroll the page");
  }

  // Domain mini-viz sliders — offline-only (no fetch), one per card.
  ok(d.querySelectorAll(".domain-viz").length === 6, "6 domain cards have a mini-viz widget");
  ok(d.querySelectorAll(".domain-viz-slider").length === 6, "6 domain-viz sliders rendered");
  ok(d.querySelectorAll(".mini-chart-svg").length === 6, "6 mini-chart SVGs rendered on load");

  const csSlider = d.querySelector('[data-domain="cs"] .domain-viz-slider');
  const csReadout = d.querySelector('[data-domain="cs"] .domain-viz-readout');
  ok(!!csSlider && !!csReadout, "CS card slider + readout exist");
  if (csSlider && csReadout) {
    const before = w.scrollY;
    const readoutBefore = csReadout.textContent;
    csSlider.value = "12";
    csSlider.dispatchEvent(new w.Event("input", { bubbles: true }));
    await flush();
    ok(csReadout.textContent !== readoutBefore, "dragging CS slider updates the readout");
    ok(csReadout.textContent.includes("12"), "CS readout reflects new slider value");
    ok(w.scrollY === before, "dragging a card slider does not scroll the page");
  }

  // physics/bio (doubleFactorial) render discrete points, not a connected line
  const physicsCircles = d.querySelectorAll('[data-domain="physics"] .mini-chart-svg circle');
  const physicsPath = d.querySelector('[data-domain="physics"] .mini-chart-svg path');
  ok(physicsCircles.length > 0, "physics card renders discrete point markers (doubleFactorial)");
  ok(!physicsPath, "physics card does not render a connected curve line");

  // stats/everyday (binomial) render a connected curve
  const statsPath = d.querySelector('[data-domain="stats"] .mini-chart-svg path');
  ok(!!statsPath, "stats card renders a connected curve line (binomial)");

  const vizSrc = fs.readFileSync(`${DOCS}/js/domain-viz.js`, "utf8");
  ok(!vizSrc.includes("fetch("), "domain-viz.js makes no network calls");
}

console.log("== pascal-continuous.html ==");
{
  const { dom, errors } = loadPage("pascal-continuous.html");
  const d = dom.window.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  ok(d.querySelectorAll("header").length >= 1, "page renders its header");
  navChecks(d);
  ok(d.getElementById("themeToggle") !== null, "theme toggle present (shared with the rest of the site)");
  ok(d.getElementById("pageTitle").textContent === "Pascal's triangle, made continuous", "page title set via shared i18n");
  ok(d.getElementById("kOut").textContent === "2.00", "cursor readout renders for the default row");
  ok(d.getElementById("tableBody").children.length === 6, "comparison table has one row per k from 0 to n=5");

  d.getElementById("themeToggle").click();
  ok(d.documentElement.dataset.theme === "dark", "theme toggle switches to dark like every other page");

  d.getElementById("langBtn").click();
  d.querySelector('.lang-option[data-lang="fr"]').click();
  ok(d.getElementById("pageTitle").textContent === "Le triangle de Pascal, rendu continu", "switching to French re-renders the page title");
  ok(d.getElementById("statusOut").textContent === "valeur entière exacte", "switching language re-renders the status readout too");
}

console.log("== index.html (API unreachable -> local fallback) ==");
{
  const { dom, errors } = loadPage("index.html", { fetchImpl: "offline" });
  const d = dom.window.document;
  const input = d.getElementById("exprInput");
  const evalBtn = d.getElementById("evalBtn");
  if (input && evalBtn) {
    input.value = "5!";
    evalBtn.click();
    await flush();
    ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
    ok(d.body.textContent.includes("120"), "5! still evaluates to 120 via local fallback");
    ok(d.querySelector(".result-fallback-notice") !== null, "fallback notice shown when API is unreachable");
  }
}

console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
