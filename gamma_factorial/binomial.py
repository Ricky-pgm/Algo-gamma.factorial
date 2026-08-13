"""
Coefficient binomial généralisé (triangle de Pascal continu).

    C(n, k) = n! / (k! (n-k)!) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))

Pour n, k entiers positifs avec k <= n, c'est le coefficient binomial
classique. Grâce à `factorial`/`gamma`, cette implémentation reste valable
pour n et k réels quelconques (ex: C(4.5, 2)), ce qui interpole "entre" les
lignes et colonnes du triangle de Pascal habituel.
"""

from __future__ import annotations

from numbers import Number

from .core import gamma


def binomial(n: Number, k: Number) -> Number:
    """Coefficient binomial généralisé C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1)).

    Coïncide avec le coefficient binomial usuel pour n, k entiers (0 <= k <= n).
    Défini aussi pour n, k réels non-entiers via la fonction Gamma.

    Lève ValueError si n+1, k+1 ou (n-k+1) tombe sur un pôle de Gamma
    (entier <= 0) — ex: k entier négatif, ou n-k entier négatif.
    """
    try:
        gamma_k1 = gamma(k + 1)
    except ValueError:
        raise ValueError(
            f"binomial({n}, {k}) indéfini : k={k} est un pôle de Gamma (k+1 entier <= 0)"
        ) from None
    try:
        gamma_nk1 = gamma(n - k + 1)
    except ValueError:
        raise ValueError(
            f"binomial({n}, {k}) indéfini : n-k={n - k} est un pôle de Gamma "
            f"(n-k+1 entier <= 0)"
        ) from None
    return gamma(n + 1) / (gamma_k1 * gamma_nk1)
