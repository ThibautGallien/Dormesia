import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { action, file, content } = await request.json();

    // Cette route recevra les articles depuis ton CMS admin
    // et les synchronisera avec le repo Dormesia

    console.log("📝 Sync CMS:", { action, file });

    // Ici tu peux ajouter la logique pour :
    // - Valider le contenu
    // - Déclencher un rebuild Vercel
    // - Logger les changements

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
