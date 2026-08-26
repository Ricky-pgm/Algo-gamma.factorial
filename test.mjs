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

function loadPage(file) {
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
      window.addEventListener("error", (e) => errors.push("window.onerror: " + (e.error && e.error.stack || e.message)));
    },
  });
  return { dom, errors };
}

function navChecks(d) {
  const links = [...d.querySelectorAll("#subNav a")];
  ok(links.length === 5, `subNav has 5 entries (got ${links.length})`);
  const hrefs = links.map(a => a.getAttribute("href").split("?")[0]).sort();
  ok(JSON.stringify(hrefs) === JSON.stringify(["a-quoi-ca-sert.html", "applications.html", "comment-cest-calcule.html", "faq.html", "index.html"]), "nav hrefs complete");
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
    ok(d.body.textContent.includes("120"), "evaluating 5! shows 120");
    input.value = "gamma(-0.5)";
    evalBtn.click();
    input.value = "(-0.5)!";
    evalBtn.click();
    ok(d.body.textContent.includes("1.7724538509055163"), "(-0.5)! parenthesized form evaluates");
    input.value = "C(10,3)";
    evalBtn.click();
    ok(d.body.textContent.includes("120"), "C(10,3) exact integer result");
    input.value = "gamma(-0.5)";
    evalBtn.click();
    ok(d.body.textContent.includes("-3.5449077018110304"), "gamma(-0.5) = -2*sqrt(pi)");
    ok(d.querySelectorAll(".example-chip").length >= 12, `example chips rendered (${d.querySelectorAll(".example-chip").length})`);
    ok(d.querySelectorAll(".spec-panel").length === 1, "spec panel present in aside");
  }
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
  }
}

console.log("== a-quoi-ca-sert.html ==");
{
  const { dom, errors } = loadPage("a-quoi-ca-sert.html");
  navChecks(dom.window.document);
  themeChecks(dom.window, dom.window.document);
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
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
}

console.log("== pascal-continuous.html ==");
{
  const { dom, errors } = loadPage("pascal-continuous.html");
  const d = dom.window.document;
  ok(errors.length === 0, "no script errors" + (errors.length ? " -> " + errors.join(" | ") : ""));
  ok(d.querySelectorAll("header").length >= 1, "page renders its header");
}

console.log(failures === 0 ? "\nALL TESTS PASSED" : `\n${failures} FAILURES`);
process.exit(failures === 0 ? 0 : 1);
