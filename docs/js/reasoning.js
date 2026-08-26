(function () {
  "use strict";
  const { t, round } = window.GF;
  // ===================== worked reasoning =====================

  // Builds a logical, step-by-step derivation that adapts to the input:
  // a narrative lead, an aligned "=" chain of steps, and a short check.
  // Each step is { lhs, eq, rhs, note }.
  function buildReasoning(plot, value) {
    if (!value.isReal) return null;
    const steps = [];

    if (plot.kind === "factorial") {
      const n = plot.center;
      if (Number.isInteger(n) && n >= 0 && n <= 12) {
        const terms = [];
        for (let i = n; i >= 1; i--) terms.push(i);
        steps.push({ lhs: `${n}!`, eq: "=", rhs: terms.length ? terms.join(" × ") : "1", note: t("noteIntegerN") });
        let acc = terms.length ? terms[0] : 1;
        for (let i = 1; i < terms.length; i++) {
          const prod = acc * terms[i];
          steps.push({ lhs: "", eq: "", rhs: `${acc} × ${terms[i]} = ${prod}`, note: "" });
          acc = prod;
        }
        steps.push({ lhs: `${n}!`, eq: "=", rhs: String(acc), note: "" });
        return { lead: t("reasoningLeadFactorialInt", { n }), steps, tail: t("reasoningTailFactorial") };
      }
      const g = n + 1;
      if (g >= 0.5) {
        steps.push({ lhs: `${n}!`, eq: "=", rhs: `Γ(${round(g, 6)})`, note: t("noteDefinition") });
        steps.push({ lhs: "", eq: "", rhs: t("noteDirect"), note: "" });
        steps.push({ lhs: `${n}!`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
        if (n > 0) {
          const gz = gammaSafe(g);
          if (gz !== null) {
            steps.push({ lhs: `Γ(${round(g + 1, 6)})`, eq: "≈", rhs: `${round(g, 6)} × Γ(${round(g, 6)}) ≈ ${round(g * gz, 6)}`, note: t("noteCheck") });
          }
        }
        return { lead: t("reasoningLeadFactorialGamma", { g: round(g, 6) }), steps, tail: t("reasoningTailFactorial") };
      }
      steps.push({ lhs: `${n}!`, eq: "=", rhs: `Γ(${round(g, 6)})`, note: t("noteDefinition") });
      steps.push({ lhs: "", eq: "=", rhs: `π / (sin(π·${round(g, 6)}) · Γ(${round(1 - g, 6)}))`, note: t("noteReflectionFormula") });
      const gOne = gammaSafe(1 - g);
      if (gOne !== null) {
        steps.push({ lhs: "", eq: "", rhs: `Γ(${round(1 - g, 6)}) = ${round(gOne, 6)}`, note: "" });
      }
      steps.push({ lhs: "", eq: "", rhs: `sin(π·${round(g, 6)}) = ${round(Math.sin(Math.PI * g), 6)}`, note: "" });
      steps.push({ lhs: `${n}!`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      return { lead: t("reasoningLeadFactorialReflect", { g: round(g, 6) }), steps, tail: t("reasoningTailFactorial") };
    }

    if (plot.kind === "gamma") {
      const z = plot.center;
      steps.push({ lhs: `Γ(${z})`, eq: "", rhs: "", note: t("noteDefinition") });
      if (z < 0.5) {
        steps.push({ lhs: "", eq: "=", rhs: `π / (sin(π·${z}) · Γ(${round(1 - z, 6)}))`, note: t("noteReflectionFormula") });
        const gOne = gammaSafe(1 - z);
        if (gOne !== null) {
          steps.push({ lhs: "", eq: "", rhs: `Γ(${round(1 - z, 6)}) = ${round(gOne, 6)}`, note: t("noteDirect") });
        }
        steps.push({ lhs: "", eq: "", rhs: `sin(π·${z}) = ${round(Math.sin(Math.PI * z), 6)}`, note: "" });
        steps.push({ lhs: `Γ(${z})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
        return { lead: t("reasoningLeadGammaReflect", { z }), steps, tail: t("reasoningTailGamma") };
      }
      steps.push({ lhs: "", eq: "", rhs: t("noteDirect"), note: "" });
      steps.push({ lhs: `Γ(${z})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      if (z > 0) {
        steps.push({ lhs: `Γ(${round(z + 1, 6)})`, eq: "≈", rhs: `${z} × Γ(${z}) ≈ ${round(z * value.re, 6)}`, note: t("noteCheck") });
      }
      return { lead: t("reasoningLeadGammaDirect"), steps, tail: t("reasoningTailGamma") };
    }

    if (plot.kind === "doubleFactorial") {
      const n = plot.center;
      if (Number.isInteger(n) && n >= -1 && n <= 14) {
        const terms = [];
        for (let i = n; i >= 1; i -= 2) terms.push(i);
        steps.push({ lhs: `${n}!!`, eq: "=", rhs: terms.length ? terms.join(" × ") : "1", note: t("noteStepDown") });
        let acc = terms.length ? terms[0] : 1;
        for (let i = 1; i < terms.length; i++) {
          const prod = acc * terms[i];
          steps.push({ lhs: "", eq: "", rhs: `${acc} × ${terms[i]} = ${prod}`, note: "" });
          acc = prod;
        }
        steps.push({ lhs: `${n}!!`, eq: "=", rhs: String(acc), note: "" });
      } else {
        steps.push({ lhs: `${n}!!`, eq: "≈", rhs: String(round(value.re, 6)), note: t("noteStepDown") });
      }
      return { lead: t("reasoningLeadDouble"), steps, tail: t("reasoningTailDouble") };
    }

    if (plot.kind === "binomial") {
      const n = plot.n, k = plot.center;
      const isInt = Number.isInteger(n) && Number.isInteger(k);
      steps.push({
        lhs: `C(${n}, ${k})`,
        eq: "=",
        rhs: `Γ(${round(n + 1, 6)}) / (Γ(${round(k + 1, 6)})·Γ(${round(n - k + 1, 6)}))`,
        note: t("noteChooseKFromN"),
      });
      if (isInt && n >= 0 && n <= 18 && k >= 0 && k <= n) {
        let num = 1, d1 = 1, d2 = 1;
        for (let i = 2; i <= n; i++) num *= i;
        for (let i = 2; i <= k; i++) d1 *= i;
        for (let i = 2; i <= n - k; i++) d2 *= i;
        steps.push({ lhs: "", eq: "", rhs: `${num} / (${d1} × ${d2})`, note: t("noteIntegerN") });
        steps.push({ lhs: "", eq: "", rhs: `${num} / ${d1 * d2} = ${Math.round(num / (d1 * d2))}`, note: "" });
      }
      steps.push({ lhs: `C(${n}, ${k})`, eq: isInt ? "=" : "≈", rhs: String(round(value.re, 6)), note: isInt ? t("notePascalRow") : t("noteInterpolated") });
      return { lead: t("reasoningLeadBinomial"), steps, tail: t("reasoningTailBinomial") };
    }

    if (plot.kind === "beta") {
      const a = plot.center, b = plot.b;
      steps.push({
        lhs: `B(${a}, ${b})`,
        eq: "=",
        rhs: `Γ(${a})·Γ(${b}) / Γ(${round(a + b, 6)})`,
        note: t("noteBetaGamma"),
      });
      if (Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= 1) {
        let ga = 1, gb = 1, gab = 1;
        for (let i = 2; i < a; i++) ga *= i;
        for (let i = 2; i < b; i++) gb *= i;
        for (let i = 2; i < a + b; i++) gab *= i;
        if (ga * gb > 0) {
          steps.push({ lhs: "", eq: "", rhs: `${ga} × ${gb} / ${gab}`, note: t("noteIntegerN") });
          steps.push({ lhs: "", eq: "", rhs: `= ${ga * gb} / ${gab} ≈ ${round((ga * gb) / gab, 6)}`, note: "" });
        }
      }
      steps.push({ lhs: `B(${a}, ${b})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      return { lead: t("reasoningLeadBeta"), steps, tail: t("reasoningTailBeta") };
    }

    return null;
  }

  function makeReasoningBlock(plot, value) {
    const reasoning = buildReasoning(plot, value);
    if (!reasoning) return null;
    const section = document.createElement("div");
    section.className = "reasoning";
    const title = document.createElement("p");
    title.className = "reasoning-title";
    title.textContent = t("reasoningTitle");
    section.appendChild(title);
    if (reasoning.lead) {
      const lead = document.createElement("p");
      lead.className = "reasoning-lead";
      lead.textContent = reasoning.lead;
      section.appendChild(lead);
    }
    const grid = document.createElement("div");
    grid.className = "reasoning-grid";
    const CONDENSED_LIMIT = 3;
    const steps = reasoning.steps;
    const visibleSteps = steps.slice(0, CONDENSED_LIMIT);
    const hiddenSteps = steps.slice(CONDENSED_LIMIT);

    function appendStep(step) {
      const lhs = document.createElement("span");
      lhs.className = "reasoning-lhs";
      lhs.textContent = step.lhs;
      const eq = document.createElement("span");
      eq.className = "reasoning-eq";
      eq.textContent = step.eq || "";
      const rhs = document.createElement("span");
      rhs.className = "reasoning-rhs";
      rhs.textContent = step.rhs;
      const note = document.createElement("span");
      note.className = "reasoning-note";
      note.textContent = step.note;
      grid.appendChild(lhs);
      grid.appendChild(eq);
      grid.appendChild(rhs);
      grid.appendChild(note);
    }

    for (const step of visibleSteps) appendStep(step);
    section.appendChild(grid);

    if (hiddenSteps.length > 0) {
      const extra = document.createElement("div");
      extra.className = "reasoning-extra";
      extra.hidden = true;
      const extraGrid = document.createElement("div");
      extraGrid.className = "reasoning-grid";
      for (const step of hiddenSteps) {
        const lhs = document.createElement("span");
        lhs.className = "reasoning-lhs";
        lhs.textContent = step.lhs;
        const eq = document.createElement("span");
        eq.className = "reasoning-eq";
        eq.textContent = step.eq || "";
        const rhs = document.createElement("span");
        rhs.className = "reasoning-rhs";
        rhs.textContent = step.rhs;
        const note = document.createElement("span");
        note.className = "reasoning-note";
        note.textContent = step.note;
        extraGrid.appendChild(lhs);
        extraGrid.appendChild(eq);
        extraGrid.appendChild(rhs);
        extraGrid.appendChild(note);
      }
      extra.appendChild(extraGrid);
      section.appendChild(extra);

      const toggle = document.createElement("button");
      toggle.className = "reasoning-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = t("reasoningShowFull");
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        extra.hidden = expanded;
        toggle.textContent = expanded ? t("reasoningShowFull") : t("reasoningShowLess");
      });
      section.appendChild(toggle);
    }
    if (reasoning.tail) {
      const tail = document.createElement("p");
      tail.className = "reasoning-tail";
      tail.textContent = reasoning.tail;
      section.appendChild(tail);
    }
    return section;
  }


  window.GF = window.GF || {};
  Object.assign(window.GF, {
    buildReasoning,
    makeReasoningBlock,
  });
})();
