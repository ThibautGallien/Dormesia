import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { getActiveCampaignService } from "@/lib/activecampaign";

export async function POST(request) {
  try {
    console.log("📧 API Newsletter appelée");

    const { email, name, source = "newsletter" } = await request.json();

    // Validation
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Email valide requis" },
        { status: 400 }
      );
    }

    console.log("📥 Inscription newsletter:", email.substring(0, 3) + "***");

    // 1. SAUVEGARDE MONGODB
    const { db } = await connectToDatabase();

    const newsletterSub = {
      email,
      name: name || "Abonné",
      source,
      subscribedAt: new Date(),
      isActive: true,
      syncedToActiveCampaign: false,
    };

    // Vérifier si déjà inscrit
    const existingSub = await db
      .collection("newsletter_subscribers")
      .findOne({ email });

    if (existingSub) {
      // Réactiver si désactivé
      if (!existingSub.isActive) {
        await db.collection("newsletter_subscribers").updateOne(
          { email },
          {
            $set: {
              isActive: true,
              resubscribedAt: new Date(),
            },
          }
        );
        console.log("🔄 Abonnement réactivé");
      } else {
        return NextResponse.json({
          success: true,
          message: "Déjà inscrit à la newsletter",
          alreadySubscribed: true,
        });
      }
    } else {
      // Nouvelle inscription
      await db.collection("newsletter_subscribers").insertOne(newsletterSub);
      console.log("✅ Nouvelle inscription newsletter MongoDB");
    }

    // 2. SYNC ACTIVECAMPAIGN
    try {
      const acService = getActiveCampaignService();

      // Créer/trouver contact
      const contact = await acService.findOrCreateContact(email, name);
      console.log("👤 Contact newsletter AC:", contact.id);

      // Tags newsletter
      const tags = ["Newsletter_Dormesia", "Interesse_Sommeil"];
      if (source === "quiz") tags.push("Lead_Quiz");
      if (source === "footer") tags.push("Lead_Footer");
      if (source === "hero") tags.push("Lead_Hero");

      await acService.addTags(contact.id, tags);
      console.log("🏷️ Tags newsletter ajoutés");

      // Marquer comme synchronisé
      await db.collection("newsletter_subscribers").updateOne(
        { email },
        {
          $set: {
            syncedToActiveCampaign: true,
            activeCampaignContactId: contact.id,
            syncedAt: new Date(),
          },
        }
      );

      console.log("✅ Newsletter synchronisée avec ActiveCampaign");
    } catch (acError) {
      console.error("❌ Erreur sync newsletter AC:", acError.message);

      await db
        .collection("newsletter_subscribers")
        .updateOne(
          { email },
          { $set: { syncError: acError.message, syncAttemptedAt: new Date() } }
        );
    }

    return NextResponse.json({
      success: true,
      message:
        "Inscription réussie ! Vous recevrez bientôt votre premier guide gratuit.",
      isNewSubscriber: !existingSub,
    });
  } catch (error) {
    console.error("❌ Erreur API Newsletter:", error);

    return NextResponse.json(
      {
        error: "Erreur lors de l'inscription",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
