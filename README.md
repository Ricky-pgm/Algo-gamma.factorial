# gamma-factorial

Generalized factorial n! = Γ(n+1), computed via the **Lanczos
approximation** of the Gamma function, with **Euler's reflection formula**
for negative non-integer reals/complex numbers.

Unlike a classic recursive/iterative factorial (limited to positive
integers), this one is defined on almost all of ℝ and ℂ:

```python
from gamma_factorial import factorial, binomial

factorial(5)      # 120.0
factorial(-0.5)   # 1.7724538509055159  (= sqrt(pi))
factorial(0.5)    # 0.8862269254527586  (= sqrt(pi)/2)
factorial(1 + 2j) # (0.11229424234632635+0.3236128855019272j)

factorial(-1)     # ValueError: pole (n! infinite)

# Generalized binomial coefficient: C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))
binomial(5, 2)    # 10.0     (classic binomial coefficient)
binomial(4.5, 2)  # 7.875    (continuous interpolation "between" rows of Pascal's triangle)
```

An interactive demo of the continuous Pascal's triangle (slider on `n`,
curve of `C(n, k)` vs. `k`) is available in `docs/pascal-continuous.html` -
a preview of what `binomial()` lets you plot.

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
```

## Tests

```bash
pytest
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
  triangle, as shown in `docs/pascal-continuous.html`.
