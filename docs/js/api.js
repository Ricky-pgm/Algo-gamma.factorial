(function () {
  "use strict";
  const { t, Complex, evalExpression } = window.GF;
  // Maps an evalExpression() {kind, args} to the API path that computes
  // it, or null for kinds the API has no endpoint for (a bare number).
  const API_ENDPOINT_BY_KIND = {
    factorial: (args) => `/factorial/${encodeURIComponent(args[0].toString())}`,
    gamma: (args) => `/gamma/${encodeURIComponent(args[0].toString())}`,
    doubleFactorial: (args) => `/double-factorial/${encodeURIComponent(args[0].toString())}`,
    binomial: (args) => `/binomial/${encodeURIComponent(args[0].toString())}/${encodeURIComponent(args[1].toString())}`,
    beta: (args) => `/beta/${encodeURIComponent(args[0].toString())}/${encodeURIComponent(args[1].toString())}`,
  };

  // The API serializes a real result as a bare number and a complex
  // result as {real, imag} — mirrors gamma_factorial/api.py's _serialize.
  function complexFromApiResult(result) {
    if (typeof result === "number") return new Complex(result, 0);
    return new Complex(result.real, result.imag);
  }

  // Resolves an expression the same way evalExpression() does, but tries
  // the API first for the authoritative result (source: "api"); on any
  // failure (offline, file://, network error, timeout) it transparently
  // falls back to the local computation already returned by
  // evalExpression() (source: "local-fallback"). Never throws for a
  // reachability problem — only for a genuinely invalid expression,
  // exactly like evalExpression().
  async function resolveResult(expr) {
    const local = evalExpression(expr);
    const endpointFor = API_ENDPOINT_BY_KIND[local.kind];
    if (!endpointFor) return { ...local, source: "local" };

    try {
      const url = endpointFor(local.args);
      const response = await fetch(url, { signal: AbortSignal.timeout(3000) });
      if (!response.ok) throw new Error(`API returned ${response.status}`);
      const body = await response.json();
      return { ...local, value: complexFromApiResult(body.result), source: "api" };
    } catch (e) {
      return { ...local, source: "local-fallback" };
    }
  }

  function makeFallbackNotice() {
    const p = document.createElement("p");
    p.className = "result-fallback-notice";
    p.textContent = t("fallbackNotice");
    return p;
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, {
    resolveResult,
    makeFallbackNotice,
  });
})();
