(function () {
  "use strict";
  const { t, round, gammaSafe, evalAt } = window.GF;
  // ===================== practical use =====================

  // Builds a "what it's for" panel that adapts to the current input:
  // what the object counts/computes, a concrete worked example, how to
  // read the curve, and something to try next.
  function buildPractical(plot, value, kind) {
    const items = [];
    const v = round(value.re, 6);

    if (!value.isReal) {
      if (kind === "factorial") items.push({ h: t("practWhat"), p: t("practFactorialWhat") });
      else if (kind === "gamma") items.push({ h: t("practWhat"), p: t("practGammaWhat") });
      else if (kind === "doubleFactorial") items.push({ h: t("practWhat"), p: t("practDoubleWhat") });
      else if (kind === "binomial") items.push({ h: t("practWhat"), p: t("practBinomialWhat") });
      else if (kind === "beta") items.push({ h: t("practWhat"), p: t("practBetaWhat") });
      return items;
    }

    if (kind === "factorial") {
      const n = plot.center;
      items.push({ h: t("practWhat"), p: t("practFactorialWhat") });
      if (Number.isInteger(n) && n >= 0) {
        items.push({ h: t("practUse"), p: t("practFactorialUse", { n, v }) });
      } else {
        const d = Math.max(2, 2 * Math.round(n + 1));
        const denom = gammaSafe(d / 2 + 1);
        const vol = denom !== null ? Math.pow(Math.PI, d / 2) / denom : 0;
        items.push({ h: t("practUse"), p: t("practFactorialGamma", { n, d, vol: round(vol, 4) }) });
      }
      items.push({ h: t("practCurve"), p: t("practFactorialCurve") });
      items.push({ h: t("practWhere"), p: t("practFactorialWhere") });
      items.push({ h: t("practTry"), p: t("practFactorialTry") });
    } else if (kind === "gamma") {
      items.push({ h: t("practWhat"), p: t("practGammaWhat") });
      items.push({ h: t("practUse"), p: t("practGammaUse") });
      items.push({ h: t("practCurve"), p: t("practGammaCurve") });
      items.push({ h: t("practWhere"), p: t("practGammaWhere") });
      items.push({ h: t("practTry"), p: t("practGammaTry") });
    } else if (kind === "doubleFactorial") {
      const n = plot.center;
      items.push({ h: t("practWhat"), p: t("practDoubleWhat") });
      if (Number.isInteger(n) && n >= 0) {
        if (n % 2 === 1) {
          const k = (n + 1) / 2;
          items.push({ h: t("practUse"), p: t("practDoubleUseOdd", { n, k, v }) });
        } else {
          const k = n / 2;
          items.push({ h: t("practUse"), p: t("practDoubleUseEven", { n, k, v }) });
        }
      }
      items.push({ h: t("practCurve"), p: t("practDoubleCurve") });
      items.push({ h: t("practWhere"), p: t("practDoubleWhere") });
      items.push({ h: t("practTry"), p: t("practDoubleTry") });
    } else if (kind === "binomial") {
      const n = plot.n, k = plot.center;
      const isInt = Number.isInteger(n) && Number.isInteger(k);
      items.push({ h: t("practWhat"), p: t("practBinomialWhat") });
      if (isInt) {
        items.push({ h: t("practUse"), p: t("practBinomialUse", { k, n, c: v }) });
      } else {
        const kWhole = Math.round(k);
        const cWhole = evalAt("binomial", kWhole, plot);
        items.push({ h: t("practUse"), p: t("practBinomialInterp", { k, c: v, cint: cWhole !== null ? round(cWhole, 6) : 0 }) });
      }
      items.push({ h: t("practCurve"), p: t("practBinomialCurve") });
      items.push({ h: t("practWhere"), p: t("practBinomialWhere") });
      items.push({ h: t("practTry"), p: t("practBinomialTry") });
    } else if (kind === "beta") {
      const a = plot.center, b = plot.b;
      items.push({ h: t("practWhat"), p: t("practBetaWhat") });
      if (a > 1 && b > 1) {
        const peak = (a - 1) / (a + b - 2);
        items.push({ h: t("practUse"), p: t("practBetaUsePeak", { peak: round(peak, 3) }) });
      } else {
        items.push({ h: t("practUse"), p: t("practBetaUse") });
      }
      items.push({ h: t("practCurve"), p: t("practBetaCurve") });
      items.push({ h: t("practWhere"), p: t("practBetaWhere") });
      items.push({ h: t("practTry"), p: t("practBetaTry") });
    }

    return items;
  }

  function makePracticalBlock(plot, value, kind) {
    const items = buildPractical(plot, value, kind);
    if (items.length === 0) return null;
    const section = document.createElement("div");
    section.className = "practical";
    const title = document.createElement("p");
    title.className = "practical-title";
    title.textContent = t("practTitle");
    section.appendChild(title);
    for (const item of items) {
      const wrap = document.createElement("div");
      wrap.className = "practical-item";
      const h = document.createElement("h3");
      h.textContent = item.h;
      wrap.appendChild(h);
      const paras = Array.isArray(item.p) ? item.p : [item.p];
      for (const text of paras) {
        const p = document.createElement("p");
        p.textContent = text;
        wrap.appendChild(p);
      }
      section.appendChild(wrap);
    }
    return section;
  }


  window.GF = window.GF || {};
  Object.assign(window.GF, {
    buildPractical,
    makePracticalBlock,
  });
})();
