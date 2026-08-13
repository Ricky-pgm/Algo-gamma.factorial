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
    assert "erreur" in err
