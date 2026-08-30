(function () {
  "use strict";
  const { t, evalExpression, parseNumber, formatResult } = window.GF;
  // ===================== practice.html: fun practice exercises =====================
  // Deliberately data-driven and small for V1 (a flat array, no procedural
  // generation) so the exercise set is easy to grow later — see the plan
  // file for the rationale. Answers are checked locally via GF.evalExpression
  // / GF.parseNumber, the same engine the rest of the site already trusts,
  // so there's no new math logic to maintain here.

  // { expr, kind, difficulty } — difficulty: "beginner" | "intermediate" | "advanced"
  const EXERCISES = [
    { expr: "3!", kind: "factorial", difficulty: "beginner" },
    { expr: "5!", kind: "factorial", difficulty: "beginner" },
    { expr: "0!", kind: "factorial", difficulty: "beginner" },
    { expr: "C(5, 2)", kind: "binomial", difficulty: "beginner" },
    { expr: "C(6, 1)", kind: "binomial", difficulty: "beginner" },
    { expr: "4!!", kind: "doubleFactorial", difficulty: "beginner" },
    { expr: "7!", kind: "factorial", difficulty: "intermediate" },
    { expr: "C(10, 3)", kind: "binomial", difficulty: "intermediate" },
    { expr: "C(8, 4)", kind: "binomial", difficulty: "intermediate" },
    { expr: "7!!", kind: "doubleFactorial", difficulty: "intermediate" },
    { expr: "gamma(5)", kind: "gamma", difficulty: "intermediate" },
    { expr: "gamma(1.46)", kind: "gamma", difficulty: "advanced" },
    { expr: "3.5!", kind: "factorial", difficulty: "advanced" },
    { expr: "beta(2, 3)", kind: "beta", difficulty: "advanced" },
    { expr: "C(9, 9)", kind: "binomial", difficulty: "advanced" },
  ];

  // Kind-scoped, not exercise-scoped — one hint/why-blurb per function type
  // keeps authoring cost bounded (5 kinds x 3 languages) while still being
  // genuinely useful. Why-blurbs reuse practical.js's existing practWhat*
  // copy verbatim rather than duplicating new content.
  const HINT_KEYS = {
    factorial: "practHintFactorial",
    gamma: "practHintGamma",
    doubleFactorial: "practHintDoubleFactorial",
    binomial: "practHintBinomial",
    beta: "practHintBeta",
  };
  const WHY_KEYS = {
    factorial: "practFactorialWhat",
    gamma: "practGammaWhat",
    doubleFactorial: "practDoubleWhat",
    binomial: "practBinomialWhat",
    beta: "practBetaWhat",
  };

  const STREAK_KEY = "gf-practice-streak";

  function loadStreak() {
    let raw = null;
    try { raw = window.localStorage.getItem(STREAK_KEY); } catch (e) { return 0; }
    if (!raw) return 0;
    try {
      const parsed = JSON.parse(raw);
      return (parsed && typeof parsed.count === "number" && Number.isFinite(parsed.count)) ? parsed.count : 0;
    } catch (e) {
      return 0;
    }
  }

  function saveStreak(count) {
    try { window.localStorage.setItem(STREAK_KEY, JSON.stringify({ count })); } catch (e) { /* ignore */ }
  }

  const FLAME_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17a2.5 2.5 0 0 0 2.5-2.5c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7.5 7.5 0 1 1-15 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>';

  let order = [];
  let current = 0;

  function shuffledOrder() {
    const idx = EXERCISES.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }

  function exerciseEl() { return document.getElementById("exerciseArea"); }

  function streakLabel() {
    return t("practiceStreak", { n: String(loadStreak()) });
  }

  function render() {
    const area = exerciseEl();
    if (!area) return;
    area.innerHTML = "";
    if (!order.length || current >= order.length) return;

    const ex = EXERCISES[order[current]];
    const wrap = document.createElement("div");
    wrap.className = "practice-card";

    const progress = document.createElement("p");
    progress.className = "practice-progress";
    progress.textContent = t("practiceProgress", { n: String(current + 1), total: String(order.length) });
    wrap.appendChild(progress);

    const streakLine = document.createElement("p");
    streakLine.className = "practice-streak";
    streakLine.innerHTML = FLAME_ICON + " " + streakLabel();
    wrap.appendChild(streakLine);

    const badge = document.createElement("p");
    badge.className = "function-badge";
    badge.dataset.kind = ex.kind;
    badge.textContent = window.GF.functionBadgeText(ex.kind);
    wrap.appendChild(badge);

    const prompt = document.createElement("p");
    prompt.className = "practice-prompt";
    prompt.textContent = ex.expr + " = ?";
    wrap.appendChild(prompt);

    // Hint: revealed on demand, not shown upfront — a light form of
    // progressive disclosure without multiple hint "levels" per exercise.
    const hintBtn = document.createElement("button");
    hintBtn.type = "button";
    hintBtn.className = "tool-btn practice-hint-btn";
    hintBtn.textContent = t("practiceShowHint");
    const hintText = document.createElement("p");
    hintText.className = "practice-hint";
    hintText.hidden = true;
    hintBtn.addEventListener("click", () => {
      hintText.textContent = t(HINT_KEYS[ex.kind]);
      hintText.hidden = false;
      hintBtn.hidden = true;
    });
    wrap.appendChild(hintBtn);
    wrap.appendChild(hintText);

    const form = document.createElement("div");
    form.className = "practice-form";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "practice-input";
    input.id = "practiceInput";
    input.autocomplete = "off";
    input.autocapitalize = "off";
    input.spellcheck = false;
    input.placeholder = t("practiceInputPlaceholder");
    const checkBtn = document.createElement("button");
    checkBtn.type = "button";
    checkBtn.className = "evaluate-btn";
    checkBtn.id = "practiceCheckBtn";
    checkBtn.textContent = t("practiceCheck");
    form.appendChild(input);
    form.appendChild(checkBtn);
    wrap.appendChild(form);

    const feedback = document.createElement("div");
    feedback.className = "practice-feedback";
    feedback.id = "practiceFeedback";
    wrap.appendChild(feedback);

    const nextRow = document.createElement("div");
    nextRow.className = "practice-next-row";
    const nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "tool-btn";
    nextBtn.id = "practiceNextBtn";
    nextBtn.textContent = t("practiceNext");
    nextBtn.hidden = current >= order.length - 1;
    nextRow.appendChild(nextBtn);
    wrap.appendChild(nextRow);

    area.appendChild(wrap);

    function check() {
      let ok = false;
      let correctValue;
      try {
        const { value } = evalExpression(ex.expr);
        correctValue = value;
        const guess = parseNumber(input.value);
        const tol = Math.max(1e-6, Math.abs(value.re) * 1e-9);
        ok = Math.abs(guess.re - value.re) <= tol && Math.abs(guess.im - value.im) <= tol;
      } catch (e) {
        ok = false;
      }
      feedback.innerHTML = "";
      const p = document.createElement("p");
      if (ok) {
        p.className = "practice-feedback-correct practice-pulse";
        p.textContent = t("practiceCorrect");
        saveStreak(loadStreak() + 1);
      } else {
        p.className = "practice-feedback-incorrect";
        const answerStr = correctValue ? formatResult(correctValue) : "?";
        p.textContent = t("practiceIncorrect", { answer: answerStr });
        saveStreak(0);
      }
      feedback.appendChild(p);

      const why = document.createElement("p");
      why.className = "practice-why";
      why.textContent = t(WHY_KEYS[ex.kind]);
      feedback.appendChild(why);

      streakLine.innerHTML = FLAME_ICON + " " + streakLabel();
      nextBtn.hidden = current >= order.length - 1;
    }

    checkBtn.addEventListener("click", check);
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") check();
    });
    nextBtn.addEventListener("click", () => {
      current += 1;
      render();
    });
    input.focus();
  }

  function initPracticePage() {
    order = shuffledOrder();
    current = 0;
    render();
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, { initPracticePage });
})();
