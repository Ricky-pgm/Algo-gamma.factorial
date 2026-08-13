import builtins

import pytest

from gamma_factorial.cli import _eval_repl_expression, main


def _feed_input(monkeypatch, lines):
    it = iter(lines)

    def fake_input(prompt=""):
        try:
            return next(it)
        except StopIteration:
            raise EOFError from None

    monkeypatch.setattr(builtins, "input", fake_input)


def test_factorial_retrocompat_without_subcommand(capsys):
    exit_code = main(["5", "-0.5"])
    out = capsys.readouterr().out
    assert exit_code == 0
    assert "5! = 120" in out
    assert "-0.5! = 1.772" in out


def test_binomial_subcommand(capsys):
    exit_code = main(["binomial", "5", "2"])
    out = capsys.readouterr().out
    assert exit_code == 0
    assert "C(5, 2) = 10.0" in out


def test_binomial_multiple_k(capsys):
    exit_code = main(["binomial", "10", "0", "1", "2"])
    out = capsys.readouterr().out
    assert exit_code == 0
    assert out.count("C(10,") == 3


def test_overflow_reported_as_error_not_traceback(capsys):
    exit_code = main(["171"])
    err = capsys.readouterr().err
    assert exit_code == 1
    assert "error" in err


def test_invalid_number_reports_clear_error_not_raw_exception(capsys):
    exit_code = main(["not-a-number"])
    err = capsys.readouterr().err
    assert exit_code == 1
    assert "not a valid number" in err


def test_binomial_with_invalid_n_does_not_crash(capsys):
    # Regression: n used to be parsed outside the try/except in
    # _run_binomial, so an invalid n crashed with a raw traceback.
    exit_code = main(["binomial", "not-a-number", "1"])
    err = capsys.readouterr().err
    assert exit_code == 1
    assert "not a valid number" in err


@pytest.mark.parametrize(
    ("expr", "expected"),
    [
        ("5!", 120.0),
        ("gamma(2.5)", 1.3293403881791384),
        ("C(10, 3)", 120.0),
        ("binomial(5, 2)", 10.0),
        ("factorial(5)", 120.0),
    ],
)
def test_eval_repl_expression(expr, expected):
    result = _eval_repl_expression(expr)
    assert float(result) == pytest.approx(expected, rel=1e-9)


def test_repl_starts_with_no_arguments(monkeypatch, capsys):
    _feed_input(monkeypatch, ["5!", "quit"])
    exit_code = main([])
    out = capsys.readouterr().out
    assert exit_code == 0
    assert "120" in out


def test_repl_via_interactive_subcommand(monkeypatch, capsys):
    _feed_input(monkeypatch, ["C(10, 3)", "quit"])
    exit_code = main(["interactive"])
    out = capsys.readouterr().out
    assert exit_code == 0
    assert "119.99" in out or "120" in out


def test_repl_help_command(monkeypatch, capsys):
    _feed_input(monkeypatch, ["help", "quit"])
    main([])
    out = capsys.readouterr().out
    assert "Enter an expression" in out


def test_repl_reports_errors_without_crashing(monkeypatch, capsys):
    _feed_input(monkeypatch, ["-1!", "gibberish", "quit"])
    exit_code = main([])
    err = capsys.readouterr().err
    assert exit_code == 0
    assert "error:" in err


def test_repl_exits_cleanly_on_eof(monkeypatch, capsys):
    _feed_input(monkeypatch, [])
    exit_code = main([])
    assert exit_code == 0
