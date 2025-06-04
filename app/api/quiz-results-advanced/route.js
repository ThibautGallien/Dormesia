// app/api/quiz-results-advanced/route.js
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getActiveCampaignService } from "@/lib/activecampaign";

export async function POST(request) {
  try {
    console.log("🧠 API Quiz Avancé appelée");

    const body = await request.json();
    console.log("📥 Données reçues:", {
      email: body.userEmail,
      quizType: body.quizType,
      profileCategory: body.profile?.category,
    });

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

    // Validation basique
    if (!userEmail || !profile) {
      return NextResponse.json(
        { error: "Email et profil requis" },
        { status: 400 }
      );
    }

    // 1. CONNEXION MONGODB
    const { db } = await connectToDatabase();
    console.log("✅ Connexion MongoDB établie");

    // 2. SAUVEGARDE MONGODB ENRICHIE
    const advancedQuizResult = {
      email: userEmail,
      name: userName || "Utilisateur",

      // Profil détaillé
      profile: {
        category: profile.category,
        chronotype: profile.chronotype,
        percentage: profile.percentage,
        troubles: profile.troubles,
        environment: profile.environment,
        stress: profile.stress,
        profileDescription: profile.profileDescription,
      },

      // Scores détaillés
      scores: {
        total: scores.total,
        percentage: scores.percentage,
        categories: scores.categories,
      },

      // Recommandations Zinzino
      zinzinoRecommendations,

      // Plan d'action personnalisé
      actionPlan,

      // Réponses brutes
      answers,

      // Métadonnées
      completedAt: new Date(completedAt),
      quizVersion: quizVersion || "advanced-v1",
      quizType: "advanced-sleep-analysis",
      isAdvancedQuiz: true,

      // Flags pour suivi
      syncedToActiveCampaign: false,
      emailSent: false,
      createdAt: new Date(),

      // Analytics enrichies
      analytics: {
        hasUrgentRecommendations: zinzinoRecommendations.some(
          (r) => r.priority === "URGENT"
        ),
        troublesCount: profile.troubles.length,
        medicalTroubles: profile.troubles.filter((t) => t.medical).length,
        environmentScore: profile.environment.score,
        stressLevel: profile.stress.level,
        zinzinoProductsCount: zinzinoRecommendations.length,
        estimatedRevenue: calculateEstimatedRevenue(zinzinoRecommendations),
      },
    };

    const mongoResult = await db
      .collection("quiz_results_advanced")
      .insertOne(advancedQuizResult);
    console.log("✅ Quiz avancé sauvegardé MongoDB:", mongoResult.insertedId);

    // 3. SYNC ACTIVECAMPAIGN AVANCÉ
    let activeCampaignResult = null;
    try {
      console.log("🔄 Début sync ActiveCampaign avancé...");

      const acService = getActiveCampaignService();

      // A. Trouver/créer contact
      const contact = await acService.findOrCreateContact(userEmail, userName);
      console.log(
        "👤 Contact AC:",
        contact.id,
        contact.isNew ? "(nouveau)" : "(existant)"
      );

      // B. Champs personnalisés avancés
      const customFields = {
        // Scores
        sleep_score_advanced: profile.percentage,
        sleep_category_advanced: profile.category,
        chronotype: profile.chronotype,

        // Troubles
        troubles_count: profile.troubles.length,
        medical_troubles: profile.troubles.filter((t) => t.medical).length,
        main_troubles: profile.troubles.map((t) => t.type).join(", "),

        // Environnement
        environment_score: profile.environment.score,
        noise_level: profile.environment.bruit,
        light_level: profile.environment.lumiere,

        // Stress
        stress_level: profile.stress.level,
        ruminations: profile.stress.ruminations,
        daily_impact: profile.stress.impact,

        // Recommandations Zinzino
        zinzino_products_count: zinzinoRecommendations.length,
        urgent_recommendations: zinzinoRecommendations.filter(
          (r) => r.priority === "URGENT"
        ).length,
        estimated_revenue: calculateEstimatedRevenue(zinzinoRecommendations),

        // Métadonnées
        quiz_version: "advanced-v1",
        quiz_completed_at: new Date().toISOString().split("T")[0],
        last_sync_advanced: new Date().toISOString(),
      };

      // C. Mettre à jour les champs personnalisés
      await acService.updateCustomFields(contact.id, customFields);
      console.log("📝 Champs personnalisés avancés mis à jour");

      // D. Tags avancés basés sur le profil
      const tags = generateAdvancedTags(
        profile,
        zinzinoRecommendations,
        answers
      );
      await acService.addTags(contact.id, tags);
      console.log("🏷️ Tags avancés ajoutés:", tags.length);

      // E. Déclencher automation selon profil
      const automationId = getAdvancedAutomationId(
        profile.category,
        profile.troubles
      );
      if (automationId) {
        await acService.triggerAutomation(contact.id, automationId);
        console.log("🤖 Automation avancée déclenchée:", automationId);
      }

      activeCampaignResult = {
        contactId: contact.id,
        isNewContact: contact.isNew,
        tags: tags,
        automationTriggered: !!automationId,
        customFieldsCount: Object.keys(customFields).length,
      };

      // F. Marquer comme synchronisé
      await db.collection("quiz_results_advanced").updateOne(
        { _id: mongoResult.insertedId },
        {
          $set: {
            syncedToActiveCampaign: true,
            activeCampaignContactId: contact.id,
            syncedAt: new Date(),
          },
        }
      );

      console.log("✅ Synchronisation ActiveCampaign avancée terminée");
    } catch (acError) {
      console.error("❌ Erreur ActiveCampaign avancé:", acError.message);

      // Marquer l'erreur mais continuer
      await db.collection("quiz_results_advanced").updateOne(
        { _id: mongoResult.insertedId },
        {
          $set: {
            syncError: acError.message,
            syncAttemptedAt: new Date(),
          },
        }
      );
    }

    // 4. ENVOI EMAIL PERSONNALISÉ (Template avancé)
    let emailResult = null;
    try {
      emailResult = await sendAdvancedEmailTemplate({
        email: userEmail,
        name: userName,
        profile,
        zinzinoRecommendations,
        actionPlan,
        scores,
      });

      // Marquer email comme envoyé
      await db
        .collection("quiz_results_advanced")
        .updateOne(
          { _id: mongoResult.insertedId },
          { $set: { emailSent: true, emailSentAt: new Date() } }
        );

      console.log("✅ Email avancé envoyé");
    } catch (emailError) {
      console.error("❌ Erreur envoi email:", emailError.message);
    }

    // 5. RÉPONSE SUCCÈS
    return NextResponse.json({
      success: true,
      message: "Analyse avancée sauvegardée et synchronisée avec succès",
      data: {
        quizId: mongoResult.insertedId,
        profile: profile.category,
        chronotype: profile.chronotype,
        zinzinoRecommendations: zinzinoRecommendations.length,
        activeCampaign: activeCampaignResult,
        emailSent: !!emailResult,
        analytics: advancedQuizResult.analytics,
      },
    });
  } catch (error) {
    console.error("❌ Erreur API Quiz Avancé:", error);

    return NextResponse.json(
      {
        error: "Erreur lors de la sauvegarde de l'analyse avancée",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// FONCTIONS HELPER AVANCÉES

function calculateEstimatedRevenue(recommendations) {
  return recommendations.reduce((total, rec) => {
    // Extraire le montant moyen de la commission (ex: "€25-45" → 35)
    const match = rec.commission.match(/€(\d+)-(\d+)/);
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

  // Tags par catégorie
  tags.push(`Sommeil_${profile.category.replace(/[^a-zA-Z0-9]/g, "_")}`);

  // Tags chronotype
  tags.push(`Chronotype_${profile.chronotype.replace("-", "_")}`);

  // Tags score
  if (profile.percentage >= 90) tags.push("Excellent_Dormeur_Avance");
  else if (profile.percentage >= 75) tags.push("Bon_Dormeur_Avance");
  else if (profile.percentage >= 60) tags.push("Dormeur_Moyen_Avance");
  else tags.push("Sommeil_Problematique_Avance");

  // Tags troubles spécifiques
  profile.troubles.forEach((trouble) => {
    tags.push(`Trouble_${trouble.type.replace(/[^a-zA-Z0-9]/g, "_")}`);
    if (trouble.medical) {
      tags.push("Attention_Medicale_Requise");
    }
  });

  // Tags environnement
  if (profile.environment.score < 6) {
    tags.push("Environnement_Problematique");
  } else if (profile.environment.score >= 8) {
    tags.push("Environnement_Optimal");
  }

  // Tags stress
  tags.push(`Stress_Level_${profile.stress.level}`);

  // Tags Zinzino
  if (recommendations.some((r) => r.priority === "URGENT")) {
    tags.push("Zinzino_Urgent_Recommendations");
  }
  tags.push(`Zinzino_Products_${recommendations.length}`);

  // Tags par produits recommandés
  recommendations.forEach((rec) => {
    if (rec.product.includes("Phycocyanine")) {
      tags.push("Zinzino_Phycocyanine_Candidate");
    }
    if (rec.product.includes("Omega-3")) {
      tags.push("Zinzino_Omega3_Candidate");
    }
    if (rec.product.includes("Spiruline")) {
      tags.push("Zinzino_Spiruline_Candidate");
    }
  });

  // Tags par habitudes (basés sur réponses spécifiques)
  if (answers.q13 === "toujours") {
    tags.push("Exposition_Ecrans_Excessive");
  }
  if (answers.q14 === "soir") {
    tags.push("Cafeine_Soir_Problematique");
  }

  // Tag quiz avancé
  tags.push("Quiz_Avance_Complete");
  tags.push("Lead_Qualifie_Zinzino");

  return tags.filter((tag, index, arr) => arr.indexOf(tag) === index); // Dédupliquer
}

function getAdvancedAutomationId(category, troubles) {
  // IDs d'automation ActiveCampaign selon profil
  // TODO: Remplacer par les vrais IDs une fois créés dans AC

  const automations = {
    "excellent-dormeur": null, // Pas d'automation urgente
    "bon-dormeur": null, // "10" - Sequence optimisation
    "dormeur-a-ameliorer": null, // "11" - Sequence amélioration
    "sommeil-moyen": null, // "12" - Sequence correction
    "sommeil-problematique": null, // "13" - Sequence urgente
  };

  // Automation spéciale si troubles médicaux
  if (troubles.some((t) => t.medical)) {
    return null; // "20" - Sequence médicale
  }

  return automations[category] || null;
}

async function sendAdvancedEmailTemplate(data) {
  // TODO: Intégrer avec votre service d'email (SendGrid, Mailgun, etc.)
  // Pour l'instant, simulation

  console.log("📧 Envoi email template avancé:", {
    to: data.email,
    template: "advanced-sleep-analysis",
    profile: data.profile.category,
    zinzinoCount: data.zinzinoRecommendations.length,
  });

  // Simulation d'envoi réussi
  return {
    messageId: `advanced-${Date.now()}`,
    status: "sent",
    template: "advanced-sleep-analysis",
  };
}

// Export pour utilisation dans d'autres routes si nécessaire
export { calculateEstimatedRevenue, generateAdvancedTags };
