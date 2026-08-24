"""HTTP API exposing the generalized factorial, Gamma function and binomial coefficient."""

from __future__ import annotations

from typing import Any

from fastapi import FastAPI, HTTPException

from .binomial import binomial
from .cli import NumberParseError, _parse_number
from .core import factorial, gamma

app = FastAPI(
    title="gamma-factorial",
    description=(
        "Generalized factorial n! = Gamma(n+1) (Lanczos approximation), "
        "valid for any real or complex number. "
        "Values accept int, float or complex literals, e.g. 5, -0.5, 1+2j "
        "(URL-encode '+' as %2B)."
    ),
    version="0.1.0",
)


def _serialize(value: float | complex) -> float | dict[str, float]:
    if isinstance(value, complex):
        return {"real": value.real, "imag": value.imag}
    return value


def _parse(raw: str) -> float | complex:
    try:
        return _parse_number(raw)
    except NumberParseError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from None


@app.get("/")
def root() -> dict[str, Any]:
    return {
        "name": "gamma-factorial",
        "version": "0.1.0",
        "description": app.description,
        "endpoints": {
            "factorial": "/factorial/{value}",
            "gamma": "/gamma/{value}",
            "binomial": "/binomial/{n}/{k}",
        },
        "examples": [
            "/factorial/5",
            "/factorial/-0.5",
            "/factorial/1%2B2j",
            "/gamma/0.5",
            "/binomial/10/3",
            "/binomial/4.5/2",
        ],
    }


@app.get("/factorial/{value}")
def factorial_endpoint(value: str) -> dict[str, Any]:
    n = _parse(value)
    try:
        result = factorial(n)
    except (ValueError, OverflowError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None
    return {"input": value, "operation": "factorial", "result": _serialize(result)}


@app.get("/gamma/{value}")
def gamma_endpoint(value: str) -> dict[str, Any]:
    z = _parse(value)
    try:
        result = gamma(z)
    except (ValueError, OverflowError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None
    return {"input": value, "operation": "gamma", "result": _serialize(result)}


@app.get("/binomial/{n_value}/{k_value}")
def binomial_endpoint(n_value: str, k_value: str) -> dict[str, Any]:
    n = _parse(n_value)
    k = _parse(k_value)
    try:
        result = binomial(n, k)
    except (ValueError, OverflowError) as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from None
    return {
        "input": {"n": n_value, "k": k_value},
        "operation": "binomial",
        "result": _serialize(result),
    }
