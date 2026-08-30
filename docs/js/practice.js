(function () {
  "use strict";
  const { t, evalExpression, parseNumber, formatResult, Complex } = window.GF;
  // ===================== practice.html: simple fun exercises =====================
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

    const badge = document.createElement("p");
    badge.className = "function-badge";
    badge.dataset.kind = ex.kind;
    badge.textContent = window.GF.functionBadgeText(ex.kind);
    wrap.appendChild(badge);

    const prompt = document.createElement("p");
    prompt.className = "practice-prompt";
    prompt.textContent = ex.expr + " = ?";
    wrap.appendChild(prompt);

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
        p.className = "practice-feedback-correct";
        p.textContent = t("practiceCorrect");
      } else {
        p.className = "practice-feedback-incorrect";
        const answerStr = correctValue ? formatResult(correctValue) : "?";
        p.textContent = t("practiceIncorrect", { answer: answerStr });
      }
      feedback.appendChild(p);
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
