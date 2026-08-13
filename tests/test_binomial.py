import math

import pytest

from gamma_factorial import binomial


def test_matches_math_comb_for_integers():
    for n in range(0, 15):
        for k in range(0, n + 1):
            assert binomial(n, k) == pytest.approx(math.comb(n, k), rel=1e-9)


def test_symmetric():
    assert binomial(10, 3) == pytest.approx(binomial(10, 7), rel=1e-9)


def test_zero_and_full_choice():
    for n in [0, 1, 5, 12.5]:
        assert binomial(n, 0) == pytest.approx(1.0, rel=1e-9)


def test_continuous_interpolation_between_integers():
    # C(n, k) pour n non-entier doit être strictement entre les valeurs
    # entières encadrantes lorsque la fonction y est monotone localement.
    low = binomial(4, 2)
    mid = binomial(4.5, 2)
    high = binomial(5, 2)
    assert low < mid < high


def test_half_integer_known_value():
    # C(4.5, 2) = 4.5! / (2! * 2.5!) = 7.875
    assert binomial(4.5, 2) == pytest.approx(7.875, rel=1e-9)
