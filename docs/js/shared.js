(function () {
  "use strict";
  const I18N = {
    en: {
      eyebrow: "gamma-factorial",
      pageTitle: "Generalized factorial calculator",
      pageLede: "Factorial and related functions, extended to work on any real number — not just whole numbers. Type an expression to see the result, the curve around it, and how it was computed.",
      inputPlaceholder: "5!  gamma(2.5)  C(10,3)",
      evaluate: "Evaluate",
      resultEmpty: "Try {ex1}, {ex2}, or {ex3} below.",
      comparing: "Comparing",
      history: "History",
      historyClear: "Clear",
      note: "Complex numbers are supported ({c1} or {c2}), same as the Python CLI — curve plotting is only shown for real inputs. Same Gamma function, same reflection formula, same pole/overflow errors as the package.",
      links: "See also: {link} — a dedicated explorer for {code}.",
      linkText: "the continuous Pascal's triangle",
      copyLink: "copy link",
      copied: "copied",
      copyFailed: "copy failed",
      pinToCompare: "pin to compare",
      removeFromComparison: "Remove {expr} from comparison",
      complexNote: "Complex result — curve plotting is only available for real inputs.",
      plotHint: "Scroll or pinch to zoom, drag to pan, hover for exact values, double-click to reset.",
      resetZoom: "reset zoom",
      showTable: "show table",
      hideTable: "hide table",
      exportPng: "export PNG",
      exportCsv: "export CSV",
      tableK: "k",
      tableN: "n",
      tableValue: "value",
      plotCaptionGamma: "Γ(z) around z = {v}",
      plotCaptionFactorial: "n! around n = {v}",
      plotCaptionDoubleFactorial: "n!! around n = {v}",
      plotCaptionBinomial: "C({n}, k) around k = {v}",
      plotCaptionBeta: "B(a, {b}) around a = {v}",
      errNotValidNumber: "'{raw}' is not a valid number",
      errGammaNotDefined: "Gamma is not defined at {z} (NaN or infinity)",
      errGammaPole: "Gamma has a pole at {z} (infinite)",
      errGammaOverflow: "Gamma({z}) overflows the range of a float",
      errBinomialPoleN: "binomial({n}, {k}) is undefined: n={n} is a pole of Gamma (n+1 integer <= 0)",
      errUnrecognized: "unrecognized expression '{expr}' (try 5!, gamma(2.5), C(10,3), 1+2i)",
      errDoubleFactorialNonInt: "n!! is only supported for non-negative integers here",
      error: "error",
      justNow: "just now",
      minutesAgo: "{n}m ago",
      hoursAgo: "{n}h ago",
      badgeFactorial: "Factorial",
      badgeDoubleFactorial: "Double factorial",
      badgeGamma: "Gamma function",
      badgeBinomial: "Binomial coefficient",
      badgeBeta: "Beta function",
      badgeNumber: "Number",
      reasoningTitle: "How this was computed",
      reasoningShowFull: "Show full derivation",
      reasoningShowLess: "Show less",
      noteDefinition: "definition",
      noteIntegerN: "n is a whole number",
      noteDirect: "Re(z) ≥ 0.5, Lanczos series",
      noteReflection: "Re(z) < 0.5, reflection formula",
      noteReflectionFormula: "Γ(z)Γ(1−z) = π/sin(πz)",
      noteCheck: "check: Γ(z+1) = zΓ(z)",
      noteStepDown: "n!! steps down by 2",
      noteChooseKFromN: "ways to choose k from n",
      notePascalRow: "classic Pascal's-triangle value",
      noteInterpolated: "k is not a whole number: continuous interpolation",
      noteBetaGamma: "B(a,b) = Γ(a)Γ(b)/Γ(a+b)",
      reasoningLeadFactorialInt: "{n}! counts the permutations of {n} distinct objects. Expanding the product:",
      reasoningLeadFactorialGamma: "The factorial is extended to any real number through n! = Γ(n+1). Since n+1 = {g} ≥ 0.5, the Lanczos series is used directly.",
      reasoningLeadFactorialReflect: "The factorial is extended through n! = Γ(n+1). Here n+1 = {g} < 0.5, where the Lanczos series is numerically unstable, so Γ is computed with Euler's reflection formula.",
      reasoningLeadGammaDirect: "Γ is evaluated with the Lanczos series (g = 7) in log-space; at whole numbers it reproduces Γ(n) = (n−1)!.",
      reasoningLeadGammaReflect: "z = {z} < 0.5: the Lanczos series is numerically unstable here, so Γ(z) is computed with Euler's reflection formula.",
      reasoningLeadDouble: "The double factorial keeps every other factor: n!! = n·(n−2)·(n−4)···",
      reasoningLeadBinomial: "C(n, k) is a ratio of Gamma functions; at whole n and k it reproduces Pascal's triangle exactly.",
      reasoningLeadBeta: "The beta function is a ratio of Gamma values: the continuous analogue of the binomial coefficient.",
      reasoningTailFactorial: "Check: (n+1)! = (n+1)·n! still holds, since Γ(n+2) = (n+1)·Γ(n+1).",
      reasoningTailGamma: "Check: Γ(z+1) = z·Γ(z) — the functional equation all Gamma values satisfy.",
      reasoningTailDouble: "Conventions: 0!! = 1 and (−1)!! = 1.",
      reasoningTailBinomial: "For whole k this is the classic Pascal value; for fractional k it is the smooth interpolation between the rows.",
      reasoningTailBeta: "Equivalently B(a,b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt — the normalizing constant of the beta distribution.",
      practTitle: "What it's for",
      practWhat: "What it is",
      practUse: "Concrete example",
      practCurve: "Reading the curve",
      practTry: "Try it yourself",
      practFactorialWhat: "n! counts the permutations of n distinct objects: the ways to put n items in order, or to assign n jobs to n workers, one each.",
      practFactorialUse: "Arrange {n} books on a shelf: {n}! = {v} distinct orderings. If some books are identical, divide by the factorials of the repeats (multinomial coefficient).",
      practFactorialGamma: "For a non-integer {n}, the interpolation shows up across science — e.g. the volume of a sphere in d dimensions, V_d = π^(d/2)/Γ(d/2+1). Try d = {d}: V ≈ {vol}.",
      practFactorialCurve: "The dots are the classic whole-number factorials; the curve between them is the smooth interpolation. Below −1 the curve changes sign between consecutive unit intervals and shoots up at every negative integer (poles of Γ). The values outrun any exponential: 170! already overflows a double.",
      practFactorialTry: "Evaluate 3.5! then 4.5! and pin both: the interpolation passes exactly through 4! = 24 and 5! = 120.",
      practFactorialWhere: "Sorting algorithms explore n! permutations in the worst case \u2014 that is why O(n!) is intractable. In bioinformatics, n! counts the possible orderings of DNA fragments in sequencing. Every time you arrange n books, shuffle a deck, or seat n guests, you are computing n!.",
      practGammaWhat: "Γ(z) extends the factorial to every complex number: Γ(n) = (n−1)! for whole n. It is the backbone of statistics and physics.",
      practGammaUse: "The Gamma distribution with shape a has density t^(a−1)·e^(−t)/Γ(a). And Γ(1/2) = √π ≈ 1.7725, which gives Γ(3/2) = √π/2 ≈ 0.8862.",
      practGammaCurve: "The curve has a pole (vertical asymptote) at every integer ≤ 0 and a minimum ≈ 0.8856 near z ≈ 1.4616. Between 0 and 1 it dips below 1; past 1 it climbs like a factorial.",
      practGammaTry: "Evaluate Γ(1.46) to spot the minimum, Γ(0.5) = √π, then Γ(0.2) to watch the reflection formula take over below 0.5.",
      practGammaWhere: "The Gamma function underpins the chi-squared, Student t, and F-distributions used in every hypothesis test. In physics it normalizes quantum wave functions. Machine learning uses it in variational inference and in the evidence lower bound of deep generative models.",
      practDoubleWhat: "n!! = n·(n−2)·(n−4)··· is the product of every other factor — natural whenever things come in pairs.",
      practDoubleUseOdd: "Moments of the normal distribution: E[X^(2k)] = (2k−1)!!·σ^(2k). With n = {n} odd, k = {k} and (2k−1)!! = {v}.",
      practDoubleUseEven: "Even double factorials satisfy (2k)!! = 2^k·k!. With n = {n} even, k = {k}: 2^k·k! = {v}.",
      practDoubleCurve: "n!! is defined only for whole numbers (the dots). Even and odd rows form two separate families; 0!! = 1 and (−1)!! = 1 by convention.",
      practDoubleTry: "Compare 5!! with 6!!, then try 10!! — even double factorials grow very fast.",
      practDoubleWhere: "In physics, (2k-1)!! appears in Wick theorem for computing Feynman diagram contractions. In statistics, it gives the even moments of the normal distribution. Even double factorials (2k)!! = 2^k k! show up in sphere-surface calculations.",
      practBinomialWhat: "C(n, k) counts the ways to choose k items from n when order does not matter (combinations).",
      practBinomialUse: "Pick {k} people from {n}: there are {c} possible teams. To allow repetition, use C(n+k−1, k).",
      practBinomialInterp: "Here k = {k} is not a whole number, so the value {c} is the smooth interpolation between rows of Pascal's triangle — it still lands exactly on {cint} at every whole k.",
      practBinomialCurve: "As k sweeps across the plot, C(n, k) peaks at k = n/2 and is symmetric around it. Pinning two rows shows how a larger n gives a taller, wider bell.",
      practBinomialTry: "Evaluate C(10, 3), C(10, 5), C(10, 7) and pin two of them to compare the rows.",
      practBinomialWhere: "Lottery odds are pure binomials: C(49,6) = 13,983,816 for a standard 6-from-49 draw. In machine learning, C(n,k) counts the ways to select k features from n candidates. Bioinformatics uses it to estimate k-mer occurrence frequencies across a genome.",
      practBetaWhat: "B(a, b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt = Γ(a)Γ(b)/Γ(a+b) — the normalizing constant of the beta distribution.",
      practBetaUsePeak: "A Beta(a, b) distribution models a probability in Bayesian statistics (e.g. A/B tests). Its peak is at (a−1)/(a+b−2) = {peak}.",
      practBetaUse: "A Beta(a, b) distribution models a probability in Bayesian statistics (e.g. A/B tests).",
      practBetaCurve: "For a fixed b, B(a, b) decays like a power of a; the highlighted point is the value you just computed.",
      practBetaTry: "Try B(0.5, 0.5) = π (the arcsine law) and compare it with B(2, 3) = 1/12.",
      practBetaWhere: "Beta distributions are the workhorse of Bayesian A/B testing: Beta(a,b) models your belief about a conversion rate after a successes and b failures. They also appear in reliability engineering and quality control.",
      navCalc: "Calculator",
      navReasoning: "How it's computed",
      navApps: "What it's for",
      navFaq: "FAQ",
      navApp: "Applications",
      exGroupIntegers: "Integers",      themeToLight: "Switch to light mode",
      themeToDark: "Switch to dark mode",

      exGroupReals: "Non-integer reals",
      exGroupPoles: "Negative values & poles",
      exGroupComplex: "Complex numbers",
      exGroupFunctions: "Functions",
      specTitle: "What this tool computes",
      specSummaryOpen: "Specifications",
      specIntro:
        "The generalized factorial n! = Γ(n+1), computed with the Lanczos approximation (g = 7, reflection formula for Re(z) < 0.5). It matches the classic factorial on non-negative integers and extends it to any real or complex input. Everything runs locally in this page — no server involved.",
      practWhere: "Where you'll see this",
      specSyntaxTitle: "Accepted syntax",
      specRowFactorial: "factorial of n",
      specRowDoubleFactorial: "double factorial of n",
      specRowGamma: "Euler Gamma function Γ(z)",
      specRowBinomial: "generalized binomial coefficient",
      specRowBeta: "Beta function B(a, b) = Γ(a)·Γ(b)/Γ(a+b)",
      specRowNumber: "a bare number is echoed back",
      specNumbersTitle: "Accepted numbers",
      specNumbersBody:
        "Integers and decimals (2, -3.75), scientific notation (2e3), and complex numbers written with i or j: 1+2i, -0.5j, i. Spaces inside a complex literal are ignored. Operands may be wrapped in parentheses: (4.5)!, (-0.5)!.",
      specLimitsTitle: "Precision & limits",
      specLimitsBody:
        "IEEE-754 double precision — about 15 significant digits. Factorials overflow beyond n ≈ 170. At negative integers (−1, −2, …) Γ has poles: those inputs raise an error instead of returning a value. Complex results are computed but not plotted.",
      reasoningPageTitle: "How it's computed",
      reasoningPageLede: "The full step-by-step derivation behind the number — the definition used, the numeric values at each stage, and the checks that keep it honest.",
      appsPageTitle: "What it's for",
      appsPageLede: "Concrete uses of this value — what it counts, a worked example, how to read the curve, and what to try next.",
      appPageTitle: "Real-world applications",
      appPageLede: "Where generalized factorials, Gamma, binomial and beta functions show up — from algorithms to AI, physics to everyday life.",
      domainCS: "Computer Science & Algorithms",
      domainCSStat: "20! ≈ 2.4 × 10¹⁸",
      domainCSDesc: "That's how many routes a brute-force TSP solver must check for just 20 cities — at 1 billion operations per second, it would take 76 years. Factorials are the reason we need clever algorithms, not just fast computers.",
      domainCSEx1: "Sorting: 52! ≈ 8×10⁶⁷ possible orderings of a deck of cards — more than atoms in the observable universe (10⁸⁰).",
      domainCSEx2: "Feature selection: choosing 5 features from 20 candidates = C(20,5) = 15,504 — that's why exhaustive search is rarely practical.",
      domainCSEx3: "RSA encryption: factoring a 2048-bit number is hard because the search space is combinatorially vast.",
      domainAI: "AI & Machine Learning",
      domainAIStat: "Beta(8, 4)",
      domainAIDesc: "After 8 clicks and 4 purchases on your A/B test, Bayesian inference uses Beta distributions to estimate the true conversion rate — no p-values needed, just continuous updating.",
      domainAIEx1: "LLM sampling: GPT chooses the next token from a multinomial distribution — the normalization constant involves factorials of vocabulary size.",
      domainAIEx2: "Thompson sampling: uses Beta posteriors to balance exploration vs exploitation in real-time ad placement.",
      domainAIEx3: "Cross-validation: C(10,3) = 120 ways to split data into folds — the basis of robust model evaluation.",
      domainStats: "Statistics & Data Science",
      domainStatsStat: "p = 0.05 ≠ 95%",
      domainStatsDesc: "A p-value of 0.05 does NOT mean there's a 95% chance the effect is real. It means: if there were no effect, you'd see data this extreme 5% of the time. Bayesian methods using Beta posteriors give you what you actually want.",
      domainStatsEx1: "Clinical trials: testing a drug on 200 patients uses binomial power analysis to determine sample size.",
      domainStatsEx2: "Chi-squared test: with k=10 degrees of freedom, the distribution is Gamma(5) — that's what your stats software computes.",
      domainStatsEx3: "Permutation test: assigning 12 patients to two groups of 6 gives C(12,6) = 924 random assignments — the exact null distribution.",
      domainPhysics: "Physics & Engineering",
      domainPhysicsStat: "7!! = 105",
      domainPhysicsDesc: "Feynman diagrams — the computational backbone of quantum field theory — count contractions using double factorials. Each diagram represents a term in an infinite series that describes how particles interact.",
      domainPhysicsEx1: "Wick's theorem: computing n-field contractions requires (n-1)!! pairings — for 7 fields, that's 105 Feynman diagrams.",
      domainPhysicsEx2: "Black body radiation: Planck's law for photon statistics involves Gamma functions — this is how we understand stars.",
      domainPhysicsEx3: "Quantum harmonic oscillator: the n-th energy level normalization uses (2n)!! — connecting factorials to quantum energy quantization.",
      domainBio: "Biology & Bioinformatics",
      domainBioStat: "10³⁰⁰ conformations",
      domainBioDesc: "Levinthal's paradox: a protein with 100 amino acids has ~10³⁰⁰ possible conformations. If it tried one per nanosecond, it would take longer than the age of the universe to fold by random search. Yet it folds in milliseconds — nature solved the combinatorial explosion.",
      domainBioEx1: "COVID variants: the spike protein has ~1,270 amino acids. Each position can mutate to ~19 alternatives — the combinatorial space is staggering.",
      domainBioEx2: "K-mer counting: counting 3-mers in a 20-nucleotide sequence explores C(20,3) = 1,140 positions — fundamental to genome assembly.",
      domainBioEx3: "Allele frequencies: Bayesian models use Beta distributions to track how gene frequencies evolve in populations.",
      domainEveryday: "Everyday Life",
      domainEverydayStat: "2²⁵⁶ keys",
      domainEverydayDesc: "Your WiFi password uses WPA2 with 2²⁵⁶ possible keys — that's more than the number of atoms in the universe. Even with every computer on Earth working together, brute-forcing it would take longer than the heat death of the cosmos.",
      domainEverydayEx1: "Lottery: picking 6 numbers from 49 gives C(49,6) = 13,983,816 possible tickets — your odds are about 1 in 14 million.",
      domainEverydayEx2: "PIN security: a 4-digit PIN has 10⁴ = 10,000 combinations. After 3 wrong attempts, your phone locks — that's why 2-factor authentication matters.",
      domainEverydayEx3: "Seating 8 guests around a round table: 7! = 5,040 arrangements — explains why the host needs a seating chart algorithm.",
      openReasoning: "How it's computed",
      openApps: "What it's for",
      reasoningEmpty: "Enter an expression (e.g. 5!, gamma(0.2), C(10, 2.5), beta(2, 3)) to see the detailed derivation.",
      appsEmpty: "Enter an expression (e.g. 5!, gamma(0.2), C(10, 2.5), beta(2, 3)) to see how it is used in practice.",
      appEmpty: "Browse the domains below or type an expression at the top to see where it appears in the real world.",
      fallbackNotice: "Computed locally (couldn't reach the verification API) — result may be approximate.",
    },
    fr: {
      eyebrow: "gamma-factorial",
      pageTitle: "Calculatrice de factorielle généralisée",
      pageLede: "La factorielle et ses fonctions proches, étendues à tout nombre réel — pas seulement les entiers. Tape une expression pour voir le résultat, la courbe autour, et comment c'est calculé.",
      inputPlaceholder: "5!  gamma(2.5)  C(10,3)",
      evaluate: "Calculer",
      resultEmpty: "Essaie {ex1}, {ex2}, ou {ex3} ci-dessous.",
      comparing: "Comparaison",
      history: "Historique",
      historyClear: "Effacer",
      note: "Les nombres complexes sont pris en charge ({c1} ou {c2}), comme dans la CLI Python — le tracé de courbe n'est affiché que pour les entrées réelles. Même fonction Gamma, même formule de réflexion, mêmes erreurs de pôle/dépassement que le paquet.",
      links: "Voir aussi : {link} — un explorateur dédié à {code}.",
      linkText: "le triangle de Pascal continu",
      copyLink: "copier le lien",
      copied: "copié",
      copyFailed: "échec de la copie",
      pinToCompare: "épingler pour comparer",
      removeFromComparison: "Retirer {expr} de la comparaison",
      complexNote: "Résultat complexe — le tracé de courbe n'est disponible que pour les entrées réelles.",
      plotHint: "Molette ou pincement pour zoomer, glisser pour déplacer, survoler pour les valeurs exactes, double-clic pour réinitialiser.",
      resetZoom: "réinitialiser le zoom",
      showTable: "afficher le tableau",
      hideTable: "masquer le tableau",
      exportPng: "exporter en PNG",
      exportCsv: "exporter en CSV",
      tableK: "k",
      tableN: "n",
      tableValue: "valeur",
      plotCaptionGamma: "Γ(z) autour de z = {v}",
      plotCaptionFactorial: "n! autour de n = {v}",
      plotCaptionDoubleFactorial: "n!! autour de n = {v}",
      plotCaptionBinomial: "C({n}, k) autour de k = {v}",
      plotCaptionBeta: "B(a, {b}) autour de a = {v}",
      errNotValidNumber: "« {raw} » n'est pas un nombre valide",
      errGammaNotDefined: "Gamma n'est pas définie en {z} (NaN ou infini)",
      errGammaPole: "Gamma a un pôle en {z} (infini)",
      errGammaOverflow: "Gamma({z}) dépasse la plage d'un flottant",
      errBinomialPoleN: "binomial({n}, {k}) est indéfini : n={n} est un pôle de Gamma (n+1 entier <= 0)",
      errUnrecognized: "expression non reconnue « {expr} » (essaie 5!, gamma(2.5), C(10,3), 1+2i)",
      errDoubleFactorialNonInt: "n!! n'est pris en charge ici que pour les entiers positifs",
      error: "erreur",
      justNow: "à l'instant",
      minutesAgo: "il y a {n}min",
      hoursAgo: "il y a {n}h",
      badgeFactorial: "Factorielle",
      badgeDoubleFactorial: "Factorielle double",
      badgeGamma: "Fonction Gamma",
      badgeBinomial: "Coefficient binomial",
      badgeBeta: "Fonction Beta",
      badgeNumber: "Nombre",
      reasoningTitle: "Comment c'est calculé",
      reasoningShowFull: "Afficher la dérivation complète",
      reasoningShowLess: "Afficher moins",
      noteDefinition: "définition",
      noteIntegerN: "n est un entier",
      noteDirect: "Re(z) ≥ 0.5, série de Lanczos",
      noteReflection: "Re(z) < 0.5, formule de réflexion",
      noteReflectionFormula: "Γ(z)Γ(1−z) = π/sin(πz)",
      noteCheck: "vérif. : Γ(z+1) = zΓ(z)",
      noteStepDown: "n!! descend de 2 en 2",
      noteChooseKFromN: "façons de choisir k parmi n",
      notePascalRow: "valeur classique du triangle de Pascal",
      noteInterpolated: "k n'est pas entier : interpolation continue",
      noteBetaGamma: "B(a,b) = Γ(a)Γ(b)/Γ(a+b)",
      reasoningLeadFactorialInt: "{n}! compte les permutations de {n} objets distincts. Développons le produit :",
      reasoningLeadFactorialGamma: "La factorielle est étendue à tout réel par n! = Γ(n+1). Comme n+1 = {g} ≥ 0,5, on utilise directement la série de Lanczos.",
      reasoningLeadFactorialReflect: "La factorielle est étendue par n! = Γ(n+1). Ici n+1 = {g} < 0,5, là où la série de Lanczos est numériquement instable : Γ est donc calculée avec la formule de réflexion d'Euler.",
      reasoningLeadGammaDirect: "Γ est évaluée par la série de Lanczos (g = 7) en espace logarithmique ; sur les entiers elle redonne Γ(n) = (n−1)!.",
      reasoningLeadGammaReflect: "z = {z} < 0,5 : la série de Lanczos y est numériquement instable, donc Γ(z) est calculée avec la formule de réflexion d'Euler.",
      reasoningLeadDouble: "La factorielle double ne garde qu'un facteur sur deux : n!! = n·(n−2)·(n−4)···",
      reasoningLeadBinomial: "C(n, k) est un rapport de fonctions Gamma ; pour n et k entiers, il reproduit exactement le triangle de Pascal.",
      reasoningLeadBeta: "La fonction bêta est un rapport de valeurs de Γ : l'analogue continu du coefficient binomial.",
      reasoningTailFactorial: "Vérification : (n+1)! = (n+1)·n! reste vrai, car Γ(n+2) = (n+1)·Γ(n+1).",
      reasoningTailGamma: "Vérification : Γ(z+1) = z·Γ(z) — l'équation fonctionnelle que vérifient toutes les valeurs de Γ.",
      reasoningTailDouble: "Conventions : 0!! = 1 et (−1)!! = 1.",
      reasoningTailBinomial: "Pour k entier, c'est la valeur classique du triangle de Pascal ; pour k fractionnaire, c'est l'interpolation lisse entre les lignes.",
      reasoningTailBeta: "Équivalent : B(a,b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt — la constante de normalisation de la loi bêta.",
      practTitle: "À quoi ça sert",
      practWhat: "Ce que c'est",
      practUse: "Exemple concret",
      practCurve: "Lire la courbe",
      practTry: "À essayer",
      practFactorialWhat: "n! compte les permutations de n objets distincts : les façons de ranger n objets, ou d'attribuer n tâches à n travailleurs.",
      practFactorialUse: "Ranger {n} livres sur une étagère : {n}! = {v} ordres possibles. Si des livres sont identiques, on divise par les factorielles des répétitions (coefficient multinomial).",
      practFactorialGamma: "Pour {n} non entier, l'interpolation apparaît partout en science — ex. le volume d'une sphère en d dimensions, V_d = π^(d/2)/Γ(d/2+1). Essaie d = {d} : V ≈ {vol}.",
      practFactorialCurve: "Les points sont les factorielles entières classiques ; entre eux, la courbe est l'interpolation lisse. En dessous de −1, la courbe change de signe entre chaque intervalle entier et explose à chaque entier négatif (pôles de Γ). Les valeurs dépassent toute exponentielle : 170! fait déjà déborder un double.",
      practFactorialTry: "Calcule 3,5! puis 4,5! et épingle-les : l'interpolation passe exactement par 4! = 24 et 5! = 120.",
      practFactorialWhere: "Les algorithmes de tri explorent n! permutations dans le pire cas \u2014 c'est pourquoi O(n!) est intractable. En bioinformatique, n! compte les ordonnements possibles de fragments d'ADN lors du séquençage. Chaque fois que tu ranges n livres, mélanges un jeu de cartes ou places n convives, tu calcules n!.",
      practGammaWhat: "Γ(z) étend la factorielle à tout complexe : Γ(n) = (n−1)! pour n entier. C'est la base des statistiques et de la physique.",
      practGammaUse: "La loi Gamma de forme a a pour densité t^(a−1)·e^(−t)/Γ(a). Et Γ(1/2) = √π ≈ 1,7725, d'où Γ(3/2) = √π/2 ≈ 0,8862.",
      practGammaCurve: "La courbe a un pôle (asymptote verticale) à chaque entier ≤ 0 et un minimum ≈ 0,8856 près de z ≈ 1,4616. Entre 0 et 1 elle descend sous 1 ; au-delà elle grimpe comme une factorielle.",
      practGammaTry: "Calcule Γ(1,46) pour voir le minimum, Γ(0,5) = √π, puis Γ(0,2) pour voir la formule de réflexion prendre le relais sous 0,5.",
      practGammaWhere: "La fonction Gamma soutient les distributions du chi-deux, de Student et de F, utilisées dans chaque test d'hypothèse. En physique, elle normalise les fonctions d'onde quantiques. L'apprentissage automatique l'utilise dans l'inférence variationnelle et dans la borne inférieure de la preuve des modèles génératifs profonds.",
      practDoubleWhat: "n!! = n·(n−2)·(n−4)··· est le produit d'un facteur sur deux — naturel dès qu'il est question de paires.",
      practDoubleUseOdd: "Moments de la loi normale : E[X^(2k)] = (2k−1)!!·σ^(2k). Avec n = {n} impair, k = {k} et (2k−1)!! = {v}.",
      practDoubleUseEven: "Les factorielles doubles paires vérifient (2k)!! = 2^k·k!. Avec n = {n} pair, k = {k} : 2^k·k! = {v}.",
      practDoubleCurve: "n!! n'est défini que pour les entiers (les points). Les lignes paires et impaires forment deux familles distinctes ; 0!! = 1 et (−1)!! = 1 par convention.",
      practDoubleTry: "Compare 5!! avec 6!!, puis essaie 10!! — les factorielles doubles paires grandissent très vite.",
      practDoubleWhere: "En physique, (2k-1)!! apparaît dans le théorème de Wick pour calculer les contractions de diagrammes de Feynman. En statistique, il donne les moments pairs de la distribution normale. Les factorielles doubles paires (2k)!! = 2^k k! interviennent dans le calcul de surfaces sphériques.",
      practBinomialWhat: "C(n, k) compte les façons de choisir k éléments parmi n quand l'ordre n'importe pas (combinaisons).",
      practBinomialUse: "Choisir {k} personnes parmi {n} : il y a {c} équipes possibles. Pour autoriser les répétitions, on utilise C(n+k−1, k).",
      practBinomialInterp: "Ici k = {k} n'est pas entier : la valeur {c} est l'interpolation lisse entre les lignes du triangle de Pascal — elle retombe exactement sur {cint} à chaque k entier.",
      practBinomialCurve: "Quand k balaie la courbe, C(n, k) culmine en k = n/2 et reste symétrique. Épingle deux lignes pour voir qu'un n plus grand donne une cloche plus haute et plus large.",
      practBinomialTry: "Calcule C(10, 3), C(10, 5), C(10, 7) et épingle-en deux pour comparer les lignes.",
      practBinomialWhere: "Les probabilités de loterie sont des binomiales pures : C(49,6) = 13 983 816 pour un tirage standard 6 sur 49. En apprentissage automatique, C(n,k) compte les façons de choisir k caractéristiques parmi n candidates. La bioinformatique l'utilise pour estimer les fréquences de k-mères dans un génome.",
      practBetaWhat: "B(a, b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt = Γ(a)Γ(b)/Γ(a+b) — la constante de normalisation de la loi bêta.",
      practBetaUsePeak: "Une loi Bêta(a, b) modélise une probabilité en statistique bayésienne (ex. tests A/B). Son sommet est en (a−1)/(a+b−2) = {peak}.",
      practBetaUse: "Une loi Bêta(a, b) modélise une probabilité en statistique bayésienne (ex. tests A/B).",
      practBetaCurve: "Pour b fixé, B(a, b) décroît comme une puissance de a ; le point surligné est la valeur que tu viens de calculer.",
      practBetaTry: "Essaie B(0,5, 0,5) = π (loi de l'arcsinus) et compare avec B(2, 3) = 1/12.",
      practBetaWhere: "Les distributions bêta sont le cheval de bataille des tests A/B bayésiens : B(a,b) modélise ta conviction sur un taux de conversion après a succès et b échecs. Elles interviennent aussi en fiabilité (taux de défaillance de composants) et en contrôle qualité (proportion de défectueux).",
      navCalc: "Calcul",
      navReasoning: "Comment c'est calculé",
      navApps: "À quoi ça sert",
      navFaq: "FAQ",
      navApp: "Applications",
      exGroupIntegers: "Entiers",      themeToLight: "Passer en mode clair",
      themeToDark: "Passer en mode sombre",

      exGroupReals: "Réels non entiers",
      exGroupPoles: "Négatifs & pôles",
      exGroupComplex: "Nombres complexes",
      exGroupFunctions: "Fonctions",
      specTitle: "Ce que cet outil calcule",
      specSummaryOpen: "Spécifications",
      specIntro:
        "La factorielle généralisée n! = Γ(n+1), calculée par l'approximation de Lanczos (g = 7, formule de réflexion pour Re(z) < 0,5). Elle coïncide avec la factorielle classique sur les entiers naturels et l'étend à tout nombre réel ou complexe. Tout est calculé localement dans cette page — aucun serveur.",
      practWhere: "Où on la retrouve",
      specSyntaxTitle: "Syntaxe acceptée",
      specRowFactorial: "factorielle de n",
      specRowDoubleFactorial: "double factorielle de n",
      specRowGamma: "fonction Gamma d'Euler Γ(z)",
      specRowBinomial: "coefficient binomial généralisé",
      specRowBeta: "fonction bêta B(a, b) = Γ(a)·Γ(b)/Γ(a+b)",
      specRowNumber: "un nombre seul est renvoyé tel quel",
      specNumbersTitle: "Nombres acceptés",
      specNumbersBody:
        "Entiers et décimaux avec point décimal (2, -3.75), notation scientifique (2e3), et nombres complexes écrits avec i ou j : 1+2i, -0.5j, i. Les espaces dans un littéral complexe sont ignorés. Les opérandes peuvent être entre parenthèses : (4.5)!, (-0.5)!.",
      specLimitsTitle: "Précision & limites",
      specLimitsBody:
        "Précision double IEEE-754 — environ 15 chiffres significatifs. Dépassement de capacité au-delà de n ≈ 170. Aux entiers négatifs (−1, −2, …) Γ a des pôles : ces saisies produisent une erreur au lieu d'une valeur. Les résultats complexes sont calculés mais non tracés.",
      reasoningPageTitle: "Comment c'est calculé",
      reasoningPageLede: "La dérivation complète derrière le résultat : la définition utilisée, les valeurs numériques à chaque étape et les vérifications.",
      appsPageTitle: "À quoi ça sert",
      appsPageLede: "Les usages concrets de cette valeur : ce qu'elle compte, un exemple appliqué, comment lire la courbe et quoi essayer ensuite.",
      appPageTitle: "Applications concrètes",
      appPageLede: "Où les factorielles généralisées, Gamma, binomiale et bêta apparaissent — des algorithmes à l'IA, de la physique au quotidien.",
      openReasoning: "Comment c'est calculé",
      domainCS: "Informatique et algorithmes",
      domainCSStat: "20! ≈ 2,4 × 10¹⁸",
      domainCSDesc: "C'est le nombre d'itinéraires qu'un solveur TSP en force brute doit vérifier pour seulement 20 villes — à 1 milliard d'opérations par seconde, il faudrait 76 ans. Les factorielles sont la raison pour laquelle nous avons besoin d'algorithmes malins, pas seulement d'ordinateurs rapides.",
      domainCSEx1: "Tri : 52! ≈ 8×10⁶⁷ ordonnements possibles d'un jeu de cartes — plus que d'atomes dans l'univers observable (10⁸⁰).",
      domainCSEx2: "Sélection de features : choisir 5 features parmi 20 candidats = C(20,5) = 15 504 — c'est pourquoi la recherche exhaustive est rarement pratique.",
      domainCSEx3: "Chiffrement RSA : factoriser un nombre de 2048 bits est difficile parce que l'espace de recherche est combinatoirement immense.",
      domainAI: "Intelligence artificielle et apprentissage automatique",
      domainAIStat: "Beta(8, 4)",
      domainAIDesc: "Après 8 clics et 4 achats sur ton test A/B, l'inférence bayésienne utilise les distributions Bêta pour estimer le vrai taux de conversion — pas de p-values, juste une mise à jour continue.",
      domainAIEx1: "Échantillonnage LLM : GPT choisit le prochain token via une distribution multinômiale — la constante de normalisation implique des factorielles de la taille du vocabulaire.",
      domainAIEx2: "Thompson sampling : utilise les posterieurs Bêta pour équilibrer exploration vs exploitation en placement d'publicités en temps réel.",
      domainAIEx3: "Validation croisée : C(10,3) = 120 façons de diviser les données en folds — la base d'une évaluation robuste des modèles.",
      domainStats: "Statistiques et science des données",
      domainStatsStat: "p = 0,05 ≠ 95%",
      domainStatsDesc: "Une p-value de 0,05 ne signifie PAS qu'il y a 95% de chances que l'effet soit réel. Elle signifie : s'il n'y avait pas d'effet, tu verrais des données aussi extrêmes 5% du temps. Les méthodes bayésiennes avec posterieurs Bêta te donnent ce que tu veux vraiment.",
      domainStatsEx1: "Essais cliniques : tester un médicament sur 200 patients utilise l'analyse de puissance binomiale pour déterminer la taille de l'échantillon.",
      domainStatsEx2: "Test du chi-deux : avec k=10 degrés de liberté, la distribution est Gamma(5) — c'est ce que ton logiciel de stats calcule.",
      domainStatsEx3: "Test de permutation : assigner 12 patients à deux groupes de 6 donne C(12,6) = 924 assignments aléatoires — la distribution nulle exacte.",
      domainPhysics: "Physique et ingénierie",
      domainPhysicsStat: "7!! = 105",
      domainPhysicsDesc: "Les diagrammes de Feynman — la colonne vertébrale computationnelle de la théorie quantique des champs — comptent les contractions via des factorielles doubles. Chaque diagramme représente un terme d'une série infinie décrivant comment les particules interagissent.",
      domainPhysicsEx1: "Théorème de Wick : calculer n contractions de champs nécessite (n-1)!! appariements — pour 7 champs, c'est 105 diagrammes de Feynman.",
      domainPhysicsEx2: "Rayonnement du corps noir : la loi de Planck pour les statistiques de photons utilise des fonctions Gamma — c'est ainsi que nous comprenons les étoiles.",
      domainPhysicsEx3: "Oscillateur harmonique quantique : la normalisation du nième niveau d'énergie utilise (2n)!! — reliant factorielles et quantification de l'énergie quantique.",
      domainBio: "Biologie et bioinformatique",
      domainBioStat: "10³⁰⁰ conformations",
      domainBioDesc: "Paradoxe de Levinthal : une protéine de 100 acides aminés a ~10³⁰⁰ conformations possibles. Si elle en essayait une par nanoseconde, il faudrait plus que l'âge de l'univers pour se replier par recherche aléatoire. Pourtant elle se replie en millisecondes — la nature a résolu l'explosion combinatoire.",
      domainBioEx1: "Variants COVID : la protéine Spike a ~1 270 acides aminés. Chaque position peut muter vers ~19 alternatives — l'espace combinatoire est stupéfiant.",
      domainBioEx2: "Comptage de k-mères : compter les 3-mères dans une séquence de 20 nucléotides explore C(20,3) = 1 140 positions — fondamental pour l'assemblage du génome.",
      domainBioEx3: "Fréquences alléliques : les modèles bayésiens utilisent les distributions Bêta pour suivre l'évolution des fréquences géniques dans les populations.",
      domainEveryday: "Vie quotidienne",
      domainEverydayStat: "2²⁵⁶ clés",
      domainEverydayDesc: "Ton mot de passe WiFi utilise WPA2 avec 2²⁵⁶ clés possibles — c'est plus que le nombre d'atomes dans l'univers. Même avec tous les ordinateurs de la Terre réunis, le brute-force prendrait plus de temps que la mort thermique du cosmos.",
      domainEverydayEx1: "Loterie : choisir 6 numéros sur 49 donne C(49,6) = 13 983 816 tickets possibles — tes chances sont d'environ 1 sur 14 millions.",
      domainEverydayEx2: "Sécurité PIN : un PIN à 4 chiffres a 10⁴ = 10 000 combinaisons. Après 3 tentatives erronées, ton téléphone se verrouille — c'est pourquoi l'authentification à 2 facteurs est importante.",
      domainEverydayEx3: "Placer 8 convives autour d'une table ronde : 7! = 5 040 arrangements — explique pourquoi l'hôte a besoin d'un algorithme de plan de table.",
      openApps: "À quoi ça sert",
      reasoningEmpty: "Saisis une expression (ex. 5!, gamma(0,2), C(10, 2,5), beta(2, 3)) pour voir le raisonnement détaillé.",
      appsEmpty: "Saisis une expression (ex. 5!, gamma(0,2), C(10, 2,5), beta(2, 3)) pour voir son utilité concrète.",
      appEmpty: "Parcoure les domaines ci-dessous ou saisis une expression en haut pour voir où elle apparaît dans le monde réel.",
      fallbackNotice: "Calculé localement (API de vérification injoignable) — le résultat peut être approximatif.",
    },
    de: {
      eyebrow: "gamma-factorial",
      pageTitle: "Rechner für die verallgemeinerte Fakultät",
      pageLede: "Die Fakultät und verwandte Funktionen, erweitert auf jede reelle Zahl — nicht nur ganze Zahlen. Gib einen Ausdruck ein, um das Ergebnis, die Kurve darum und die Berechnung zu sehen.",
      inputPlaceholder: "5!  gamma(2.5)  C(10,3)",
      evaluate: "Berechnen",
      resultEmpty: "Probiere {ex1}, {ex2} oder {ex3} unten aus.",
      comparing: "Vergleich",
      history: "Verlauf",
      historyClear: "Leeren",
      note: "Komplexe Zahlen werden unterstützt ({c1} oder {c2}), genau wie in der Python-CLI — die Kurvendarstellung wird nur für reelle Eingaben angezeigt. Gleiche Gammafunktion, gleiche Reflexionsformel, gleiche Pol-/Überlauf-Fehler wie im Paket.",
      links: "Siehe auch: {link} — ein eigener Explorer für {code}.",
      linkText: "das kontinuierliche Pascalsche Dreieck",
      copyLink: "Link kopieren",
      copied: "kopiert",
      copyFailed: "Kopieren fehlgeschlagen",
      pinToCompare: "zum Vergleich anheften",
      removeFromComparison: "{expr} aus dem Vergleich entfernen",
      complexNote: "Komplexes Ergebnis — Kurvendarstellung ist nur für reelle Eingaben verfügbar.",
      plotHint: "Scrollen oder Zusammenziehen (Pinch) zum Zoomen, Ziehen zum Verschieben, Hover für genaue Werte, Doppelklick zum Zurücksetzen.",
      resetZoom: "Zoom zurücksetzen",
      showTable: "Tabelle anzeigen",
      hideTable: "Tabelle ausblenden",
      exportPng: "als PNG exportieren",
      exportCsv: "als CSV exportieren",
      tableK: "k",
      tableN: "n",
      tableValue: "Wert",
      plotCaptionGamma: "Γ(z) um z = {v}",
      plotCaptionFactorial: "n! um n = {v}",
      plotCaptionDoubleFactorial: "n!! um n = {v}",
      plotCaptionBinomial: "C({n}, k) um k = {v}",
      plotCaptionBeta: "B(a, {b}) um a = {v}",
      errNotValidNumber: "„{raw}“ ist keine gültige Zahl",
      errGammaNotDefined: "Gamma ist bei {z} nicht definiert (NaN oder unendlich)",
      errGammaPole: "Gamma hat bei {z} einen Pol (unendlich)",
      errGammaOverflow: "Gamma({z}) überschreitet den Wertebereich einer Gleitkommazahl",
      errBinomialPoleN: "binomial({n}, {k}) ist undefiniert: n={n} ist ein Pol von Gamma (n+1 ganzzahlig <= 0)",
      errUnrecognized: "unbekannter Ausdruck „{expr}“ (versuche 5!, gamma(2.5), C(10,3), 1+2i)",
      errDoubleFactorialNonInt: "n!! wird hier nur für nicht-negative ganze Zahlen unterstützt",
      error: "Fehler",
      justNow: "gerade eben",
      minutesAgo: "vor {n}min",
      hoursAgo: "vor {n}h",
      badgeFactorial: "Fakultät",
      badgeDoubleFactorial: "Doppelfakultät",
      badgeGamma: "Gammafunktion",
      badgeBinomial: "Binomialkoeffizient",
      badgeBeta: "Betafunktion",
      badgeNumber: "Zahl",
      reasoningTitle: "So wurde gerechnet",
      reasoningShowFull: "Vollständige Herleitung anzeigen",
      reasoningShowLess: "Weniger anzeigen",
      noteDefinition: "Definition",
      noteIntegerN: "n ist eine ganze Zahl",
      noteDirect: "Re(z) ≥ 0.5, Lanczos-Reihe",
      noteReflection: "Re(z) < 0.5, Reflexionsformel",
      noteReflectionFormula: "Γ(z)Γ(1−z) = π/sin(πz)",
      noteCheck: "Kontrolle: Γ(z+1) = zΓ(z)",
      noteStepDown: "n!! geht in 2er-Schritten",
      noteChooseKFromN: "Möglichkeiten, k aus n zu wählen",
      notePascalRow: "klassischer Wert aus dem Pascalschen Dreieck",
      noteInterpolated: "k ist keine ganze Zahl: glatte Interpolation",
      noteBetaGamma: "B(a,b) = Γ(a)Γ(b)/Γ(a+b)",
      reasoningLeadFactorialInt: "{n}! zählt die Permutationen von {n} verschiedenen Objekten. Wir entwickeln das Produkt:",
      reasoningLeadFactorialGamma: "Die Fakultät wird über n! = Γ(n+1) auf jede reelle Zahl erweitert. Da n+1 = {g} ≥ 0,5 ist, verwenden wir direkt die Lanczos-Reihe.",
      reasoningLeadFactorialReflect: "Die Fakultät wird über n! = Γ(n+1) erweitert. Hier ist n+1 = {g} < 0,5, wo die Lanczos-Reihe numerisch instabil wird; Γ wird daher mit Eulers Reflexionsformel berechnet.",
      reasoningLeadGammaDirect: "Γ wird mit der Lanczos-Reihe (g = 7) im Log-Raum ausgewertet; bei ganzen Zahlen reproduziert sie Γ(n) = (n−1)!.",
      reasoningLeadGammaReflect: "z = {z} < 0,5: die Lanczos-Reihe ist hier numerisch instabil, daher wird Γ(z) mit Eulers Reflexionsformel berechnet.",
      reasoningLeadDouble: "Die Doppelfakultät nimmt jeden zweiten Faktor: n!! = n·(n−2)·(n−4)···",
      reasoningLeadBinomial: "C(n, k) ist ein Verhältnis von Gammafunktionen; für ganzzahlige n und k reproduziert es exakt das Pascalsche Dreieck.",
      reasoningLeadBeta: "Die Betafunktion ist ein Verhältnis von Gamma-Werten: das stetige Analogon des Binomialkoeffizienten.",
      reasoningTailFactorial: "Kontrolle: (n+1)! = (n+1)·n! gilt weiterhin, da Γ(n+2) = (n+1)·Γ(n+1).",
      reasoningTailGamma: "Kontrolle: Γ(z+1) = z·Γ(z) — die Funktionalgleichung aller Gamma-Werte.",
      reasoningTailDouble: "Konventionen: 0!! = 1 und (−1)!! = 1.",
      reasoningTailBinomial: "Für ganzzahliges k ist das der klassische Wert aus dem Pascalschen Dreieck; für gebrochenes k die glatte Interpolation zwischen den Zeilen.",
      reasoningTailBeta: "Äquivalent: B(a,b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt — die Normierungskonstante der Beta-Verteilung.",
      practTitle: "Wofür es nützt",
      practWhat: "Was es ist",
      practUse: "Konkretes Beispiel",
      practCurve: "Die Kurve lesen",
      practTry: "Selbst ausprobieren",
      practFactorialWhat: "n! zählt die Permutationen von n verschiedenen Objekten: die Anordnungen von n Dingen bzw. die Zuordnung von n Jobs zu n Arbeitern.",
      practFactorialUse: "{n} Bücher im Regal anordnen: {n}! = {v} mögliche Reihenfolgen. Bei identischen Büchern dividiert man durch die Fakultäten der Wiederholungen (Multinomialkoeffizient).",
      practFactorialGamma: "Für nicht-ganzes {n} taucht die Interpolation überall in der Wissenschaft auf — z.B. beim Volumen einer Kugel in d Dimensionen, V_d = π^(d/2)/Γ(d/2+1). Probiere d = {d}: V ≈ {vol}.",
      practFactorialCurve: "Die Punkte sind die klassischen ganzzahligen Fakultäten; dazwischen liegt die glatte Interpolation. Unter −1 wechselt die Kurve zwischen aufeinanderfolgenden Einheitsintervallen das Vorzeichen und schießt bei jedem negativen Integer in die Höhe (Pole von Γ). Die Werte übertreffen jede Exponentialfunktion: 170! überläuft bereits einen Double.",
      practFactorialTry: "Berechne 3,5! und dann 4,5! und pinne beide an: die Interpolation verläuft exakt durch 4! = 24 und 5! = 120.",
      practFactorialWhere: "Sortieralgorithmen durchsuchen n! Permutationen im schlimmsten Fall \u2014 deshalb ist O(n!) unlösbar. In der Bioinformatik zählt n! die möglichen Anordnungen von DNA-Fragmenten beim Sequenzieren. Jedes Mal, wenn du n Bücher sortierst, ein Kartenspiel mischst oder n Gäste platziert, berechnest du n!.",
      practGammaWhat: "Γ(z) erweitert die Fakultät auf alle komplexen Zahlen: Γ(n) = (n−1)! für ganze n. Es ist das Fundament von Statistik und Physik.",
      practGammaUse: "Die Gamma-Verteilung mit Form a hat die Dichte t^(a−1)·e^(−t)/Γ(a). Und Γ(1/2) = √π ≈ 1,7725, also Γ(3/2) = √π/2 ≈ 0,8862.",
      practGammaCurve: "Die Kurve hat bei jeder ganzen Zahl ≤ 0 einen Pol (vertikale Asymptote) und ein Minimum ≈ 0,8856 nahe z ≈ 1,4616. Zwischen 0 und 1 fällt sie unter 1; darüber steigt sie wie eine Fakultät.",
      practGammaTry: "Berechne Γ(1,46) für das Minimum, Γ(0,5) = √π, dann Γ(0,2), um die Reflexionsformel unter 0,5 zu sehen.",
      practGammaWhere: "Die Gammafunktion bildet die Grundlage der Chi-Quadrat-, Student- t- und F-Verteilungen, die in jedem Hypothesentest verwendet werden. In der Physik normalisiert sie Quantenwellenfunktionen. Maschinelles Lernen nutzt sie in der variationellen Inferenz und in der unteren Beweisgrenze tiefer generativer Modelle.",
      practDoubleWhat: "n!! = n·(n−2)·(n−4)··· ist das Produkt jedes zweiten Faktors — natürlich, sobald es um Paare geht.",
      practDoubleUseOdd: "Momente der Normalverteilung: E[X^(2k)] = (2k−1)!!·σ^(2k). Mit n = {n} ungerade, k = {k} und (2k−1)!! = {v}.",
      practDoubleUseEven: "Gerade Doppelfakultäten erfüllen (2k)!! = 2^k·k!. Mit n = {n} gerade, k = {k}: 2^k·k! = {v}.",
      practDoubleCurve: "n!! ist nur für ganze Zahlen definiert (die Punkte). Gerade und ungerade Zeilen bilden zwei getrennte Familien; 0!! = 1 und (−1)!! = 1 per Konvention.",
      practDoubleTry: "Vergleiche 5!! mit 6!!, dann versuche 10!! — gerade Doppelfakultäten wachsen sehr schnell.",
      practDoubleWhere: "In der Physik taucht (2k-1)!! im Wick-Satz zur Berechnung von Feynman-Diagramm-Kontraktionen auf. In der Statistik liefert es die geraden Momente der Normalverteilung. Gerade Doppelfakultäten (2k)!! = 2^k k! erscheinen bei Oberflächenberechnungen von Kugeln.",
      practBinomialWhat: "C(n, k) zählt die Auswahl von k Elementen aus n, wenn die Reihenfolge egal ist (Kombinationen).",
      practBinomialUse: "{k} Personen aus {n} wählen: es gibt {c} mögliche Teams. Mit Wiederholung verwendet man C(n+k−1, k).",
      practBinomialInterp: "Hier ist k = {k} keine ganze Zahl: der Wert {c} ist die glatte Interpolation zwischen den Zeilen des Pascalschen Dreiecks — er fällt bei jedem ganzen k exakt auf {cint} zurück.",
      practBinomialCurve: "Wandert k über die Kurve, hat C(n, k) bei k = n/2 seinen Gipfel und ist symmetrisch. Pinne zwei Zeilen an, um zu sehen, dass größeres n eine höhere, breitere Glocke ergibt.",
      practBinomialTry: "Berechne C(10, 3), C(10, 5), C(10, 7) und pinne zwei davon zum Vergleich an.",
      practBinomialWhere: "Lottoquoten sind reine Binomiale: C(49,6) = 13.983.816 für eine Standard-Ziehung 6 aus 49. Im maschinellen Lernen zählt C(n,k) die Möglichkeiten, k Merkmale aus n Kandidaten auszuwählen. Die Bioinformatik nutzt sie zur Schätzung von k-Mer-Häufigkeiten im Genom.",
      practBetaWhat: "B(a, b) = ∫₀¹ t^(a−1)(1−t)^(b−1) dt = Γ(a)Γ(b)/Γ(a+b) — die Normierungskonstante der Beta-Verteilung.",
      practBetaUsePeak: "Eine Beta(a, b)-Verteilung modelliert in der Bayes-Statistik eine Wahrscheinlichkeit (z.B. A/B-Tests). Ihr Gipfel liegt bei (a−1)/(a+b−2) = {peak}.",
      practBetaUse: "Eine Beta(a, b)-Verteilung modelliert in der Bayes-Statistik eine Wahrscheinlichkeit (z.B. A/B-Tests).",
      practBetaCurve: "Für festes b fällt B(a, b) wie eine Potenz von a; der hervorgehobene Punkt ist der soeben berechnete Wert.",
      practBetaTry: "Probiere B(0,5, 0,5) = π (Arcus-Sinus-Gesetz) und vergleiche mit B(2, 3) = 1/12.",
      practBetaWhere: "Beta-Verteilungen sind das Arbeitstier des bayesschen A/B-Tests: B(a,b) modelliert deine Überzeugung über eine Konversionsrate nach a Erfolgen und b Misserfolgen. Sie tauchen auch in der Zuverlässigkeitstechnik (Ausfallraten) und in der Qualitätskontrolle (Anteil fehlerhafter Teile) auf.",
      navCalc: "Rechner",
      navReasoning: "Wie gerechnet wird",
      navApps: "Wofür es nützt",
      navFaq: "FAQ",
      navApp: "Anwendungen",
      exGroupIntegers: "Ganze Zahlen",      themeToLight: "Zum hellen Modus wechseln",
      themeToDark: "Zum dunklen Modus wechseln",

      exGroupReals: "Nicht-ganzzahlige Reelle",
      exGroupPoles: "Negative & Polstellen",
      exGroupComplex: "Komplexe Zahlen",
      exGroupFunctions: "Funktionen",
      specTitle: "Was dieses Werkzeug berechnet",
      specSummaryOpen: "Spezifikationen",
      specIntro:
        "Die verallgemeinerte Fakultät n! = Γ(n+1), berechnet mit der Lanczos-Näherung (g = 7, Reflexionsformel für Re(z) < 0,5). Sie stimmt mit der klassischen Fakultät auf nichtnegativen ganzen Zahlen überein und erweitert sie auf jede reelle oder komplexe Eingabe. Alles läuft lokal in dieser Seite — kein Server.",
      practWhere: "Wo Sie das bemerken",
      specSyntaxTitle: "Akzeptierte Syntax",
      specRowFactorial: "Fakultät von n",
      specRowDoubleFactorial: "Doppelfakultät von n",
      specRowGamma: "Eulersche Gammafunktion Γ(z)",
      specRowBinomial: "verallgemeinerter Binomialkoeffizient",
      specRowBeta: "Betafunktion B(a, b) = Γ(a)·Γ(b)/Γ(a+b)",
      specRowNumber: "eine bloße Zahl wird unverändert zurückgegeben",
      specNumbersTitle: "Akzeptierte Zahlen",
      specNumbersBody:
        "Ganze Zahlen und Dezimalzahlen mit Punkt (2, -3.75), wissenschaftliche Notation (2e3) sowie komplexe Zahlen mit i oder j: 1+2i, -0.5j, i. Leerzeichen innerhalb eines komplexen Literals werden ignoriert. Operande dürfen in Klammern stehen: (4.5)!, (-0.5)!.",
      specLimitsTitle: "Genauigkeit & Grenzen",
      specLimitsBody:
        "IEEE-754-Doppelgenauigkeit — etwa 15 signifikante Stellen. Überlauf ab n ≈ 170. Bei negativen ganzen Zahlen (−1, −2, …) hat Γ Polstellen: Diese Eingaben erzeugen einen Fehler statt eines Werts. Komplexe Ergebnisse werden berechnet, aber nicht geplottet.",
      reasoningPageTitle: "Wie gerechnet wird",
      reasoningPageLede: "Die vollständige Herleitung hinter dem Ergebnis: die verwendete Definition, die Zahlenwerte jeder Stufe und die Kontrollen.",
      appsPageTitle: "Wofür es nützt",
      appsPageLede: "Konkrete Anwendungen dieses Werts: was er zählt, ein durchgerechnetes Beispiel, wie man die Kurve liest und was man als Nächstes probiert.",
      appPageTitle: "Einsatzgebiete",
      appPageLede: "Wo verallgemeinerte Fakultäten, Gamma-, Binomial- und Betafunktionen vorkommen — von Algorithmen über KI bis zur Physik.",
      openReasoning: "Wie gerechnet wird",
      domainCS: "Informatik und Algorithmen",
      domainCSStat: "20! ≈ 2,4 × 10¹⁸",
      domainCSDesc: "Das ist die Anzahl der Routen, die ein Brute-Force-TSP-Löser für nur 20 Städte prüfen muss — bei 1 Milliarde Operationen pro Sekunde würde das 76 Jahre dauern. Fakultäten sind der Grund, warum wir clevere Algorithmen brauchen, nicht nur schnelle Computer.",
      domainCSEx1: "Sortieren: 52! ≈ 8×10⁶⁷ mögliche Anordnungen eines Kartenspiels — mehr als Atome im beobachtbaren Universum (10⁸⁰).",
      domainCSEx2: "Feature-Auswahl: 5 Features aus 20 Kandidaten wählen = C(20,5) = 15 504 — deshalb ist Exhaustive Search selten praktikabel.",
      domainCSEx3: "RSA-Verschlüsselung: Die Faktorisierung einer 2048-Bit-Zahl ist schwierig, weil der Suchraum kombinatorisch enorm ist.",
      domainAI: "Künstliche Intelligenz und maschinelles Lernen",
      domainAIStat: "Beta(8, 4)",
      domainAIDesc: "Nach 8 Klicks und 4 Käufen bei deinem A/B-Test verwendet die bayessche Inferenz Beta-Verteilungen, um die tatsächliche Konversionsrate zu schätzen — keine p-Werte, nur kontinuierliches Aktualisieren.",
      domainAIEx1: "LLM-Sampling: GPT wählt das nächste Token aus einer multinomialen Verteilung — die Normalisierungskonstante enthält Fakultäten der Vokabulargröße.",
      domainAIEx2: "Thompson Sampling: nutzt bayessche Beta-Posteriori, um Exploration vs. Exploitation in Echtzeit-Werbeplatzierung auszubalancieren.",
      domainAIEx3: "Kreuzvalidierung: C(10,3) = 120 Möglichkeiten, Daten in Folds aufzuteilen — die Grundlage robuster Modellbewertung.",
      domainStats: "Statistik und Datenwissenschaft",
      domainStatsStat: "p = 0,05 ≠ 95%",
      domainStatsDesc: "Ein p-Wert von 0,05 bedeutet NICHT, dass es 95% Chance gibt, dass der Effekt real ist. Er bedeutet: Wenn es keinen Effekt gäbe, würdest du in 5% der Fälle Daten so extrem sehen. Bayessche Methoden mit Beta-Posteriori geben dir, was du wirklich willst.",
      domainStatsEx1: "Klinische Studien: Ein Medikament an 200 Patienten testen nutzt die binomiale Leistungsanalyse, um die Stichprobengröße zu bestimmen.",
      domainStatsEx2: "Chi-Quadrat-Test: Mit k=10 Freiheitsgraden ist die Verteilung Gamma(5) — das ist, was deine Statistik-Software berechnet.",
      domainStatsEx3: "Permutationstest: 12 Patienten in 2 Gruppen à 6 verteilen ergibt C(12,6) = 924 Zufallszuordnungen — die exakte Nullverteilung.",
      domainPhysics: "Physik und Ingenieurwesen",
      domainPhysicsStat: "7!! = 105",
      domainPhysicsDesc: "Feynman-Diagramme — das rechnerische Rückgrat der Quantenfeldtheorie — zählen Kontraktionen mit Doppelfakultäten. Jedes Diagramm stellt einen Term in einer unendlichen Reihe dar, die beschreibt, wie Teilchen interagieren.",
      domainPhysicsEx1: "Wick-Satz: n-Feld-Kontraktionen erfordern (n-1)!! Paarungen — für 7 Felder sind das 105 Feynman-Diagramme.",
      domainPhysicsEx2: "Schwarzkörperstrahlung: Das Plancksche Gesetz für Photonstatistik verwendet Gammafunktionen — so verstehen wir Sterne.",
      domainPhysicsEx3: "Quanten-Harmonischer Oszillator: Die Normalisierung des n-ten Energieniveaus nutzt (2n)!! — verknüpft Fakultäten mit Quantenenergiequantisierung.",
      domainBio: "Biologie und Bioinformatik",
      domainBioStat: "10³⁰⁰ Konformationen",
      domainBioDesc: "Levinthals Paradoxon: Ein Protein mit 100 Aminosäuren hat ~10³⁰⁰ mögliche Konformationen. Wenn es eine pro Nanosekunde ausprobieren würde, bräuchte es länger als das Alter des Universums zum Falten durch Zufallssuche. Doch es faltet sich in Millisekunden — die Natur hat die kombinatorische Explosion gelöst.",
      domainBioEx1: "COVID-Varianten: Das Spike-Protein hat ~1.270 Aminosäuren. Jede Position kann zu ~19 Alternativen mutieren — der kombinatorische Raum ist enorm.",
      domainBioEx2: "K-Mer-Zählung: 3-mere in einer 20-Nukleotid-Sequenz zählen erkundet C(20,3) = 1.140 Positionen — grundlegend für die Genomassemblierung.",
      domainBioEx3: "Allel-Häufigkeiten: Bayessche Modelle nutzen Beta-Verteilungen, um die Evolution von Genhäufigkeiten in Populationen zu verfolgen.",
      domainEveryday: "Alltag",
      domainEverydayStat: "2²⁵⁶ Schlüssel",
      domainEverydayDesc: "Dein WLAN-Passwort verwendet WPA2 mit 2²⁵⁶ möglichen Schlüsseln — das ist mehr als die Anzahl der Atome im Universum. Selbst mit allen Computern der Erde zusammen würde Brute-Force länger dauern als der Hitzetod des Kosmos.",
      domainEverydayEx1: "Lotto: 6 Zahlen aus 49 wählen ergibt C(49,6) = 13.983.816 mögliche Tippscheine — deine Chancen sind etwa 1 zu 14 Millionen.",
      domainEverydayEx2: "PIN-Sicherheit: Eine 4-stellige PIN hat 10⁴ = 10.000 Kombinationen. Nach 3 falschen Versuchen sperrt sich dein Telefon — deshalb ist 2-Faktor-Authentifizierung wichtig.",
      domainEverydayEx3: "8 Gäste um einen runden Tisch setzen: 7! = 5.040 Anordnungen — erklärt, warum der Gastgeber einen Sitzordnungs-Algorithmus braucht.",
      openApps: "Wofür es nützt",
      reasoningEmpty: "Gib einen Ausdruck ein (z. B. 5!, gamma(0,2), C(10, 2,5), beta(2, 3)), um die detaillierte Herleitung zu sehen.",
      appsEmpty: "Gib einen Ausdruck ein (z. B. 5!, gamma(0,2), C(10, 2,5), beta(2, 3)), um die praktische Verwendung zu sehen.",
      appEmpty: "Durchstöbere die Bereiche unten oder gib einen Ausdruck oben ein, um zu sehen, wo er in der Praxis vorkommt.",
      fallbackNotice: "Lokal berechnet (Verifizierungs-API nicht erreichbar) — Ergebnis kann ungenau sein.",
    },
  };

  const LANG_LABELS = { en: "EN", fr: "FR", de: "DE" };
  let currentLang = "en";

  function t(key, vars) {
    const dict = I18N[currentLang] || I18N.en;
    let str = dict[key] !== undefined ? dict[key] : I18N.en[key] || key;
    if (vars) {
      for (const k of Object.keys(vars)) {
        str = str.split(`{${k}}`).join(vars[k]);
      }
    }
    return str;
  }

  function detectInitialLang() {
    try {
      const saved = window.localStorage.getItem("gf-lang");
      if (saved && I18N[saved]) return saved;
    } catch (e) { /* localStorage unavailable */ }
    const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
    return I18N[nav] ? nav : "en";
  }

  // ===================== math engine =====================

  const G = 7;
  const LANCZOS_COEF = [
    0.99999999999980993,
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];

  class GammaError extends Error {}

  class Complex {
    constructor(re, im = 0) {
      this.re = re;
      this.im = im;
    }
    static from(x) {
      return x instanceof Complex ? x : new Complex(x, 0);
    }
    get isReal() {
      return this.im === 0;
    }
    add(o) { o = Complex.from(o); return new Complex(this.re + o.re, this.im + o.im); }
    sub(o) { o = Complex.from(o); return new Complex(this.re - o.re, this.im - o.im); }
    mul(o) {
      o = Complex.from(o);
      return new Complex(this.re * o.re - this.im * o.im, this.re * o.im + this.im * o.re);
    }
    div(o) {
      o = Complex.from(o);
      const denom = o.re * o.re + o.im * o.im;
      return new Complex(
        (this.re * o.re + this.im * o.im) / denom,
        (this.im * o.re - this.re * o.im) / denom
      );
    }
    isFinite() { return Number.isFinite(this.re) && Number.isFinite(this.im); }
    static sin(z) {
      return new Complex(
        Math.sin(z.re) * Math.cosh(z.im),
        Math.cos(z.re) * Math.sinh(z.im)
      );
    }
    static exp(z) {
      const r = Math.exp(z.re);
      return new Complex(r * Math.cos(z.im), r * Math.sin(z.im));
    }
    static log(z) {
      const r = Math.hypot(z.re, z.im);
      return new Complex(Math.log(r), Math.atan2(z.im, z.re));
    }
    toString() {
      if (this.isReal) return formatFloat(this.re);
      const sign = this.im >= 0 ? "+" : "-";
      const reStr = formatFloat(this.re);
      const imStr = formatFloat(Math.abs(this.im));
      if (this.re === 0) return `${sign === "-" ? "-" : ""}${imStr}i`;
      return `${reStr}${sign}${imStr}i`;
    }
  }

  function formatFloat(x) {
    if (Object.is(x, -0)) x = 0;
    return String(x);
  }

  function isNonpositiveInteger(z) {
    return z.isReal && Number.isInteger(z.re) && z.re <= 0;
  }

  function gamma(z) {
    z = Complex.from(z);
    if (!z.isFinite()) {
      throw new GammaError(t("errGammaNotDefined", { z: z.toString() }));
    }
    if (isNonpositiveInteger(z)) {
      throw new GammaError(t("errGammaPole", { z: z.toString() }));
    }
    if (z.re < 0.5) {
      const oneMinusZ = new Complex(1 - z.re, -z.im);
      const denom = Complex.sin(new Complex(Math.PI * z.re, Math.PI * z.im)).mul(gamma(oneMinusZ));
      const result = new Complex(Math.PI, 0).div(denom);
      if (!result.isFinite()) {
        throw new GammaError(t("errGammaOverflow", { z: z.toString() }));
      }
      return result;
    }
    const zc = new Complex(z.re - 1, z.im);
    let acc = new Complex(LANCZOS_COEF[0], 0);
    for (let i = 1; i < G + 2; i++) {
      acc = acc.add(new Complex(LANCZOS_COEF[i], 0).div(zc.add(i)));
    }
    const tt = zc.add(G + 0.5);
    const logT = Complex.log(tt);
    const logResult = zc.add(0.5).mul(logT).sub(tt);
    const result = new Complex(Math.sqrt(2 * Math.PI), 0).mul(Complex.exp(logResult)).mul(acc);
    if (!result.isFinite()) {
      throw new GammaError(t("errGammaOverflow", { z: z.toString() }));
    }
    return result;
  }

  function gammaSafe(z) {
    try {
      const r = gamma(z);
      return r.isReal ? r.re : null;
    } catch (e) {
      return null;
    }
  }

  function factorial(n) {
    n = Complex.from(n);
    // Exact product for non-negative integers: keeps small factorials
    // (0! .. 22!) bit-exact instead of carrying Lanczos rounding noise
    // into values people verify by hand. Larger integers fall through to
    // Gamma, matching the package's floating-point behavior.
    if (n.isReal && Number.isInteger(n.re) && n.re >= 0 && n.re <= 170) {
      let result = 1;
      for (let i = 2; i <= n.re; i++) result *= i;
      return new Complex(result, 0);
    }
    return gamma(n.add(1));
  }

  // n!! = n(n-2)(n-4)... — only defined here for real non-negative integers
  // (and -1, by convention (-1)!! = 1), computed directly rather than via
  // Gamma (the n!! generalization to reals needs 2^(n/2) Gamma(n/2+1)-style
  // formulas that differ for even/odd n; the integer case covers the
  // examples people actually type).
  function doubleFactorial(n) {
    n = Complex.from(n);
    if (!n.isReal || !Number.isInteger(n.re) || n.re < -1) {
      throw new GammaError(t("errDoubleFactorialNonInt"));
    }
    let result = 1;
    for (let i = n.re; i > 1; i -= 2) result *= i;
    return new Complex(result, 0);
  }

  function binomial(n, k) {
    n = Complex.from(n);
    k = Complex.from(k);
    if (isNonpositiveInteger(n.add(1))) {
      throw new GammaError(
        t("errBinomialPoleN", { n: n.toString(), k: k.toString() })
      );
    }
    // A pole in Gamma(k+1) or Gamma(n-k+1) makes the denominator infinite;
    // by the Gamma-ratio definition that makes C(n, k) = 0, matching the
    // classic convention (and math.comb): 0 for k < 0 or k > n.
    if (isNonpositiveInteger(k.add(1))) return new Complex(0, 0);
    if (isNonpositiveInteger(n.sub(k).add(1))) return new Complex(0, 0);
    // Exact multiplicative formula for non-negative integers, mirroring
    // math.comb: avoids Gamma-ratio rounding noise on everyday inputs
    // like C(10, 3).
    if (
      n.isReal && k.isReal &&
      Number.isInteger(n.re) && Number.isInteger(k.re) &&
      n.re >= 0 && k.re >= 0 && n.re <= 1000
    ) {
      if (k.re > n.re) return new Complex(0, 0);
      const kk = Math.min(k.re, n.re - k.re);
      let result = 1;
      for (let i = 1; i <= kk; i++) result = (result * (n.re - kk + i)) / i;
      return new Complex(result, 0);
    }
    return gamma(n.add(1)).div(gamma(k.add(1)).mul(gamma(n.sub(k).add(1))));
  }

  // B(a, b) = Gamma(a) Gamma(b) / Gamma(a + b)
  function beta(a, b) {
    a = Complex.from(a);
    b = Complex.from(b);
    return gamma(a).mul(gamma(b)).div(gamma(a.add(b)));
  }

  const COMPLEX_RE = /^([+-]?\d*\.?\d+(?:e[+-]?\d+)?)?([+-]\d*\.?\d+(?:e[+-]?\d+)?)?[ij]$/i;
  const PURE_IMAG_RE = /^([+-]?\d*\.?\d*(?:e[+-]?\d+)?)[ij]$/i;

  function parseNumber(raw) {
    const trimmed = raw.trim().replace(/\s+/g, "");
    if (trimmed === "") {
      throw new GammaError(t("errNotValidNumber", { raw }));
    }
    if (!/[ij]/i.test(trimmed)) {
      if (Number.isNaN(Number(trimmed))) {
        throw new GammaError(t("errNotValidNumber", { raw }));
      }
      return new Complex(Number(trimmed), 0);
    }
    const pureMatch = PURE_IMAG_RE.exec(trimmed);
    if (pureMatch) {
      const imStr = pureMatch[1];
      const im = imStr === "" || imStr === "+" ? 1 : imStr === "-" ? -1 : Number(imStr);
      return new Complex(0, im);
    }
    const fullMatch = COMPLEX_RE.exec(trimmed);
    if (fullMatch && (fullMatch[1] !== undefined || fullMatch[2] !== undefined)) {
      const re = fullMatch[1] ? Number(fullMatch[1]) : 0;
      const imStr = fullMatch[2];
      const im = imStr === undefined ? 0 : imStr === "+" ? 1 : imStr === "-" ? -1 : Number(imStr);
      return new Complex(re, im);
    }
    throw new GammaError(t("errNotValidNumber", { raw }));
  }

  const DOUBLE_FACTORIAL_SUFFIX_RE = /^(.+?)!!$/;
  const FACTORIAL_SUFFIX_RE = /^(.+?)!$/;
  const CALL_RE = /^([A-Za-z_]+)\((.*)\)$/;

  // True when s is exactly one balanced pair of outer parentheses, so
  // "(a)(b)" and "(a)+(b)" are not mistaken for a wrapped operand.
  function isWrappedInParens(s) {
    if (!s.startsWith("(") || !s.endsWith(")")) return false;
    let depth = 0;
    for (let i = 0; i < s.length; i++) {
      if (s[i] === "(") depth++;
      else if (s[i] === ")") {
        depth--;
        if (depth === 0 && i < s.length - 1) return false;
      }
    }
    return depth === 0;
  }

  function formatResult(value) {
    return value.toString();
  }

  // Returns { value, plot } where plot describes how to draw a curve
  // around the result: { kind, center, n?, b? }. plot is null for complex
  // (non-real) results, which aren't plotted.
  function evalExpression(expr) {
    const trimmed = expr.trim();

    function plotFor(kind, center, extra) {
      if (!center.isReal) return null;
      if (extra && Object.values(extra).some((v) => v instanceof Complex && !v.isReal)) return null;
      const out = { kind, center: center.re };
      if (extra) {
        for (const k of Object.keys(extra)) out[k] = extra[k].re;
      }
      return out;
    }

    // An operand is a plain number literal or any parenthesized expression,
    // e.g. -0.5, (4.5), ((2+1)) or (gamma(2.5)); parentheses recurse.
    function evalOperand(raw) {
      const s = raw.trim();
      if (isWrappedInParens(s)) return evalExpression(s.slice(1, -1)).value;
      return parseNumber(s);
    }

    const dfactMatch = DOUBLE_FACTORIAL_SUFFIX_RE.exec(trimmed);
    if (dfactMatch) {
      const n = evalOperand(dfactMatch[1]);
      return { value: doubleFactorial(n), plot: plotFor("doubleFactorial", n), kind: "doubleFactorial", args: [n] };
    }

    const factMatch = FACTORIAL_SUFFIX_RE.exec(trimmed);
    if (factMatch) {
      const n = evalOperand(factMatch[1]);
      return { value: factorial(n), plot: plotFor("factorial", n), kind: "factorial", args: [n] };
    }

    const callMatch = CALL_RE.exec(trimmed);
    if (callMatch) {
      const func = callMatch[1].toLowerCase();
      const rawArgs = callMatch[2].split(",").map((a) => a.trim()).filter(Boolean);

      if (func === "factorial" && rawArgs.length === 1) {
        const n = evalOperand(rawArgs[0]);
        return { value: factorial(n), plot: plotFor("factorial", n), kind: "factorial", args: [n] };
      }
      if (func === "doublefactorial" && rawArgs.length === 1) {
        const n = evalOperand(rawArgs[0]);
        return { value: doubleFactorial(n), plot: plotFor("doubleFactorial", n), kind: "doubleFactorial", args: [n] };
      }
      if (func === "gamma" && rawArgs.length === 1) {
        const z = evalOperand(rawArgs[0]);
        return { value: gamma(z), plot: plotFor("gamma", z), kind: "gamma", args: [z] };
      }
      if ((func === "c" || func === "binomial") && rawArgs.length === 2) {
        const n = evalOperand(rawArgs[0]);
        const k = evalOperand(rawArgs[1]);
        return { value: binomial(n, k), plot: plotFor("binomial", k, { n }), kind: "binomial", args: [n, k] };
      }
      if (func === "beta" && rawArgs.length === 2) {
        const a = evalOperand(rawArgs[0]);
        const b = evalOperand(rawArgs[1]);
        return { value: beta(a, b), plot: plotFor("beta", a, { b }), kind: "beta", args: [a, b] };
      }
      throw new GammaError(t("errUnrecognized", { expr }));
    }

    // A bare number (real or complex), typed with no function around it:
    // just echo it back, like a plain calculator would.
    try {
      const n = evalOperand(trimmed);
      return { value: n, plot: null, kind: "number", isBareNumber: true, args: [n] };
    } catch (e) {
      throw new GammaError(t("errUnrecognized", { expr }));
    }
  }

  function evalAt(kind, x, extra) {
    try {
      if (kind === "gamma") return gammaSafe(x);
      if (kind === "factorial") return gammaSafe(x + 1);
      if (kind === "doubleFactorial") {
        if (!Number.isInteger(x) || x < -1) return null;
        const r = doubleFactorial(new Complex(x, 0));
        return r.isReal ? r.re : null;
      }
      if (kind === "binomial") {
        const r = binomial(new Complex(extra.n, 0), new Complex(x, 0));
        return r.isReal && Number.isFinite(r.re) ? r.re : null;
      }
      if (kind === "beta") {
        const r = beta(new Complex(x, 0), new Complex(extra.b, 0));
        return r.isReal && Number.isFinite(r.re) ? r.re : null;
      }
    } catch (e) {
      return null;
    }
    return null;
  }

  function defaultRange(plot) {
    if (plot.kind === "binomial") return [-1, plot.n + 1];
    if (plot.kind === "beta") return [Math.max(0.1, plot.center - 5), plot.center + 5];
    if (plot.kind === "doubleFactorial") return [Math.max(-1, plot.center - 10), plot.center + 10];
    const span = Math.max(3, Math.abs(plot.center) * 0.6 + 2);
    return [plot.center - span, plot.center + span];
  }

  function makeTextButton(label, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "text-btn";
    btn.textContent = label;
    btn.addEventListener("click", onClick);
    return btn;
  }

  function makeToolButton(icon, label, onClick) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tool-btn";
    const iconSpan = document.createElement("span");
    iconSpan.className = "tool-btn-icon";
    iconSpan.setAttribute("aria-hidden", "true");
    iconSpan.textContent = icon;
    btn.appendChild(iconSpan);
    btn.appendChild(document.createTextNode(label));
    btn.addEventListener("click", onClick);
    return btn;
  }

  function urlFor(expr) {
    const url = new URL(window.location.href);
    url.searchParams.set("expr", expr);
    return url;
  }

  function makeCopyLinkButton(expr) {
    const btn = makeTextButton(t("copyLink"), async () => {
      try {
        await navigator.clipboard.writeText(urlFor(expr).toString());
        btn.textContent = t("copied");
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = t("copyLink");
          btn.classList.remove("copied");
        }, 1500);
      } catch (e) {
        btn.textContent = t("copyFailed");
      }
    });
    return btn;
  }

  function functionBadgeText(kind) {
    if (kind === "number") return t("badgeNumber");
    if (kind === "gamma") return t("badgeGamma");
    if (kind === "factorial") return t("badgeFactorial");
    if (kind === "doubleFactorial") return t("badgeDoubleFactorial");
    if (kind === "beta") return t("badgeBeta");
    return t("badgeBinomial");
  }

  function round(x, digits) {
    return Number(x.toFixed(digits));
  }

  // ===================== worked reasoning =====================

  // Builds a logical, step-by-step derivation that adapts to the input:
  // a narrative lead, an aligned "=" chain of steps, and a short check.
  // Each step is { lhs, eq, rhs, note }.
  function buildReasoning(plot, value) {
    if (!value.isReal) return null;
    const steps = [];

    if (plot.kind === "factorial") {
      const n = plot.center;
      if (Number.isInteger(n) && n >= 0 && n <= 12) {
        const terms = [];
        for (let i = n; i >= 1; i--) terms.push(i);
        steps.push({ lhs: `${n}!`, eq: "=", rhs: terms.length ? terms.join(" × ") : "1", note: t("noteIntegerN") });
        let acc = terms.length ? terms[0] : 1;
        for (let i = 1; i < terms.length; i++) {
          const prod = acc * terms[i];
          steps.push({ lhs: "", eq: "", rhs: `${acc} × ${terms[i]} = ${prod}`, note: "" });
          acc = prod;
        }
        steps.push({ lhs: `${n}!`, eq: "=", rhs: String(acc), note: "" });
        return { lead: t("reasoningLeadFactorialInt", { n }), steps, tail: t("reasoningTailFactorial") };
      }
      const g = n + 1;
      if (g >= 0.5) {
        steps.push({ lhs: `${n}!`, eq: "=", rhs: `Γ(${round(g, 6)})`, note: t("noteDefinition") });
        steps.push({ lhs: "", eq: "", rhs: t("noteDirect"), note: "" });
        steps.push({ lhs: `${n}!`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
        if (n > 0) {
          const gz = gammaSafe(g);
          if (gz !== null) {
            steps.push({ lhs: `Γ(${round(g + 1, 6)})`, eq: "≈", rhs: `${round(g, 6)} × Γ(${round(g, 6)}) ≈ ${round(g * gz, 6)}`, note: t("noteCheck") });
          }
        }
        return { lead: t("reasoningLeadFactorialGamma", { g: round(g, 6) }), steps, tail: t("reasoningTailFactorial") };
      }
      steps.push({ lhs: `${n}!`, eq: "=", rhs: `Γ(${round(g, 6)})`, note: t("noteDefinition") });
      steps.push({ lhs: "", eq: "=", rhs: `π / (sin(π·${round(g, 6)}) · Γ(${round(1 - g, 6)}))`, note: t("noteReflectionFormula") });
      const gOne = gammaSafe(1 - g);
      if (gOne !== null) {
        steps.push({ lhs: "", eq: "", rhs: `Γ(${round(1 - g, 6)}) = ${round(gOne, 6)}`, note: "" });
      }
      steps.push({ lhs: "", eq: "", rhs: `sin(π·${round(g, 6)}) = ${round(Math.sin(Math.PI * g), 6)}`, note: "" });
      steps.push({ lhs: `${n}!`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      return { lead: t("reasoningLeadFactorialReflect", { g: round(g, 6) }), steps, tail: t("reasoningTailFactorial") };
    }

    if (plot.kind === "gamma") {
      const z = plot.center;
      steps.push({ lhs: `Γ(${z})`, eq: "", rhs: "", note: t("noteDefinition") });
      if (z < 0.5) {
        steps.push({ lhs: "", eq: "=", rhs: `π / (sin(π·${z}) · Γ(${round(1 - z, 6)}))`, note: t("noteReflectionFormula") });
        const gOne = gammaSafe(1 - z);
        if (gOne !== null) {
          steps.push({ lhs: "", eq: "", rhs: `Γ(${round(1 - z, 6)}) = ${round(gOne, 6)}`, note: t("noteDirect") });
        }
        steps.push({ lhs: "", eq: "", rhs: `sin(π·${z}) = ${round(Math.sin(Math.PI * z), 6)}`, note: "" });
        steps.push({ lhs: `Γ(${z})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
        return { lead: t("reasoningLeadGammaReflect", { z }), steps, tail: t("reasoningTailGamma") };
      }
      steps.push({ lhs: "", eq: "", rhs: t("noteDirect"), note: "" });
      steps.push({ lhs: `Γ(${z})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      if (z > 0) {
        steps.push({ lhs: `Γ(${round(z + 1, 6)})`, eq: "≈", rhs: `${z} × Γ(${z}) ≈ ${round(z * value.re, 6)}`, note: t("noteCheck") });
      }
      return { lead: t("reasoningLeadGammaDirect"), steps, tail: t("reasoningTailGamma") };
    }

    if (plot.kind === "doubleFactorial") {
      const n = plot.center;
      if (Number.isInteger(n) && n >= -1 && n <= 14) {
        const terms = [];
        for (let i = n; i >= 1; i -= 2) terms.push(i);
        steps.push({ lhs: `${n}!!`, eq: "=", rhs: terms.length ? terms.join(" × ") : "1", note: t("noteStepDown") });
        let acc = terms.length ? terms[0] : 1;
        for (let i = 1; i < terms.length; i++) {
          const prod = acc * terms[i];
          steps.push({ lhs: "", eq: "", rhs: `${acc} × ${terms[i]} = ${prod}`, note: "" });
          acc = prod;
        }
        steps.push({ lhs: `${n}!!`, eq: "=", rhs: String(acc), note: "" });
      } else {
        steps.push({ lhs: `${n}!!`, eq: "≈", rhs: String(round(value.re, 6)), note: t("noteStepDown") });
      }
      return { lead: t("reasoningLeadDouble"), steps, tail: t("reasoningTailDouble") };
    }

    if (plot.kind === "binomial") {
      const n = plot.n, k = plot.center;
      const isInt = Number.isInteger(n) && Number.isInteger(k);
      steps.push({
        lhs: `C(${n}, ${k})`,
        eq: "=",
        rhs: `Γ(${round(n + 1, 6)}) / (Γ(${round(k + 1, 6)})·Γ(${round(n - k + 1, 6)}))`,
        note: t("noteChooseKFromN"),
      });
      if (isInt && n >= 0 && n <= 18 && k >= 0 && k <= n) {
        let num = 1, d1 = 1, d2 = 1;
        for (let i = 2; i <= n; i++) num *= i;
        for (let i = 2; i <= k; i++) d1 *= i;
        for (let i = 2; i <= n - k; i++) d2 *= i;
        steps.push({ lhs: "", eq: "", rhs: `${num} / (${d1} × ${d2})`, note: t("noteIntegerN") });
        steps.push({ lhs: "", eq: "", rhs: `${num} / ${d1 * d2} = ${Math.round(num / (d1 * d2))}`, note: "" });
      }
      steps.push({ lhs: `C(${n}, ${k})`, eq: isInt ? "=" : "≈", rhs: String(round(value.re, 6)), note: isInt ? t("notePascalRow") : t("noteInterpolated") });
      return { lead: t("reasoningLeadBinomial"), steps, tail: t("reasoningTailBinomial") };
    }

    if (plot.kind === "beta") {
      const a = plot.center, b = plot.b;
      steps.push({
        lhs: `B(${a}, ${b})`,
        eq: "=",
        rhs: `Γ(${a})·Γ(${b}) / Γ(${round(a + b, 6)})`,
        note: t("noteBetaGamma"),
      });
      if (Number.isInteger(a) && Number.isInteger(b) && a >= 1 && b >= 1) {
        let ga = 1, gb = 1, gab = 1;
        for (let i = 2; i < a; i++) ga *= i;
        for (let i = 2; i < b; i++) gb *= i;
        for (let i = 2; i < a + b; i++) gab *= i;
        if (ga * gb > 0) {
          steps.push({ lhs: "", eq: "", rhs: `${ga} × ${gb} / ${gab}`, note: t("noteIntegerN") });
          steps.push({ lhs: "", eq: "", rhs: `= ${ga * gb} / ${gab} ≈ ${round((ga * gb) / gab, 6)}`, note: "" });
        }
      }
      steps.push({ lhs: `B(${a}, ${b})`, eq: "≈", rhs: String(round(value.re, 6)), note: "" });
      return { lead: t("reasoningLeadBeta"), steps, tail: t("reasoningTailBeta") };
    }

    return null;
  }

  function makeReasoningBlock(plot, value) {
    const reasoning = buildReasoning(plot, value);
    if (!reasoning) return null;
    const section = document.createElement("div");
    section.className = "reasoning";
    const title = document.createElement("p");
    title.className = "reasoning-title";
    title.textContent = t("reasoningTitle");
    section.appendChild(title);
    if (reasoning.lead) {
      const lead = document.createElement("p");
      lead.className = "reasoning-lead";
      lead.textContent = reasoning.lead;
      section.appendChild(lead);
    }
    const grid = document.createElement("div");
    grid.className = "reasoning-grid";
    const CONDENSED_LIMIT = 3;
    const steps = reasoning.steps;
    const visibleSteps = steps.slice(0, CONDENSED_LIMIT);
    const hiddenSteps = steps.slice(CONDENSED_LIMIT);

    function appendStep(step) {
      const lhs = document.createElement("span");
      lhs.className = "reasoning-lhs";
      lhs.textContent = step.lhs;
      const eq = document.createElement("span");
      eq.className = "reasoning-eq";
      eq.textContent = step.eq || "";
      const rhs = document.createElement("span");
      rhs.className = "reasoning-rhs";
      rhs.textContent = step.rhs;
      const note = document.createElement("span");
      note.className = "reasoning-note";
      note.textContent = step.note;
      grid.appendChild(lhs);
      grid.appendChild(eq);
      grid.appendChild(rhs);
      grid.appendChild(note);
    }

    for (const step of visibleSteps) appendStep(step);
    section.appendChild(grid);

    if (hiddenSteps.length > 0) {
      const extra = document.createElement("div");
      extra.className = "reasoning-extra";
      extra.hidden = true;
      const extraGrid = document.createElement("div");
      extraGrid.className = "reasoning-grid";
      for (const step of hiddenSteps) {
        const lhs = document.createElement("span");
        lhs.className = "reasoning-lhs";
        lhs.textContent = step.lhs;
        const eq = document.createElement("span");
        eq.className = "reasoning-eq";
        eq.textContent = step.eq || "";
        const rhs = document.createElement("span");
        rhs.className = "reasoning-rhs";
        rhs.textContent = step.rhs;
        const note = document.createElement("span");
        note.className = "reasoning-note";
        note.textContent = step.note;
        extraGrid.appendChild(lhs);
        extraGrid.appendChild(eq);
        extraGrid.appendChild(rhs);
        extraGrid.appendChild(note);
      }
      extra.appendChild(extraGrid);
      section.appendChild(extra);

      const toggle = document.createElement("button");
      toggle.className = "reasoning-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = t("reasoningShowFull");
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        extra.hidden = expanded;
        toggle.textContent = expanded ? t("reasoningShowFull") : t("reasoningShowLess");
      });
      section.appendChild(toggle);
    }
    if (reasoning.tail) {
      const tail = document.createElement("p");
      tail.className = "reasoning-tail";
      tail.textContent = reasoning.tail;
      section.appendChild(tail);
    }
    return section;
  }

  // ===================== practical use =====================

  // Builds a "what it's for" panel that adapts to the current input:
  // what the object counts/computes, a concrete worked example, how to
  // read the curve, and something to try next.
  function buildPractical(plot, value, kind) {
    const items = [];
    const v = round(value.re, 6);

    if (!value.isReal) {
      if (kind === "factorial") items.push({ h: t("practWhat"), p: t("practFactorialWhat") });
      else if (kind === "gamma") items.push({ h: t("practWhat"), p: t("practGammaWhat") });
      else if (kind === "doubleFactorial") items.push({ h: t("practWhat"), p: t("practDoubleWhat") });
      else if (kind === "binomial") items.push({ h: t("practWhat"), p: t("practBinomialWhat") });
      else if (kind === "beta") items.push({ h: t("practWhat"), p: t("practBetaWhat") });
      return items;
    }

    if (kind === "factorial") {
      const n = plot.center;
      items.push({ h: t("practWhat"), p: t("practFactorialWhat") });
      if (Number.isInteger(n) && n >= 0) {
        items.push({ h: t("practUse"), p: t("practFactorialUse", { n, v }) });
      } else {
        const d = Math.max(2, 2 * Math.round(n + 1));
        const denom = gammaSafe(d / 2 + 1);
        const vol = denom !== null ? Math.pow(Math.PI, d / 2) / denom : 0;
        items.push({ h: t("practUse"), p: t("practFactorialGamma", { n, d, vol: round(vol, 4) }) });
      }
      items.push({ h: t("practCurve"), p: t("practFactorialCurve") });
      items.push({ h: t("practWhere"), p: t("practFactorialWhere") });
      items.push({ h: t("practTry"), p: t("practFactorialTry") });
    } else if (kind === "gamma") {
      items.push({ h: t("practWhat"), p: t("practGammaWhat") });
      items.push({ h: t("practUse"), p: t("practGammaUse") });
      items.push({ h: t("practCurve"), p: t("practGammaCurve") });
      items.push({ h: t("practWhere"), p: t("practGammaWhere") });
      items.push({ h: t("practTry"), p: t("practGammaTry") });
    } else if (kind === "doubleFactorial") {
      const n = plot.center;
      items.push({ h: t("practWhat"), p: t("practDoubleWhat") });
      if (Number.isInteger(n) && n >= 0) {
        if (n % 2 === 1) {
          const k = (n + 1) / 2;
          items.push({ h: t("practUse"), p: t("practDoubleUseOdd", { n, k, v }) });
        } else {
          const k = n / 2;
          items.push({ h: t("practUse"), p: t("practDoubleUseEven", { n, k, v }) });
        }
      }
      items.push({ h: t("practCurve"), p: t("practDoubleCurve") });
      items.push({ h: t("practWhere"), p: t("practDoubleWhere") });
      items.push({ h: t("practTry"), p: t("practDoubleTry") });
    } else if (kind === "binomial") {
      const n = plot.n, k = plot.center;
      const isInt = Number.isInteger(n) && Number.isInteger(k);
      items.push({ h: t("practWhat"), p: t("practBinomialWhat") });
      if (isInt) {
        items.push({ h: t("practUse"), p: t("practBinomialUse", { k, n, c: v }) });
      } else {
        const kWhole = Math.round(k);
        const cWhole = evalAt("binomial", kWhole, plot);
        items.push({ h: t("practUse"), p: t("practBinomialInterp", { k, c: v, cint: cWhole !== null ? round(cWhole, 6) : 0 }) });
      }
      items.push({ h: t("practCurve"), p: t("practBinomialCurve") });
      items.push({ h: t("practWhere"), p: t("practBinomialWhere") });
      items.push({ h: t("practTry"), p: t("practBinomialTry") });
    } else if (kind === "beta") {
      const a = plot.center, b = plot.b;
      items.push({ h: t("practWhat"), p: t("practBetaWhat") });
      if (a > 1 && b > 1) {
        const peak = (a - 1) / (a + b - 2);
        items.push({ h: t("practUse"), p: t("practBetaUsePeak", { peak: round(peak, 3) }) });
      } else {
        items.push({ h: t("practUse"), p: t("practBetaUse") });
      }
      items.push({ h: t("practCurve"), p: t("practBetaCurve") });
      items.push({ h: t("practWhere"), p: t("practBetaWhere") });
      items.push({ h: t("practTry"), p: t("practBetaTry") });
    }

    return items;
  }

  function makePracticalBlock(plot, value, kind) {
    const items = buildPractical(plot, value, kind);
    if (items.length === 0) return null;
    const section = document.createElement("div");
    section.className = "practical";
    const title = document.createElement("p");
    title.className = "practical-title";
    title.textContent = t("practTitle");
    section.appendChild(title);
    for (const item of items) {
      const wrap = document.createElement("div");
      wrap.className = "practical-item";
      const h = document.createElement("h3");
      h.textContent = item.h;
      wrap.appendChild(h);
      const paras = Array.isArray(item.p) ? item.p : [item.p];
      for (const text of paras) {
        const p = document.createElement("p");
        p.textContent = text;
        wrap.appendChild(p);
      }
      section.appendChild(wrap);
    }
    return section;
  }

  // ===================== keypad =====================

  const KEYPAD_KEYS = ["!", "!!", "Γ()", "C(,)", "π", "i"];

  function insertAtCursor(text) {
    const input = document.getElementById("exprInput");
    if (!input) return;
    const cursorMatch = text.indexOf("|");
    const clean = text.replace("|", "");
    const start = input.selectionStart ?? input.value.length;
    const end = input.selectionEnd ?? input.value.length;
    input.value = input.value.slice(0, start) + clean + input.value.slice(end);
    const newPos = start + (cursorMatch === -1 ? clean.length : cursorMatch);
    input.focus();
    input.setSelectionRange(newPos, newPos);
  }

  function renderKeypad() {
    const keypad = document.getElementById("keypad");
    if (!keypad) return;
    keypad.innerHTML = "";
    const inserts = { "Γ()": "gamma(|)", "C(,)": "C(|,)" };
    for (const key of KEYPAD_KEYS) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "key-btn";
      btn.textContent = key;
      btn.addEventListener("click", () => insertAtCursor(inserts[key] || key));
      keypad.appendChild(btn);
    }
  }

  // ===================== page infrastructure (3-page layout) =====================

  let langChangeHook = null;

  function setLang(lang) {
    if (!I18N[lang]) lang = "en";
    currentLang = lang;
    try { window.localStorage.setItem("gf-lang", lang); } catch (e) { /* ignore */ }
    document.documentElement.lang = lang;
    const lbl = document.getElementById("langBtnLabel");
    if (lbl) lbl.textContent = LANG_LABELS[lang];
    const menu = document.getElementById("langMenu");
    if (menu) {
      menu.querySelectorAll(".lang-option").forEach((opt) => {
        opt.setAttribute("aria-current", opt.dataset.lang === lang ? "true" : "false");
      });
    }
    refreshThemeButton();
    if (langChangeHook) langChangeHook();
  }

  function setLangHook(fn) {
    langChangeHook = fn;
  }

  function initLangUI() {
    const langBtn = document.getElementById("langBtn");
    const langMenu = document.getElementById("langMenu");
    if (!langBtn || !langMenu) return;
    langBtn.addEventListener("click", () => {
      const isOpen = !langMenu.hidden;
      langMenu.hidden = isOpen;
      langBtn.setAttribute("aria-expanded", String(!isOpen));
    });
    langMenu.addEventListener("click", (event) => {
      const opt = event.target.closest(".lang-option");
      if (!opt) return;
      setLang(opt.dataset.lang);
      langMenu.hidden = true;
      langBtn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("click", (event) => {
      if (!langBtn.contains(event.target) && !langMenu.contains(event.target)) {
        langMenu.hidden = true;
        langBtn.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        langMenu.hidden = true;
        langBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // The expression currently in play: the page's own input if any, else the URL.
  function navExpr() {
    const fromUrl = new URL(window.location.href).searchParams.get("expr");
    const input = document.getElementById("exprInput");
    if (input && input.value.trim()) return input.value.trim();
    return fromUrl || "";
  }

  function renderNav(activePage) {
    const nav = document.getElementById("subNav");
    if (!nav) return;
    const expr = navExpr();
    const q = expr ? "?expr=" + encodeURIComponent(expr) : "";
    const items = [
      { page: "calc", href: "index.html" + q, key: "navCalc" },
      { page: "reasoning", href: "comment-cest-calcule.html" + q, key: "navReasoning" },
      { page: "apps", href: "a-quoi-ca-sert.html" + q, key: "navApps" },
      { page: "faq", href: "faq.html", key: "navFaq" },
      { page: "app", href: "applications.html" + q, key: "navApp" },
    ];
    nav.innerHTML = "";
    for (const it of items) {
      const a = document.createElement("a");
      a.className = "nav-link" + (activePage === it.page ? " active" : "");
      a.href = it.href;
      a.textContent = t(it.key);
      nav.appendChild(a);
    }
  }

  // A compact "expression = value" context line, used by the detail pages.
  function makeAnswerContext(expr, value, kind) {    const answer = document.createElement("div");
    answer.className = "result-answer";
    if (kind !== "number") {
      const badge = document.createElement("p");
      badge.className = "function-badge";
      badge.dataset.kind = kind;
      badge.textContent = functionBadgeText(kind);
      answer.appendChild(badge);
    }
    const eq = document.createElement("div");
    eq.className = "eq";
    if (kind === "number") {
      const val = document.createElement("span");
      val.className = "eq-val";
      val.textContent = formatResult(value);
      eq.appendChild(val);
    } else {
      const lhs = document.createElement("span");
      lhs.className = "eq-lhs";
      lhs.textContent = expr;
      const op = document.createElement("span");
      op.className = "eq-op";
      op.textContent = "=";
      const val = document.createElement("span");
      val.className = "eq-val";
      val.textContent = formatResult(value);
      eq.appendChild(lhs);
      eq.appendChild(op);
      eq.appendChild(val);
    }
    answer.appendChild(eq);
    const actions = document.createElement("div");
    actions.className = "eq-actions";
    actions.appendChild(makeCopyLinkButton(expr));
    answer.appendChild(actions);
    return answer;
  }

  // ===================== theme toggle =====================
  // Light/dark follows prefers-color-scheme unless the user picks a side;
  // the explicit choice persists in localStorage("gf-theme") and is applied
  // as data-theme on <html>, which style.css reads via :root[data-theme=...].

  const THEME_KEY = "gf-theme";

  function storedTheme() {
    try { return window.localStorage.getItem(THEME_KEY); } catch (e) { return null; }
  }

  function appliedTheme() {
    const attr = document.documentElement.dataset.theme;
    if (attr === "dark" || attr === "light") return attr;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function refreshThemeButton() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    const next = appliedTheme() === "dark" ? "light" : "dark";
    // The label announces what clicking will switch TO.
    // Inline SVG icons: crisp and consistent across platforms, unlike emoji.
    const ICONS = {
      dark:
        '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>',
      light:
        '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>',
    };
    btn.innerHTML = ICONS[next];
    const label = t(next === "dark" ? "themeToDark" : "themeToLight");
    btn.setAttribute("aria-label", label);
    btn.title = label;
  }

  function cycleTheme() {
    const next = appliedTheme() === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try { window.localStorage.setItem(THEME_KEY, next); } catch (e) { /* ignore */ }
    refreshThemeButton();
  }

  function initThemeToggle() {
    const stored = storedTheme();
    if (stored === "dark" || stored === "light") {
      document.documentElement.dataset.theme = stored;
    }
    const btn = document.getElementById("themeToggle");
    if (!btn || btn.dataset.themeBound === "true") return;
    btn.dataset.themeBound = "true";
    btn.addEventListener("click", cycleTheme);
    refreshThemeButton();
  }

  window.GF = {
    t,
    setLang,
    setLangHook,
    initLangUI,
    detectInitialLang,
    renderNav,
    navExpr,
    urlFor,
    insertAtCursor,
    renderKeypad,
    makeAnswerContext,
    makeCopyLinkButton,
    Complex,
    GammaError,
    parseNumber,
    formatResult,
    evalExpression,
    evalAt,
    defaultRange,
    gamma,
    gammaSafe,
    factorial,
    doubleFactorial,
    binomial,
    beta,
    round,
    buildReasoning,
    makeReasoningBlock,
    buildPractical,
    makePracticalBlock,
    initThemeToggle,
  };
})();
