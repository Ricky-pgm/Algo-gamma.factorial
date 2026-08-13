"""
Generalized binomial coefficient (continuous Pascal's triangle).

    C(n, k) = n! / (k! (n-k)!) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))

For non-negative integer n, k with k <= n, this is the usual binomial
coefficient. Thanks to `factorial`/`gamma`, this implementation remains
valid for any real n and k (e.g. C(4.5, 2)), interpolating "between" the
rows and columns of the usual Pascal's triangle.
"""

from __future__ import annotations

from .core import gamma


def binomial(n: float | complex, k: float | complex) -> float | complex:
    """Generalized binomial coefficient C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1)).

    Matches the usual binomial coefficient for non-negative integer n, k
    (0 <= k <= n). Also defined for non-integer real n, k via the Gamma
    function.

    Raises ValueError if n+1, k+1, or (n-k+1) lands on a pole of Gamma
    (integer <= 0) — e.g. negative integer k, or negative integer n-k.
    """
    try:
        gamma_k1 = gamma(k + 1)
    except ValueError:
        raise ValueError(
            f"binomial({n}, {k}) is undefined: k={k} is a pole of Gamma (k+1 integer <= 0)"
        ) from None
    try:
        gamma_nk1 = gamma(n - k + 1)
    except ValueError:
        raise ValueError(
            f"binomial({n}, {k}) is undefined: n-k={n - k} is a pole of Gamma "
            f"(n-k+1 integer <= 0)"
        ) from None
    return gamma(n + 1) / (gamma_k1 * gamma_nk1)
