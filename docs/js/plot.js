(function () {
  "use strict";
  const { t, gammaSafe, doubleFactorial, binomial, beta, Complex } = window.GF;
  function evalAt(kind, x, extra) {
    try {
      if (kind === "gamma") return gammaSafe(x);
      if (kind === "factorial") return gammaSafe(x + 1);
      if (kind === "doubleFactorial") {
        if (!Number.isInteger(x) || x < -1) return null;
        const r = doubleFactorial(new Complex(x, 0));
        return r.isReal ? r.re : null;
      }
      if (kind === "binomial") {
        const r = binomial(new Complex(extra.n, 0), new Complex(x, 0));
        return r.isReal && Number.isFinite(r.re) ? r.re : null;
      }
      if (kind === "beta") {
        const r = beta(new Complex(x, 0), new Complex(extra.b, 0));
        return r.isReal && Number.isFinite(r.re) ? r.re : null;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function defaultRange(plot) {
    if (plot.kind === "binomial") return [-1, plot.n + 1];
    if (plot.kind === "beta") return [Math.max(0.1, plot.center - 5), plot.center + 5];
    if (plot.kind === "doubleFactorial") return [Math.max(-1, plot.center - 10), plot.center + 10];
    const span = Math.max(3, Math.abs(plot.center) * 0.6 + 2);
    return [plot.center - span, plot.center + span];
  }

  function makeTextButton(label, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "text-btn";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function makeToolButton(icon, label, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tool-btn";
    const iconSpan = document.createElement("span");
    iconSpan.className = "tool-btn-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = icon;
    btn.appendChild(iconSpan);
    btn.appendChild(document.createTextNode(label));
    btn.addEventListener("click", onClick);
    return btn;
  }

  function urlFor(expr) {
    const url = new URL(window.location.href);
    url.searchParams.set("expr", expr);
    return url;
  }

  function makeCopyLinkButton(expr) {
    const btn = makeTextButton(t("copyLink"), async () => {
      try {
        await navigator.clipboard.writeText(urlFor(expr).toString());
        btn.textContent = t("copied");
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = t("copyLink");
          btn.classList.remove("copied");
        }, 1500);
      } catch (e) {
        btn.textContent = t("copyFailed");
      }
    });
    return btn;
  }

  function functionBadgeText(kind) {
    if (kind === "number") return t("badgeNumber");
    if (kind === "gamma") return t("badgeGamma");
    if (kind === "factorial") return t("badgeFactorial");
    if (kind === "doubleFactorial") return t("badgeDoubleFactorial");
    if (kind === "beta") return t("badgeBeta");
    return t("badgeBinomial");
  }

  function round(x, digits) {
    return Number(x.toFixed(digits));
  }


  window.GF = window.GF || {};
  Object.assign(window.GF, {
    evalAt,
    defaultRange,
    makeTextButton,
    makeToolButton,
    urlFor,
    makeCopyLinkButton,
    round,
  });
})();
