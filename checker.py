"""Deployment smoke check for gamma_factorial.api."""

from fastapi.testclient import TestClient

from gamma_factorial.api import app

client = TestClient(app)

checks = [
    ("/", 200),
    ("/factorial/5", 200),
    ("/factorial/-0.5", 200),
    ("/factorial/1%2B2j", 200),
    ("/gamma/0.5", 200),
    ("/binomial/10/3", 200),
    ("/binomial/4.5/2", 200),
    ("/factorial/-1", 400),
    ("/factorial/abc", 422),
]

failed = []
for url, expected in checks:
    response = client.get(url)
    status = "OK" if response.status_code == expected else "FAIL"
    if response.status_code != expected:
        failed.append((url, expected, response.status_code))
    print(f"[{status}] GET {url} -> {response.status_code} {response.json()}")

if failed:
    raise SystemExit(f"CHECKER FAILED: {failed}")
print("\nAll checks passed.")
