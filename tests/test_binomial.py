import math

import pytest

from gamma_factorial import binomial


def test_matches_math_comb_for_integers():
    for n in range(0, 15):
        for k in range(0, n + 1):
            assert binomial(n, k) == pytest.approx(math.comb(n, k), rel=1e-9)


def test_small_integers_are_bit_exact():
    # Regression: binomial() used to always route through Gamma(n+1)/
    # (Gamma(k+1)*Gamma(n-k+1)), so e.g. binomial(10, 3) returned
    # 119.99999999999982 instead of 120 — caught via
    # docs/applications.html displaying such values to users. Below
    # n=55 the incremental product stays exactly representable as a
    # float; above that, rounding differences with math.comb's exact
    # integer arithmetic are expected (see test_larger_n_stays_close_to_exact).
    for n in range(0, 55):
        for k in range(0, n + 1):
            assert binomial(n, k) == float(math.comb(n, k))


def test_larger_n_stays_close_to_exact():
    # Above the bit-exact range, the relative error must stay at
    # float-precision level, not carry Gamma-ratio rounding noise.
    for n, k in [(55, 26), (100, 50), (200, 100)]:
        assert binomial(n, k) == pytest.approx(math.comb(n, k), rel=1e-12)


def test_large_n_does_not_overflow():
    # Regression: Gamma(n+1) alone can overflow float (n+1 > 170) even
    # when the final ratio is a very representable number — e.g.
    # binomial(200, 100) raised OverflowError even though math.comb(200,
    # 100) computes fine and the true value comfortably fits a float.
    # The exact-product shortcut must not go through Gamma(n+1) directly
    # for integer n, k in this range.
    assert binomial(200, 100) == pytest.approx(math.comb(200, 100), rel=1e-9)
    assert binomial(300, 150) == pytest.approx(math.comb(300, 150), rel=1e-9)


def test_symmetric():
    assert binomial(10, 3) == pytest.approx(binomial(10, 7), rel=1e-9)


def test_zero_and_full_choice():
    for n in [0, 1, 5, 12.5]:
        assert binomial(n, 0) == pytest.approx(1.0, rel=1e-9)


def test_continuous_interpolation_between_integers():
    # C(n, k) for non-integer n should sit strictly between the bracketing
    # integer values where the function is locally monotonic.
    low = binomial(4, 2)
    mid = binomial(4.5, 2)
    high = binomial(5, 2)
    assert low < mid < high


def test_half_integer_known_value():
    # C(4.5, 2) = 4.5! / (2! * 2.5!) = 7.875
    assert binomial(4.5, 2) == pytest.approx(7.875, rel=1e-9)


def test_out_of_range_integer_choices_are_zero():
    # C(n, k) = 0 for k > n or k < 0, as with math.comb: the denominator
    # Gamma pole makes the ratio 0.
    assert binomial(5, 6) == 0.0
    assert binomial(5, -1) == 0.0
    assert binomial(2, 5) == 0.0
    assert binomial(0, 1) == 0.0
    assert binomial(3.5, 4.5) == 0.0


def test_n_pole_raises_with_clear_message():
    # When n itself is a non-positive integer the ratio is indeterminate.
    with pytest.raises(ValueError, match="n=-3"):
        binomial(-3, 1)
    with pytest.raises(ValueError, match="n=-1"):
        binomial(-1, -1)
