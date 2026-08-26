# gamma-factorial

Generalized factorial n! = Γ(n+1), computed via the **Lanczos
approximation** of the Gamma function, with **Euler's reflection formula**
for negative non-integer reals/complex numbers.

Unlike a classic recursive/iterative factorial (limited to positive
integers), this one is defined on almost all of ℝ and ℂ:

```python
from gamma_factorial import factorial, binomial, beta, double_factorial

factorial(5)      # 120.0
factorial(-0.5)   # 1.7724538509055159  (= sqrt(pi))
factorial(0.5)    # 0.8862269254527586  (= sqrt(pi)/2)
factorial(1 + 2j) # (0.11229424234632635+0.3236128855019272j)

factorial(-1)     # ValueError: pole (n! infinite)

# Generalized binomial coefficient: C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))
binomial(5, 2)    # 10.0     (classic binomial coefficient)
binomial(4.5, 2)  # 7.875    (continuous interpolation "between" rows of Pascal's triangle)

# Beta function: B(a, b) = Gamma(a) Gamma(b) / Gamma(a + b)
beta(2, 3)         # 0.08333333333333333  (= 1/12)

# Double factorial: n!! = n(n-2)(n-4)... — integers >= -1 only
double_factorial(7)  # 105.0
```

A standalone web calculator lives in `docs/index.html` — type an
expression (`5!`, `gamma(2.5)`, `C(10, 3)`, `1+2i`), get an instant result
plus a live curve of the function around it. Pure HTML/JS, no build step.

When served alongside the API (`gamma_factorial.api:app`, which mounts
`docs/` at `/`), every result is verified against the Python package —
the same JS math is used only to draw the live curve and as an
offline fallback (shown with a small "computed locally" notice) if the
API can't be reached. Opening `docs/index.html` directly as a file, or
deploying `docs/` on its own as a static site (GitHub Pages, Netlify...),
still works standalone: results just run in fallback mode the whole
time.

The calculator also supports:
- **Pin to compare** — overlay multiple results on the same plot (e.g.
  `gamma(2.5)` pinned against `gamma(6)`, or `C(5,k)` against `C(8,k)`).
- **Zoom, pan, and hover** — scroll to zoom around the cursor, drag to pan,
  hover for the exact (x, y) at any point, double-click to reset.
- **Shareable links** — every evaluation updates the URL's `?expr=`, and a
  "copy link" button next to each result copies a direct link to it.

An interactive demo of the continuous Pascal's triangle (slider on `n`,
curve of `C(n, k)` vs. `k`) is available in `docs/pascal-continuous.html` -
also linked from the calculator page.

## Installation

```bash
pip install -e ".[dev]"
```

## CLI usage

```bash
python -m gamma_factorial.cli 5 -0.5 0.5 -2.5 "1+2j"
# or, once installed:
gamma-factorial 5 -0.5 0.5 -2.5 "1+2j"

# generalized binomial coefficient
gamma-factorial binomial 5 2      # C(5, 2) = 10.0
gamma-factorial binomial 4.5 2    # C(4.5, 2) = 7.875 (continuous interpolation)
gamma-factorial binomial 10 0 1 2 3   # several values of k at once
gamma-factorial binomial 5 6      # C(5, 6) = 0.0 (k > n, classic convention)
```

### Interactive mode

Running `gamma-factorial` with no arguments (or `gamma-factorial interactive`)
opens a REPL where you can type expressions and see results immediately,
without re-invoking the command each time:

```
$ gamma-factorial
gamma-factorial interactive mode — type 'help' or 'quit'
> 5!
120.0
> gamma(2.5)
1.3293403881791384
> C(10, 3)
120.0
> C(4.5, 2)
7.874999999999998
> quit
```

Recognized expressions: `n!`, `factorial(n)`, `gamma(z)`, `C(n, k)` /
`binomial(n, k)`. Type `help` inside the REPL for a reminder, `quit` (or
`exit`, or Ctrl-D) to leave.

## HTTP API

`gamma_factorial.api:app` (FastAPI) exposes the same functions over HTTP,
and also serves the `docs/` calculator as static files at `/` — it's what
the web calculator calls for its authoritative result. Run it locally with
any ASGI server, e.g.:

```bash
pip install uvicorn
uvicorn gamma_factorial.api:app --reload
```

```bash
curl http://127.0.0.1:8000/factorial/5
# {"input":"5","operation":"factorial","result":120.00000000000031}

curl http://127.0.0.1:8000/gamma/0.5
curl http://127.0.0.1:8000/binomial/10/3
curl http://127.0.0.1:8000/beta/2/3
curl http://127.0.0.1:8000/double-factorial/7
```

Values are URL-encoded (`+` as `%2B` for complex numbers, e.g.
`/factorial/1%2B2j`). Errors return `400` (math error, e.g. a pole) or
`422` (unparseable input) with a JSON `{"detail": "..."}` body. Full
interactive docs (Swagger UI) are served at `/docs` when the app is
running; the raw OpenAPI schema is at `/openapi.json`.

`pyproject.toml` declares a Vercel entrypoint
(`[tool.vercel] entrypoint = "gamma_factorial.api:app"`) for deploying the
API + calculator together as one app. `docs/` can also be deployed on its
own as a static site (GitHub Pages, Netlify...) — see the note on API
fallback mode above.

## Tests

```bash
pytest              # Python: gamma_factorial + binomial + beta + double_factorial
python checker.py   # smoke test against a running/importable app instance

npm install         # once, to pull in jsdom
npm test            # site tests: loads docs/*.html in jsdom, exercises the calculator
```

## Code quality

```bash
ruff check gamma_factorial tests   # lint
mypy gamma_factorial               # type checking (strict mode)
```

## How it works

- `gamma(z)` implements Γ via Lanczos (g=7, ~15 significant digits of
  precision), the method used by SciPy/GSL.
- For `Re(z) < 0.5`, the reflection formula
  `Γ(z)·Γ(1-z) = π / sin(πz)` is used instead of evaluating Lanczos
  directly, which stays numerically stable and covers all negative
  non-integer reals (e.g. `-1/2`, `-2.5`, `-3.7`...).
- Negative or zero integers (`0, -1, -2, ...`) are true poles of Γ
  (infinite factorial): `gamma`/`factorial` raise `ValueError` instead of
  returning an incorrect number.
- The Lanczos term is computed in log-space
  (`exp((z+0.5)·log(t) - t)` rather than `t**(z+0.5) * exp(-t)`) to avoid
  premature overflow (`OverflowError`): without this, `factorial(142)`
  already overflowed even though `142!` fits comfortably in a `float`. The
  real limit is now pushed to `170!`, the ceiling of `float` itself
  (`factorial(171)` raises `OverflowError`, just like
  `float(math.factorial(171))`).
- `binomial(n, k)` (in `gamma_factorial.binomial`) generalizes the
  binomial coefficient `C(n, k) = n! / (k!(n-k)!)` to real `n`, `k` via
  Gamma — this lets you "interpolate" between rows/columns of Pascal's
  triangle, as shown in `docs/pascal-continuous.html`. Following the
  classic convention, it returns `0` when `k < 0` or `k > n` (the Gamma
  pole in the denominator makes the ratio `0`, matching `math.comb`), and
  raises `ValueError` only when `n` itself is a non-positive integer,
  where the ratio is genuinely indeterminate:

## License

MIT — see [LICENSE](LICENSE).
