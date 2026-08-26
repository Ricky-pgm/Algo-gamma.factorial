(function () {
  "use strict";
  // ===================== keypad =====================

  const KEYPAD_KEYS = ["!", "!!", "Γ()", "C(,)", "π", "i"];

  function insertAtCursor(text) {
    const input = document.getElementById("exprInput");
    if (!input) return;
    const cursorMatch = text.indexOf("|");
    const clean = text.replace("|", "");
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + clean + input.value.slice(end);
    const newPos = start + (cursorMatch === -1 ? clean.length : cursorMatch);
    input.focus();
    input.setSelectionRange(newPos, newPos);
  }

  function renderKeypad() {
    const keypad = document.getElementById("keypad");
    if (!keypad) return;
    keypad.innerHTML = "";
    const inserts = { "Γ()": "gamma(|)", "C(,)": "C(|,)" };
    for (const key of KEYPAD_KEYS) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key-btn";
      btn.textContent = key;
      btn.addEventListener("click", () => insertAtCursor(inserts[key] || key));
      keypad.appendChild(btn);
    }
  }


  window.GF = window.GF || {};
  Object.assign(window.GF, {
    insertAtCursor,
    renderKeypad,
  });
})();
