import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function GET() {
  try {
    console.log("🚀 API Health appelée");
    console.log(
      "📝 MONGODB_URI:",
      process.env.MONGODB_URI ? "Défini" : "Non défini"
    );

    // Test connexion MongoDB
    const { db } = await connectToDatabase();
    console.log("✅ Connexion MongoDB établie");

    // Test ping
    await db.admin().ping();
    console.log("✅ Ping MongoDB réussi");

    // Compter les documents dans les collections
    const stats = {
      users: await db.collection("users").countDocuments(),
      quizResults: await db.collection("quiz_results").countDocuments(),
      newsletter: await db
        .collection("newsletter_subscribers")
        .countDocuments(),
      content: await db.collection("cms_content").countDocuments(),
    };
    console.log("📊 Stats collections:", stats);

    return NextResponse.json({
      status: "healthy",
      database: "connected",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      stats,
    });
  } catch (error) {
    console.error("❌ Erreur API Health:", error);

    return NextResponse.json(
      {
        status: "error",
        error: error.message,
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
