import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getActiveCampaignService } from "@/lib/activecampaign";

export async function POST(request) {
  try {
    console.log("🎯 API Quiz Results appelée");

    const body = await request.json();
    console.log("📥 Données reçues:", {
      email: body.userEmail,
      score: body.score,
    });

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

    // 1. CONNEXION MONGODB
    const { db } = await connectToDatabase();
    console.log("✅ Connexion MongoDB établie");

    // 2. SAUVEGARDE MONGODB
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
      syncedToActiveCampaign: false,
      createdAt: new Date(),
    };

    const mongoResult = await db
      .collection("quiz_results")
      .insertOne(quizResult);
    console.log("✅ Quiz sauvegardé MongoDB:", mongoResult.insertedId);

    // 3. SYNC ACTIVECAMPAIGN
    let activeCampaignResult = null;
    try {
      console.log("🔄 Début sync ActiveCampaign...");

      const acService = getActiveCampaignService();

      // A. Trouver/créer contact
      const contact = await acService.findOrCreateContact(userEmail, name);
      console.log(
        "👤 Contact AC:",
        contact.id,
        contact.isNew ? "(nouveau)" : "(existant)"
      );

      // B. Mapper les données pour les champs personnalisés
      const customFields = {
        sleep_score: percentage,
        sleep_category: category,
        sleep_duration: sleepProfile.duration || null,
        sleep_quality: getSleepQualityNumber(answers.q1),
        main_issue: getMainIssue(answers, category),
        quiz_completed_at: new Date().toISOString().split("T")[0],
        last_sync: new Date().toISOString(),
      };

      // C. Mettre à jour les champs personnalisés
      await acService.updateCustomFields(contact.id, customFields);
      console.log("📝 Champs personnalisés mis à jour");

      // D. Ajouter les tags basés sur le profil
      const tags = generateTags(category, percentage, sleepProfile, answers);
      await acService.addTags(contact.id, tags);
      console.log("🏷️ Tags ajoutés:", tags);

      // E. Déclencher l'automation selon la catégorie
      const automationId = getAutomationId(category);
      if (automationId) {
        await acService.triggerAutomation(contact.id, automationId);
        console.log("🤖 Automation déclenchée:", automationId);
      }

      activeCampaignResult = {
        contactId: contact.id,
        isNewContact: contact.isNew,
        tags: tags,
        automationTriggered: !!automationId,
      };

      // F. Marquer comme synchronisé
      await db.collection("quiz_results").updateOne(
        { _id: mongoResult.insertedId },
        {
          $set: {
            syncedToActiveCampaign: true,
            activeCampaignContactId: contact.id,
            syncedAt: new Date(),
          },
        }
      );

      console.log("✅ Synchronisation ActiveCampaign terminée");
    } catch (acError) {
      console.error("❌ Erreur ActiveCampaign:", acError.message);

      // Marquer l'erreur mais continuer
      await db.collection("quiz_results").updateOne(
        { _id: mongoResult.insertedId },
        {
          $set: {
            syncError: acError.message,
            syncAttemptedAt: new Date(),
          },
        }
      );
    }

    // 4. RÉPONSE SUCCÈS
    return NextResponse.json({
      success: true,
      message: "Quiz sauvegardé et synchronisé avec succès",
      data: {
        quizId: mongoResult.insertedId,
        activeCampaign: activeCampaignResult,
        emailSent: true, // TODO: Implémenter envoi email PDF
      },
    });
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

// FONCTIONS HELPER

function getSleepQualityNumber(qualityAnswer) {
  const mapping = {
    "très-bien": 10,
    bien: 8,
    moyen: 6,
    mauvais: 4,
    "très-mauvais": 2,
  };
  return mapping[qualityAnswer] || 5;
}

function getMainIssue(answers, category) {
  if (answers.q3 && (answers.q3 === "30-60" || answers.q3 === "plus-60")) {
    return "Difficulté endormissement";
  }
  if (
    answers.q5 &&
    (answers.q5 === "souvent" || answers.q5 === "chaque-nuit")
  ) {
    return "Réveils nocturnes";
  }
  if (answers.q4 && (answers.q4 === "fatigué" || answers.q4 === "épuisé")) {
    return "Fatigue matinale";
  }
  if (category === "Sommeil problématique") {
    return "Troubles multiples";
  }
  return "Optimisation générale";
}

function generateTags(category, percentage, sleepProfile, answers) {
  const tags = [];

  // Tags par catégorie
  tags.push(`Sommeil_${category.replace(/\s+/g, "_")}`);

  // Tags par score
  if (percentage >= 85) tags.push("Excellent_Dormeur");
  else if (percentage >= 70) tags.push("Bon_Dormeur");
  else if (percentage >= 50) tags.push("Dormeur_Moyen");
  else tags.push("Sommeil_Problematique");

  // Tags par problèmes spécifiques
  if (answers.q3 === "plus-60") tags.push("Insomnie_Endormissement");
  if (answers.q5 === "chaque-nuit") tags.push("Reveils_Nocturnes");
  if (answers.q6 === "très-important") tags.push("Impact_Quotidien_Fort");

  // Tag durée
  if (sleepProfile.duration) {
    if (
      sleepProfile.duration === "moins-5" ||
      sleepProfile.duration === "5-6"
    ) {
      tags.push("Sommeil_Court");
    } else if (
      sleepProfile.duration === "9-10" ||
      sleepProfile.duration === "plus-10"
    ) {
      tags.push("Sommeil_Long");
    }
  }

  // Tag générique
  tags.push("Quiz_Dormesia_Complete");

  return tags;
}

function getAutomationId(category) {
  // TODO: Remplacer par les vrais IDs d'automation ActiveCampaign
  // Pour l'instant, on retourne null pour éviter les erreurs
  const automations = {
    "Excellent dormeur": null, // Pas d'automation spéciale
    "Bon dormeur": null, // "1" quand tu auras créé l'automation
    "Dormeur à améliorer": null, // "2" quand tu auras créé l'automation
    "Sommeil problématique": null, // "3" quand tu auras créé l'automation
  };

  return automations[category] || null;
}
