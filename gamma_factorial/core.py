"""
Factorielle généralisée via la fonction Gamma (approximation de Lanczos).

    Gamma(n+1) = n!             pour n entier >= 0
    Gamma(z)   se prolonge à presque tout C (pôles aux entiers <= 0)
    Gamma(1/2) = sqrt(pi)   =>  factorial(-1/2) = sqrt(pi)
    Gamma(3/2) = sqrt(pi)/2 =>  factorial(1/2)  = sqrt(pi)/2

Formule de réflexion d'Euler pour Re(z) < 0.5, utilisée ici pour couvrir
tous les réels/complexes négatifs non-entiers :
    Gamma(z) * Gamma(1-z) = pi / sin(pi*z)
"""

from __future__ import annotations

import cmath
import math
from numbers import Number

_G = 7
_LANCZOS_COEF = (
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
)


def _is_nonpositive_integer(z: Number) -> bool:
    if isinstance(z, complex):
        if z.imag != 0:
            return False
        z = z.real
    return float(z).is_integer() and z <= 0


def gamma(z: Number) -> Number:
    """Fonction Gamma d'Euler, valable sur C \\ {0, -1, -2, ...}.

    Renvoie un float si l'entrée est réelle (et le résultat l'est
    numériquement), sinon un complex.
    """
    if _is_nonpositive_integer(z):
        raise ValueError(f"Gamma a un pôle en {z} (infini)")

    is_real_input = isinstance(z, (int, float))
    zc = complex(z)

    if zc.real < 0.5:
        result = math.pi / (cmath.sin(math.pi * zc) * gamma(1 - zc))
    else:
        zc -= 1
        acc = _LANCZOS_COEF[0]
        for i in range(1, _G + 2):
            acc += _LANCZOS_COEF[i] / (zc + i)

        t = zc + _G + 0.5
        result = math.sqrt(2 * math.pi) * t ** (zc + 0.5) * cmath.exp(-t) * acc

    if is_real_input:
        return result.real
    if abs(result.imag) < 1e-10:
        return result.real
    return result


def factorial(n: Number) -> Number:
    """Factorielle généralisée : n! = Gamma(n+1).

    Fonctionne pour entiers positifs, zéro, réels/complexes quelconques,
    y compris les négatifs non-entiers (ex: factorial(-0.5) = sqrt(pi)).

    Lève ValueError sur les pôles (entiers négatifs), où n! est infini.
    """
    return gamma(n + 1)
