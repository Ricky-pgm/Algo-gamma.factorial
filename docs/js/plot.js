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

  // Icon-only action button: a neutral circle (no colored chip), inline
  // SVG using stroke="currentColor" so it's theme-aware automatically,
  // label becomes the tooltip (title) and accessible name (aria-label)
  // since there's no visible text. Replaces the old makeTextButton/
  // makeToolButton "sticker" look (colored pill or emoji-in-a-chip).
  function makeIconButton(svg, label, onClick, extraClass) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "icon-btn" + (extraClass ? " " + extraClass : "");
    btn.innerHTML = svg;
    btn.setAttribute("aria-label", label);
    btn.title = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function urlFor(expr) {
    const url = new URL(window.location.href);
    url.searchParams.set("expr", expr);
    return url;
  }

  const LINK_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.07 0l2.83-2.83a5 5 0 0 0-7.07-7.07l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7.07 0L4.1 13.83a5 5 0 0 0 7.07 7.07l1.5-1.5"/></svg>';
  const CHECK_ICON = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  function makeCopyLinkButton(expr) {
    const btn = makeIconButton(LINK_ICON, t("copyLink"), async () => {
      try {
        await navigator.clipboard.writeText(urlFor(expr).toString());
        btn.innerHTML = CHECK_ICON;
        btn.title = t("copied");
        btn.setAttribute("aria-label", t("copied"));
        btn.classList.add("copied");
        setTimeout(() => {
          btn.innerHTML = LINK_ICON;
          btn.title = t("copyLink");
          btn.setAttribute("aria-label", t("copyLink"));
          btn.classList.remove("copied");
        }, 1500);
      } catch (e) {
        btn.title = t("copyFailed");
        btn.setAttribute("aria-label", t("copyFailed"));
      }
    }, "copy-link-btn");
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
    makeIconButton,
    urlFor,
    makeCopyLinkButton,
    functionBadgeText,
    round,
  });
})();
