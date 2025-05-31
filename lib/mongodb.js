import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // En développement, utilise une variable globale pour éviter les reconnexions
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // En production, crée une nouvelle connexion
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;

// Helper pour obtenir la base de données
export async function connectToDatabase() {
  try {
    const client = await clientPromise;
    const db = client.db("dormesia");
    return { client, db };
  } catch (error) {
    console.error("Erreur connexion MongoDB:", error);
    throw new Error("Impossible de se connecter à la base de données");
  }
}

// Collections principales
export const COLLECTIONS = {
  USERS: "users",
  QUIZ_RESULTS: "quiz_results",
  NEWSLETTER: "newsletter_subscribers",
  CONTENT: "cms_content",
  ANALYTICS: "conversion_tracking",
  ADMIN_LOGS: "admin_logs",
};

// Helper pour créer les index MongoDB
export const createIndexes = async (db) => {
  try {
    // Index pour les utilisateurs
    await db.collection("users").createIndex({ email: 1 }, { unique: true });
    await db.collection("users").createIndex({ activeCampaignId: 1 });
    await db.collection("users").createIndex({ createdAt: -1 });

    // Index pour les résultats de quiz
    await db.collection("quiz_results").createIndex({ email: 1 });
    await db.collection("quiz_results").createIndex({ userId: 1 });
    await db.collection("quiz_results").createIndex({ completedAt: -1 });
    await db.collection("quiz_results").createIndex({ category: 1 });

    // Index pour la newsletter
    await db
      .collection("newsletter_subscribers")
      .createIndex({ email: 1 }, { unique: true });
    await db
      .collection("newsletter_subscribers")
      .createIndex({ subscribedAt: -1 });

    // Index pour le contenu
    await db
      .collection("cms_content")
      .createIndex({ slug: 1 }, { unique: true });
    await db.collection("cms_content").createIndex({ category: 1 });
    await db
      .collection("cms_content")
      .createIndex({ isPublished: 1, publishedAt: -1 });

    // Index pour les analytics
    await db.collection("conversion_tracking").createIndex({ event: 1 });
    await db.collection("conversion_tracking").createIndex({ timestamp: -1 });
    await db.collection("conversion_tracking").createIndex({ email: 1 });

    console.log("✅ Index MongoDB créés avec succès");
  } catch (error) {
    console.error("❌ Erreur création index:", error);
  }
};
