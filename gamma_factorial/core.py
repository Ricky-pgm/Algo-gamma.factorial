"""
Generalized factorial via the Gamma function (Lanczos approximation).

    Gamma(n+1) = n!             for integer n >= 0
    Gamma(z)   extends to almost all of C (poles at integers <= 0)
    Gamma(1/2) = sqrt(pi)   =>  factorial(-1/2) = sqrt(pi)
    Gamma(3/2) = sqrt(pi)/2 =>  factorial(1/2)  = sqrt(pi)/2

Euler's reflection formula for Re(z) < 0.5, used here to cover all
non-integer negative reals/complex numbers:
    Gamma(z) * Gamma(1-z) = pi / sin(pi*z)
"""

from __future__ import annotations

import cmath
import math

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


def _is_nonpositive_integer(z: float | complex) -> bool:
    zr = z.real if isinstance(z, complex) else z
    if isinstance(z, complex) and z.imag != 0:
        return False
    return float(zr).is_integer() and zr <= 0


def _is_finite(z: float | complex) -> bool:
    if isinstance(z, complex):
        return math.isfinite(z.real) and math.isfinite(z.imag)
    return math.isfinite(z)


def gamma(z: float | complex) -> float | complex:
    """Euler's Gamma function, defined on C \\ {0, -1, -2, ...}.

    Returns a float if the input is real (and the result is numerically
    real), otherwise a complex number.
    """
    if not _is_finite(z):
        raise ValueError(f"Gamma is not defined at {z} (NaN or infinity)")
    if _is_nonpositive_integer(z):
        raise ValueError(f"Gamma has a pole at {z} (infinite)")

    is_real_input = isinstance(z, (int, float))
    zc = complex(z)

    if zc.real < 0.5:
        result = math.pi / (cmath.sin(math.pi * zc) * gamma(1 - zc))
    else:
        zc -= 1
        acc: complex = _LANCZOS_COEF[0]
        for i in range(1, _G + 2):
            acc += _LANCZOS_COEF[i] / (zc + i)

        t = zc + _G + 0.5
        # Log-space: (zc+0.5)*log(t) - t rather than t**(zc+0.5) * exp(-t),
        # since t**(zc+0.5) overflows (float/complex) well before the final
        # result (once multiplied by the tiny exp(-t)) actually would.
        log_result = (zc + 0.5) * cmath.log(t) - t
        result = math.sqrt(2 * math.pi) * cmath.exp(log_result) * acc

    if is_real_input:
        return result.real
    if abs(result.imag) < 1e-10:
        return result.real
    return result


def factorial(n: float | complex) -> float | complex:
    """Generalized factorial: n! = Gamma(n+1).

    Works for non-negative integers, zero, and any real/complex number,
    including non-integer negatives (e.g. factorial(-0.5) = sqrt(pi)).

    Raises ValueError at poles (negative integers), where n! is infinite.
    """
    return gamma(n + 1)


def beta(a: float | complex, b: float | complex) -> float | complex:
    """Euler's Beta function: B(a, b) = Gamma(a) Gamma(b) / Gamma(a + b)."""
    return gamma(a) * gamma(b) / gamma(a + b)


def double_factorial(n: float | complex) -> float:
    """Double factorial n!! = n(n-2)(n-4)...

    Defined here only for real integers >= -1 (by convention (-1)!! = 1);
    unlike `factorial`, this is not extended to reals via Gamma (the
    continuous generalization needs 2^(n/2) Gamma(n/2+1)-style formulas
    that differ for even/odd n).

    Raises ValueError for non-integers or integers < -1.
    """
    if isinstance(n, complex) or not float(n).is_integer() or n < -1:
        raise ValueError(f"double factorial is only defined for integers >= -1, got {n}")
    result = 1.0
    k = int(n)
    while k > 1:
        result *= k
        k -= 2
    return result
