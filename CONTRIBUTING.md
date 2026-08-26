# Contributing

Thanks for considering a contribution. This project has two parts that
need separate setup: the Python package (math engine, CLI, API) and the
static web calculator in `docs/`.

## Setup

```bash
# Python package + dev tools (pytest, ruff, mypy, httpx2)
pip install -e ".[dev]"

# Site test tooling (jsdom, for test.mjs)
npm install
```

## Running the checks

These are the same checks that run in CI (`.github/workflows/ci.yml`) on
every push and pull request — running them locally before opening a PR
saves a round trip:

```bash
ruff check gamma_factorial tests   # lint
mypy gamma_factorial               # type checking (strict mode)
pytest                             # Python test suite
python checker.py                  # API smoke test

npm test                           # site tests (loads docs/*.html in jsdom)
```

To try the web calculator locally with the API backing it (rather than
just opening `docs/index.html` as a file, which runs in fallback mode):

```bash
pip install uvicorn
uvicorn gamma_factorial.api:app --reload
# then open http://127.0.0.1:8000/
```

## Where things live

- `gamma_factorial/core.py`, `binomial.py` — the math (Gamma via Lanczos,
  factorial, binomial, beta, double factorial). This is the single
  source of truth for correctness; see [README.md](README.md#how-it-works)
  for the reasoning behind each piece.
- `gamma_factorial/api.py` — the FastAPI app; one endpoint per operation,
  reusing `_parse`/`_serialize` for consistent error handling.
- `gamma_factorial/cli.py` — the command-line tool and REPL.
- `docs/` — the static web calculator (plain HTML/CSS/JS, no build step,
  no framework). `docs/js/` holds 9 classic (non-module) scripts, loaded
  in dependency order and merged onto a shared `window.GF` namespace —
  `i18n.js` (EN/FR/DE dictionary), `math.js` (the local math engine),
  `api.js` (`resolveResult`, the API-first/local-fallback logic),
  `plot.js` (live curve helpers), `reasoning.js`/`practical.js` (the
  "how it's computed"/"what it's for" panels), `keypad.js`, `theme.js`,
  and `nav.js` (navigation, language switching, and `initDetailPage`,
  the shared init/render loop for the 3 detail pages). Deliberately not
  `<script type="module">`: real ES modules break `file://` opening on
  Chrome/Safari (CORS), which would break "open the file directly in a
  browser."
- `tests/` — pytest suite for the Python package.
- `test.mjs` — jsdom-based tests that load the actual `docs/*.html` pages
  and exercise them (evaluating expressions, switching language/theme,
  clicking through the UI).

## Keeping the JS and Python math in sync

The web calculator's headline result is fetched from the API
(`GF.resolveResult()` in `docs/js/api.js`) whenever it's reachable — the
JS math in `docs/js/math.js` is only the source of truth for the live
curve plot and for the offline fallback (shown with a small notice) when
the API can't be reached. If you add or change a math function:

1. Implement/fix it in `gamma_factorial/core.py` (or `binomial.py`) first,
   with a pytest case.
2. Add or update the matching API endpoint in `gamma_factorial/api.py`.
3. Port the same change to `docs/js/math.js` so the fallback path
   doesn't silently diverge from the API.
4. If it's a new operation exposed to users, wire it into
   `API_ENDPOINT_BY_KIND` (`docs/js/api.js`) so `resolveResult()` can
   reach it.

## Commit style

- Small, logically separate commits — one per change, not one giant diff
  for a whole feature. Makes review and `git bisect` actually useful.
- No `git commit --amend` or force-push unless you're explicitly asked to
  (or it's your own not-yet-pushed branch).

## Pull requests

- Keep the scope focused — if you notice something unrelated worth
  fixing, open a separate PR (or at least a separate commit).
- Make sure the checks above pass locally before opening the PR; CI will
  run them again, but catching failures locally is faster.
