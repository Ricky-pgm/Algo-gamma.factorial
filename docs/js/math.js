(function () {
  "use strict";
  // ===================== math engine =====================
  const { t } = window.GF;

  const G = 7;
  const LANCZOS_COEF = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];

  class GammaError extends Error {}

  class Complex {
    constructor(re, im = 0) {
      this.re = re;
      this.im = im;
    }
    static from(x) {
      return x instanceof Complex ? x : new Complex(x, 0);
    }
    get isReal() {
      return this.im === 0;
    }
    add(o) { o = Complex.from(o); return new Complex(this.re + o.re, this.im + o.im); }
    sub(o) { o = Complex.from(o); return new Complex(this.re - o.re, this.im - o.im); }
    mul(o) {
      o = Complex.from(o);
      return new Complex(this.re * o.re - this.im * o.im, this.re * o.im + this.im * o.re);
    }
    div(o) {
      o = Complex.from(o);
      const denom = o.re * o.re + o.im * o.im;
      return new Complex(
        (this.re * o.re + this.im * o.im) / denom,
        (this.im * o.re - this.re * o.im) / denom
      );
    }
    isFinite() { return Number.isFinite(this.re) && Number.isFinite(this.im); }
    static sin(z) {
      return new Complex(
        Math.sin(z.re) * Math.cosh(z.im),
        Math.cos(z.re) * Math.sinh(z.im)
      );
    }
    static exp(z) {
      const r = Math.exp(z.re);
      return new Complex(r * Math.cos(z.im), r * Math.sin(z.im));
    }
    static log(z) {
      const r = Math.hypot(z.re, z.im);
      return new Complex(Math.log(r), Math.atan2(z.im, z.re));
    }
    toString() {
      if (this.isReal) return formatFloat(this.re);
      const sign = this.im >= 0 ? "+" : "-";
      const reStr = formatFloat(this.re);
      const imStr = formatFloat(Math.abs(this.im));
      if (this.re === 0) return `${sign === "-" ? "-" : ""}${imStr}i`;
      return `${reStr}${sign}${imStr}i`;
    }
  }

  function formatFloat(x) {
    if (Object.is(x, -0)) x = 0;
    return String(x);
  }

  function isNonpositiveInteger(z) {
    return z.isReal && Number.isInteger(z.re) && z.re <= 0;
  }

  function gamma(z) {
    z = Complex.from(z);
    if (!z.isFinite()) {
      throw new GammaError(t("errGammaNotDefined", { z: z.toString() }));
    }
    if (isNonpositiveInteger(z)) {
      throw new GammaError(t("errGammaPole", { z: z.toString() }));
    }
    if (z.re < 0.5) {
      const oneMinusZ = new Complex(1 - z.re, -z.im);
      const denom = Complex.sin(new Complex(Math.PI * z.re, Math.PI * z.im)).mul(gamma(oneMinusZ));
      const result = new Complex(Math.PI, 0).div(denom);
      if (!result.isFinite()) {
        throw new GammaError(t("errGammaOverflow", { z: z.toString() }));
      }
      return result;
    }
    const zc = new Complex(z.re - 1, z.im);
    let acc = new Complex(LANCZOS_COEF[0], 0);
    for (let i = 1; i < G + 2; i++) {
      acc = acc.add(new Complex(LANCZOS_COEF[i], 0).div(zc.add(i)));
    }
    const tt = zc.add(G + 0.5);
    const logT = Complex.log(tt);
    const logResult = zc.add(0.5).mul(logT).sub(tt);
    const result = new Complex(Math.sqrt(2 * Math.PI), 0).mul(Complex.exp(logResult)).mul(acc);
    if (!result.isFinite()) {
      throw new GammaError(t("errGammaOverflow", { z: z.toString() }));
    }
    return result;
  }

  function gammaSafe(z) {
    try {
      const r = gamma(z);
      return r.isReal ? r.re : null;
    } catch (e) {
      return null;
    }
  }

  function factorial(n) {
    n = Complex.from(n);
    // Exact product for non-negative integers: keeps small factorials
    // (0! .. 22!) bit-exact instead of carrying Lanczos rounding noise
    // into values people verify by hand. Larger integers fall through to
    // Gamma, matching the package's floating-point behavior.
    if (n.isReal && Number.isInteger(n.re) && n.re >= 0 && n.re <= 170) {
      let result = 1;
      for (let i = 2; i <= n.re; i++) result *= i;
      return new Complex(result, 0);
    }
    return gamma(n.add(1));
  }

  // n!! = n(n-2)(n-4)... — only defined here for real non-negative integers
  // (and -1, by convention (-1)!! = 1), computed directly rather than via
  // Gamma (the n!! generalization to reals needs 2^(n/2) Gamma(n/2+1)-style
  // formulas that differ for even/odd n; the integer case covers the
  // examples people actually type).
  function doubleFactorial(n) {
    n = Complex.from(n);
    if (!n.isReal || !Number.isInteger(n.re) || n.re < -1) {
      throw new GammaError(t("errDoubleFactorialNonInt"));
    }
    let result = 1;
    for (let i = n.re; i > 1; i -= 2) result *= i;
    return new Complex(result, 0);
  }

  function binomial(n, k) {
    n = Complex.from(n);
    k = Complex.from(k);
    if (isNonpositiveInteger(n.add(1))) {
      throw new GammaError(
        t("errBinomialPoleN", { n: n.toString(), k: k.toString() })
      );
    }
    // A pole in Gamma(k+1) or Gamma(n-k+1) makes the denominator infinite;
    // by the Gamma-ratio definition that makes C(n, k) = 0, matching the
    // classic convention (and math.comb): 0 for k < 0 or k > n.
    if (isNonpositiveInteger(k.add(1))) return new Complex(0, 0);
    if (isNonpositiveInteger(n.sub(k).add(1))) return new Complex(0, 0);
    // Exact multiplicative formula for non-negative integers, mirroring
    // math.comb: avoids Gamma-ratio rounding noise on everyday inputs
    // like C(10, 3).
    if (
      n.isReal && k.isReal &&
      Number.isInteger(n.re) && Number.isInteger(k.re) &&
      n.re >= 0 && k.re >= 0 && n.re <= 1000
    ) {
      if (k.re > n.re) return new Complex(0, 0);
      const kk = Math.min(k.re, n.re - k.re);
      let result = 1;
      for (let i = 1; i <= kk; i++) result = (result * (n.re - kk + i)) / i;
      return new Complex(result, 0);
    }
    return gamma(n.add(1)).div(gamma(k.add(1)).mul(gamma(n.sub(k).add(1))));
  }

  // B(a, b) = Gamma(a) Gamma(b) / Gamma(a + b)
  function beta(a, b) {
    a = Complex.from(a);
    b = Complex.from(b);
    return gamma(a).mul(gamma(b)).div(gamma(a.add(b)));
  }

  const COMPLEX_RE = /^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)?([+-]\d*\.?\d+(?:e[+-]?\d+)?)?[ij]$/i;
  const PURE_IMAG_RE = /^([+-]?\d*\.?\d*(?:e[+-]?\d+)?)[ij]$/i;

  function parseNumber(raw) {
    const trimmed = raw.trim().replace(/\s+/g, "");
    if (trimmed === "") {
      throw new GammaError(t("errNotValidNumber", { raw }));
    }
    if (!/[ij]/i.test(trimmed)) {
      if (Number.isNaN(Number(trimmed))) {
        throw new GammaError(t("errNotValidNumber", { raw }));
      }
      return new Complex(Number(trimmed), 0);
    }
    const pureMatch = PURE_IMAG_RE.exec(trimmed);
    if (pureMatch) {
      const imStr = pureMatch[1];
      const im = imStr === "" || imStr === "+" ? 1 : imStr === "-" ? -1 : Number(imStr);
      return new Complex(0, im);
    }
    const fullMatch = COMPLEX_RE.exec(trimmed);
    if (fullMatch && (fullMatch[1] !== undefined || fullMatch[2] !== undefined)) {
      const re = fullMatch[1] ? Number(fullMatch[1]) : 0;
      const imStr = fullMatch[2];
      const im = imStr === undefined ? 0 : imStr === "+" ? 1 : imStr === "-" ? -1 : Number(imStr);
      return new Complex(re, im);
    }
    throw new GammaError(t("errNotValidNumber", { raw }));
  }

  const DOUBLE_FACTORIAL_SUFFIX_RE = /^(.+?)!!$/;
  const FACTORIAL_SUFFIX_RE = /^(.+?)!$/;
  const CALL_RE = /^([A-Za-z_]+)\((.*)\)$/;

  // True when s is exactly one balanced pair of outer parentheses, so
  // "(a)(b)" and "(a)+(b)" are not mistaken for a wrapped operand.
  function isWrappedInParens(s) {
    if (!s.startsWith("(") || !s.endsWith(")")) return false;
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") depth++;
      else if (s[i] === ")") {
        depth--;
        if (depth === 0 && i < s.length - 1) return false;
      }
    }
    return depth === 0;
  }

  function formatResult(value) {
    return value.toString();
  }

  // Returns { value, plot } where plot describes how to draw a curve
  // around the result: { kind, center, n?, b? }. plot is null for complex
  // (non-real) results, which aren't plotted.
  function evalExpression(expr) {
    const trimmed = expr.trim();

    function plotFor(kind, center, extra) {
      if (!center.isReal) return null;
      if (extra && Object.values(extra).some((v) => v instanceof Complex && !v.isReal)) return null;
      const out = { kind, center: center.re };
      if (extra) {
        for (const k of Object.keys(extra)) out[k] = extra[k].re;
      }
      return out;
    }

    // An operand is a plain number literal or any parenthesized expression,
    // e.g. -0.5, (4.5), ((2+1)) or (gamma(2.5)); parentheses recurse.
    function evalOperand(raw) {
      const s = raw.trim();
      if (isWrappedInParens(s)) return evalExpression(s.slice(1, -1)).value;
      return parseNumber(s);
    }

    const dfactMatch = DOUBLE_FACTORIAL_SUFFIX_RE.exec(trimmed);
    if (dfactMatch) {
      const n = evalOperand(dfactMatch[1]);
      return { value: doubleFactorial(n), plot: plotFor("doubleFactorial", n), kind: "doubleFactorial", args: [n] };
    }

    const factMatch = FACTORIAL_SUFFIX_RE.exec(trimmed);
    if (factMatch) {
      const n = evalOperand(factMatch[1]);
      return { value: factorial(n), plot: plotFor("factorial", n), kind: "factorial", args: [n] };
    }

    const callMatch = CALL_RE.exec(trimmed);
    if (callMatch) {
      const func = callMatch[1].toLowerCase();
      const rawArgs = callMatch[2].split(",").map((a) => a.trim()).filter(Boolean);

      if (func === "factorial" && rawArgs.length === 1) {
        const n = evalOperand(rawArgs[0]);
        return { value: factorial(n), plot: plotFor("factorial", n), kind: "factorial", args: [n] };
      }
      if (func === "doublefactorial" && rawArgs.length === 1) {
        const n = evalOperand(rawArgs[0]);
        return { value: doubleFactorial(n), plot: plotFor("doubleFactorial", n), kind: "doubleFactorial", args: [n] };
      }
      if (func === "gamma" && rawArgs.length === 1) {
        const z = evalOperand(rawArgs[0]);
        return { value: gamma(z), plot: plotFor("gamma", z), kind: "gamma", args: [z] };
      }
      if ((func === "c" || func === "binomial") && rawArgs.length === 2) {
        const n = evalOperand(rawArgs[0]);
        const k = evalOperand(rawArgs[1]);
        return { value: binomial(n, k), plot: plotFor("binomial", k, { n }), kind: "binomial", args: [n, k] };
      }
      if (func === "beta" && rawArgs.length === 2) {
        const a = evalOperand(rawArgs[0]);
        const b = evalOperand(rawArgs[1]);
        return { value: beta(a, b), plot: plotFor("beta", a, { b }), kind: "beta", args: [a, b] };
      }
      throw new GammaError(t("errUnrecognized", { expr }));
    }

    // A bare number (real or complex), typed with no function around it:
    // just echo it back, like a plain calculator would.
    try {
      const n = evalOperand(trimmed);
      return { value: n, plot: null, kind: "number", isBareNumber: true, args: [n] };
    } catch (e) {
      throw new GammaError(t("errUnrecognized", { expr }));
    }
  }

  window.GF = window.GF || {};
  Object.assign(window.GF, {
    Complex,
    GammaError,
    parseNumber,
    formatResult,
    evalExpression,
    gamma,
    gammaSafe,
    factorial,
    doubleFactorial,
    binomial,
    beta,
  });
})();
