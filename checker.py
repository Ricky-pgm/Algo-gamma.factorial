"""Deployment smoke check for gamma_factorial.api."""

from fastapi.testclient import TestClient

from gamma_factorial.api import app

client = TestClient(app)

checks = [
    ("/", 200, "text/html"),
    ("/style.css", 200, "text/css"),
    ("/js/i18n.js", 200, "javascript"),
    ("/js/math.js", 200, "javascript"),
    ("/js/nav.js", 200, "javascript"),
    ("/factorial/5", 200, "application/json"),
    ("/factorial/-0.5", 200, "application/json"),
    ("/factorial/1%2B2j", 200, "application/json"),
    ("/gamma/0.5", 200, "application/json"),
    ("/binomial/10/3", 200, "application/json"),
    ("/binomial/4.5/2", 200, "application/json"),
    ("/beta/2/3", 200, "application/json"),
    ("/double-factorial/7", 200, "application/json"),
    ("/openapi.json", 200, "application/json"),
    ("/factorial/-1", 400, "application/json"),
    ("/factorial/abc", 422, "application/json"),
]

failed = []
for url, expected_status, expected_type in checks:
    response = client.get(url)
    content_type = response.headers.get("content-type", "")
    ok = response.status_code == expected_status and expected_type in content_type
    status = "OK" if ok else "FAIL"
    if not ok:
        failed.append((url, (expected_status, expected_type), response.status_code, content_type))
        body = response.text[:120]
    else:
        body = response.text if "json" in content_type else f"<{len(response.content)} bytes>"
    print(f"[{status}] GET {url} -> {response.status_code} ({content_type.split(';')[0]}) {body}")

if failed:
    raise SystemExit(f"CHECKER FAILED: {failed}")
print("\nAll checks passed.")
