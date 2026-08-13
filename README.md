# gamma-factorial

Factorielle généralisée n! = Γ(n+1), calculée via l'**approximation de
Lanczos** de la fonction Gamma, avec la **formule de réflexion d'Euler**
pour les réels/complexes négatifs non-entiers.

Contrairement à une factorielle récursive/itérative classique (limitée aux
entiers positifs), celle-ci est définie sur presque tout ℝ et ℂ :

```python
from gamma_factorial import factorial, binomial

factorial(5)      # 120.0
factorial(-0.5)   # 1.7724538509055159  (= sqrt(pi))
factorial(0.5)    # 0.8862269254527586  (= sqrt(pi)/2)
factorial(1 + 2j) # (0.11229424234632635+0.3236128855019272j)

factorial(-1)     # ValueError: pôle (n! infini)

# Coefficient binomial généralisé : C(n, k) = Gamma(n+1) / (Gamma(k+1) Gamma(n-k+1))
binomial(5, 2)    # 10.0     (coefficient binomial classique)
binomial(4.5, 2)  # 7.875    (interpolation continue "entre" les lignes du triangle de Pascal)
```

Une démo interactive du triangle de Pascal continu (curseur sur `n`, courbe
`C(n, k)` en fonction de `k`) est disponible dans `docs/pascal-continuous.html` -
un aperçu de ce que `binomial()` permet de tracer.

## Installation

```bash
pip install -e ".[dev]"
```

## Utilisation en CLI

```bash
python -m gamma_factorial.cli 5 -0.5 0.5 -2.5 "1+2j"
# ou, une fois installé :
gamma-factorial 5 -0.5 0.5 -2.5 "1+2j"

# coefficient binomial généralisé
gamma-factorial binomial 5 2      # C(5, 2) = 10.0
gamma-factorial binomial 4.5 2    # C(4.5, 2) = 7.875 (interpolation continue)
gamma-factorial binomial 10 0 1 2 3   # plusieurs valeurs de k d'un coup
```

## Tests

```bash
pytest
```

## Qualité de code

```bash
ruff check gamma_factorial tests   # lint
mypy gamma_factorial               # vérification de types (mode strict)
```

## Comment ça marche

- `gamma(z)` implémente Γ via Lanczos (g=7, ~15 chiffres significatifs de
  précision), la méthode utilisée par SciPy/GSL.
- Pour `Re(z) < 0.5`, on passe par la formule de réflexion
  `Γ(z)·Γ(1-z) = π / sin(πz)` plutôt que d'évaluer directement Lanczos, ce
  qui reste stable numériquement et couvre tous les réels négatifs
  non-entiers (ex: `-1/2`, `-2.5`, `-3.7`...).
- Les entiers négatifs ou nuls (`0, -1, -2, ...`) sont de vrais pôles de Γ
  (factorielle infinie) : `gamma`/`factorial` lèvent `ValueError` plutôt que
  de renvoyer un nombre incorrect.
- Le calcul du terme de Lanczos passe par le log-espace
  (`exp((z+0.5)·log(t) - t)` plutôt que `t**(z+0.5) * exp(-t)`) pour éviter un
  débordement (`OverflowError`) prématuré : sans ça, `factorial(142)`
  débordait déjà alors que `142!` tient très bien dans un `float`. La limite
  réelle est maintenant repoussée jusqu'à `170!`, le plafond des `float`
  eux-mêmes (`factorial(171)` lève `OverflowError`, comme
  `float(math.factorial(171))`).
- `binomial(n, k)` (dans `gamma_factorial.binomial`) généralise le
  coefficient binomial `C(n, k) = n! / (k!(n-k)!)` à des `n`, `k` réels grâce
  à Gamma — ça permet d'"interpoler" entre les lignes/colonnes du triangle de
  Pascal, comme illustré dans `docs/pascal-continuous.html`.
