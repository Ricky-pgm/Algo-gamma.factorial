# gamma-factorial

Factorielle généralisée n! = Γ(n+1), calculée via l'**approximation de
Lanczos** de la fonction Gamma, avec la **formule de réflexion d'Euler**
pour les réels/complexes négatifs non-entiers.

Contrairement à une factorielle récursive/itérative classique (limitée aux
entiers positifs), celle-ci est définie sur presque tout ℝ et ℂ :

```python
from gamma_factorial import factorial

factorial(5)      # 120.0
factorial(-0.5)   # 1.7724538509055159  (= sqrt(pi))
factorial(0.5)    # 0.8862269254527586  (= sqrt(pi)/2)
factorial(1 + 2j) # (0.11229424234632635+0.3236128855019272j)

factorial(-1)     # ValueError: pôle (n! infini)
```

## Installation

```bash
pip install -e ".[dev]"
```

## Utilisation en CLI

```bash
python -m gamma_factorial.cli 5 -0.5 0.5 -2.5 "1+2j"
# ou, une fois installé :
gamma-factorial 5 -0.5 0.5 -2.5 "1+2j"
```

## Tests

```bash
pytest
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
