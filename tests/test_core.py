import math

import pytest

from gamma_factorial import factorial, gamma


def test_integers_match_math_factorial():
    for n in range(0, 15):
        assert factorial(n) == pytest.approx(math.factorial(n), rel=1e-9)


def test_half_integer_known_values():
    sqrt_pi = math.sqrt(math.pi)
    assert factorial(-0.5) == pytest.approx(sqrt_pi, rel=1e-12)
    assert factorial(0.5) == pytest.approx(sqrt_pi / 2, rel=1e-12)
    assert gamma(0.5) == pytest.approx(sqrt_pi, rel=1e-12)


def test_negative_non_integers_are_real_floats():
    for n in [-0.5, -1.5, -2.5, -3.7, -10.2, -100.5]:
        result = factorial(n)
        assert isinstance(result, float)


def test_negative_half_integer_signs_alternate():
    assert factorial(-0.5) > 0
    assert factorial(-1.5) < 0
    assert factorial(-2.5) > 0
    assert factorial(-3.5) < 0


def test_poles_at_negative_integers_raise():
    for n in [-1, -2, -3, -10]:
        with pytest.raises(ValueError):
            factorial(n)


def test_zero_pole_on_gamma():
    with pytest.raises(ValueError):
        gamma(0)


def test_complex_input_returns_complex():
    result = factorial(1 + 2j)
    assert isinstance(result, complex)
    assert result.real == pytest.approx(0.11229424234632635, rel=1e-9)
    assert result.imag == pytest.approx(0.3236128855019272, rel=1e-9)


def test_recursive_relation_gamma_z_plus_1():
    for z in [0.3, 1.7, 2.9, -0.3, -1.7]:
        assert gamma(z + 1) == pytest.approx(z * gamma(z), rel=1e-9)


def test_large_values_near_float_max_do_not_overflow_prematurely():
    # 142! ~ 1.4e245 : loin du plafond float (~1.8e308), ne doit pas déborder.
    assert factorial(142) == pytest.approx(math.factorial(142), rel=1e-9)
    # 170! est le plus grand n! représentable en float ; doit passer aussi.
    assert factorial(170) == pytest.approx(float(math.factorial(170)), rel=1e-9)


def test_beyond_float_max_raises_overflow():
    with pytest.raises(OverflowError):
        factorial(171)
