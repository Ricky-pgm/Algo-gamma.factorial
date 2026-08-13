from __future__ import annotations

import argparse
import sys

from .binomial import binomial
from .core import factorial


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

    # backward compatibility: `gamma-factorial 5 -0.5` without an explicit
    # subcommand behaves like `gamma-factorial factorial 5 -0.5`.
    if argv is None:
        argv = sys.argv[1:]
    if argv and argv[0] not in ("factorial", "binomial", "-h", "--help"):
        argv = ["factorial", *argv]

    args = parser.parse_args(argv)
    if not hasattr(args, "func"):
        parser.print_help()
        return 1

    exit_code: int = args.func(args)
    return exit_code


if __name__ == "__main__":
    raise SystemExit(main())
