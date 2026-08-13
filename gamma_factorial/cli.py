from __future__ import annotations

import argparse
import re
import sys

from .binomial import binomial
from .core import factorial, gamma


class NumberParseError(ValueError):
    pass


def _parse_number(raw: str) -> complex | float:
    raw = raw.strip()
    try:
        return int(raw)
    except ValueError:
        pass
    try:
        return float(raw)
    except ValueError:
        pass
    try:
        return complex(raw.replace(" ", ""))
    except ValueError:
        raise NumberParseError(f"'{raw}' is not a valid number") from None


def _run_factorial(args: argparse.Namespace) -> int:
    exit_code = 0
    for raw in args.numbers:
        try:
            n = _parse_number(raw)
            result = factorial(n)
            print(f"{raw}! = {result}")
        except (ValueError, OverflowError) as exc:
            print(f"{raw}! -> error: {exc}", file=sys.stderr)
            exit_code = 1
    return exit_code


def _run_binomial(args: argparse.Namespace) -> int:
    exit_code = 0
    try:
        n = _parse_number(args.n)
    except NumberParseError as exc:
        print(f"C({args.n}, ...) -> error: {exc}", file=sys.stderr)
        return 1

    for raw_k in args.k:
        try:
            k = _parse_number(raw_k)
            result = binomial(n, k)
            print(f"C({args.n}, {raw_k}) = {result}")
        except (ValueError, OverflowError) as exc:
            print(f"C({args.n}, {raw_k}) -> error: {exc}", file=sys.stderr)
            exit_code = 1
    return exit_code


_FACTORIAL_SUFFIX_RE = re.compile(r"^(?P<n>.+?)!$")
_CALL_RE = re.compile(r"^(?P<func>[A-Za-z_]+)\((?P<args>.*)\)$")

_REPL_HELP = """\
Enter an expression and press Enter. Examples:
  5!                factorial(5)         -> 120.0
  -0.5!             factorial(-0.5)      -> sqrt(pi)
  gamma(2.5)                             -> Gamma(2.5)
  C(10, 3)          binomial(10, 3)      -> 120.0
  C(4.5, 2)                              -> continuous interpolation

Commands: help, quit (or exit, Ctrl-D)
"""


def _eval_repl_expression(expr: str) -> str:
    expr = expr.strip()

    factorial_match = _FACTORIAL_SUFFIX_RE.match(expr)
    if factorial_match:
        n = _parse_number(factorial_match.group("n"))
        return f"{factorial(n)}"

    call_match = _CALL_RE.match(expr)
    if call_match:
        func = call_match.group("func").lower()
        raw_args = [a.strip() for a in call_match.group("args").split(",") if a.strip()]

        if func in ("factorial",) and len(raw_args) == 1:
            n = _parse_number(raw_args[0])
            return f"{factorial(n)}"
        if func == "gamma" and len(raw_args) == 1:
            z = _parse_number(raw_args[0])
            return f"{gamma(z)}"
        if func in ("c", "binomial") and len(raw_args) == 2:
            n = _parse_number(raw_args[0])
            k = _parse_number(raw_args[1])
            return f"{binomial(n, k)}"

        raise NumberParseError(
            f"unrecognized expression '{expr}' (try: help)"
        )

    raise NumberParseError(f"unrecognized expression '{expr}' (try: help)")


def _run_repl() -> int:
    print("gamma-factorial interactive mode — type 'help' or 'quit'")
    while True:
        try:
            line = input("> ")
        except (EOFError, KeyboardInterrupt):
            print()
            return 0

        expr = line.strip()
        if not expr:
            continue
        if expr in ("quit", "exit"):
            return 0
        if expr == "help":
            print(_REPL_HELP, end="")
            continue

        try:
            print(_eval_repl_expression(expr))
        except (ValueError, OverflowError) as exc:
            print(f"error: {exc}", file=sys.stderr)


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="gamma-factorial",
        description="Generalized factorial n! = Gamma(n+1), valid for any real/complex number.",
    )
    subparsers = parser.add_subparsers(dest="command")

    fact_parser = subparsers.add_parser(
        "factorial", help="Compute n! for one or more values (default)."
    )
    fact_parser.add_argument(
        "numbers",
        nargs="+",
        help="Values to evaluate, e.g. 5 0.5 -0.5 -2.5 1+2j",
    )
    fact_parser.set_defaults(func=_run_factorial)

    binom_parser = subparsers.add_parser(
        "binomial", help="Compute C(n, k) = Gamma(n+1)/(Gamma(k+1)Gamma(n-k+1))."
    )
    binom_parser.add_argument("n", help="Value of n, e.g. 5 or 4.5")
    binom_parser.add_argument(
        "k", nargs="+", help="One or more values of k, e.g. 0 1 2.5"
    )
    binom_parser.set_defaults(func=_run_binomial)

    subparsers.add_parser(
        "interactive", help="Start an interactive REPL to evaluate expressions."
    )

    # backward compatibility: `gamma-factorial 5 -0.5` without an explicit
    # subcommand behaves like `gamma-factorial factorial 5 -0.5`.
    if argv is None:
        argv = sys.argv[1:]
    if argv and argv[0] not in ("factorial", "binomial", "interactive", "-h", "--help"):
        argv = ["factorial", *argv]

    if not argv:
        return _run_repl()

    args = parser.parse_args(argv)
    if getattr(args, "command", None) == "interactive":
        return _run_repl()
    if not hasattr(args, "func"):
        parser.print_help()
        return 1

    exit_code: int = args.func(args)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
