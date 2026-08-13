from __future__ import annotations

import argparse
import sys

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


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="gamma-factorial",
        description="Factorielle généralisée n! = Gamma(n+1), valable sur tout réel/complexe.",
    )
    parser.add_argument(
        "numbers",
        nargs="+",
        help="Valeurs à évaluer, ex: 5 0.5 -0.5 -2.5 1+2j",
    )
    args = parser.parse_args(argv)

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


if __name__ == "__main__":
    raise SystemExit(main())
