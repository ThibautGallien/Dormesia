// lib/advanced-quiz-logic.js
// Quiz IA Avancé Dormesia - 15 Questions + Algorithme Multidimensionnel

export const ADVANCED_QUIZ_QUESTIONS = [
  // 1. QUALITÉ GÉNÉRALE (comme avant mais plus précise)
  {
    id: 1,
    category: "general",
    question: "Comment évaluez-vous globalement la qualité de votre sommeil ?",
    type: "single",
    icon: "BedIcon",
    options: [
      {
        value: "excellent",
        label: "Excellent - Je me réveille toujours reposé(e)",
        score: 5,
      },
      {
        value: "tres-bien",
        label: "Très bien - Généralement satisfaisant",
        score: 4,
      },
      {
        value: "bien",
        label: "Bien - Correct avec quelques nuits difficiles",
        score: 3,
      },
      {
        value: "moyen",
        label: "Moyen - Parfois bon, souvent problématique",
        score: 2,
      },
      { value: "mauvais", label: "Mauvais - Sommeil non réparateur", score: 1 },
    ],
  },

  // 2. DURÉE DU SOMMEIL
  {
    id: 2,
    category: "duration",
    question: "Combien d'heures dormez-vous en moyenne par nuit ?",
    type: "single",
    icon: "ClockIcon",
    options: [
      { value: "moins-5", label: "Moins de 5 heures", score: 1 },
      { value: "5-6", label: "5 à 6 heures", score: 2 },
      { value: "6-7", label: "6 à 7 heures", score: 3 },
      { value: "7-8", label: "7 à 8 heures", score: 5 },
      { value: "8-9", label: "8 à 9 heures", score: 4 },
      { value: "9-10", label: "9 à 10 heures", score: 3 },
      { value: "plus-10", label: "Plus de 10 heures", score: 2 },
    ],
  },

  // 3. LATENCE D'ENDORMISSEMENT
  {
    id: 3,
    category: "latency",
    question: "Combien de temps mettez-vous généralement à vous endormir ?",
    type: "single",
    icon: "MoonIcon",
    options: [
      { value: "moins-10", label: "Moins de 10 minutes", score: 5 },
      { value: "10-20", label: "10 à 20 minutes", score: 4 },
      { value: "20-30", label: "20 à 30 minutes", score: 3 },
      { value: "30-60", label: "30 minutes à 1 heure", score: 2 },
      { value: "plus-60", label: "Plus d'une heure", score: 1 },
    ],
  },

  // 4. RÉVEIL MATINAL
  {
    id: 4,
    category: "morning",
    question: "Comment vous sentez-vous au réveil ?",
    type: "single",
    icon: "SunIcon",
    options: [
      { value: "tres-repose", label: "Très reposé(e) et énergique", score: 5 },
      { value: "repose", label: "Reposé(e) et en forme", score: 4 },
      { value: "correct", label: "Correct, prêt(e) à démarrer", score: 3 },
      { value: "fatigue", label: "Fatigué(e), besoin de temps", score: 2 },
      {
        value: "epuise",
        label: "Épuisé(e), très difficile à démarrer",
        score: 1,
      },
    ],
  },

  // 5. RÉVEILS NOCTURNES
  {
    id: 5,
    category: "waking",
    question: "À quelle fréquence vous réveillez-vous pendant la nuit ?",
    type: "single",
    icon: "RefreshCwIcon",
    options: [
      { value: "jamais", label: "Jamais ou très rarement", score: 5 },
      { value: "1-fois", label: "1 fois par nuit occasionnellement", score: 4 },
      { value: "2-3-fois", label: "2-3 fois par semaine", score: 3 },
      { value: "chaque-nuit-1", label: "Chaque nuit, 1 fois", score: 2 },
      {
        value: "chaque-nuit-multiple",
        label: "Chaque nuit, plusieurs fois",
        score: 1,
      },
    ],
  },

  // 6. CHRONOTYPE - HEURE COUCHER PRÉFÉRÉE
  {
    id: 6,
    category: "chronotype",
    question: "À quelle heure préférez-vous naturellement vous coucher ?",
    type: "single",
    icon: "ClockIcon",
    options: [
      {
        value: "avant-21h",
        label: "Avant 21h",
        score: 5,
        chronotype: "leve-tot",
      },
      {
        value: "21h-22h",
        label: "21h - 22h",
        score: 4,
        chronotype: "leve-tot",
      },
      { value: "22h-23h", label: "22h - 23h", score: 3, chronotype: "neutre" },
      {
        value: "23h-minuit",
        label: "23h - Minuit",
        score: 2,
        chronotype: "neutre",
      },
      {
        value: "apres-minuit",
        label: "Après minuit",
        score: 1,
        chronotype: "couche-tard",
      },
    ],
  },

  // 7. CHRONOTYPE - ÉNERGIE MATINALE
  {
    id: 7,
    category: "chronotype",
    question: "Comment décririez-vous votre niveau d'énergie le matin ?",
    type: "single",
    icon: "ZapIcon",
    options: [
      {
        value: "pleine-forme",
        label: "Pleine forme dès le réveil",
        score: 5,
        chronotype: "leve-tot",
      },
      {
        value: "bonne-energie",
        label: "Bonne énergie après 30 min",
        score: 4,
        chronotype: "leve-tot",
      },
      {
        value: "progressive",
        label: "Énergie progressive en 1-2h",
        score: 3,
        chronotype: "neutre",
      },
      {
        value: "lente",
        label: "Réveil très lent, besoin de 2-3h",
        score: 2,
        chronotype: "neutre",
      },
      {
        value: "difficile",
        label: "Très difficile, pas du matin",
        score: 1,
        chronotype: "couche-tard",
      },
    ],
  },

  // 8. TROUBLES SPÉCIFIQUES - RONFLEMENT
  {
    id: 8,
    category: "troubles",
    question: "Ronflez-vous ou avez-vous des arrêts respiratoires la nuit ?",
    type: "single",
    icon: "Volume2Icon",
    options: [
      { value: "jamais", label: "Jamais", score: 5 },
      {
        value: "ronflement-leger",
        label: "Ronflement léger occasionnel",
        score: 4,
      },
      { value: "ronflement-regulier", label: "Ronflement régulier", score: 3 },
      {
        value: "ronflement-fort",
        label: "Ronflement fort qui dérange",
        score: 2,
      },
      {
        value: "apnee",
        label: "Arrêts respiratoires signalés",
        score: 1,
        medical: true,
      },
    ],
  },

  // 9. TROUBLES SPÉCIFIQUES - JAMBES SANS REPOS
  {
    id: 9,
    category: "troubles",
    question:
      "Ressentez-vous des sensations désagréables dans les jambes le soir ?",
    type: "single",
    icon: "ActivityIcon",
    options: [
      { value: "jamais", label: "Jamais", score: 5 },
      { value: "rarement", label: "Rarement, sans gêne", score: 4 },
      { value: "parfois", label: "Parfois, légèrement gênant", score: 3 },
      { value: "souvent", label: "Souvent, besoin de bouger", score: 2 },
      {
        value: "chaque-soir",
        label: "Chaque soir, très perturbant",
        score: 1,
        medical: true,
      },
    ],
  },

  // 10. ENVIRONNEMENT - BRUIT
  {
    id: 10,
    category: "environment",
    question: "Votre environnement de sommeil est-il calme ?",
    type: "single",
    icon: "VolumeXIcon",
    options: [
      { value: "tres-calme", label: "Très calme, aucun bruit", score: 5 },
      { value: "calme", label: "Généralement calme", score: 4 },
      { value: "bruits-legers", label: "Bruits légers occasionnels", score: 3 },
      {
        value: "bruits-reguliers",
        label: "Bruits réguliers (circulation, voisins)",
        score: 2,
      },
      { value: "tres-bruyant", label: "Très bruyant, perturbant", score: 1 },
    ],
  },

  // 11. ENVIRONNEMENT - LUMIÈRE
  {
    id: 11,
    category: "environment",
    question: "Votre chambre est-elle suffisamment sombre ?",
    type: "single",
    icon: "EyeOffIcon",
    options: [
      { value: "noir-complet", label: "Noir complet", score: 5 },
      { value: "tres-sombre", label: "Très sombre", score: 4 },
      { value: "sombre", label: "Assez sombre", score: 3 },
      {
        value: "lumiere-legere",
        label: "Lumière légère (réverbères, réveil)",
        score: 2,
      },
      { value: "trop-eclaire", label: "Trop éclairé", score: 1 },
    ],
  },

  // 12. STRESS ET MENTAL - RUMINATIONS
  {
    id: 12,
    category: "stress",
    question:
      "À quelle fréquence avez-vous des pensées qui tournent en boucle au coucher ?",
    type: "single",
    icon: "BrainIcon",
    options: [
      { value: "jamais", label: "Jamais, esprit calme", score: 5 },
      {
        value: "rarement",
        label: "Rarement, facilement contrôlable",
        score: 4,
      },
      { value: "parfois", label: "Parfois, quelques minutes", score: 3 },
      {
        value: "souvent",
        label: "Souvent, retarde l'endormissement",
        score: 2,
      },
      { value: "chaque-soir", label: "Chaque soir, très perturbant", score: 1 },
    ],
  },

  // 13. HABITUDES - ÉCRANS
  {
    id: 13,
    category: "habits",
    question: "Utilisez-vous des écrans dans l'heure avant le coucher ?",
    type: "single",
    icon: "SmartphoneIcon",
    options: [
      { value: "jamais", label: "Jamais, pas d'écrans", score: 5 },
      { value: "filtre-bleu", label: "Avec filtre lumière bleue", score: 4 },
      { value: "parfois", label: "Parfois, sans filtre", score: 3 },
      { value: "souvent", label: "Souvent, télé/téléphone", score: 2 },
      { value: "toujours", label: "Toujours, jusqu'au coucher", score: 1 },
    ],
  },

  // 14. HABITUDES - CAFÉINE
  {
    id: 14,
    category: "habits",
    question: "À quelle heure prenez-vous votre dernière boisson caféinée ?",
    type: "single",
    icon: "CoffeeIcon",
    options: [
      {
        value: "jamais",
        label: "Je ne bois pas de boisson caféinée",
        score: 5,
      },
      { value: "matin-seul", label: "Matin uniquement", score: 5 },
      { value: "avant-midi", label: "Avant midi", score: 4 },
      { value: "debut-aprem", label: "Début d'après-midi (14h)", score: 3 },
      { value: "fin-aprem", label: "Fin d'après-midi (16-17h)", score: 2 },
      { value: "soir", label: "Le soir", score: 1 },
    ],
  },

  // 15. IMPACT QUOTIDIEN - PERFORMANCE
  {
    id: 15,
    category: "impact",
    question:
      "Comment votre sommeil affecte-t-il vos performances quotidiennes ?",
    type: "single",
    icon: "TrendingUpIcon",
    options: [
      {
        value: "aucun-impact",
        label: "Aucun impact, performances optimales",
        score: 5,
      },
      {
        value: "impact-minimal",
        label: "Impact minimal occasionnel",
        score: 4,
      },
      {
        value: "impact-modere",
        label: "Impact modéré sur concentration",
        score: 3,
      },
      {
        value: "impact-important",
        label: "Impact important sur productivité",
        score: 2,
      },
      {
        value: "impact-majeur",
        label: "Impact majeur, très handicapant",
        score: 1,
      },
    ],
  },
];

// ALGORITHME IA MULTIDIMENSIONNEL
export class AdvancedSleepAnalyzer {
  constructor(answers) {
    this.answers = answers;
    this.scores = this.calculateScores();
    this.analysis = this.performAnalysis();
  }

  calculateScores() {
    let totalScore = 0;
    let maxScore = 0;
    const categoryScores = {};

    ADVANCED_QUIZ_QUESTIONS.forEach((question) => {
      const answer = this.answers[`q${question.id}`];
      if (answer) {
        const option = question.options.find((opt) => opt.value === answer);
        if (option) {
          totalScore += option.score;
          maxScore += 5; // Score max par question

          // Score par catégorie
          if (!categoryScores[question.category]) {
            categoryScores[question.category] = { score: 0, max: 0 };
          }
          categoryScores[question.category].score += option.score;
          categoryScores[question.category].max += 5;
        }
      }
    });

    return {
      total: totalScore,
      max: maxScore,
      percentage: Math.round((totalScore / maxScore) * 100),
      categories: categoryScores,
    };
  }

  determineChronotype() {
    const q6 = this.answers.q6; // Heure coucher
    const q7 = this.answers.q7; // Énergie matinale

    const q6Option = ADVANCED_QUIZ_QUESTIONS[5].options.find(
      (opt) => opt.value === q6
    );
    const q7Option = ADVANCED_QUIZ_QUESTIONS[6].options.find(
      (opt) => opt.value === q7
    );

    const chronotypes = [q6Option?.chronotype, q7Option?.chronotype].filter(
      Boolean
    );

    // Compter les occurrences
    const counts = chronotypes.reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    // Retourner le plus fréquent ou neutre par défaut
    return (
      Object.keys(counts).reduce((a, b) => (counts[a] > counts[b] ? a : b)) ||
      "neutre"
    );
  }

  identifyTroubles() {
    const troubles = [];

    // Apnée du sommeil
    if (this.answers.q8 === "apnee") {
      troubles.push({
        type: "apnee-sommeil",
        severity: "high",
        medical: true,
        description: "Suspicion d'apnée du sommeil",
      });
    }

    // Jambes sans repos
    if (["souvent", "chaque-soir"].includes(this.answers.q9)) {
      troubles.push({
        type: "jambes-sans-repos",
        severity: this.answers.q9 === "chaque-soir" ? "high" : "medium",
        medical: true,
        description: "Syndrome des jambes sans repos",
      });
    }

    // Insomnie d'endormissement
    if (["30-60", "plus-60"].includes(this.answers.q3)) {
      troubles.push({
        type: "insomnie-endormissement",
        severity: this.answers.q3 === "plus-60" ? "high" : "medium",
        medical: false,
        description: "Difficulté d'endormissement",
      });
    }

    // Réveils nocturnes
    if (["chaque-nuit-1", "chaque-nuit-multiple"].includes(this.answers.q5)) {
      troubles.push({
        type: "reveils-nocturnes",
        severity:
          this.answers.q5 === "chaque-nuit-multiple" ? "high" : "medium",
        medical: false,
        description: "Réveils nocturnes fréquents",
      });
    }

    return troubles;
  }

  analyzeEnvironment() {
    const environment = {
      bruit: this.answers.q10,
      lumiere: this.answers.q11,
      score: 0,
    };

    // Score environnement (sur 10)
    const bruitScore =
      ADVANCED_QUIZ_QUESTIONS[9].options.find(
        (opt) => opt.value === this.answers.q10
      )?.score || 0;
    const lumiereScore =
      ADVANCED_QUIZ_QUESTIONS[10].options.find(
        (opt) => opt.value === this.answers.q11
      )?.score || 0;

    environment.score = Math.round(((bruitScore + lumiereScore) / 10) * 10);

    return environment;
  }

  analyzeStress() {
    const ruminations = this.answers.q12;
    const impact = this.answers.q15;

    let stressLevel = "low";

    if (
      ["souvent", "chaque-soir"].includes(ruminations) ||
      ["impact-important", "impact-majeur"].includes(impact)
    ) {
      stressLevel = "high";
    } else if (
      ["parfois"].includes(ruminations) ||
      ["impact-modere"].includes(impact)
    ) {
      stressLevel = "medium";
    }

    return {
      level: stressLevel,
      ruminations,
      impact,
      score: this.scores.categories.stress?.score || 0,
    };
  }

  generateProfile() {
    const percentage = this.scores.percentage;
    const chronotype = this.determineChronotype();
    const troubles = this.identifyTroubles();
    const environment = this.analyzeEnvironment();
    const stress = this.analyzeStress();

    // Déterminer la catégorie principale
    let mainCategory;
    if (percentage >= 90) mainCategory = "excellent-dormeur";
    else if (percentage >= 75) mainCategory = "bon-dormeur";
    else if (percentage >= 60) mainCategory = "dormeur-a-ameliorer";
    else if (percentage >= 45) mainCategory = "sommeil-moyen";
    else mainCategory = "sommeil-problematique";

    // Modifier selon chronotype et troubles
    if (troubles.some((t) => t.medical)) {
      mainCategory = "sommeil-problematique";
    }

    return {
      category: mainCategory,
      chronotype,
      troubles,
      environment,
      stress,
      percentage,
      scores: this.scores,
      profileDescription: this.getProfileDescription(
        mainCategory,
        chronotype,
        troubles
      ),
    };
  }

  getProfileDescription(category, chronotype, troubles) {
    const chronotypeDesc = {
      "leve-tot": "Vous êtes plutôt du matin, avec un pic d'énergie matinal.",
      "couche-tard":
        "Vous êtes plutôt du soir, avec un pic d'énergie en soirée.",
      neutre: "Vous avez un rythme circadien équilibré.",
    };

    let description = chronotypeDesc[chronotype] || "";

    if (troubles.length > 0) {
      description += ` Attention : nous avons identifié ${troubles.length} trouble(s) spécifique(s) qui nécessite(nt) une attention particulière.`;
    }

    return description;
  }

  performAnalysis() {
    return this.generateProfile();
  }

  // RECOMMANDATIONS ZINZINO SELON PROFIL
  getZinzinoRecommendations() {
    const profile = this.analysis;
    const recommendations = [];

    // Recommandations basées sur la catégorie principale
    switch (profile.category) {
      case "excellent-dormeur":
        recommendations.push({
          product: "Spiruline Bio Premium",
          reason: "Maintenir votre excellente forme physique",
          commission: "€25-45",
          priority: "MAINTENANCE",
          timing: "Matin au réveil",
        });
        break;

      case "bon-dormeur":
        recommendations.push({
          product: "Pack Omega-3 + Spiruline",
          reason: "Optimiser récupération et concentration",
          commission: "€50-80",
          priority: "OPTIMIZATION",
          timing: "Matin + soir",
        });
        break;

      case "dormeur-a-ameliorer":
      case "sommeil-moyen":
        recommendations.push({
          product: "Omega-3 Balance",
          reason: "Réduire stress et améliorer équilibre nerveux",
          commission: "€25-40",
          priority: "HIGH",
          timing: "Avec le dîner",
        });

        if (profile.stress.level === "high") {
          recommendations.push({
            product: "Phycocyanine Premium",
            reason: "Anti-inflammatoire naturel pour meilleure récupération",
            commission: "€35-60",
            priority: "HIGH",
            timing: "Matin à jeun",
          });
        }
        break;

      case "sommeil-problematique":
        recommendations.push({
          product: "Pack Récupération (Phycocyanine + Omega-3)",
          reason: "Combat inflammation et équilibre nerveux",
          commission: "€80-150",
          priority: "URGENT",
          timing: "Matin + soir",
          guarantee: "Amélioration en 3 semaines ou remboursé",
        });
        break;
    }

    // Recommandations selon chronotype
    if (profile.chronotype === "leve-tot") {
      recommendations.push({
        product: "Spiruline Énergie",
        reason: "Booster naturel pour vos matins énergiques",
        commission: "€30-50",
        priority: "MEDIUM",
        timing: "6h-7h du matin",
      });
    } else if (profile.chronotype === "couche-tard") {
      recommendations.push({
        product: "Omega-3 Soir",
        reason: "Favorise détente et récupération nocturne",
        commission: "€25-40",
        priority: "MEDIUM",
        timing: "2h avant coucher",
      });
    }

    return recommendations;
  }

  // PLAN D'ACTION 30 JOURS PERSONNALISÉ
  generateActionPlan() {
    const profile = this.analysis;
    const plan = {
      overview: `Plan personnalisé pour ${profile.chronotype} avec focus sur ${profile.category}`,
      weeks: [],
    };

    // Semaine 1
    plan.weeks.push({
      week: 1,
      focus: "Stabilisation des horaires",
      actions: [
        `Coucher et lever à heures fixes (optimal pour ${profile.chronotype})`,
        "Éliminer écrans 1h avant coucher",
        profile.environment.score < 7
          ? "Optimiser environnement (bruit/lumière)"
          : "Maintenir environnement optimal",
      ],
      zinzinoIntro:
        profile.category === "sommeil-problematique"
          ? "Commencer Phycocyanine"
          : "Commencer Omega-3",
    });

    // Semaine 2
    plan.weeks.push({
      week: 2,
      focus: "Gestion du stress",
      actions: [
        "Routine relaxation 30min avant coucher",
        profile.stress.level === "high"
          ? "Méditation quotidienne 10min"
          : "Exercices respiratoires",
        "Journal de gratitude le soir",
      ],
      zinzinoProgress: "Premiers effets attendus",
    });

    // Semaine 3
    plan.weeks.push({
      week: 3,
      focus: "Optimisation avancée",
      actions: [
        "Ajuster température chambre (18-20°C)",
        "Exercice physique adapté au chronotype",
        profile.troubles.some((t) => t.medical)
          ? "Consultation médecin si troubles persistent"
          : "Affiner routine personnelle",
      ],
      zinzinoOptimization: true,
    });

    // Semaine 4
    plan.weeks.push({
      week: 4,
      focus: "Consolidation",
      actions: [
        "Bilan des améliorations",
        "Ajustements fins selon ressentis",
        "Préparation routine long terme",
      ],
      evaluation: true,
    });

    return plan;
  }
}

// FONCTIONS HELPER POUR L'API
export function analyzeAdvancedQuiz(answers) {
  const analyzer = new AdvancedSleepAnalyzer(answers);
  return {
    profile: analyzer.analysis,
    zinzinoRecommendations: analyzer.getZinzinoRecommendations(),
    actionPlan: analyzer.generateActionPlan(),
    scores: analyzer.scores,
  };
}

export function generatePersonalizedEmail(analysis, userEmail, userName) {
  const { profile, zinzinoRecommendations, actionPlan } = analysis;

  return {
    to: userEmail,
    subject: `${userName}, votre analyse sommeil personnalisée est prête ! (${profile.category})`,
    template: "advanced-sleep-analysis",
    data: {
      userName,
      profile,
      zinzinoRecommendations,
      actionPlan,
      scorePercentage: profile.percentage,
      chronotype: profile.chronotype,
      mainIssues: profile.troubles.map((t) => t.description),
      hasUrgentRecommendations: zinzinoRecommendations.some(
        (r) => r.priority === "URGENT"
      ),
    },
  };
}
