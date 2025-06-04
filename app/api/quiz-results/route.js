// app/api/quiz-results/route.js - VERSION MISE À JOUR
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getActiveCampaignService } from "@/lib/activecampaign";

export async function POST(request) {
  try {
    console.log("🎯 API Quiz Results appelée");

    const body = await request.json();
    console.log("📥 Données reçues:", {
      email: body.userEmail,
      isAdvanced: body.isAdvancedQuiz || false,
      type: body.quizType || "standard",
    });

    // Déterminer le type de quiz
    const isAdvancedQuiz =
      body.isAdvancedQuiz || body.quizType === "advanced-sleep-analysis";

    if (isAdvancedQuiz) {
      // Rediriger vers le traitement avancé
      return await handleAdvancedQuiz(body);
    } else {
      // Traitement quiz standard (existant)
      return await handleStandardQuiz(body);
    }
  } catch (error) {
    console.error("❌ Erreur API Quiz Results:", error);
    return NextResponse.json(
      {
        error: "Erreur lors de la sauvegarde",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// TRAITEMENT QUIZ AVANCÉ
async function handleAdvancedQuiz(body) {
  console.log("🧠 Traitement Quiz Avancé");

  const {
    userEmail,
    userName,
    profile,
    zinzinoRecommendations,
    actionPlan,
    scores,
    answers,
    completedAt,
    quizVersion,
  } = body;

  // Validation
  if (!userEmail || !profile) {
    return NextResponse.json(
      { error: "Email et profil requis pour quiz avancé" },
      { status: 400 }
    );
  }

  // Connexion DB
  const { db } = await connectToDatabase();
  console.log("✅ Connexion MongoDB pour quiz avancé");

  // Sauvegarde enrichie
  const advancedQuizResult = {
    email: userEmail,
    name: userName || "Utilisateur",

    // Profil détaillé
    profile: {
      category: profile.category,
      chronotype: profile.chronotype,
      percentage: profile.percentage,
      troubles: profile.troubles || [],
      environment: profile.environment || {},
      stress: profile.stress || {},
      profileDescription: profile.profileDescription,
    },

    // Scores détaillés
    scores: {
      total: scores?.total || 0,
      percentage: scores?.percentage || profile.percentage,
      categories: scores?.categories || {},
    },

    // Recommandations Zinzino
    zinzinoRecommendations: zinzinoRecommendations || [],

    // Plan d'action
    actionPlan: actionPlan || {},

    // Réponses
    answers: answers || {},

    // Métadonnées
    completedAt: new Date(completedAt || new Date()),
    quizVersion: quizVersion || "advanced-v1",
    quizType: "advanced-sleep-analysis",
    isAdvancedQuiz: true,

    // Flags
    syncedToActiveCampaign: false,
    emailSent: false,
    createdAt: new Date(),

    // Analytics
    analytics: {
      hasUrgentRecommendations: (zinzinoRecommendations || []).some(
        (r) => r.priority === "URGENT"
      ),
      troublesCount: (profile.troubles || []).length,
      medicalTroubles: (profile.troubles || []).filter((t) => t.medical).length,
      environmentScore: profile.environment?.score || 0,
      stressLevel: profile.stress?.level || "unknown",
      zinzinoProductsCount: (zinzinoRecommendations || []).length,
      estimatedRevenue: calculateEstimatedRevenue(zinzinoRecommendations || []),
    },
  };

  // Sauvegarder
  const mongoResult = await db
    .collection("quiz_results_advanced")
    .insertOne(advancedQuizResult);
  console.log("✅ Quiz avancé sauvegardé:", mongoResult.insertedId);

  // Sync ActiveCampaign
  let activeCampaignResult = null;
  try {
    const acService = getActiveCampaignService();
    const contact = await acService.findOrCreateContact(userEmail, userName);

    // Champs personnalisés avancés
    const customFields = {
      sleep_score_advanced: profile.percentage,
      sleep_category_advanced: profile.category,
      chronotype: profile.chronotype,
      troubles_count: (profile.troubles || []).length,
      zinzino_products_count: (zinzinoRecommendations || []).length,
      quiz_version: "advanced-v1",
      quiz_completed_at: new Date().toISOString().split("T")[0],
    };

    await acService.updateCustomFields(contact.id, customFields);

    // Tags avancés
    const tags = generateAdvancedTags(
      profile,
      zinzinoRecommendations || [],
      answers || {}
    );
    await acService.addTags(contact.id, tags);

    activeCampaignResult = { contactId: contact.id, tags: tags.length };

    // Marquer comme synchronisé
    await db
      .collection("quiz_results_advanced")
      .updateOne(
        { _id: mongoResult.insertedId },
        { $set: { syncedToActiveCampaign: true, syncedAt: new Date() } }
      );

    console.log("✅ Sync AC avancé terminé");
  } catch (acError) {
    console.error("❌ Erreur AC avancé:", acError.message);
  }

  return NextResponse.json({
    success: true,
    message: "Quiz avancé sauvegardé avec succès",
    data: {
      quizId: mongoResult.insertedId,
      type: "advanced",
      profile: profile.category,
      chronotype: profile.chronotype,
      zinzinoRecommendations: (zinzinoRecommendations || []).length,
      activeCampaign: activeCampaignResult,
    },
  });
}

// TRAITEMENT QUIZ STANDARD (EXISTANT)
async function handleStandardQuiz(body) {
  console.log("📝 Traitement Quiz Standard");

  const {
    userEmail,
    name,
    score,
    percentage,
    category,
    answers,
    sleepProfile,
    recommendations,
    sleepTips,
  } = body;

  // Validation basique
  if (!userEmail || !score) {
    return NextResponse.json(
      { error: "Email et score requis" },
      { status: 400 }
    );
  }

  // Connexion DB
  const { db } = await connectToDatabase();
  console.log("✅ Connexion MongoDB pour quiz standard");

  // Sauvegarde standard
  const quizResult = {
    email: userEmail,
    name: name || "Utilisateur",
    score,
    percentage,
    category,
    answers,
    sleepProfile,
    recommendations,
    sleepTips,
    completedAt: new Date(),
    quizType: "standard",
    isAdvancedQuiz: false,
    syncedToActiveCampaign: false,
    createdAt: new Date(),
  };

  const mongoResult = await db.collection("quiz_results").insertOne(quizResult);
  console.log("✅ Quiz standard sauvegardé:", mongoResult.insertedId);

  // Sync ActiveCampaign standard
  let activeCampaignResult = null;
  try {
    const acService = getActiveCampaignService();
    const contact = await acService.findOrCreateContact(userEmail, name);

    const customFields = {
      sleep_score: percentage,
      sleep_category: category,
      quiz_completed_at: new Date().toISOString().split("T")[0],
    };

    await acService.updateCustomFields(contact.id, customFields);

    const tags = generateStandardTags(category, percentage, answers);
    await acService.addTags(contact.id, tags);

    activeCampaignResult = { contactId: contact.id, tags: tags.length };

    await db
      .collection("quiz_results")
      .updateOne(
        { _id: mongoResult.insertedId },
        { $set: { syncedToActiveCampaign: true, syncedAt: new Date() } }
      );

    console.log("✅ Sync AC standard terminé");
  } catch (acError) {
    console.error("❌ Erreur AC standard:", acError.message);
  }

  return NextResponse.json({
    success: true,
    message: "Quiz standard sauvegardé avec succès",
    data: {
      quizId: mongoResult.insertedId,
      type: "standard",
      category,
      activeCampaign: activeCampaignResult,
    },
  });
}

// FONCTIONS HELPER

function calculateEstimatedRevenue(recommendations) {
  return recommendations.reduce((total, rec) => {
    const match = rec.commission?.match(/€(\d+)-(\d+)/);
    if (match) {
      const min = parseInt(match[1]);
      const max = parseInt(match[2]);
      return total + (min + max) / 2;
    }
    return total;
  }, 0);
}

function generateAdvancedTags(profile, recommendations, answers) {
  const tags = [];

  // Tags profil
  tags.push(`Sommeil_${profile.category?.replace(/[^a-zA-Z0-9]/g, "_")}`);
  tags.push(`Chronotype_${profile.chronotype?.replace("-", "_")}`);

  // Tags score
  if (profile.percentage >= 90) tags.push("Excellent_Dormeur_Avance");
  else if (profile.percentage >= 75) tags.push("Bon_Dormeur_Avance");
  else if (profile.percentage >= 60) tags.push("Dormeur_Moyen_Avance");
  else tags.push("Sommeil_Problematique_Avance");

  // Tags troubles
  (profile.troubles || []).forEach((trouble) => {
    tags.push(`Trouble_${trouble.type?.replace(/[^a-zA-Z0-9]/g, "_")}`);
    if (trouble.medical) {
      tags.push("Attention_Medicale_Requise");
    }
  });

  // Tags Zinzino
  if (recommendations.some((r) => r.priority === "URGENT")) {
    tags.push("Zinzino_Urgent_Recommendations");
  }

  tags.push("Quiz_Avance_Complete");
  tags.push("Lead_Qualifie_Zinzino");

  return tags.filter((tag, index, arr) => arr.indexOf(tag) === index);
}

function generateStandardTags(category, percentage, answers) {
  const tags = [];

  // Tags par catégorie
  tags.push(`Sommeil_${category?.replace(/\s+/g, "_")}`);

  // Tags par score
  if (percentage >= 85) tags.push("Excellent_Dormeur");
  else if (percentage >= 70) tags.push("Bon_Dormeur");
  else if (percentage >= 50) tags.push("Dormeur_Moyen");
  else tags.push("Sommeil_Problematique");

  tags.push("Quiz_Standard_Complete");

  return tags;
}
