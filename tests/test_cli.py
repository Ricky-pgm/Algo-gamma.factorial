from gamma_factorial.cli import main


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
