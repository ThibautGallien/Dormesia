// app/api/newsletter/route.js - VERSION OPTIMISÉE
import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getActiveCampaignService } from "@/lib/activecampaign";

export async function POST(request) {
  try {
    console.log("📧 API Newsletter appelée - VERSION RAPIDE");

    const { email, name, source = "newsletter" } = await request.json();

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email valide requis" },
        { status: 400 }
      );
    }

    console.log("📥 Inscription newsletter:", email.substring(0, 3) + "***");

    // 🚀 STRATÉGIE: Réponse rapide + sync différée
    const response = {
      success: true,
      message: "Inscription en cours de traitement...",
      isNewSubscriber: true, // On assume que c'est nouveau
    };

    // ✅ RÉPONSE IMMÉDIATE pour l'UX
    const responsePromise = NextResponse.json(response);

    // 🔄 PUIS traitement en arrière-plan (sans await)
    processNewsletterSubscription(email, name, source).catch((error) => {
      console.error("❌ Erreur traitement newsletter différé:", error);
      // On peut logger mais on ne bloque pas l'utilisateur
    });

    return responsePromise;
  } catch (error) {
    console.error("❌ Erreur API Newsletter:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Erreur lors de l'inscription",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// 🔧 FONCTION DE TRAITEMENT DIFFÉRÉ
async function processNewsletterSubscription(email, name, source) {
  console.log(
    "🔄 Début traitement différé pour:",
    email.substring(0, 3) + "***"
  );

  try {
    // 1. MONGODB (rapide - local)
    const mongoResult = await saveMongoDB(email, name, source);
    console.log("✅ MongoDB terminé");

    // 2. ACTIVECAMPAIGN (avec timeout strict)
    await syncActiveCompaignWithTimeout(email, name, source, mongoResult._id);
    console.log("✅ ActiveCampaign terminé");
  } catch (error) {
    console.error("❌ Erreur traitement différé:", error);
    // En cas d'erreur, on peut déclencher une retry queue
  }
}

// 🗄️ Sauvegarde MongoDB rapide
async function saveMongoDB(email, name, source) {
  const { db } = await connectToDatabase();

  const newsletterSub = {
    email,
    name: name || "Abonné",
    source,
    subscribedAt: new Date(),
    isActive: true,
    syncedToActiveCampaign: false,
  };

  // Upsert rapide
  const result = await db.collection("newsletter_subscribers").findOneAndUpdate(
    { email },
    {
      $setOnInsert: newsletterSub,
      $set: {
        isActive: true,
        lastUpdated: new Date(),
      },
    },
    {
      upsert: true,
      returnDocument: "after",
    }
  );

  return result;
}

// ⏱️ ActiveCampaign avec timeout strict
async function syncActiveCompaignWithTimeout(email, name, source, mongoId) {
  const TIMEOUT_MS = 5000; // 5 secondes max

  try {
    const acPromise = syncActiveCampaign(email, name, source, mongoId);
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error("ActiveCampaign timeout")), TIMEOUT_MS)
    );

    await Promise.race([acPromise, timeoutPromise]);
  } catch (error) {
    console.error("❌ ActiveCampaign timeout ou erreur:", error.message);

    // 📝 Marquer pour retry ultérieur
    await markForRetry(email, error.message);
  }
}

// 🔄 Sync ActiveCampaign optimisée
async function syncActiveCampaign(email, name, source, mongoId) {
  const acService = getActiveCampaignService();

  // Trouver/créer contact
  const contact = await acService.findOrCreateContact(email, name);
  console.log("👤 Contact AC:", contact.id);

  // Tags minimalistes pour vitesse
  const tags = ["Newsletter_Dormesia"];
  if (source === "quiz") tags.push("Lead_Quiz");

  await acService.addTags(contact.id, tags);
  console.log("🏷️ Tags ajoutés");

  // Marquer comme synchronisé
  const { db } = await connectToDatabase();
  await db.collection("newsletter_subscribers").updateOne(
    { _id: mongoId },
    {
      $set: {
        syncedToActiveCampaign: true,
        activeCampaignContactId: contact.id,
        syncedAt: new Date(),
      },
    }
  );
}

// 📝 Marquer pour retry en cas d'échec
async function markForRetry(email, errorMessage) {
  try {
    const { db } = await connectToDatabase();
    await db.collection("newsletter_subscribers").updateOne(
      { email },
      {
        $set: {
          syncError: errorMessage,
          syncAttemptedAt: new Date(),
          needsRetry: true,
        },
      }
    );
  } catch (error) {
    console.error("❌ Erreur marking retry:", error);
  }
}
