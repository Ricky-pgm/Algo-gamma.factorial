from __future__ import annotations

import argparse
import sys

from .binomial import binomial
from .core import factorial


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
    return complex(raw.replace(" ", ""))


def _run_factorial(args) -> int:
    exit_code = 0
    for raw in args.numbers:
        try:
            n = _parse_number(raw)
            result = factorial(n)
            print(f"{raw}! = {result}")
        except (ValueError, OverflowError) as exc:
            print(f"{raw}! -> erreur: {exc}", file=sys.stderr)
            exit_code = 1
    return exit_code


def _run_binomial(args) -> int:
    exit_code = 0
    n = _parse_number(args.n)
    for raw_k in args.k:
        try:
            k = _parse_number(raw_k)
            result = binomial(n, k)
            print(f"C({args.n}, {raw_k}) = {result}")
        except (ValueError, OverflowError) as exc:
            print(f"C({args.n}, {raw_k}) -> erreur: {exc}", file=sys.stderr)
            exit_code = 1
    return exit_code


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="gamma-factorial",
        description="Factorielle généralisée n! = Gamma(n+1), valable sur tout réel/complexe.",
    )
    subparsers = parser.add_subparsers(dest="command")

    fact_parser = subparsers.add_parser(
        "factorial", help="Calcule n! pour une ou plusieurs valeurs (défaut)."
    )
    fact_parser.add_argument(
        "numbers",
        nargs="+",
        help="Valeurs à évaluer, ex: 5 0.5 -0.5 -2.5 1+2j",
    )
    fact_parser.set_defaults(func=_run_factorial)

    binom_parser = subparsers.add_parser(
        "binomial", help="Calcule C(n, k) = Gamma(n+1)/(Gamma(k+1)Gamma(n-k+1))."
    )
    binom_parser.add_argument("n", help="Valeur de n, ex: 5 ou 4.5")
    binom_parser.add_argument(
        "k", nargs="+", help="Une ou plusieurs valeurs de k, ex: 0 1 2.5"
    )
    binom_parser.set_defaults(func=_run_binomial)

    # rétro-compatibilité : `gamma-factorial 5 -0.5` sans sous-commande
    # explicite se comporte comme `gamma-factorial factorial 5 -0.5`.
    if argv is None:
        argv = sys.argv[1:]
    if argv and argv[0] not in ("factorial", "binomial", "-h", "--help"):
        argv = ["factorial", *argv]

    args = parser.parse_args(argv)
    if not hasattr(args, "func"):
        parser.print_help()
        return 1

    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
