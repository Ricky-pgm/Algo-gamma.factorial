"""
Generalized binomial coefficient (continuous Pascal's triangle).

    C(n, k) = n! / (k! (n-k)!) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))

For non-negative integer n, k with k <= n, this is the usual binomial
coefficient. Thanks to `factorial`/`gamma`, this implementation remains
valid for any real n and k (e.g. C(4.5, 2)), interpolating "between" the
rows and columns of the usual Pascal's triangle.

Pole handling follows the classic convention C(n, k) = 0 for k < 0 or
k > n: when Gamma(k+1) or Gamma(n-k+1) is a pole (k or n-k a non-positive
integer) while n+1 is not, the ratio is 0, exactly as the limit of the
continuous extension. Only when n itself is a non-positive integer
(Gamma(n+1) a pole) is C(n, k) genuinely indeterminate, and a ValueError
is raised.
"""

from __future__ import annotations

from .core import _is_nonpositive_integer, gamma


def _zero_like(n: float | complex, k: float | complex) -> float | complex:
    """A zero of the same type family as the inputs (float vs complex)."""
    return 0j if isinstance(n, complex) or isinstance(k, complex) else 0.0


def binomial(n: float | complex, k: float | complex) -> float | complex:
    """Generalized binomial coefficient C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1)).

    Matches the usual binomial coefficient for non-negative integer n, k
    (0 <= k <= n), and returns 0 for k < 0 or k > n (pole-reciprocal
    convention, consistent with math.comb). Also defined for non-integer
    real n, k via the Gamma function.

    Raises ValueError if n+1 is a pole of Gamma (n a non-positive
    integer) — the ratio is then genuinely indeterminate.
    """
    if _is_nonpositive_integer(n + 1):
        raise ValueError(
            f"binomial({n}, {k}) is undefined: n={n} is a pole of Gamma "
            f"(n+1 integer <= 0)"
        )
    if _is_nonpositive_integer(k + 1):
        return _zero_like(n, k)
    if _is_nonpositive_integer(n - k + 1):
        return _zero_like(n, k)
    # Exact multiplicative formula for non-negative integers (mirrors the
    # JS engine's equivalent shortcut in docs/js/math.js): avoids both
    # Gamma-ratio rounding noise on everyday inputs like C(10, 3), and
    # premature OverflowError from Gamma(n+1) alone overflowing float even
    # when the final ratio (e.g. C(200, 100)) would not.
    if (
        isinstance(n, (int, float))
        and isinstance(k, (int, float))
        and float(n).is_integer()
        and float(k).is_integer()
        and n >= 0
        and k >= 0
        and n <= 1000
    ):
        if k > n:
            return 0.0
        kk = int(min(k, n - k))
        result = 1.0
        for i in range(1, kk + 1):
            result = result * (n - kk + i) / i
        return result
    return gamma(n + 1) / (gamma(k + 1) * gamma(n - k + 1))
